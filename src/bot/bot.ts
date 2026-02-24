import type { BotError } from 'grammy';
import { Bot, session } from 'grammy';
import { RedisAdapter } from '@grammyjs/storage-redis';
import { conversations, createConversation } from '@grammyjs/conversations';
import type { CustomContext, SessionData } from './types.js';
import { loggingMiddleware } from './middleware/loggingMiddleware.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { handleStart, handleHelp, handleCancel } from './handlers/commandHandlers.js';
import { newWorkout } from './conversations/newWorkout.js';
import { editWorkout } from './conversations/editWorkout.js';
import { logger } from '../logger/logger.js';
import { getRedisClient } from '../config/redis.js';
import { lockUser, unlockUser } from './utils/processingLock.js';

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

  // Сессии хранятся в Redis: переживают перезапуск бота, автоочистка через 24 часа.
  const redisClient = getRedisClient();
  const storage = new RedisAdapter<SessionData>({
    instance: redisClient,
    ttl: 86400, // 24 часа в секундах
  });

  bot.use(
    session({
      initial(): SessionData {
        return {};
      },
      storage,
    }),
  );

  bot.use(conversations());
  bot.use(createConversation<CustomContext, CustomContext>(newWorkout));
  bot.use(createConversation<CustomContext, CustomContext>(editWorkout));

  bot.command('start', handleStart);
  bot.command('help', handleHelp);
  bot.command('cancel', handleCancel);
  bot.command('edit', async (ctx) => {
    if (!ctx.from) return;
    if (!(await lockUser(ctx.from.id))) {
      await ctx.reply('⏳ Пожалуйста, подождите, я ещё обрабатываю ваш предыдущий запрос.');
      return;
    }
    try {
      await ctx.conversation.enter('editWorkout');
    } finally {
      await unlockUser(ctx.from.id);
    }
  });

  // Обработка текстовых и голосовых сообщений, передающих управление в NLU/conversations
  bot.on('message:voice', async (ctx) => {
    if (!ctx.from) return;
    if (!(await lockUser(ctx.from.id))) {
      await ctx.reply('⏳ Пожалуйста, подождите, я ещё обрабатываю ваше предыдущее сообщение.');
      return;
    }
    try {
      await ctx.conversation.enter('newWorkout');
    } finally {
      await unlockUser(ctx.from.id);
    }
  });

  bot.on('message:text', async (ctx, next) => {
    if (ctx.message.text.startsWith('/')) {
      return next();
    }
    if (!ctx.from) return;
    if (!(await lockUser(ctx.from.id))) {
      await ctx.reply('⏳ Пожалуйста, подождите, я ещё обрабатываю ваш предыдущий запрос.');
      return;
    }
    try {
      await ctx.conversation.enter('newWorkout');
    } finally {
      await unlockUser(ctx.from.id);
    }
  });

  // Глобальный перехватчик для неожидаемых/устаревших callback_query
  // (например, если сессия (conversation) удалилась, а юзер нажал на кнопку "Approve")
  bot.on('callback_query', async (ctx) => {
    botLogger.warn(
      { data: ctx.callbackQuery.data },
      'Получен неизвестный или устаревший callback_query',
    );
    await ctx.answerCallbackQuery({
      text: '⚠️ Действие устарело или сессия завершена.',
      show_alert: true,
    });
    if (ctx.callbackQuery.message) {
      // Удаляем кнопки у старого сообщения
      await ctx.editMessageReplyMarkup({ reply_markup: { inline_keyboard: [] } }).catch(() => {});
    }
  });

  return bot;
}
