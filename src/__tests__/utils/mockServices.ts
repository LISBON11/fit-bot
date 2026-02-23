import { mockDeep, type DeepMockProxy } from 'jest-mock-extended';
import type { ExerciseService } from '../../services/exercise.service.js';
import type { WorkoutService } from '../../services/workout.service.js';

export function createMockExerciseService(): DeepMockProxy<ExerciseService> {
  return mockDeep<ExerciseService>();
}

export function createMockWorkoutService(): DeepMockProxy<WorkoutService> {
  return mockDeep<WorkoutService>();
}
