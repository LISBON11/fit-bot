import type { Conversation } from '@grammyjs/conversations';
import type { CustomContext } from '../types.js';
import { getSttService } from '../../services/index.js';
import { AppError } from '../../errors/app-errors.js';
import { getConfig } from '../../config/env.js';

/**
 * Безопасная обертка для выполнения долгих операций с показом индикатора набора текста.
 * Поддерживает таймаут, чтобы процесс не завис вечно.
 */
export async function withChatAction<T>(
  ctx: CustomContext,
  conversation: Conversation<CustomContext, CustomContext>,
  work: () => Promise<T>,
): Promise<T> {
  const chatId = ctx.chat?.id;

  if (chatId) {
    // GrammY automatically intercepts API calls like sendChatAction inside conversations.
    // They must NOT be wrapped in conversation.external().
    await ctx.api.sendChatAction(chatId, 'typing').catch(() => {});
  }

  return await work();
}

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

  return withChatAction(ctx, conversation, async () => {
    // API calls inside conversations are intercepted natively.
    const file = await ctx.getFile();

    if (!file.file_path) {
      throw new AppError('⚠️ Не удалось получить путь к голосовому файлу', 400);
    }

    const config = getConfig();

    // Group non-api async operations into a single conversation.external call
    // so we don't save huge ArrayBuffers to the Redis session storage!
    const text = await conversation.external(async () => {
      const response = await fetch(
        `https://api.telegram.org/file/bot${config.BOT_TOKEN}/${file.file_path}`,
      );
      if (!response.ok) {
        throw new AppError('⚠️ Не смог скачать файл, попробуй ещё раз', 500);
      }
      const arrayBuffer = await response.arrayBuffer();

      const sttService = getSttService();
      return sttService.transcribe(Buffer.from(arrayBuffer), 'ru');
    });

    if (!text || !text.trim()) {
      throw new AppError('⚠️ Не удалось распознать слова, попробуй снова', 422);
    }

    return text;
  });
}
