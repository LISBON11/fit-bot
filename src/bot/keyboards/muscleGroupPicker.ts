import { InlineKeyboard } from 'grammy';
import type { WorkoutFocus } from '../../constants/muscleGroups.js';

/**
 * Описание группы мышц для навигации.
 * `label` — отображаемое пользователю имя.
 * `dbValues` — значения, которые ищутся в поле `muscleGroups` в БД (английские).
 */
export interface MuscleGroupEntry {
  /** Отображаемое русское название кнопки */
  label: string;
  /** Значения в поле muscleGroups в БД (английские строки из seed) */
  dbValues: ReadonlyArray<WorkoutFocus>;
}

/**
 * Фиксированный маппинг групп мышц: русское название → английские значения в БД.
 * Редактируй этот список при необходимости — запрос в БД не нужен.
 */
export const MUSCLE_GROUPS: ReadonlyArray<MuscleGroupEntry> = [
  { label: 'Грудь', dbValues: ['chest'] },
  { label: 'Спина', dbValues: ['back'] },
  { label: 'Плечи', dbValues: ['shoulders'] },
  { label: 'Бицепс', dbValues: ['biceps'] },
  { label: 'Трицепс', dbValues: ['triceps'] },
  { label: 'Пресс', dbValues: ['core'] },
  { label: 'Ноги', dbValues: ['quadriceps', 'hamstrings'] },
  { label: 'Ягодицы', dbValues: ['glutes'] },
  { label: 'Икры', dbValues: ['calves'] },
] as const;

/**
 * Максимальная длина callback_data в Telegram — 64 байта.
 * Префикс `mg:` — 3 символа. Оставшиеся 61 байт — на индекс группы (число).
 */
const MUSCLE_GROUP_CALLBACK_PREFIX = 'mg:';

/**
 * Создаёт клавиатуру с кнопками групп мышц.
 * Используется как первый шаг при выборе упражнения из полного списка.
 * Callback_data содержит индекс в MUSCLE_GROUPS (надёжнее и короче чем название).
 *
 * @param groups Список групп мышц (обычно MUSCLE_GROUPS)
 * @returns Экземпляр InlineKeyboard с кнопками групп мышц
 */
export function createMuscleGroupPickerKeyboard(
  groups: ReadonlyArray<MuscleGroupEntry>,
  originalName?: string,
): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  groups.forEach((group, index) => {
    keyboard.text(`💪 ${group.label}`, `${MUSCLE_GROUP_CALLBACK_PREFIX}${index}`).row();
  });

  // Кнопка показа всех упражнений без фильтра
  keyboard.text('📋 Все упражнения', 'mg:all').row();

  // Кнопка для создания нового упражнения с именем пользователя (опционально)
  if (originalName) {
    const displayName = originalName.length > 20 ? `${originalName.slice(0, 20)}…` : originalName;
    keyboard.text(`➕ Создать «${displayName}»`, 'new_exercise').row();
  }

  return keyboard;
}

/**
 * Regex для перехвата всех callback_data кнопок выбора группы мышц.
 * Используется в `waitForCallbackQuery`.
 */
export const MUSCLE_GROUP_CALLBACK_REGEX = /^mg:/;
