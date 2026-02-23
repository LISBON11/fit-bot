import { OpenAI } from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { getConfig } from '../config/env.js';
import { createLogger } from '../logger/logger.js';
import { AppError } from '../errors/app-errors.js';
import { ParsedWorkoutSchema } from './nlu.schema.js';
import { buildParsePrompt } from './prompts/workout-parse.prompt.js';
import { buildEditPrompt } from './prompts/workout-edit.prompt.js';
import { DateParseSchema, dateParseSystemPrompt } from './prompts/date-parse.prompt.js';
import type { ParsedWorkout } from './nlu.types.js';
import { withRetry } from '../utils/retry.js';

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

      // Отправляем запрос с использованием механизма Structured Outputs (с авто-ретраем)
      const completion = await withRetry(
        () =>
          this.openai.chat.completions.parse({
            model: 'gpt-4o-mini',
            messages,
            response_format: zodResponseFormat(ParsedWorkoutSchema, 'workout_data'),
            temperature: 0.1, // Низкая температура для большей детерминированности
          }),
        'OpenAI NLU Parse',
        { maxRetries: 2, baseDelayMs: 2000 },
      );

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

  /**
   * Парсит дельту (изменения) и применяет их к существующей тренировке.
   *
   * @param rawText Текст от пользователя с изменениями
   * @param currentDate Текущая дата
   * @param currentWorkoutJson JSON строка текущей тренировки
   * @returns Валидированный обновленный объект ParsedWorkout
   */
  async parseEdit(
    rawText: string,
    currentDate: string,
    currentWorkoutJson: string,
  ): Promise<ParsedWorkout> {
    try {
      const start = Date.now();
      logger.debug('Запуск NLU парсера для редактирования (OpenAI)...');

      const messages = buildEditPrompt(currentWorkoutJson, rawText, currentDate);

      const completion = await withRetry(
        () =>
          this.openai.chat.completions.parse({
            model: 'gpt-4o-mini',
            messages,
            response_format: zodResponseFormat(ParsedWorkoutSchema, 'workout_data'),
            temperature: 0.1,
          }),
        'OpenAI NLU Edit',
        { maxRetries: 2, baseDelayMs: 2000 },
      );

      const parsedData = completion.choices[0]?.message?.parsed;

      if (!parsedData) {
        throw new NluParseError(
          completion.choices[0]?.message?.refusal || 'Не удалось применить изменения к тренировке',
        );
      }

      logger.info({ durationMs: Date.now() - start }, 'Изменения успешно применены с помощью NLU');

      return parsedData as ParsedWorkout;
    } catch (error: unknown) {
      logger.error({ err: error }, 'Ошибка NLU парсера при редактировании');

      if (error instanceof OpenAI.APIError) {
        throw new NluParseError(`Ошибка API OpenAI: ${error.message}`);
      }

      const message =
        error instanceof Error
          ? error.message
          : 'Произошла непредвиденная ошибка при редактировании';
      throw new NluParseError(message);
    }
  }

  /**
   * Извлекает только дату из произвольного текста пользователя (например, для команды /edit)
   * @param rawText Текст от пользователя ("вчера", "12 марта" и т.д.)
   * @param currentDate Сегодняшняя дата (YYYY-MM-DD) для точки отсчета
   * @returns Дата в формате YYYY-MM-DD
   */
  async parseDate(rawText: string, currentDate: string): Promise<string> {
    try {
      logger.debug('Запуск NLU парсера даты...');

      const systemPrompt = dateParseSystemPrompt.replace('{{currentDate}}', currentDate);

      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: rawText },
      ];

      const completion = await withRetry(
        () =>
          this.openai.chat.completions.parse({
            model: 'gpt-4o-mini',
            messages,
            response_format: zodResponseFormat(DateParseSchema, 'date_data'),
            temperature: 0,
          }),
        'OpenAI NLU Date Parse',
        { maxRetries: 2, baseDelayMs: 2000 },
      );

      const parsedData = completion.choices[0].message.parsed;
      if (!parsedData || !parsedData.date) {
        throw new NluParseError('Не удалось извлечь дату (OpenAI вернул пустоту)');
      }

      logger.info({ parsedDate: parsedData.date }, 'Дата успешно извлечена');
      return parsedData.date;
    } catch (error) {
      logger.error({ err: error, text: rawText }, 'Ошибка при работе NLU парсера даты (OpenAI)');
      if (error instanceof NluParseError) throw error;
      throw new NluParseError(
        `OpenAI API Error: ${error instanceof Error ? error.message : 'Unknown'}`,
      );
    }
  }
}
