import type { BotError } from 'grammy';
import { Bot, session } from 'grammy';
import { conversations } from '@grammyjs/conversations';
import type { CustomContext, SessionData } from './types.js';
import { getConfig } from '../config/env.js';
import { loggingMiddleware } from './middleware/loggingMiddleware.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { handleStart, handleHelp, handleCancel } from './handlers/commandHandlers.js';
import { handleVoiceMessage } from './handlers/voiceHandler.js';
import { logger } from '../logger/logger.js';

const botLogger = logger.child({ module: 'BotInit' });

// Инициализация бота
export const bot = new Bot<CustomContext>(getConfig().BOT_TOKEN);

export function setupBot() {
  botLogger.info('Configuring bot plugins and middleware...');

  // Глобальный перехватчик ошибок
  bot.catch((err: BotError<CustomContext>) => {
    // catch gets context and error as well, but we use our middleware instead for replies.
    // This is a fallback purely for the Grammy ecosystem's unhandled errors.
    botLogger.error({ err: err.error, update: err.ctx.update }, 'Unhandled Grammy error');
  });

  // 1. Логирование обновлений
  bot.use(loggingMiddleware);

  // 2. Обработка ошибок в цепочке
  bot.use(errorMiddleware);

  // 3. Авторизация пользователя (авто-регистрация)
  bot.use(authMiddleware);

  // 4. Настройка сессий (для MVP — в памяти, позже Redis)
  bot.use(
    session({
      initial(): SessionData {
        return {};
      },
    }),
  );

  // 5. Подключение FSM плагина conversations
  bot.use(conversations());

  // 6. Регистрация базовых команд
  bot.command('start', handleStart);
  bot.command('help', handleHelp);
  bot.command('cancel', handleCancel);

  // Обработка голосовых сообщений
  bot.on('message:voice', handleVoiceMessage);

  // Остальные обработчики (текст, голос) будут добавлены в следующих шагах (2.2, 4.1)
}
