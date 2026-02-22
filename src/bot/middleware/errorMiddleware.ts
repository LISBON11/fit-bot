import type { NextFunction } from 'grammy';
import type { CustomContext } from '../types.js';
import { logger } from '../../logger/logger.js';
import { AppError } from '../../errors/app-errors.js';

const errorLogger = logger.child({ module: 'ErrorMiddleware' });

export async function errorMiddleware(ctx: CustomContext, next: NextFunction) {
  try {
    await next();
  } catch (error) {
    const updateId = ctx.update.update_id;
    const userId = ctx.from?.id;

    errorLogger.error({ err: error, updateId, userId }, 'Error processing update');

    let userFriendlyMessage = '⚠️ Произошла непредвиденная ошибка, попробуй ещё раз чуть позже.';

    if (error instanceof AppError && error.isOperational) {
      userFriendlyMessage = `⚠️ ${error.message}`;
    }

    try {
      if (ctx.callbackQuery) {
        await ctx.answerCallbackQuery({ text: userFriendlyMessage, show_alert: true });
      } else if (ctx.chat) {
        await ctx.reply(userFriendlyMessage);
      }
    } catch (replyError) {
      errorLogger.error({ err: replyError, updateId }, 'Failed to send error message to user');
    }
  }
}
