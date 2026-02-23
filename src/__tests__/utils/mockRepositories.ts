import { mockDeep, type DeepMockProxy } from 'jest-mock-extended';
import type { UserRepository } from '../../repositories/user.repository.js';
import type { ExerciseRepository } from '../../repositories/exercise.repository.js';
import type { WorkoutRepository } from '../../repositories/workout.repository.js';

export function createMockUserRepository(): DeepMockProxy<UserRepository> {
  return mockDeep<UserRepository>();
}

export function createMockExerciseRepository(): DeepMockProxy<ExerciseRepository> {
  return mockDeep<ExerciseRepository>();
}

export function createMockWorkoutRepository(): DeepMockProxy<WorkoutRepository> {
  return mockDeep<WorkoutRepository>();
}
