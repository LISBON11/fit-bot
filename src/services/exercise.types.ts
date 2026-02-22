import type { Exercise } from '@prisma/client';

export type ResolveResult =
  | { status: 'resolved'; exercise: Exercise }
  | { status: 'ambiguous'; options: Exercise[] }
  | { status: 'not_found' };

export interface ExerciseForNlu {
  canonicalName: string;
  displayNameRu: string | null;
}
