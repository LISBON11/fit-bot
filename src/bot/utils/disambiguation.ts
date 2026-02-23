import type { Conversation } from '@grammyjs/conversations';
import type { CustomContext } from '../types.js';
import type { ParsedWorkout, ParsedExercise } from '../../nlu/nlu.types.js';
import { exerciseService, workoutService } from '../../services/index.js';
import { createExercisePickerKeyboard } from '../keyboards/exercisePicker.js';
import type { Exercise, Workout } from '@prisma/client';

/**
 * Запускает цикл разрешения неоднозначностей упражнений (Disambiguation FSM).
 * Спрашивает пользователя о каждом нераспознанном упражнении и обновляет маппинги.
 *
 * @param conversation Контекст стейт-машины
 * @param ctx Текущий контекст grammY
 * @param parsedDelta Объект с тренировкой или дельтой (содержит exercises)
 * @param workoutId ID текущей тренировки (черновика или редактируемой)
 * @returns Финальный статус (обычно 'created' или 'updated')
 */
export async function runDisambiguationLoop(
  conversation: Conversation<CustomContext, CustomContext>,
  ctx: CustomContext,
  parsedDelta: ParsedWorkout | { add?: unknown[]; update?: unknown[]; remove?: string[] },
  workoutId: string,
  isEditMode: boolean = false,
): Promise<{ status: string; ambiguousExercises?: ParsedExercise[]; workout?: Workout }> {
  const userId = ctx.user?.id;
  if (!userId) {
    throw new Error('User is not authorized');
  }

  let result = await conversation.external(() => {
    const fn = isEditMode
      ? workoutService.applyEdits(workoutId, userId, parsedDelta as ParsedWorkout)
      : workoutService.createDraft(userId, parsedDelta as ParsedWorkout);
    return fn as Promise<{
      status: string;
      ambiguousExercises?: ParsedExercise[];
      workout?: Workout;
    }>;
  });

  while (result.status === 'needs_disambiguation') {
    const ambiguousExercises = result.ambiguousExercises || [];

    for (const ambig of ambiguousExercises) {
      if (ambig.mappedExerciseId) continue;

      const resolveResult = await conversation.external(() =>
        exerciseService.resolveExercise(ambig.originalName, userId),
      );

      const options: Array<Pick<Exercise, 'id' | 'canonicalName' | 'displayNameRu'>> =
        resolveResult.status === 'ambiguous' ? resolveResult.options : [];

      const kb = createExercisePickerKeyboard(options);
      await ctx.reply(
        `Немного не понял упражнение: "${ambig.originalName}". Выберите из списка или создайте новое:`,
        { reply_markup: kb },
      );

      const responseCtx = await conversation.waitForCallbackQuery([/^map:/, 'new_exercise'], {
        otherwise: (otherCtx) =>
          otherCtx.reply('Пожалуйста, выберите вариант из меню выше 👆', {
            reply_to_message_id: otherCtx.message?.message_id,
          }),
      });
      const data = responseCtx.callbackQuery.data;

      await responseCtx.answerCallbackQuery();
      if (responseCtx.callbackQuery.message && responseCtx.chat?.id) {
        await responseCtx.api
          .deleteMessage(responseCtx.chat.id, responseCtx.callbackQuery.message.message_id)
          .catch(() => {});
      }

      if (data.startsWith('map:')) {
        const exerciseId = data.split(':')[1];
        await conversation.external(() =>
          exerciseService.confirmMapping(userId, ambig.originalName, exerciseId),
        );
        ambig.mappedExerciseId = exerciseId;
      } else if (data === 'new_exercise') {
        ambig.mappedExerciseId = 'raw';
      }
    }

    result = await conversation.external(() => {
      const fn = isEditMode
        ? workoutService.applyEdits(workoutId, userId, parsedDelta as ParsedWorkout)
        : workoutService.createDraft(userId, parsedDelta as ParsedWorkout);
      return fn as Promise<{
        status: string;
        ambiguousExercises?: ParsedExercise[];
        workout?: Workout;
      }>;
    });
  }

  return result;
}
