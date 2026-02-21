import { Redis } from 'ioredis';
import { createLogger } from '../logger/logger.js';
import { getConfig } from './env.js';

const logger = createLogger('redis');

/** Singleton Redis-клиент */
let redis: Redis | null = null;

/**
 * Создаёт и возвращает singleton Redis-клиент с reconnect strategy.
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
          logger.error('Превышено максимальное количество попыток подключения к Redis');
          return null; // Прекратить попытки
        }
        // Exponential backoff: 100ms, 200ms, 400ms, ..., max 30s
        const delay = Math.min(times * 100 * Math.pow(2, times - 1), 30000);
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
 * Подключается к Redis.
 * Если клиент уже подключён — ничего не делает.
 */
export async function connectRedis(): Promise<void> {
  const client = getRedisClient();

  // Проверяем подключение через PING
  try {
    await client.ping();
    logger.info('✅ Redis доступен (PING → PONG)');
  } catch (error: unknown) {
    logger.error(
      { error: error instanceof Error ? error.message : error },
      'Не удалось подключиться к Redis',
    );
    throw error;
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
