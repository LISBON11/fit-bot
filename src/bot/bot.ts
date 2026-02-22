import type { BotError } from 'grammy';
import { Bot, session } from 'grammy';
import { conversations, createConversation } from '@grammyjs/conversations';
import type { CustomContext, SessionData } from './types.js';
import { loggingMiddleware } from './middleware/loggingMiddleware.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { handleStart, handleHelp, handleCancel } from './handlers/commandHandlers.js';
import { handleTextMessage } from './handlers/textHandler.js';
import { newWorkout } from './conversations/newWorkout.js';
import { editWorkout } from './conversations/editWorkout.js';
import { logger } from '../logger/logger.js';

const botLogger = logger.child({ module: 'BotInit' });

/**
 * Создает инстанс Telegram-бота, регистрирует middleware и обработчики
 * @param token Токен Telegram бота
 * @returns Настроенный экземпляр бота
 */
export function createBot(token: string): Bot<CustomContext> {
  botLogger.info('Configuring bot plugins and middleware...');

  const bot = new Bot<CustomContext>(token);

  // Глобальный перехватчик ошибок
  bot.catch((err: BotError<CustomContext>) => {
    botLogger.error({ err: err.error, update: err.ctx.update }, 'Unhandled Grammy error');
  });

  bot.use(loggingMiddleware);
  bot.use(errorMiddleware);
  bot.use(authMiddleware);

  bot.use(
    session({
      initial(): SessionData {
        return {};
      },
    }),
  );

  bot.use(conversations());
  bot.use(createConversation<CustomContext, CustomContext>(newWorkout));
  bot.use(createConversation<CustomContext, CustomContext>(editWorkout));

  bot.command('start', handleStart);
  bot.command('help', handleHelp);
  bot.command('cancel', handleCancel);
  bot.command('edit', async (ctx) => {
    await ctx.conversation.enter('editWorkout');
  });

  // Обработка текстовых и голосовых сообщений, передающих управление в NLU/conversations
  bot.on('message:voice', async (ctx) => {
    await ctx.conversation.enter('newWorkout');
  });

  bot.on('message:text', handleTextMessage);

  return bot;
}
