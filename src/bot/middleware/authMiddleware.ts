import type { NextFunction } from 'grammy';
import type { CustomContext } from '../types.js';
import { userService } from '../../services/index.js';
import { logger } from '../../logger/logger.js';

const authLogger = logger.child({ module: 'AuthMiddleware' });

/**
 * Middleware для аутентификации пользователя в системе.
 * Создает пользователя в БД, если его еще нет.
 * @param ctx Контекст бота
 * @param next Функция перехода к следующему middleware
 */
export async function authMiddleware(ctx: CustomContext, next: NextFunction): Promise<void> {
  if (!ctx.from || !ctx.from.id) {
    return next();
  }

  const telegramId = ctx.from.id.toString();
  const username = ctx.from.username || null;
  const firstName = ctx.from.first_name;

  try {
    const user = await userService.getOrCreateByTelegram(telegramId, username, firstName);
    ctx.user = user;
    authLogger.debug({ userId: user.id }, 'User authenticated');
  } catch (error) {
    authLogger.error({ error, telegramId }, 'Failed to authenticate or create user');
    throw error;
  }

  await next();
}
