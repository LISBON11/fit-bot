import { InlineKeyboard } from 'grammy';
import { CANCEL_WORKOUT_CALLBACK } from '../utils/progressTracker.js';

/**
 * Создает клавиатуру для превью тренировки с кнопками Approve, Edit, Cancel.
 *
 * Кнопка «❌ Cancel» использует тот же callback {@link CANCEL_WORKOUT_CALLBACK},
 * что и кнопка «❌ Отменить создание» в статус-сообщении.
 * Оба действия обрабатываются единым глобальным bypass-обработчиком в bot.ts,
 * который корректно завершает conversation через `ctx.conversation.exit()`.
 *
 * @param workoutId ID тренировки
 * @returns Экземпляр InlineKeyboard
 */
export function createWorkoutPreviewKeyboard(workoutId: string): InlineKeyboard {
  return new InlineKeyboard()
    .text('✅ Approve', `appr:${workoutId}`)
    .row()
    .text('✏️ Edit', `edit:${workoutId}`)
    .row()
    .text('❌ Cancel', CANCEL_WORKOUT_CALLBACK);
}
