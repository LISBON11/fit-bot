import type { CustomContext } from '../types.js';

/**
 * Обработчик текстовых сообщений.
 * Запускает FSM-граф парсинга тренировки для любого текста, если это не команда.
 */
export async function handleTextMessage(ctx: CustomContext): Promise<void> {
  // Для MVP все текстовые сообщения считаем попыткой залогировать новую тренировку.
  // В шаге 4.2 здесь будет распознавание паттерна "/edit" или "измени за...".

  if (!ctx.message?.text) return;

  // Если это команда (начинается с /), она уже обработалась (или неизвестная).
  // Но grammY не маршрутизирует команды в bot.on('message:text') если мы сделаем правильный порядок.
  // На всякий случай пропустим:
  if (ctx.message.text.startsWith('/')) return;

  await ctx.conversation.enter('newWorkout');
}
