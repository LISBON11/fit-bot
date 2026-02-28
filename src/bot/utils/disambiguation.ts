import type { Conversation } from '@grammyjs/conversations';
import type { CustomContext } from '../types.js';
import type { ParsedWorkout, ParsedExercise } from '../../nlu/nlu.types.js';
import { exerciseService, workoutService } from '../../services/index.js';
import { createExercisePickerKeyboard } from '../keyboards/exercisePicker.js';
import type { Exercise } from '@prisma/client';

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
  userId: string,
  isEditMode: boolean = false,
): Promise<{ status: string; ambiguousExercises?: ParsedExercise[]; workout?: { id: string } }> {
  let result = await conversation.external(async () => {
    const fn = isEditMode
      ? await workoutService.applyEdits(workoutId, userId, parsedDelta as ParsedWorkout)
      : await workoutService.createDraft(userId, parsedDelta as ParsedWorkout);
    return {
      status: fn.status,
      ambiguousExercises: 'ambiguousExercises' in fn ? fn.ambiguousExercises : undefined,
      workout: 'workout' in fn && fn.workout ? { id: fn.workout.id } : undefined,
    } as {
      status: string;
      ambiguousExercises?: ParsedExercise[];
      workout?: { id: string };
    };
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

      await responseCtx.answerCallbackQuery().catch(() => {});
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

    result = await conversation.external(async () => {
      const fn = isEditMode
        ? await workoutService.applyEdits(workoutId, userId, parsedDelta as ParsedWorkout)
        : await workoutService.createDraft(userId, parsedDelta as ParsedWorkout);
      return {
        status: fn.status,
        ambiguousExercises: 'ambiguousExercises' in fn ? fn.ambiguousExercises : undefined,
        workout: 'workout' in fn && fn.workout ? { id: fn.workout.id } : undefined,
      } as {
        status: string;
        ambiguousExercises?: ParsedExercise[];
        workout?: { id: string };
      };
    });
  }

  return result;
}
