import type { Prisma } from '@prisma/client';

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

/**
 * Преобразует тренировку в HTML-строку для предварительного просмотра.
 * Формат: `📅 21.02.2026 | 🏠 Alushta Home / 🎯 Legs, Glutes`
 * Упражнения: `1️⃣ Back Squat • 4 × 12 @ 40 кг`
 *
 * @param workout Тренировка со всеми вложенными связями
 * @returns Отформатированная HTML строка
 */
export function formatPreview(workout: WorkoutWithRelations): string {
  // Форматируем дату в DD.MM.YYYY
  const dateStr = workout.workoutDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  let header = `<b>📅 ${dateStr}</b>`;

  const additionalHeaderInfo: string[] = [];
  if (workout.location) {
    additionalHeaderInfo.push(`🏠 ${workout.location}`);
  }
  if (workout.focus && workout.focus.length > 0) {
    additionalHeaderInfo.push(`🎯 ${workout.focus.join(', ')}`);
  }

  if (additionalHeaderInfo.length > 0) {
    header += ` | ${additionalHeaderInfo.join(' / ')}`;
  }

  let text = header + '\n\n';

  // Упражнения
  workout.workoutExercises.forEach((we, index) => {
    // Используем displayNameRu, или canonicalName, или rawName, или дефолтное
    const name =
      we.exercise?.displayNameRu || we.exercise?.canonicalName || we.rawName || 'Упражнение';

    // Эмодзи цифры для списка (до 10, иначе просто число)
    const numberEmoji =
      ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'][index] || `${index + 1}.`;

    const setsDescription = we.sets.length > 0 ? ` • ${we.sets.length} подходов` : '';
    text += `${numberEmoji} <b>${name}</b>${setsDescription}\n`;

    // Подходы
    we.sets.forEach((set) => {
      const weightStr = set.weight
        ? ` @ ${Number(set.weight)} ${set.unit === 'LB' ? 'lb' : 'кг'}`
        : '';
      text += `    └ Подход ${set.setNumber}: ${set.reps} повт.${weightStr}\n`;
    });

    // Комментарии к упражнению
    if (we.comments && we.comments.length > 0) {
      we.comments.forEach((c) => {
        text += `    <i>💬 ${c.rawText}</i>\n`;
      });
    }
  });

  // Общие комментарии
  if (workout.comments && workout.comments.length > 0) {
    text += `\n<b>📝 Комментарии:</b>\n`;
    workout.comments.forEach((c) => {
      text += `• <i>${c.rawText}</i>\n`;
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
  return {
    date: workout.workoutDate.toISOString().split('T')[0],
    focus: workout.focus,
    location: workout.location,
    comments: workout.comments.map((c) => c.rawText),
    exercises: workout.workoutExercises.map((we) => ({
      name: we.exercise?.displayNameRu || we.exercise?.canonicalName || we.rawName || 'Упражнение',
      sets: we.sets.map((s) => ({
        reps: s.reps,
        weight: s.weight ? Number(s.weight) : null,
        unit: s.unit,
      })),
      comments: we.comments.map((c) => c.rawText),
    })),
  };
}
