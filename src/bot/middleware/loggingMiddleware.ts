import type { NextFunction } from 'grammy';
import type { CustomContext } from '../types.js';
import { logger } from '../../logger/logger.js';

const updateLogger = logger.child({ module: 'BotUpdate' });

/**
 * Middleware для логирования каждого входящего апдейта в бота.
 * Замеряет время обработки запроса.
 * @param ctx Контекст бота
 * @param next Функция перехода к следующему middleware
 */
export async function loggingMiddleware(ctx: CustomContext, next: NextFunction): Promise<void> {
  const start = Date.now();

  // Identify the type of update
  const updateType = Object.keys(ctx.update).filter((k) => k !== 'update_id')[0] || 'unknown';
  const userId = ctx.from?.id;
  const updateId = ctx.update.update_id;

  updateLogger.debug({ updateId, userId, updateType }, 'Received update');

  await next();

  const ms = Date.now() - start;
  updateLogger.info({ updateId, userId, updateType, durationMs: ms }, 'Processed update');
}
