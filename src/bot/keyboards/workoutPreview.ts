import { InlineKeyboard } from 'grammy';

/**
 * Создает клавиатуру для превью тренировки с кнопками Approve, Edit, Cancel.
 * @param workoutId ID тренировки
 * @returns Экземпляр InlineKeyboard
 */
export function createWorkoutPreviewKeyboard(workoutId: string): InlineKeyboard {
  return new InlineKeyboard()
    .text('✅ Approve', `appr:${workoutId}`)
    .row()
    .text('✏️ Edit', `edit:${workoutId}`)
    .row()
    .text('❌ Cancel', `canc:${workoutId}`);
}
