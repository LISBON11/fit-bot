import { PrismaClient } from '@prisma/client';
import { createLogger } from '../logger/logger.js';

const logger = createLogger('database');

/** Singleton PrismaClient с логированием query/error событий */
let prisma: PrismaClient | null = null;

/**
 * Возвращает singleton PrismaClient.
 * Если клиент ещё не создан — создаёт и настраивает логирование.
 *
 * @returns PrismaClient instance
 */
export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
      ],
    });

    // Логирование SQL-запросов в debug
    prisma.$on('query' as never, (e: { query: string; duration: number }) => {
      logger.debug({ query: e.query, duration: e.duration }, 'Prisma query');
    });

    prisma.$on('error' as never, (e: { message: string }) => {
      logger.error({ error: e.message }, 'Prisma error');
    });
  }

  return prisma;
}

/**
 * Подключается к базе данных с retry-логикой (3 попытки, exponential backoff).
 *
 * @throws Error если не удаётся подключиться после всех попыток
 */
export async function connectDatabase(): Promise<void> {
  const client = getPrismaClient();
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await client.$connect();
      logger.info('✅ Подключение к PostgreSQL установлено');
      return;
    } catch (error: unknown) {
      logger.warn(
        { attempt, maxRetries, error: error instanceof Error ? error.message : error },
        `Попытка подключения к БД ${attempt}/${maxRetries} не удалась`,
      );

      if (attempt === maxRetries) {
        throw new Error(`Не удалось подключиться к PostgreSQL после ${maxRetries} попыток`, {
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
 * Корректно отключается от базы данных.
 */
export async function disconnectDatabase(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect();
    prisma = null;
    logger.info('🔌 Подключение к PostgreSQL закрыто');
  }
}
