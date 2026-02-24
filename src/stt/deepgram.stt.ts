import { createClient } from '@deepgram/sdk';
import type { SttService } from './stt.interface.js';
import { AppError } from '../errors/app-errors.js';
import { getConfig } from '../config/env.js';
import { createLogger } from '../logger/logger.js';
import { withRetry } from '../utils/retry.js';

const logger = createLogger('stt');

/**
 * Ошибка работы со Speech-to-Text сервисом
 */
export class SttError extends AppError {
  constructor(message: string, isOperational = true) {
    super(message, 500, isOperational);
    this.name = 'SttError';
  }
}

/**
 * Реализация STT сервиса с использованием Deepgram Nova-3.
 *
 * Deepgram принимает OGG Opus (формат Telegram) нативно —
 * конвертация через ffmpeg не требуется.
 */
export class DeepgramStt implements SttService {
  private readonly deepgram: ReturnType<typeof createClient>;

  constructor() {
    this.deepgram = createClient(getConfig().DEEPGRAM_API_KEY);
  }

  /**
   * Транскрибирует аудио буфер в текстовую строку.
   *
   * @param audioBuffer Буфер с аудиоданными (OGG Opus / любой формат, поддерживаемый Deepgram)
   * @param language Код языка (ISO-639-1), по умолчанию 'ru'
   * @returns Распознанный текст
   * @throws SttError если произошла ошибка транскрибации
   */
  async transcribe(audioBuffer: Buffer, language: string = 'ru'): Promise<string> {
    try {
      const start = Date.now();
      logger.debug('Отправка аудио в Deepgram...');

      const { result, error } = await withRetry(
        () =>
          this.deepgram.listen.prerecorded.transcribeFile(audioBuffer, {
            model: 'nova-3',
            language,
            smart_format: true,
          }),
        'Deepgram STT',
        { maxRetries: 2, baseDelayMs: 2000 },
      );

      if (error) {
        logger.error({ err: error }, 'Deepgram вернул ошибку');
        throw new SttError(`Ошибка Deepgram API: ${error.message}`);
      }

      const transcript = result?.results?.channels?.[0]?.alternatives?.[0]?.transcript;

      if (!transcript) {
        throw new SttError('Deepgram не вернул текст транскрипции');
      }

      logger.info({ durationMs: Date.now() - start }, 'Аудио успешно распознано');

      return transcript;
    } catch (error: unknown) {
      if (error instanceof SttError) {
        throw error;
      }
      logger.error({ err: error }, 'Ошибка при работе со Speech-to-Text API');
      const message =
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при распознавании голосового сообщения';
      throw new SttError(message);
    }
  }
}
