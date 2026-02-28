import type { Conversation } from '@grammyjs/conversations';
import type { CustomContext } from '../types.js';
import { workoutService, userService } from '../../services/index.js';
import { createLogger } from '../../logger/logger.js';
import { AppError } from '../../errors/app-errors.js';
import { createWorkoutPreviewKeyboard } from '../keyboards/workoutPreview.js';
import { formatPreview } from '../formatters/workoutFormatter.js';
import type { WorkoutWithRelations } from '../formatters/workoutFormatter.js';
import { PublisherService } from '../../services/publisher.service.js';
import { downloadAndTranscribeVoice } from '../utils/telegram.js';
import { cloneWithoutClasses } from '../utils/serialization.js';
import { parseAndDisambiguateUserInput } from '../utils/workoutFlow.js';

const convLogger = createLogger('newWorkoutConversation');

/**
 * Основной FSM-граф(conversation) для создания новой тренировки.
 * Обрабатывает текст/голосовые сообщения, парсинг, уточнение названий и публикацию.
 */
export async function newWorkout(
  conversation: Conversation<CustomContext, CustomContext>,
  ctx: CustomContext,
): Promise<void> {
  convLogger.info({ userId: ctx.user?.id }, 'Started newWorkout conversation');

  const telegramId = ctx.from?.id.toString();
  if (!telegramId) {
    throw new AppError('Пользователь не идентифицирован', 401);
  }

  const user = await conversation.external(() =>
    userService.getOrCreateByTelegram(telegramId, ctx.from?.username || null, ctx.from?.first_name),
  );

  const userId = user.id;

  let rawText: string;

  // 1. Получение текста (голос -> STT или напрямую текст)
  if (ctx.message?.voice) {
    convLogger.info('Step 1: Downloading and transcribing voice');
    rawText = await downloadAndTranscribeVoice(ctx, conversation);
    convLogger.info('Step 1: Voice transcription complete');
  } else if (ctx.message?.text) {
    rawText = ctx.message.text;
  } else {
    await ctx.reply('⚠️ Пожалуйста, отправьте текст или голосовое сообщение.');
    return;
  }

  if (!rawText.trim()) {
    await ctx.reply('⚠️ Не удалось распознать текст, попробуйте снова.');
    return;
  }

  // 2. NLU Parsing & Disambiguation Loop
  convLogger.info('Step 2: Starting parseAndDisambiguateUserInput');
  const draftResult = await parseAndDisambiguateUserInput(
    conversation,
    ctx,
    rawText,
    'new',
    userId,
  );
  convLogger.info(
    { draftResultStatus: draftResult?.status },
    'Step 2: parseAndDisambiguateUserInput output',
  );

  if (!draftResult) return; // Ошибка парсинга обработана внутри

  // 4. Показ превью
  const workoutId = draftResult.workout?.id;
  if (!workoutId) {
    throw new AppError('Не удалось создать черновик тренировки', 500);
  }
  const fullWorkout = await conversation.external(async () => {
    const draft = await workoutService.getDraftForUser(userId);
    return cloneWithoutClasses(draft);
  });

  if (!fullWorkout) {
    throw new AppError('Не удалось загрузить созданный черновик', 500);
  }

  // 4. Показ итеративного превью и выбор действия
  while (true) {
    convLogger.info('Loop: entering visualization loop');
    const loopWorkout = await conversation.external(async () => {
      const draft = await workoutService.getDraftForUser(userId);
      return cloneWithoutClasses(draft);
    });
    convLogger.info('Loop: Fetched loop workout');

    if (!loopWorkout) {
      throw new AppError('Не удалось загрузить черновик тренировки', 404);
    }

    const previewHtml = formatPreview(loopWorkout as WorkoutWithRelations);
    const previewKb = createWorkoutPreviewKeyboard(workoutId);

    const previewMsg = await ctx.reply(previewHtml, {
      parse_mode: 'HTML',
      reply_markup: previewKb,
    });

    // Сохраняем связки сообщений
    await conversation.external(() =>
      workoutService.updateMessageIds(workoutId, {
        sourceMessageId: ctx.message?.message_id,
        previewMessageId: previewMsg.message_id,
      }),
    );

    // 5. Ожидание действия (Approve, Edit, Cancel)
    convLogger.info('Loop: Waiting for callback query (appr, edit, canc)');
    const actionCtx = await conversation.waitForCallbackQuery([/^appr:/, /^edit:/, /^canc:/], {
      otherwise: (otherCtx) =>
        otherCtx.reply(
          'Пожалуйста, подтвердите, отредактируйте или отмените тренировку по кнопкам 👆',
          { reply_to_message_id: otherCtx.message?.message_id },
        ),
    });
    convLogger.info({ actionData: actionCtx.callbackQuery.data }, 'Loop: Received callback query');

    const actionData = actionCtx.callbackQuery.data;
    const action = actionData.split(':')[0];
    const incomingWorkoutId = actionData.split(':')[1];

    if (incomingWorkoutId && incomingWorkoutId !== workoutId) {
      await actionCtx.answerCallbackQuery('⚠️ Эта тренировка уже неактуальна').catch(() => {});
      await actionCtx
        .editMessageReplyMarkup({ reply_markup: { inline_keyboard: [] } })
        .catch(() => {});
      continue;
    }

    await actionCtx.answerCallbackQuery().catch(() => {});

    if (action === 'appr') {
      convLogger.info('Action: approve (start)');
      // Утверждаем и публикуем
      await conversation.external(() => workoutService.approveDraft(workoutId));
      convLogger.info('Action: approveDraft completed');
      const publisher = new PublisherService(ctx.api);
      await publisher.publish(previewHtml);
      convLogger.info('Action: publisher.publish completed');

      if (ctx.message?.message_id && ctx.chat?.id) {
        await ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id).catch(() => {});
      }
      await actionCtx.deleteMessage().catch(() => {});

      await ctx.reply('✅ Тренировка успешно опубликована!');
      convLogger.info('Action: approve (finish)');
      return;
    } else if (action === 'canc') {
      // Отменяем
      await conversation.external(() => workoutService.cancelDraft(workoutId));
      if (ctx.message?.message_id && ctx.chat?.id) {
        await ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id).catch(() => {});
      }
      await actionCtx.deleteMessage().catch(() => {});

      await ctx.reply('❌ Тренировка отменена.');
      return;
    } else if (action === 'edit') {
      // Редактируем: запрашиваем дельту изменений
      await ctx.reply('✏️ Что вы хотите изменить? (напишите текстом или запишите голосовое)');

      const editInputCtx = await conversation.waitFor(['message:text', 'message:voice']);
      let editRawText: string;

      if (editInputCtx.message?.voice) {
        try {
          editRawText = await downloadAndTranscribeVoice(
            editInputCtx as CustomContext,
            conversation,
          );
        } catch (err: unknown) {
          const errorMsg =
            err instanceof AppError ? err.message : '⚠️ Ошибка при обработке голосового сообщения';
          await ctx.reply(errorMsg);
          continue;
        }
      } else {
        editRawText = editInputCtx.message?.text || '';
      }

      if (!editRawText.trim()) {
        await ctx.reply('⚠️ Не понял вас. Изменения отменены.');
        continue;
      }

      const editResult = await parseAndDisambiguateUserInput(
        conversation,
        ctx,
        editRawText,
        'edit',
        userId,
        JSON.stringify(loopWorkout, null, 2),
        workoutId,
      );

      if (!editResult) continue;

      await ctx.reply('🔄 Изменения применены!');
      // Удаляем старое превью и идем на новый круг while(true)
      await actionCtx.deleteMessage().catch(() => {});
    }
  }
}
