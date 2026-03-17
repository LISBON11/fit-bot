import type { Filter } from 'grammy';
import type { CustomContext } from '../types.js';
import { logger } from '../../logger/logger.js';
import { cancelWorkoutFlow } from '../utils/cancelFlow.js';

const callbackLogger = logger.child({ module: 'CallbackHandlers' });

/**
 * Обработчик кнопки "Отмена" под статус-сообщением или превью.
 * Использует bypass-логику отмены (до middleware conversations).
 *
 * @param ctx Контекст grammY
 */
export async function handleCancelWorkoutCallback(
  ctx: Filter<CustomContext, 'callback_query:data'>,
): Promise<void> {
  const userId = ctx.from.id;

  callbackLogger.info({ userId }, 'Нажата кнопка отмены создания тренировки');

  // Убираем анимацию загрузки у кнопки
  await ctx.answerCallbackQuery().catch(() => {});

  // Выполняем общую логику отмены
  await cancelWorkoutFlow({ ctx, userId });
}
