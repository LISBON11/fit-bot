import { UserRepository } from '../repositories/user.repository.js';
import { UserService } from './user.service.js';
import { ExerciseRepository } from '../repositories/exercise.repository.js';
import { ExerciseService } from './exercise.service.js';
import { WorkoutRepository } from '../repositories/workout.repository.js';
import { WorkoutService } from './workout.service.js';
import { OpenAiWhisperStt } from '../stt/openai-whisper.stt.js';
import { WorkoutParser } from '../nlu/workout-parser.js';
import { getPrismaClient } from '../config/database.js';

// User module
export const userRepository = new UserRepository();
export const userService = new UserService(userRepository);

// Exercise module
export const exerciseRepository = new ExerciseRepository(getPrismaClient());
export const exerciseService = new ExerciseService(exerciseRepository);

// Workout module
export const workoutRepository = new WorkoutRepository(getPrismaClient());
export const workoutService = new WorkoutService(workoutRepository, exerciseService);

// STT module
let sttServiceInstance: OpenAiWhisperStt | null = null;
export function getSttService(): OpenAiWhisperStt {
  if (!sttServiceInstance) {
    sttServiceInstance = new OpenAiWhisperStt();
  }
  return sttServiceInstance;
}

// NLU module
let nluParserInstance: WorkoutParser | null = null;
export function getNluParser(): WorkoutParser {
  if (!nluParserInstance) {
    nluParserInstance = new WorkoutParser();
  }
  return nluParserInstance;
}
