export const PRIMARY_MUSCLES = [
  'chest',
  'back',
  'shoulders',
  'arms',
  'legs',
  'core',
  'glutes',
] as const;

export type PrimaryMuscle = (typeof PRIMARY_MUSCLES)[number];
