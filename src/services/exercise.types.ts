import type { Exercise } from '../generated/prisma/index.js';

/**
 * Результат разрешения названия упражнения
 */
export type ResolveResult =
  | { status: 'resolved'; exercise: Exercise }
  | { status: 'ambiguous'; options: Exercise[] }
  | { status: 'not_found' };

/**
 * Представление упражнения для передачи в NLU-сервис.
 * Поля `id` и `aliases` нужны для маппинга в промпте — DeepSeek выставляет `mappedExerciseId`
 * при корректном совпадении (в том числе при опечатках).
 */
export interface ExerciseForNlu {
  /** UUID упражнения в БД */
  id: string;
  canonicalName: string;
  displayNameRu: string | null;
  /** Синонимы упражнения для fuzzy-маппинга */
  aliases: string[];
}
