import { z } from 'zod';

export const ParsedSetSchema = z
  .object({
    weight: z.number().nullable().describe('Вес отягощения в килограммах'),
    reps: z.number().nullable().describe('Количество повторений'),
    duration: z.number().nullable().describe('Продолжительность в секундах'),
    distance: z.number().nullable().describe('Дистанция в километрах'),
    rpe: z
      .number()
      .min(1)
      .max(10)
      .nullable()
      .describe('Уровень RPE (Rate of Perceived Exertion) от 1 до 10'),
  })
  .describe('Один подход упражнения');

export const ParsedCommentSchema = z
  .object({
    text: z.string().describe('Текст комментария или заметки'),
  })
  .describe('Комментарий к упражнению или тренировке в целом');

export const ParsedExerciseSchema = z
  .object({
    originalName: z.string().describe('Название упражнения так, как его произнес пользователь'),
    mappedExerciseId: z
      .string()
      .nullable()
      .describe('UUID упражнения из предоставленного списка, если удалось точно сопоставить'),
    isAmbiguous: z
      .boolean()
      .describe(
        'Устанавливается в true, если невозможно точно определить упражнение (например, "тяга" без уточнений)',
      ),
    sets: z.array(ParsedSetSchema).describe('Список выполненных подходов'),
    comments: z.array(ParsedCommentSchema).describe('Специфичные комментарии к этому упражнению'),
  })
  .describe('Одно выполненное упражнение');

export const ParsedWorkoutSchema = z
  .object({
    date: z
      .string()
      .describe(
        'Дата тренировки в формате YYYY-MM-DD. Если дата не указана явно, используй текущую.',
      ),
    focus: z
      .enum([
        'legs',
        'glutes',
        'back',
        'chest',
        'shoulders',
        'arms',
        'core',
        'fullbody',
        'cardio',
        'mixed',
      ])
      .describe('Глобальный фокус/тип тренировки'),
    exercises: z
      .array(ParsedExerciseSchema)
      .describe('Список упражнений, выполненных за тренировку'),
    generalComments: z
      .array(ParsedCommentSchema)
      .describe('Общие комментарии, не относящиеся к конкретному упражнению'),
  })
  .describe('Распознанная структура всей тренировки');

// Экспорт типов, выведенных из Zod (для проверок совместимости с nlu.types.ts)
export type ZodParsedWorkout = z.infer<typeof ParsedWorkoutSchema>;
