import type { Prisma } from '@prisma/client';

import { MUSCLE_GROUPS, type MuscleGroupEntry } from '../keyboards/muscleGroupPicker.js';
import type { PrimaryMuscle } from '../../constants/muscleGroups.js';

export type WorkoutWithRelations = Prisma.WorkoutGetPayload<{
  include: {
    workoutExercises: {
      include: {
        exercise: true;
        sets: {
          orderBy: { setNumber: 'asc' };
        };
        comments: true;
      };
    };
    comments: true;
  };
}>;

/** Дни недели на русском (0 = воскресенье) */
const WEEK_DAYS_RU = [
  'воскресенье',
  'понедельник',
  'вторник',
  'среда',
  'четверг',
  'пятница',
  'суббота',
] as const;

/**
 * Экранирует HTML-спецсимволы в тексте для безопасной вставки в HTML-сообщение Telegram.
 *
 * @param text Исходный текст
 * @returns Экранированная строка
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Форматирует список подходов в компактную строку вида:
 * `20×10, 40×8×2, 60×8×3`
 *
 * Подходы с одинаковым весом и репами группируются.
 * Формат одного элемента:
 * - с весом, 1 подход: `40×10`
 * - с весом, N подходов: `40×10×3`
 * - без веса, 1 подход: `10`
 * - без веса, N подходов: `10×3`
 *
 * @param sets Список подходов
 * @param unit Единица веса
 * @returns Строка с компактным описанием подходов
 */
function formatSetsCompact(sets: WorkoutWithRelations['workoutExercises'][0]['sets']): string {
  if (sets.length === 0) return '';

  // Группируем последовательные подходы с одинаковыми параметрами
  const groups: { reps: number; weight: number | null; count: number }[] = [];

  for (const set of sets) {
    const w = set.weight ? Number(set.weight) : null;
    const last = groups[groups.length - 1];
    if (last && last.reps === set.reps && last.weight === w) {
      last.count += 1;
    } else {
      groups.push({ reps: set.reps, weight: w, count: 1 });
    }
  }

  return groups
    .map(({ reps, weight, count }) => {
      if (weight !== null) {
        const base = `${weight}×${reps}`;
        return count > 1 ? `${base}×${count}` : base;
      }
      return count > 1 ? `${reps}×${count}` : `${reps}`;
    })
    .join(', ');
}

/**
 * Преобразует тренировку в HTML-строку для предварительного просмотра.
 *
 * Формат:
 * ```
 * 🗓 12.02.2026, четверг
 * 💪 Ноги
 * 🏠 Севастополь, Триумф
 *
 * 1. Становая — 20кг×10, 40кг×8×2, 60кг×8×3
 * <blockquote>Комментарий к упражнению</blockquote>
 * ```
 *
 * @param workout Тренировка со всеми вложенными связями
 * @returns Отформатированная HTML строка
 */
export function formatPreview(workout: WorkoutWithRelations): string {
  // Обеспечиваем, что workoutDate — объект Date (при replay сессия из Redis возвращает строку)
  const workoutDateObj =
    typeof workout.workoutDate === 'string' ? new Date(workout.workoutDate) : workout.workoutDate;

  // Форматируем дату в DD.MM.YYYY + день недели
  const dateStr = workoutDateObj.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const dayOfWeek = WEEK_DAYS_RU[workoutDateObj.getDay()];
  const headerLines: string[] = [`🗓 <b>${dateStr}, ${dayOfWeek}</b>`];

  if (workout.focus && workout.focus.length > 0) {
    const formattedFocus = Array.from(
      new Set(
        workout.focus.map((f) => {
          const lowerF = f.toLowerCase();
          const group = MUSCLE_GROUPS.find((g: MuscleGroupEntry) =>
            g.dbValues.includes(lowerF as PrimaryMuscle),
          );
          if (group) return group.label;
          return f.charAt(0).toUpperCase() + f.slice(1);
        }),
      ),
    ).join(', ');

    if (formattedFocus) {
      headerLines.push(`🏋 <b>${escapeHtml(formattedFocus)}</b>`);
    }
  }
  if (workout.location) {
    headerLines.push(`🏠 <b>${escapeHtml(workout.location)}</b>`);
  }

  let text = headerLines.join('\n') + '\n\n';

  // Упражнения
  workout.workoutExercises.forEach((we, index) => {
    const name = escapeHtml(
      we.exercise?.displayNameRu || we.exercise?.canonicalName || 'Упражнение',
    );

    const setsStr = formatSetsCompact(we.sets);
    const exerciseLine = setsStr ? `${name} — ${setsStr}` : name;

    text += `${index + 1}. ${exerciseLine}\n`;

    // Комментарии к упражнению — blockquote
    if (we.comments && we.comments.length > 0) {
      we.comments.forEach((c) => {
        text += `<blockquote>${escapeHtml(c.rawText)}</blockquote>\n`;
      });
    }
  });

  // Общие комментарии к тренировке — blockquote
  if (workout.comments && workout.comments.length > 0) {
    text += '\n';
    workout.comments.forEach((c) => {
      text += `<blockquote>${escapeHtml(c.rawText)}</blockquote>\n`;
    });
  }

  return text.trim();
}

/**
 * Преобразует тренировку в HTML-строку для публикации в канал.
 * На этапе MVP используется тот же формат, что и для preview.
 *
 * @param workout Тренировка со всеми связями
 * @returns Отформатированная HTML строка
 */
export function formatPublish(workout: WorkoutWithRelations): string {
  return formatPreview(workout);
}

/**
 * Преобразует тренировку в DTO для NLU, вырезая лишние поля и ID
 * для экономии токенов при отправке в LLM.
 *
 * @param workout Тренировка со всеми связями из БД
 * @returns Очищенный объект для JSON.stringify
 */
export function formatWorkoutForNlu(workout: WorkoutWithRelations): Record<string, unknown> {
  const workoutDateObj =
    typeof workout.workoutDate === 'string' ? new Date(workout.workoutDate) : workout.workoutDate;

  return {
    date: workoutDateObj.toISOString().split('T')[0],
    focus: workout.focus,
    location: workout.location,
    comments: workout.comments.map((c) => c.rawText),
    exercises: workout.workoutExercises.map((we) => ({
      name: we.exercise?.displayNameRu || we.exercise?.canonicalName || 'Упражнение',
      sets: we.sets.map((s) => ({
        reps: s.reps,
        weight: s.weight ? Number(s.weight) : null,
        unit: s.unit,
      })),
      comments: we.comments.map((c) => c.rawText),
    })),
  };
}
