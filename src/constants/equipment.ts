export const EQUIPMENT_TYPES = [
  'barbell',
  'dumbbell',
  'machine',
  'cable',
  'bodyweight',
  'kettlebell',
  'smith_machine',
  'resistance_band',
] as const;

export type Equipment = (typeof EQUIPMENT_TYPES)[number];
