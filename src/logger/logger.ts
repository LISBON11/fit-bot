import pino from 'pino';

/**
 * Конфигурация для логгера (NODE_ENV + LOG_LEVEL).
 */
interface LoggerConfig {
  LOG_LEVEL: string;
  NODE_ENV: string;
}

/**
 * Создаёт pino-логгер с настройками по окружению.
 * В development — pino-pretty с цветом, в production — JSON.
 *
 * @param config - Конфигурация уровня и окружения
 * @returns Корневой pino-логгер
 */
function buildLogger(config: LoggerConfig): pino.Logger {
  return pino({
    level: config.LOG_LEVEL,
    transport:
      config.NODE_ENV !== 'production'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
  });
}

let rootLogger: pino.Logger = buildLogger({
  LOG_LEVEL: process.env.LOG_LEVEL ?? 'info',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
});

/**
 * Инициализирует корневой логгер с конфигурацией из env.
 * Должна вызываться один раз при старте после `validateConfig()`.
 *
 * @param config - Типизированная конфигурация (LOG_LEVEL, NODE_ENV)
 */
export function setupLogger(config: LoggerConfig): void {
  rootLogger = buildLogger(config);
}

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
