import type { Context, SessionFlavor } from 'grammy';
import type { ConversationFlavor } from '@grammyjs/conversations';
import type { User } from '@prisma/client';

/**
 * Описание данных сессии бота
 */
export interface SessionData {
  conversationState?: string;
  currentDraftId?: string;
  disambiguation?: unknown;
  isProcessing?: boolean;
}

/**
 * Расширенный контекст grammY бота
 */
export type CustomContext = Context &
  SessionFlavor<SessionData> &
  ConversationFlavor<Context> & {
    user?: User; // Будет заполняться в authMiddleware
  };
