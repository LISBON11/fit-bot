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
import { ProgressTracker, WorkoutStep } from '../utils/progressTracker.js';
import { saveUserContext, clearUserContext, getUserContext } from '../utils/userContext.js';

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
    userService.getOrCreateByTelegram({
      telegramId,
      username: ctx.from?.username || null,
      firstName: ctx.from?.first_name,
    }),
  );

  const userId = user.id;

  let rawText: string;
  let tracker: ProgressTracker | undefined;

  // 1. Получение текста (голос -> STT или напрямую текст)
  if (ctx.message?.voice) {
    convLogger.info('Step 1: Downloading and transcribing voice');

    // Инициализируем трекер и сразу показываем статусы.
    tracker = new ProgressTracker(ctx);
    const statusMsgCoords = await tracker.send();

    // Сохраняем координаты статус-сообщения в сессию.
    // Это позволяет глобальному обработчику cancel_workout_creation мгновенно
    // отредактировать сообщение без ожидания завершения текущего шага (Bypass Middleware).
    // Запись в ctx.session выполняется напрямую (не через conversation.external),
    // так как conversation.external получает специальный контекст без session middleware.
    if (statusMsgCoords && ctx.from?.id) {
      await saveUserContext(ctx.from.id, { activeStatusMessage: statusMsgCoords });
      convLogger.debug(statusMsgCoords, 'activeStatusMessage сохранён в Redis (userContext)');
    }

    tracker.setRunning({ step: WorkoutStep.STT });
    rawText = await downloadAndTranscribeVoice({ ctx: ctx, conversation: conversation });

    // Проверяем, не отменил ли пользователь создание тренировки во время STT
    if (ctx.from?.id) {
      const userContext = await getUserContext(ctx.from.id);
      if (!userContext.activeStatusMessage) {
        convLogger.info('Workout creation cancelled by user during STT, aborting');
        return;
      }
    }

    tracker.setDone({ step: WorkoutStep.STT });

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

  console.log('rawText =>', rawText);

  // 2. NLU Parsing & Disambiguation Loop
  convLogger.info('Step 2: Starting parseAndDisambiguateUserInput');
  const draftResult = await parseAndDisambiguateUserInput({
    conversation: conversation,
    ctx: ctx,
    rawText: rawText,
    mode: 'new',
    userId: userId,
    existingWorkoutContext: undefined,
    workoutIdForDelta: undefined,
    tracker: tracker,
  });
  convLogger.info(
    { draftResultStatus: draftResult?.status },
    'Step 2: parseAndDisambiguateUserInput output',
  );

  console.log('draftResult =>', draftResult);

  if (!draftResult) return; // Ошибка парсинга обработана внутри

  // Проверяем, не отменил ли пользователь создание тренировки во время парсинга
  if (ctx.from?.id) {
    const userContext = await getUserContext(ctx.from.id);
    // Если activeStatusMessage нет, значит пользователь нажал "Отмена" и глобальный обработчик очистил контекст
    if (!userContext.activeStatusMessage) {
      convLogger.info('Workout creation cancelled by user during NLU, aborting preview');
      return;
    }
  }

  // 4. Показ превью
  const workoutId = draftResult.workout?.id;
  if (!workoutId) {
    throw new AppError('Не удалось создать черновик тренировки', 500);
  }

  // Сохраняем workoutId в сессию, чтобы глобальный обработчик cancel_workout_creation
  // мог удалить черновик при мгновенной отмене (Bypass Middleware паттерн).
  // Запись напрямую в ctx.session (не через conversation.external) — см. комментарий выше.
  if (ctx.from?.id) {
    await saveUserContext(ctx.from.id, { currentDraftId: workoutId });
    convLogger.debug({ workoutId }, 'workoutId сохранён в Redis (userContext)');
  }

  const fullWorkout = await conversation.external(async () => {
    const draft = await workoutService.getDraftForUser(userId);
    return cloneWithoutClasses(draft);
  });

  if (!fullWorkout) {
    throw new AppError('Не удалось загрузить созданный черновик', 500);
  }

  let previewMsgId: number | undefined;

  // Процессинг завершён, показываем пользователю превью для подтверждения
  // CLARIFY = фаза ревью (пользователь проверяет тренировку, нажимает кнопку)
  tracker?.setRunning({ step: WorkoutStep.CLARIFY });

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

    if (previewMsgId && ctx.chat?.id) {
      await ctx.api
        .editMessageText(ctx.chat.id, previewMsgId, previewHtml, {
          parse_mode: 'HTML',
          reply_markup: previewKb,
        })
        .catch(() => {});
    } else {
      const previewMsg = await ctx.reply(previewHtml, {
        parse_mode: 'HTML',
        reply_markup: previewKb,
      });
      previewMsgId = previewMsg.message_id;

      // Сохраняем связки сообщений
      await conversation.external(() =>
        workoutService.updateMessageIds({
          id: workoutId,
          data: {
            sourceMessageId: ctx.message?.message_id,
            previewMessageId: previewMsgId,
          },
        }),
      );
    }

    // 5. Ожидание действия (Approve, Edit)
    // Кнопка «Cancel» теперь использует CANCEL_WORKOUT_CALLBACK и обрабатывается
    // глобальным bypass-обработчиком в bot.ts ДО conversations() middleware.
    // Поэтому здесь ждём только appr: и edit:.
    let actionCtx;
    const warningMsgIds: number[] = [];

    while (true) {
      actionCtx = await conversation.waitFor(['callback_query:data', 'message']);

      if (actionCtx.callbackQuery?.data && /^(appr|edit):/.test(actionCtx.callbackQuery.data)) {
        break;
      }

      if (actionCtx.message) {
        const msg = await actionCtx.reply(
          'Пожалуйста, подтвердите, отредактируйте или отмените тренировку по кнопкам 👆',
          { reply_to_message_id: actionCtx.message.message_id },
        );
        warningMsgIds.push(msg.message_id);
      }
    }
    convLogger.info({ actionData: actionCtx.callbackQuery.data }, 'Loop: Received callback query');

    if (warningMsgIds.length > 0 && ctx.chat?.id) {
      const chatId = ctx.chat.id;
      await conversation.external(async () => {
        for (const msgId of warningMsgIds) {
          await ctx.api.deleteMessage(chatId, msgId).catch(() => {});
        }
      });
    }

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

      // CLARIFY завершен, начинаем публикацию
      tracker?.setDone({ step: WorkoutStep.CLARIFY });
      tracker?.setRunning({ step: WorkoutStep.PUBLISH });
      const publisher = new PublisherService(ctx.api);
      await publisher.publish(previewHtml);
      convLogger.info('Action: publisher.publish completed');
      tracker?.setDone({ step: WorkoutStep.PUBLISH });

      // Удаляем трекер — тренировка подтверждена
      await tracker?.delete();

      // Очищаем данные сессии — conversation завершена нормально
      if (ctx.from?.id) {
        await clearUserContext(ctx.from.id);
      }

      if (previewMsgId && ctx.chat?.id) {
        await ctx.api
          .editMessageText(
            ctx.chat.id,
            previewMsgId,
            previewHtml + '\n\n✅ <i>Тренировка успешно опубликована!</i>',
            { parse_mode: 'HTML', reply_markup: { inline_keyboard: [] } },
          )
          .catch(() => {});
      } else {
        await ctx.reply('✅ Тренировка успешно опубликована!');
      }

      convLogger.info('Action: approve (finish)');
      return;
    } else if (action === 'edit') {
      // Редактируем: запрашиваем дельту изменений
      const promptMsg = await ctx.reply(
        '✏️ Что вы хотите изменить? (напишите текстом или запишите голосовое)',
      );

      const editInputCtx = await conversation.waitFor(['message:text', 'message:voice']);
      let editRawText: string;

      if (editInputCtx.message?.voice) {
        try {
          editRawText = await downloadAndTranscribeVoice({
            ctx: editInputCtx as CustomContext,
            conversation: conversation,
          });
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

      // Чистим историю сообщений редактирования сразу после получения ответа
      if (ctx.chat?.id) {
        // Удаляем запрос "Что вы хотите изменить?"
        if (promptMsg.message_id) {
          ctx.api.deleteMessage(ctx.chat.id, promptMsg.message_id).catch(() => {});
        }
        // Удаляем "Драфт тренировки" (превью), чтобы оно не мешалось пользователю
        if (previewMsgId) {
          ctx.api.deleteMessage(ctx.chat.id, previewMsgId).catch(() => {});
          previewMsgId = undefined; // Сбрасываем id, чтобы создалось новое сообщение превью
        }
      }

      // Сбрасываем статус прогресса на "Понимаем тренировку"
      tracker?.resetToNLU();

      const editResult = await parseAndDisambiguateUserInput({
        conversation: conversation,
        ctx: ctx,
        rawText: editRawText,
        mode: 'edit',
        userId: userId,
        existingWorkoutContext: JSON.stringify(loopWorkout, null, 2),
        workoutIdForDelta: workoutId,
        tracker: tracker,
      });

      if (!editResult) continue;
    }
  }
}
