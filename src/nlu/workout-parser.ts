import { OpenAI } from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { getConfig } from '../config/env.js';
import { createLogger } from '../logger/logger.js';
import { AppError } from '../errors/app-errors.js';
import { ParsedWorkoutSchema } from './nlu.schema.js';
import { buildParsePrompt } from './prompts/workout-parse.prompt.js';
import type { ParsedWorkout } from './nlu.types.js';

const logger = createLogger('nlu');

/**
 * Ошибка парсинга NLU
 */
export class NluParseError extends AppError {
  constructor(message: string, isOperational = true) {
    super(message, 400, isOperational);
    this.name = 'NluParseError';
  }
}

/**
 * Сервис для парсинга текста в структурированные данные о тренировке с использованием LLM
 */
export class WorkoutParser {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: getConfig().OPENAI_API_KEY });
  }

  /**
   * Парсит естественный язык в JSON структуру тренировки.
   *
   * @param rawText Текст от пользователя (напрямую или из голосового сообщения)
   * @param currentDate Текущая дата в формате YYYY-MM-DD для относительных дат ("вчера", "сегодня").
   * @param knownExercises Список упражнений юзера, чтобы LLM могла маппить сразу по ID (Опционально).
   * @returns Валидированный объект ParsedWorkout
   * @throws NluParseError в случае ошибки парсинга или недоступности API
   */
  async parse(
    rawText: string,
    currentDate: string,
    knownExercises: { id: string; name: string; aliases: string[] }[] = [],
  ): Promise<ParsedWorkout> {
    try {
      const start = Date.now();
      logger.debug('Запуск NLU парсера (OpenAI)...');

      // Формируем сообщения с инструкциями для модели
      const messages = buildParsePrompt(rawText, currentDate, knownExercises);

      // Отправляем запрос с использованием механизма Structured Outputs
      const completion = await this.openai.chat.completions.parse({
        model: 'gpt-4o-mini',
        messages,
        response_format: zodResponseFormat(ParsedWorkoutSchema, 'workout_data'),
        temperature: 0.1, // Низкая температура для большей детерминированности
      });

      const parsedData = completion.choices[0]?.message?.parsed;

      // Если модель отказалась отвечать по формату или произошла иная ошибка при парсинге
      if (!parsedData) {
        throw new NluParseError(
          completion.choices[0]?.message?.refusal || 'Не удалось распознать тренировку из текста',
        );
      }

      logger.info(
        { durationMs: Date.now() - start },
        'Тренировка успешно распознана с помощью NLU',
      );

      // Возвращаем строго типизированный объект, прошедший валидацию Zod в SDK OpenAI
      return parsedData as ParsedWorkout;
    } catch (error: unknown) {
      logger.error({ err: error }, 'Ошибка NLU парсера');

      // OpenAI-specific ошибки
      if (error instanceof OpenAI.APIError) {
        throw new NluParseError(`Ошибка API OpenAI: ${error.message}`);
      }

      const message =
        error instanceof Error
          ? error.message
          : 'Произошла непредвиденная ошибка при распознавании';
      throw new NluParseError(message);
    }
  }
}
