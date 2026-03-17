import type { CustomContext } from '../types.js';
import { logger } from '../../logger/logger.js';
import { getUserContext, clearUserContext } from './userContext.js';
import { unlockUser } from './processingLock.js';
import { workoutService } from '../../services/index.js';

const flowLogger = logger.child({ module: 'CancelFlow' });

/**
 * Параметры для функции отмены создания тренировки.
 */
interface CancelWorkoutFlowParams {
  /** Контекст grammY */
  ctx: CustomContext;
  /** ID пользователя Telegram */
  userId: number;
}

/**
 * Унифицированная логика отмены процесса создания/редактирования тренировки.
 * Выполняет:
 * 1. Обновление UI (статус-сообщение или ответное сообщение).
 * 2. Завершение активного диалога (conversation).
 * 3. Удаление черновика из БД и связанных сообщений в Telegram.
 * 4. Очистку контекста в Redis.
 * 5. Снятие блокировки пользователя.
 *
 * @param params Параметры отмены
 */
export async function cancelWorkoutFlow({ ctx, userId }: CancelWorkoutFlowParams): Promise<void> {
  flowLogger.info({ userId }, 'Запуск процесса отмены тренировки');

  // 1. Получаем контекст пользователя из Redis
  const userContext = await getUserContext(userId).catch((err: unknown) => {
    flowLogger.warn({ err, userId }, 'Не удалось получить контекст пользователя для отмены');
    return {};
  });

  // 2. Информируем пользователя (Optimistic UI)
  const statusMsg =
    'activeStatusMessage' in userContext ? userContext.activeStatusMessage : undefined;

  try {
    if (statusMsg) {
      // Редактируем статус-сообщение (голосовой сценарий)
      await ctx.api.editMessageText(statusMsg.chatId, statusMsg.messageId, '❌ Отмена...', {
        reply_markup: { inline_keyboard: [] },
      });
    } else {
      // Текстовый сценарий или просто команда /cancel
      await ctx.reply('❌ Отмена...');
    }
  } catch (err: unknown) {
    flowLogger.warn({ err, userId }, 'Не удалось обновить статус-сообщение при отмене');
  }

  // 3. Завершаем conversation
  if (ctx.conversation) {
    try {
      // Пытаемся выйти из всех возможных диалогов
      await ctx.conversation.exit('newWorkout');
      await ctx.conversation.exit('editWorkout');
    } catch (err: unknown) {
      flowLogger.warn({ err, userId }, 'Ошибка при выходе из conversation');
    }
  }

  // Всегда очищаем состояние разговора в сессии grammY
  if (ctx.session) {
    ctx.session.conversation = {};
  }

  // 4. Удаляем черновик и превью
  const draftId = 'currentDraftId' in userContext ? userContext.currentDraftId : undefined;
  if (draftId) {
    try {
      const draft = await workoutService.findById(draftId);
      const chatId = ctx.chat?.id || statusMsg?.chatId;

      if (draft?.previewMessageId && chatId) {
        await ctx.api.deleteMessage(chatId, draft.previewMessageId).catch((err: unknown) => {
          flowLogger.warn(
            { err, previewMessageId: draft.previewMessageId },
            'Не удалось удалить сообщение превью',
          );
        });
      }

      await workoutService.cancelDraft(draftId);
      flowLogger.info({ userId, draftId }, 'Черновик тренировки удален');
    } catch (err: unknown) {
      flowLogger.warn({ err, draftId, userId }, 'Ошибка при удалении черновика');
    }
  }

  // 5. Очищаем Redis-контекст и блокировку
  await clearUserContext(userId).catch((err: unknown) => {
    flowLogger.warn({ err, userId }, 'Не удалось очистить контекст пользователя');
  });

  await unlockUser(userId).catch((err: unknown) => {
    flowLogger.warn({ err, userId }, 'Не удалось снять блокировку пользователя');
  });

  flowLogger.info({ userId }, 'Процесс отмены успешно завершен');
}
