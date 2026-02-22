import { UserRepository } from '../repositories/user.repository.js';
import { UserService } from './user.service.js';
import { OpenAiWhisperStt } from '../stt/openai-whisper.stt.js';
import { WorkoutParser } from '../nlu/workout-parser.js';

// User module
export const userRepository = new UserRepository();
export const userService = new UserService(userRepository);

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
