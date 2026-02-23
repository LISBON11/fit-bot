import { createLogger } from '../logger/logger.js';

const logger = createLogger('retry');

export interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  shouldRetry?: (error: unknown) => boolean;
}

/**
 * Выполняет асинхронную функцию с механизмом повторных попыток (exponential backoff).
 * @param operation Функция для выполнения
 * @param context Строковой контекст для логгирования
 * @param options Настройки (maxRetries, baseDelayMs, custom shouldRetry)
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  context: string,
  options: RetryOptions = {},
): Promise<T> {
  const {
    maxRetries = 2,
    baseDelayMs = 1000,
    shouldRetry = (error: unknown): boolean => {
      // По умолчанию ретраим 429 (Rate Limit) и 5xx ошибки
      if (error instanceof Error && 'status' in error) {
        const status = (error as { status?: number }).status;
        return typeof status === 'number' && (status === 429 || status >= 500);
      }
      return false; // Другие ошибки пробрасываем сразу
    },
  } = options;

  let attempt = 0;

  while (true) {
    try {
      return await operation();
    } catch (error: unknown) {
      if (attempt >= maxRetries || !shouldRetry(error)) {
        throw error;
      }

      attempt++;
      // Экспоненциальная задержка: 1s, 2s, 4s...
      const delayMs = baseDelayMs * Math.pow(2, attempt - 1);

      logger.warn(
        {
          attempt,
          maxRetries,
          delayMs,
          error: error instanceof Error ? error.message : String(error),
        },
        `[${context}] Ошибка вызова внешнего API, повторяем попытку...`,
      );

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}
