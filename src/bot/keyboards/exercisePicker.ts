import { InlineKeyboard } from 'grammy';
import type { Exercise } from '@prisma/client';

/**
 * Создает клавиатуру для выбора упражнения (Disambiguation потоку).
 * Показывает варианты + кнопку создания нового + кнопку голосового выбора из полного списка.
 *
 * @param options Список предложенных упражнений
 * @param originalName Оригинальное название, введённое пользователем (для кнопки «Создать»)
 * @returns Экземпляр InlineKeyboard
 */
export function createExercisePickerKeyboard(
  options: Array<Pick<Exercise, 'id' | 'canonicalName' | 'displayNameRu'>>,
  originalName: string,
): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  // Добавляем кнопки с предложенными вариантами
  // Формат payload: map:{exerciseId}
  // Т.к. Id — это UUID (36 символов), поместится в колбэкдату (map: - 4 символа). Всего 40.
  options.forEach((opt) => {
    const title = opt.displayNameRu || opt.canonicalName;
    keyboard.text(title, `map:${opt.id}`).row();
  });

  // Обрезаем название для отображения в кнопке (Telegram лимит текста кнопки - 64 байта)
  const displayName = originalName.length > 20 ? `${originalName.slice(0, 20)}…` : originalName;

  // Кнопка для создания нового упражнения с именем пользователя
  keyboard.text(`➕ Создать «${displayName}»`, 'new_exercise').row();

  // Кнопка для голосового/текстового выбора из полного списка
  keyboard.text('🗣 Найти из всего списка', 'voice_list').row();

  return keyboard;
}
