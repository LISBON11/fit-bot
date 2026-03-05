export const MOVEMENT_PATTERNS = [
  'push',
  'pull',
  'squat',
  'hinge',
  'lunge',
  'carry',
  'rotation',
  'core',
] as const;

export type MovementPattern = (typeof MOVEMENT_PATTERNS)[number];
