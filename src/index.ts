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
import type { UserFromGetMe } from 'grammy/types';
import { bot, setupBot } from './bot/bot.js';

const config = validateConfig();

const mainLogger = createLogger('main');

/**
 * Главная функция приложения.
 * Инициализирует все компоненты и запускает бот.
 */
async function main(): Promise<void> {
  // 1. Валидация конфигурации
  mainLogger.info(
    { env: config.NODE_ENV, logLevel: config.LOG_LEVEL },
    '⚙️ Конфигурация загружена',
  );

  // 2. Подключение к БД
  await connectDatabase();

  // 3. Подключение к Redis
  await connectRedis();

  // 4. Setup and start the bot
  setupBot();
  bot.start({
    onStart: (botInfo: UserFromGetMe): void => {
      mainLogger.info({ username: botInfo.username }, '✅ FitBot started successfully');
    },
  });

  const gracefulShutdown = async (signal: string): Promise<void> => {
    mainLogger.info(`${signal} signal received: closing connections`);
    await bot.stop();
    await disconnectRedis();
    await disconnectDatabase();
    process.exit(0);
  };

  // Регистрация обработчиков сигналов
  process.on('SIGINT', () => void gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => void gracefulShutdown('SIGTERM'));
}

// Запуск приложения
main().catch((error: unknown) => {
  mainLogger.error({ error }, '❌ Критическая ошибка при запуске FitBot');
  process.exit(1);
});
