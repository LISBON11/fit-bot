import type { BotError } from 'grammy';
import { Bot, session } from 'grammy';
import { RedisAdapter } from '@grammyjs/storage-redis';
import { conversations, createConversation } from '@grammyjs/conversations';
import type { CustomContext, SessionData } from './types.js';
import { loggingMiddleware } from './middleware/loggingMiddleware.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { handleStart, handleHelp, handleCancel } from './handlers/commandHandlers.js';
import { handleCancelWorkoutCallback } from './handlers/callbackHandlers.js';
import { newWorkout } from './conversations/newWorkout.js';
import { editWorkout } from './conversations/editWorkout.js';
import { logger } from '../logger/logger.js';
import { getRedisClient } from '../config/redis.js';
import { CANCEL_WORKOUT_CALLBACK } from './utils/progressTracker.js';
import { enterWithLock } from './utils/conversationHelpers.js';

const botLogger = logger.child({ module: 'BotInit' });

/**
 * Создает инстанс Telegram-бота, регистрирует middleware и обработчики
 * @param token Токен Telegram бота
 * @returns Настроенный экземпляр бота
 */
export function createBot(token: string): Bot<CustomContext> {
  botLogger.info('Инициализация бота...');

  const bot = new Bot<CustomContext>(token);

  // Глобальный перехватчик ошибок
  bot.catch((err: BotError<CustomContext>) => {
    botLogger.error({ err: err.error, update: err.ctx.update }, 'Необработанная ошибка Grammy');
  });

  // 1. Базовая цепочка middleware
  bot.use(loggingMiddleware);
  bot.use(errorMiddleware);
  bot.use(authMiddleware);

  // 2. Сессии хранятся в Redis (переживают перезапуск, TTL 24 часа)
  const redisClient = getRedisClient();
  const storage = new RedisAdapter<SessionData>({
    instance: redisClient,
    ttl: 86400,
  });

  bot.use(
    session({
      initial(): SessionData {
        return {};
      },
      storage,
    }),
  );

  // 3. Bypass Middleware: Глобальная отмена создания тренировки.
  // Регистрируется ДО conversations(), чтобы работать мгновенно (ADR-013).
  bot.callbackQuery(CANCEL_WORKOUT_CALLBACK, handleCancelWorkoutCallback);

  // 4. Плагин диалогов
  bot.use(conversations());
  bot.use(createConversation<CustomContext, CustomContext>(newWorkout));
  bot.use(createConversation<CustomContext, CustomContext>(editWorkout));

  // 5. Команды
  bot.command('start', handleStart);
  bot.command('help', handleHelp);
  bot.command('cancel', handleCancel);

  bot.command('edit', async (ctx) => {
    await enterWithLock({ ctx, conversationName: 'editWorkout' });
  });

  // 6. Обработка входящих сообщений (Голос/Текст)
  bot.on('message:voice', async (ctx) => {
    await enterWithLock({
      ctx,
      conversationName: 'newWorkout',
      errorMessage:
        '⏳ Пожалуйста, подождите, я всё ещё обрабатываю ваше предыдущее голосовое сообщение.',
    });
  });

  bot.on('message:text', async (ctx, next) => {
    // Команды уже обработаны выше, пропускаем их
    if (ctx.message.text.startsWith('/')) {
      return next();
    }
    await enterWithLock({ ctx, conversationName: 'newWorkout' });
  });

  // 7. Обработка устаревших или неизвестных callback_query
  bot.on('callback_query', async (ctx) => {
    botLogger.warn(
      { data: ctx.callbackQuery.data, userId: ctx.from?.id },
      'Получен неизвестный или устаревший callback_query',
    );

    await ctx
      .answerCallbackQuery({
        text: '⚠️ Действие устарело или сессия завершена.',
        show_alert: true,
      })
      .catch(() => {});

    if (ctx.callbackQuery.message) {
      // Удаляем кнопки у старого сообщения
      await ctx.editMessageReplyMarkup({ reply_markup: { inline_keyboard: [] } }).catch(() => {});
    }
  });

  botLogger.info('Бот готов к работе 🚀');
  return bot;
}
