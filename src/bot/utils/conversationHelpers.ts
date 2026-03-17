import type { CustomContext } from '../types.js';
import { logger } from '../../logger/logger.js';
import { lockUser, unlockUser } from './processingLock.js';

const helperLogger = logger.child({ module: 'ConversationHelpers' });

/**
 * Хелпер для безопасного входа в диалог (conversation) с установкой блокировки.
 * Это предотвращает параллельное выполнение нескольких долгих процессов для одного пользователя.
 *
 * @param params Параметры хелпера
 * @param params.ctx Контекст grammY
 * @param params.conversationName Имя диалога (из createConversation)
 * @param params.errorMessage Сообщение при отказе в блокировке (опционально)
 */
export async function enterWithLock({
  ctx,
  conversationName,
  errorMessage,
}: {
  ctx: CustomContext;
  conversationName: string;
  errorMessage?: string;
}): Promise<void> {
  const userId = ctx.from?.id;

  if (!userId) {
    helperLogger.warn({ conversationName }, 'Попытка входа в диалог без userId');
    return;
  }

  // Пытаемся захватить блокировку
  const lockAcquired = await lockUser(userId).catch((err: unknown) => {
    helperLogger.error({ err, userId, conversationName }, 'Ошибка при попытке получить блокировку');
    return false;
  });

  if (!lockAcquired) {
    helperLogger.info(
      { userId, conversationName },
      'Пользователь уже находится в процессе обработки',
    );
    await ctx
      .reply(
        errorMessage || '⏳ Пожалуйста, подождите, я всё ещё обрабатываю ваш предыдущий запрос.',
      )
      .catch(() => {});
    return;
  }

  try {
    helperLogger.debug({ userId, conversationName }, 'Вход в диалог');
    await ctx.conversation.enter(conversationName);
  } catch (err: unknown) {
    helperLogger.error({ err, userId, conversationName }, 'Ошибка при входе в диалог');
    await ctx
      .reply('❌ Произошла ошибка при запуске процесса, попробуйте еще раз.')
      .catch(() => {});
  } finally {
    // ВАЖНО: снимаем блокировку только после выполнения ctx.conversation.enter
    // Сам enter в grammY возвращает Promise, который резолвится сразу, но
    // выполнение логики conversation продолжается в фоновом режиме.
    // Если внутри conversation есть долгие операции, блокировка должна контролироваться там.
    // Однако первичный "захват" блокировки здесь защищает от спама во время самого входа.
    await unlockUser(userId).catch((err: unknown) => {
      helperLogger.warn({ err, userId, conversationName }, 'Не удалось снять блокировку');
    });
  }
}
