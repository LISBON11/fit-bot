import type { CustomContext } from '../types.js';
import { getSttService, getNluParser } from '../../services/index.js';
import { createLogger } from '../../logger/logger.js';
import { AppError } from '../../errors/app-errors.js';

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

  // Уведомляем пользователя, что бот печатает или записывает видео/аудио
  await ctx.replyWithChatAction('typing');

  // Настроить отправку action в фоне каждые 5 сек, пока длится обработка,
  // так как `replyWithChatAction` действует 5 секунд.
  const actionInterval: NodeJS.Timeout | null = setInterval(() => {
    ctx.replyWithChatAction('typing').catch(() => {});
  }, 4500);

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
    const today = new Date().toISOString().split('T')[0];
    const nluParser = getNluParser();
    const parsedWorkout = await nluParser.parse(text, today);

    // Отправляем JSON-результат для наглядности (MVP Stage 2)
    await ctx.reply(
      `💪 **Тренировка распознана**\n\n\`\`\`json\n${JSON.stringify(parsedWorkout, null, 2)}\n\`\`\``,
      { parse_mode: 'Markdown' },
    );
  } catch (error) {
    handlerLogger.error({ err: error }, 'Ошибка обработки голосового сообщения');
    // Пробрасываем ошибку дальше в errorMiddleware для отправки user-friendly сообщения
    throw error;
  } finally {
    if (actionInterval) {
      clearInterval(actionInterval);
    }
  }
}
