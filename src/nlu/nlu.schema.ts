import { z } from 'zod';

import { MUSCLE_GROUPS } from '../constants/muscleGroups.js';
import { MOVEMENT_PATTERNS } from '../constants/movementPatterns.js';
import { EQUIPMENT_TYPES } from '../constants/equipment.js';

/**
 * Zod схема для одного подхода упражнения
 */
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

/**
 * Zod схема для комментария к упражнению или тренировке
 */
export const ParsedCommentSchema = z
  .object({
    text: z.string().describe('Текст комментария или заметки'),
  })
  .describe('Комментарий к упражнению или тренировке в целом');

/**
 * Zod схема для одного распознанного упражнения
 */
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
    movementPattern: z
      .enum(MOVEMENT_PATTERNS as unknown as [string, ...string[]])
      .nullable()
      .optional()
      .describe('Паттерн движения упражнения, если его можно определить'),
    equipment: z
      .enum(EQUIPMENT_TYPES as unknown as [string, ...string[]])
      .nullable()
      .optional()
      .describe('Оборудование (только если явно указано)'),
    primaryMuscle: z
      .enum(MUSCLE_GROUPS as unknown as [string, ...string[]])
      .nullable()
      .optional()
      .describe('Основная работающая группа мышц'),
    sets: z.array(ParsedSetSchema).describe('Список выполненных подходов'),
    comments: z.array(ParsedCommentSchema).describe('Специфичные комментарии к этому упражнению'),
  })
  .describe('Одно выполненное упражнение');

/**
 * Zod схема для всей распознанной тренировки
 */
export const ParsedWorkoutSchema = z
  .object({
    date: z
      .string()
      .describe(
        'Дата тренировки в формате YYYY-MM-DD. Если дата не указана явно, используй текущую.',
      ),
    location: z
      .string()
      .nullable()
      .optional()
      .describe(
        'Место проведения тренировки (например, город, название тренажерного зала, "дома", "улица"). Может содержать любую комбинацию: "Алушта, дома", "Севастополь, зал Триумф", просто "дома" или просто название города. Если не указано или не удалось определить, возвращайте null.',
      ),
    focus: z
      .array(z.enum(MUSCLE_GROUPS as unknown as [string, ...string[]]))
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
/**
 * Тип распознанной тренировки, выведенный из Zod схемы
 */
export type ZodParsedWorkout = z.infer<typeof ParsedWorkoutSchema>;
