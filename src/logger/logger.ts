import pino from 'pino';
import { getConfig } from '../config/env.js';

/**
 * Создаёт корневой логгер pino с конфигурацией по окружению.
 * В development — pino-pretty с цветом, в production — JSON.
 *
 * @returns Корневой pino-логгер
 */
function createRootLogger(): pino.Logger {
  let config: { LOG_LEVEL: string; NODE_ENV: string };

  try {
    config = getConfig();
  } catch {
    // Конфигурация ещё не загружена — используем defaults
    config = {
      LOG_LEVEL: process.env.LOG_LEVEL ?? 'info',
      NODE_ENV: process.env.NODE_ENV ?? 'development',
    };
  }

  return pino({
    level: config.LOG_LEVEL,
    transport:
      config.NODE_ENV !== 'production'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
  });
}

const rootLogger = createRootLogger();

/**
 * Фабрика child-логгеров с контекстом модуля.
 * Создаёт дочерний логгер с полем `module` для идентификации источника.
 *
 * @param name - Имя модуля для контекста логирования
 * @returns Child-логгер pino с контекстом `{module: name}`
 *
 * @example
 * ```ts
 * const logger = createLogger('stt');
 * logger.info({ duration: 2500 }, 'STT completed');
 * // Output: {"module":"stt","duration":2500,"msg":"STT completed"}
 * ```
 */
export function createLogger(name: string): pino.Logger {
  return rootLogger.child({ module: name });
}

export { rootLogger as logger };
