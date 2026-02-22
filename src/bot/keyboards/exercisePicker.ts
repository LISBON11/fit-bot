import { InlineKeyboard } from 'grammy';
import type { Exercise } from '@prisma/client';

/**
 * Создает клавиатуру для выбора упражнения (Disambiguation потоку).
 * Показывает варианты + возможность использовать как есть.
 *
 * @param options Список предложенных упражнений
 * @returns Экземпляр InlineKeyboard
 */
export function createExercisePickerKeyboard(
  options: Array<Pick<Exercise, 'id' | 'canonicalName' | 'displayNameRu'>>,
): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  // Добавляем кнопки с предложенными вариантами
  // Формат payload: map:{exerciseId}
  // Т.к. Id — это UUID (36 символов), поместится в колбэкдату (map: - 4 символа). Всего 40.
  options.forEach((opt) => {
    const title = opt.displayNameRu || opt.canonicalName;
    keyboard.text(title, `map:${opt.id}`).row();
  });

  // Кнопка для создания/предоставления как есть
  keyboard.text('➕ Создать новое (сохранить как есть)', `new_exercise`).row();

  return keyboard;
}
