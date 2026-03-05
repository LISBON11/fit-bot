import type { CustomContext } from '../types.js';
import { getSttService, getNluParser } from '../../services/index.js';
import { createLogger } from '../../logger/logger.js';
import { AppError } from '../../errors/app-errors.js';
import { getCurrentDateString } from '../../utils/date.js';

const handlerLogger = createLogger('voiceHandler');

/**
 * Обработчик голосовых сообщений.
 * Скачивает голосовое сообщение, переводит его в текст и (пока временно) отправляет текст обратно пользователю.
 * @param ctx Контекст бота, содержащий голосовое сообщение
 */
export async function handleVoiceMessage(ctx: CustomContext): Promise<void> {
  if (!ctx.message?.voice) {
    return;
  }

  const voice = ctx.message.voice;
  handlerLogger.info(
    { fileId: voice.file_id, duration: voice.duration },
    'Получено голосовое сообщение',
  );

  try {
    // Получаем ссылку на файл от Telegram
    const file = await ctx.getFile();
    if (!file.file_path) {
      throw new AppError('Не удалось получить путь к голосовому файлу', 400);
    }

    const { getConfig } = await import('../../config/env.js');
    const token = getConfig().BOT_TOKEN;
    const url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

    // Загружаем файл в память
    const response = await fetch(url);
    if (!response.ok) {
      throw new AppError(`Ошибка скачивания файла: ${response.statusText}`, 500);
    }

    // Получаем ArrayBuffer и конвертируем в Buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const sttService = getSttService();
    // Транскрибируем аудио
    const text = await sttService.transcribe(buffer, 'ru');
    handlerLogger.debug({ text }, 'Голосовое сообщение расшифровано');

    // Отправляем текст в парсер
    const today = getCurrentDateString();
    const nluParser = getNluParser();
    const parsedWorkout = await nluParser.parse({
      rawText: text,
      currentDate: today,
    });

    // Отправляем JSON-результат для наглядности (MVP Stage 2)
    await ctx.reply(
      `💪 **Тренировка распознана**\n\n\`\`\`json\n${JSON.stringify(parsedWorkout, null, 2)}\n\`\`\``,
      { parse_mode: 'Markdown' },
    );
  } catch (error) {
    handlerLogger.error({ err: error }, 'Ошибка обработки голосового сообщения');
    // Пробрасываем ошибку дальше в errorMiddleware для отправки user-friendly сообщения
    throw error;
  }
}
