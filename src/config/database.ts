import { PrismaClient } from '../generated/prisma/index.js';
import { createLogger } from '../logger/logger.js';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const logger = createLogger('database');

/**
 * Возвращаемый тип PrismaClient с расширением для логирования.
 * Используется `$extends`, чтобы сохранить type safety (без `as never`).
 */
type PrismaClientWithLogging = ReturnType<typeof createPrismaClientWithLogging>;

/**
 * Создаёт PrismaClient с middleware-логированием через `$extends`.
 * Логирует каждый запрос (model, operation, duration) на уровне debug.
 *
 * @returns PrismaClient, расширенный query middleware
 */
function createPrismaClientWithLogging(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  const client = new PrismaClient({
    adapter,
    log: [
      { emit: 'stdout', level: 'error' },
      { emit: 'stdout', level: 'warn' },
    ],
  });

  return client.$extends({
    query: {
      async $allOperations({
        operation,
        model,
        args,
        query,
      }: {
        operation: string;
        model?: string;
        args: unknown;
        query: (args: unknown) => Promise<unknown>;
      }) {
        const start = Date.now();
        try {
          const result = await query(args);
          logger.debug(
            { model, operation, durationMs: Date.now() - start },
            'Prisma query выполнен',
          );
          return result;
        } catch (error: unknown) {
          logger.error(
            { model, operation, durationMs: Date.now() - start, error },
            'Ошибка Prisma query',
          );
          throw error;
        }
      },
    },
  }) as unknown as PrismaClient;
}

/** Singleton PrismaClient с middleware-логированием */
let prisma: PrismaClientWithLogging | null = null;

/**
 * Возвращает singleton PrismaClient с query-логированием.
 * Если клиент ещё не создан — инициализирует его.
 *
 * @returns PrismaClient instance
 */
export function getPrismaClient(): PrismaClientWithLogging {
  if (!prisma) {
    prisma = createPrismaClientWithLogging();
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
