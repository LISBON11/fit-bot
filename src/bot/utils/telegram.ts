import type { Conversation } from '@grammyjs/conversations';
import type { CustomContext } from '../types.js';
import { getSttService } from '../../services/index.js';
import { AppError } from '../../errors/app-errors.js';

/**
 * Безопасная обертка для выполнения долгих операций с показом индикатора набора текста.
 * Поддерживает таймаут, чтобы процесс не завис вечно.
 */
export async function withChatAction<T>(
  ctx: CustomContext,
  conversation: Conversation<CustomContext, CustomContext>,
  work: () => Promise<T>,
  timeoutMs: number = 2 * 60 * 1000,
): Promise<T> {
  let isFinished = false;

  await conversation.external(async () => {
    // Запускаем асинхронный цикл в фоне, чтобы не блокировать основной поток
    const loop = async (): Promise<void> => {
      while (!isFinished) {
        await ctx.replyWithChatAction('typing').catch(() => {});
        // Ждем 4.5 секунды частями, чтобы быстро прервать цикл
        for (let i = 0; i < 45 && !isFinished; i++) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
    };
    // Fire and forget, чтобы цикл начался параллельно
    void loop();
  });

  try {
    // Оборачиваем работу тайм-аутом
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(
        () => reject(new AppError('⚠️ Превышено максимальное время обработки (тайм-аут)', 504)),
        timeoutMs,
      );
    });

    return await Promise.race([work(), timeoutPromise]);
  } finally {
    // Флаг остановит цикл
    isFinished = true;
  }
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
    const file = await conversation.external(() => ctx.getFile());

    if (!file.file_path) {
      throw new AppError('⚠️ Не удалось получить путь к голосовому файлу', 400);
    }

    const { getConfig } = await conversation.external(() => import('../../config/env.js'));
    const config = getConfig();

    const response = await conversation.external(() =>
      fetch(`https://api.telegram.org/file/bot${config.BOT_TOKEN}/${file.file_path}`),
    );

    if (!response.ok) {
      throw new AppError('⚠️ Не смог скачать файл, попробуй ещё раз', 500);
    }

    const arrayBuffer = await conversation.external(() => response.arrayBuffer());
    const sttService = getSttService();

    const text = await conversation.external(() =>
      sttService.transcribe(Buffer.from(arrayBuffer), 'ru'),
    );

    if (!text || !text.trim()) {
      throw new AppError('⚠️ Не удалось распознать слова, попробуй снова', 422);
    }

    return text;
  });
}
