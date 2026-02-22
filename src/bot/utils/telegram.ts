import type { Conversation } from '@grammyjs/conversations';
import type { CustomContext } from '../types.js';
import { getSttService } from '../../services/index.js';
import { AppError } from '../../errors/app-errors.js';

/**
 * Скачивает голосовое сообщение пользователя, конвертирует с помощью ffmpeg
 * и транскрибирует через STT сервис.
 * @param ctx Текущий контекст grammY
 * @param conversation Контекст стейт-машины (нужно для external вызовов)
 * @returns Текст сообщения или пустую строку
 */
export async function downloadAndTranscribeVoice(
  ctx: CustomContext,
  conversation: Conversation<CustomContext, CustomContext>,
): Promise<string> {
  if (!ctx.message?.voice) {
    return '';
  }

  await ctx.replyWithChatAction('typing');

  const file = await conversation.external(() => ctx.getFile());

  if (!file.file_path) {
    throw new AppError('Файл голосового сообщения не имеет пути', 500);
  }

  const { getConfig } = await conversation.external(() => import('../../config/env.js'));
  const config = getConfig();

  const response = await conversation.external(() =>
    fetch(`https://api.telegram.org/file/bot${config.BOT_TOKEN}/${file.file_path}`),
  );

  if (!response.ok) {
    throw new AppError('Не удалось скачать голосовое сообщение из Telegram', 503);
  }

  const arrayBuffer = await conversation.external(() => response.arrayBuffer());
  const sttService = getSttService();

  return await conversation.external(() => sttService.transcribe(Buffer.from(arrayBuffer), 'ru'));
}
