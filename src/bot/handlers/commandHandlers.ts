import type { CustomContext } from '../types.js';
import { logger } from '../../logger/logger.js';
import { cancelWorkoutFlow } from '../utils/cancelFlow.js';

const commandLogger = logger.child({ module: 'CommandHandlers' });

/**
 * Обработчик команды /start. Приветствует пользователя.
 * @param ctx Контекст бота
 */
export async function handleStart(ctx: CustomContext): Promise<void> {
  const name = ctx.user?.displayName || ctx.from?.first_name || 'Спортсмен';
  commandLogger.info({ userId: ctx.from?.id }, 'Вызвана команда /start');
  await ctx.reply(
    `Привет, ${name}! 👋\n\nЯ FitBot — твой персональный фитнес-ассистент.\nОтправь мне голосовое сообщение или текст с описанием твоей тренировки, и я сохраню её.\n\nИспользуй /help чтобы узнать, как правильно описывать тренировки.`,
  );
}

/**
 * Обработчик команды /help. Выводит справочную информацию по использованию бота.
 * @param ctx Контекст бота
 */
export async function handleHelp(ctx: CustomContext): Promise<void> {
  commandLogger.info({ userId: ctx.from?.id }, 'Вызвана команда /help');
  const helpText = `
🏋️‍♂️ **Как использовать FitBot:**

Вы можете описывать тренировки голосом или текстом в свободном формате.
Например:
🗣 _"Сегодня качала ноги дома. Присед 4 по 12 с 40 кг, потом румынская 3 по 10 с 35 кг, тянуло правое бедро. В конце ягодичный мост 4 на 15 с полтинником."_

Доступные команды:
/start — Приветствие
/help — Эта инструкция
/cancel — Отменить текущий ввод/диалог
/edit — Отредактировать тренировку за определённую дату (напр. /edit 19 февраля)
`;
  await ctx.reply(helpText, { parse_mode: 'Markdown' });
}

/**
 * Обработчик команды /cancel. Прерывает текущий диалог и сбрасывает состояние.
 * @param ctx Контекст бота
 */
export async function handleCancel(ctx: CustomContext): Promise<void> {
  const userId = ctx.from?.id;

  if (!userId) {
    commandLogger.warn('Команда /cancel вызвана без userId');
    return;
  }

  commandLogger.info({ userId }, 'Вызвана команда /cancel');

  // Используем унифицированный флоу для отмены
  await cancelWorkoutFlow({ ctx, userId });
}
