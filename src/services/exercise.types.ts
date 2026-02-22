import type { Exercise } from '@prisma/client';

/**
 * Результат разрешения названия упражнения
 */
export type ResolveResult =
  | { status: 'resolved'; exercise: Exercise }
  | { status: 'ambiguous'; options: Exercise[] }
  | { status: 'not_found' };

/**
 * Представление упражнения для передачи в NLU-сервис
 */
export interface ExerciseForNlu {
  canonicalName: string;
  displayNameRu: string | null;
}
