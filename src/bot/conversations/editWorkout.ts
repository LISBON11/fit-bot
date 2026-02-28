import type { Conversation } from '@grammyjs/conversations';
import { AppError } from '../../errors/app-errors.js';
import { getNluParser, workoutService, userService } from '../../services/index.js';
import { createWorkoutPreviewKeyboard } from '../keyboards/workoutPreview.js';
import { formatPreview, formatWorkoutForNlu } from '../formatters/workoutFormatter.js';
import type { WorkoutWithRelations } from '../formatters/workoutFormatter.js';
import { PublisherService } from '../../services/publisher.service.js';
import type { CustomContext } from '../types.js';
import { downloadAndTranscribeVoice, withChatAction } from '../utils/telegram.js';
import { parseAndDisambiguateUserInput } from '../utils/workoutFlow.js';
import { getCurrentDateString } from '../../utils/date.js';
import { cloneWithoutClasses } from '../utils/serialization.js';

export async function editWorkout(
  conversation: Conversation<CustomContext, CustomContext>,
  ctx: CustomContext,
): Promise<void> {
  const telegramId = ctx.from?.id.toString();
  if (!telegramId) {
    throw new AppError('Пользователь не идентифицирован', 401);
  }

  const user = await conversation.external(() =>
    userService.getOrCreateByTelegram(telegramId, ctx.from?.username || null, ctx.from?.first_name),
  );

  const userId = user.id;

  // Получаем аргумент (дату) после команды /edit
  // Команда может быть запущена так: /edit вчера, или просто /edit
  let matchText = ctx.message?.text?.replace('/edit', '').trim() || '';

  if (!matchText) {
    await ctx.reply('Введите дату тренировки (например: "вчера", "19 февраля"):');
    const dateCtx = await conversation.waitFor('message:text');
    matchText = dateCtx.message?.text || '';
  }

  if (!matchText) {
    await ctx.reply('Отменено.');
    return;
  }

  const nluParser = getNluParser();
  const today = getCurrentDateString();

  const targetDateStr = await withChatAction(ctx, conversation, async () => {
    return await conversation.external(() => nluParser.parseDate(matchText, today));
  });

  if (!targetDateStr) {
    await ctx.reply('Не удалось определить дату. Попробуйте еще раз.');
    return;
  }

  const workout = await conversation.external(async () => {
    const data = await workoutService.findByDate(userId, new Date(targetDateStr));
    return cloneWithoutClasses(data);
  });

  if (!workout) {
    await ctx.reply(`Не найдена тренировка за дату: ${targetDateStr}.`);
    return;
  }

  await ctx.reply(`🔍 Найдена тренировка за ${targetDateStr}:`);

  const workoutId = workout.id;

  // Тот же цикл редактирования
  while (true) {
    const currentWorkout = await conversation.external(async () => {
      const data = await workoutService.findById(workoutId);
      return cloneWithoutClasses(data);
    });

    if (!currentWorkout) {
      throw new AppError('Не удалось загрузить тренировку', 404);
    }

    const previewHtml = formatPreview(currentWorkout as WorkoutWithRelations);
    const previewKb = createWorkoutPreviewKeyboard(workoutId);

    const previewMsg = await ctx.reply(previewHtml, {
      parse_mode: 'HTML',
      reply_markup: previewKb,
    });

    await conversation.external(() =>
      workoutService.updateMessageIds(workoutId, {
        previewMessageId: previewMsg.message_id,
      }),
    );

    const actionCtx = await conversation.waitForCallbackQuery([/^appr:/, /^edit:/, /^canc:/], {
      otherwise: (otherCtx) =>
        otherCtx.reply('Выберите действие по кнопкам', {
          reply_to_message_id: otherCtx.message?.message_id,
        }),
    });

    const actionData = actionCtx.callbackQuery.data;
    const action = actionData.split(':')[0];
    await actionCtx.answerCallbackQuery().catch(() => {});

    if (action === 'appr') {
      await conversation.external(() => workoutService.approveDraft(workoutId));
      const publisher = new PublisherService(ctx.api);
      await publisher.publish(previewHtml);
      await actionCtx.deleteMessage().catch(() => {});
      await ctx.reply('✅ Тренировка обновлена и опубликована!');
      return;
    } else if (action === 'canc') {
      await actionCtx.deleteMessage().catch(() => {});
      await ctx.reply('❌ Редактирование закрыто.');
      return;
    } else if (action === 'edit') {
      await ctx.reply('✏️ Что изменить? (текст или голос)');

      const editInputCtx = await conversation.waitFor(['message:text', 'message:voice']);
      let editRawText: string;

      if (editInputCtx.message?.voice) {
        editRawText = await downloadAndTranscribeVoice(editInputCtx, conversation);
      } else {
        editRawText = editInputCtx.message?.text || '';
      }

      if (!editRawText.trim()) continue;

      const fullWorkoutForDto = await conversation.external(async () => {
        const data = await workoutService.getDraftForUser(userId); // or getById with relations
        return cloneWithoutClasses(data);
      });
      if (!fullWorkoutForDto) throw new AppError('Workout not found');

      const nluDto = formatWorkoutForNlu(fullWorkoutForDto);

      const editResult = await parseAndDisambiguateUserInput(
        conversation,
        ctx,
        editRawText,
        'edit',
        userId,
        JSON.stringify(nluDto),
        workoutId,
      );

      if (!editResult) continue;

      await ctx.reply('🔄 Изменения применены!');
      await actionCtx.deleteMessage().catch(() => {});
    }
  }
}
