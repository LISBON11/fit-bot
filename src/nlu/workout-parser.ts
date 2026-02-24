import { OpenAI } from 'openai';
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

/** Имя модели DeepSeek V3 */
const DEEPSEEK_MODEL = 'deepseek-chat';

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
 * Разбирает JSON-строку из ответа LLM и валидирует её через переданную Zod-схему.
 *
 * @param content Строка с JSON от LLM
 * @param schema Zod-схема для валидации
 * @returns Валидированный объект
 * @throws NluParseError если JSON невалиден или не соответствует схеме
 */
function parseAndValidate<T>(content: string, schema: { parse: (data: unknown) => T }): T {
  let raw: unknown;
  try {
    raw = JSON.parse(content);
  } catch {
    throw new NluParseError(`LLM вернул невалидный JSON: ${content.slice(0, 100)}`);
  }
  try {
    return schema.parse(raw);
  } catch {
    throw new NluParseError(`Ответ LLM не соответствует ожидаемой схеме`);
  }
}

/**
 * Сервис для парсинга текста в структурированные данные о тренировке с использованием DeepSeek V3.
 *
 * Использует OpenAI-совместимый API DeepSeek с JSON mode.
 */
export class WorkoutParser {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: getConfig().DEEPSEEK_API_KEY,
      baseURL: 'https://api.deepseek.com/v1',
    });
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
      logger.debug('Запуск NLU парсера (DeepSeek V3)...');

      const messages = buildParsePrompt(rawText, currentDate, knownExercises);

      const completion = await withRetry(
        () =>
          this.openai.chat.completions.create({
            model: DEEPSEEK_MODEL,
            messages,
            response_format: { type: 'json_object' },
            temperature: 0.1,
          }),
        'DeepSeek NLU Parse',
        { maxRetries: 2, baseDelayMs: 2000 },
      );

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new NluParseError('LLM вернул пустой ответ при парсинге тренировки');
      }

      const parsedData = parseAndValidate<ParsedWorkout>(content, ParsedWorkoutSchema);

      logger.info(
        { durationMs: Date.now() - start },
        'Тренировка успешно распознана с помощью NLU',
      );

      return parsedData;
    } catch (error: unknown) {
      logger.error({ err: error }, 'Ошибка NLU парсера');

      if (error instanceof NluParseError) throw error;

      if (error instanceof OpenAI.APIError) {
        throw new NluParseError(`Ошибка API DeepSeek: ${error.message}`);
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
      logger.debug('Запуск NLU парсера для редактирования (DeepSeek V3)...');

      const messages = buildEditPrompt(currentWorkoutJson, rawText, currentDate);

      const completion = await withRetry(
        () =>
          this.openai.chat.completions.create({
            model: DEEPSEEK_MODEL,
            messages,
            response_format: { type: 'json_object' },
            temperature: 0.1,
          }),
        'DeepSeek NLU Edit',
        { maxRetries: 2, baseDelayMs: 2000 },
      );

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new NluParseError('LLM вернул пустой ответ при редактировании тренировки');
      }

      const parsedData = parseAndValidate<ParsedWorkout>(content, ParsedWorkoutSchema);

      logger.info({ durationMs: Date.now() - start }, 'Изменения успешно применены с помощью NLU');

      return parsedData;
    } catch (error: unknown) {
      logger.error({ err: error }, 'Ошибка NLU парсера при редактировании');

      if (error instanceof NluParseError) throw error;

      if (error instanceof OpenAI.APIError) {
        throw new NluParseError(`Ошибка API DeepSeek: ${error.message}`);
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
          this.openai.chat.completions.create({
            model: DEEPSEEK_MODEL,
            messages,
            response_format: { type: 'json_object' },
            temperature: 0,
          }),
        'DeepSeek NLU Date Parse',
        { maxRetries: 2, baseDelayMs: 2000 },
      );

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new NluParseError('LLM вернул пустой ответ при парсинге даты');
      }

      const parsedData = parseAndValidate(content, DateParseSchema);

      if (!parsedData.date) {
        throw new NluParseError('Не удалось извлечь дату из ответа LLM');
      }

      logger.info({ parsedDate: parsedData.date }, 'Дата успешно извлечена');
      return parsedData.date;
    } catch (error) {
      logger.error({ err: error, text: rawText }, 'Ошибка при работе NLU парсера даты (DeepSeek)');
      if (error instanceof NluParseError) throw error;
      throw new NluParseError(
        `DeepSeek API Error: ${error instanceof Error ? error.message : 'Unknown'}`,
      );
    }
  }
}
