/**
 * Точка входа приложения FitBot.
 *
 * Порядок инициализации:
 * 1. validateConfig → 2. createLogger → 3. connectDatabase → 4. connectRedis → 5. FitBot started
 */

import { validateConfig } from './config/env.js';
import { createLogger } from './logger/logger.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { connectRedis, disconnectRedis } from './config/redis.js';

const logger = createLogger('main');

/**
 * Главная функция приложения.
 * Инициализирует все компоненты и запускает бот.
 */
async function main(): Promise<void> {
  // 1. Валидация конфигурации
  const config = validateConfig();
  logger.info({ env: config.NODE_ENV, logLevel: config.LOG_LEVEL }, '⚙️ Конфигурация загружена');

  // 2. Подключение к БД
  await connectDatabase();

  // 3. Подключение к Redis
  await connectRedis();

  // TODO: создать и запустить бот

  logger.info('✅ FitBot успешно запущен');
}

/**
 * Обработчик graceful shutdown.
 * Корректно завершает все подключения перед выходом.
 *
 * @param signal - Полученный сигнал (SIGINT или SIGTERM)
 */
async function shutdown(signal: string): Promise<void> {
  logger.info({ signal }, '🛑 Получен сигнал завершения, останавливаю...');

  try {
    // TODO: bot.stop()
    await disconnectRedis();
    await disconnectDatabase();
    logger.info('👋 FitBot остановлен');
  } catch (error: unknown) {
    logger.error({ error }, '❌ Ошибка при завершении');
  }

  process.exit(0);
}

// Регистрация обработчиков сигналов
process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));

// Запуск приложения
main().catch((error: unknown) => {
  logger.error({ error }, '❌ Критическая ошибка при запуске FitBot');
  process.exit(1);
});
