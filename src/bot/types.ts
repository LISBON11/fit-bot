import type { Context, SessionFlavor } from 'grammy';
import type { ConversationFlavor } from '@grammyjs/conversations';
import type { User } from '../generated/prisma/index.js';

/**
 * Координаты активного статус-сообщения (ProgressTracker).
 * Используются внешним обработчиком cancel_workout_creation для мгновенного
 * редактирования сообщения без ожидания завершения conversation.
 */
export interface ActiveStatusMessage {
  chatId: number;
  messageId: number;
}

/**
 * Описание данных сессии бота.
 * Поле `conversation` управляется плагином `@grammyjs/conversations` и очищается
 * глобальным обработчиком отмены в bot.ts.
 */
export interface SessionData {
  conversationState?: string;
  disambiguation?: unknown;
  isProcessing?: boolean;
  /** Внутреннее состояние плагина conversations. Очищается при отмене тренировки. */
  conversation?: Record<string, unknown>;
}

/**
 * Расширенный контекст grammY бота
 */
export type CustomContext = Context &
  SessionFlavor<SessionData> &
  ConversationFlavor<Context> & {
    user?: User; // Будет заполняться в authMiddleware
  };
