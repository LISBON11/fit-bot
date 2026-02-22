import { Redis } from 'ioredis';
import { createLogger } from '../logger/logger.js';
import { getConfig } from './env.js';

const logger = createLogger('redis');

/** Singleton Redis-клиент */
let redis: Redis | null = null;

/**
 * Создаёт и возвращает singleton Redis-клиент с reconnect strategy.
 * Использует стандартный exponential backoff: 1s, 2s, 4s, ..., max 30s.
 *
 * @returns Redis instance
 */
export function getRedisClient(): Redis {
  if (!redis) {
    const config = getConfig();

    redis = new Redis(config.REDIS_URL, {
      maxRetriesPerRequest: null,
      retryStrategy: (times: number): number | null => {
        if (times > 10) {
          logger.error(
            { attempts: times },
            'Превышено максимальное количество попыток подключения к Redis',
          );
          return null; // Прекратить попытки
        }
        // Стандартный exponential backoff: 1s, 2s, 4s, 8s, 16s, 30s (max)
        const delay = Math.min(1000 * Math.pow(2, times - 1), 30000);
        logger.warn({ attempt: times, nextRetryMs: delay }, 'Переподключение к Redis...');
        return delay;
      },
    });

    redis.on('connect', () => {
      logger.info('✅ Подключение к Redis установлено');
    });

    redis.on('error', (error: Error) => {
      logger.error({ error: error.message }, 'Ошибка Redis');
    });

    redis.on('close', () => {
      logger.info('🔌 Подключение к Redis закрыто');
    });
  }

  return redis;
}

/**
 * Подключается к Redis с retry-логикой (3 попытки, exponential backoff).
 * Проверяет доступность через PING.
 *
 * @throws Error если не удалось подключиться после всех попыток
 */
export async function connectRedis(): Promise<void> {
  const client = getRedisClient();
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await client.ping();
      logger.info('✅ Redis доступен (PING → PONG)');
      return;
    } catch (error: unknown) {
      logger.warn(
        { attempt, maxRetries, error: error instanceof Error ? error.message : error },
        `Попытка подключения к Redis ${attempt}/${maxRetries} не удалась`,
      );

      if (attempt === maxRetries) {
        throw new Error(`Не удалось подключиться к Redis после ${maxRetries} попыток`, {
          cause: error,
        });
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt - 1) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

/**
 * Корректно отключается от Redis.
 */
export async function disconnectRedis(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
    logger.info('🔌 Redis отключён');
  }
}
