export const WORKOUT_FOCUSES = [
  'chest',
  'back',
  'shoulders',
  'biceps',
  'triceps',
  'core',
  'quadriceps',
  'hamstrings',
  'glutes',
  'calves',
  'cardio',
] as const;

export type WorkoutFocus = (typeof WORKOUT_FOCUSES)[number];
