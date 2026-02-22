/**
 * Точка входа приложения FitBot.
 *
 * Порядок инициализации:
 * 1. validateConfig → 2. createLogger → 3. connectDatabase → 4. connectRedis → 5. bot.start
 *
 * Обработчики сигналов (SIGINT, SIGTERM, uncaughtException, unhandledRejection)
 * регистрируются ДО запуска бота для гарантированного graceful shutdown.
 */

import { validateConfig } from './config/env.js';
import { createLogger, setupLogger } from './logger/logger.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { connectRedis, disconnectRedis } from './config/redis.js';
import { createBot } from './bot/bot.js';
import type { Bot } from 'grammy';
import type { CustomContext } from './bot/types.js';

const config = validateConfig();

// Инициализация логгера с реальной конфигурацией (уровень + окружение)
setupLogger(config);

const mainLogger = createLogger('main');

let bot: Bot<CustomContext> | undefined;

/**
 * Выполняет graceful shutdown: останавливает бота и закрывает соединения.
 *
 * @param signal - Название сигнала или события, инициировавшего остановку
 */
async function gracefulShutdown(signal: string): Promise<void> {
  mainLogger.info(`${signal} получен: завершение работы...`);
  try {
    if (bot) {
      await bot.stop();
    }
    await disconnectRedis();
    await disconnectDatabase();
    mainLogger.info('✅ FitBot остановлен корректно');
  } catch (error: unknown) {
    mainLogger.error({ error }, '❌ Ошибка при остановке FitBot');
  } finally {
    process.exit(0);
  }
}

/**
 * Главная функция приложения.
 * Инициализирует все компоненты и запускает бот.
 */
async function main(): Promise<void> {
  mainLogger.info(
    { env: config.NODE_ENV, logLevel: config.LOG_LEVEL },
    '⚙️ Конфигурация загружена',
  );

  // 1. Подключение к БД
  await connectDatabase();

  // 2. Подключение к Redis
  await connectRedis();

  // 3. Регистрируем обработчики сигналов ДО запуска бота
  process.on('SIGINT', () => void gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => void gracefulShutdown('SIGTERM'));
  process.on('uncaughtException', (error: Error) => {
    mainLogger.fatal({ error }, 'Необработанное исключение (uncaughtException)');
    void gracefulShutdown('uncaughtException');
  });
  process.on('unhandledRejection', (reason: unknown) => {
    mainLogger.fatal({ reason }, 'Необработанный Promise rejection (unhandledRejection)');
    void gracefulShutdown('unhandledRejection');
  });

  // 4. Настройка и запуск бота
  bot = createBot(config.BOT_TOKEN);
  await bot.start({
    onStart: (botInfo): void => {
      mainLogger.info({ username: botInfo.username }, '✅ FitBot запущен успешно');
    },
  });
}

// Запуск приложения
main().catch((error: unknown) => {
  mainLogger.error({ error }, '❌ Критическая ошибка при запуске FitBot');
  process.exit(1);
});
