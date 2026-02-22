import type { Context, SessionFlavor } from 'grammy';
import type { ConversationFlavor } from '@grammyjs/conversations';
import type { User } from '@prisma/client';

export interface SessionData {
  conversationState?: string;
  currentDraftId?: string;
  disambiguation?: any;
}

export type CustomContext = Context &
  SessionFlavor<SessionData> &
  ConversationFlavor<Context> & {
    user?: User; // Будет заполняться в authMiddleware
  };
