import { OpenAI, toFile } from 'openai';
import ffmpeg from 'fluent-ffmpeg';
import { Readable, PassThrough } from 'stream';
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
 * Реализация STT сервиса с использованием OpenAI Whisper API
 */
export class OpenAiWhisperStt implements SttService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: getConfig().OPENAI_API_KEY });
  }

  /**
   * Конвертирует аудио буфер из произвольного формата (OGG и др.) в формат MP3 для Whisper API
   * @param inputBuffer Буфер с исходным аудио
   * @returns Буфер со сконвертированным MP3-аудио
   */
  private async convertAudio(inputBuffer: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const inputStream = Readable.from(inputBuffer);
      const outputStream = new PassThrough();
      const chunks: Buffer[] = [];

      const timeoutId = setTimeout(() => {
        inputStream.destroy();
        outputStream.destroy();
        reject(new SttError('Таймаут конвертации аудио'));
      }, 30000);

      outputStream.on('data', (chunk) => chunks.push(chunk));
      outputStream.on('end', () => {
        clearTimeout(timeoutId);
        resolve(Buffer.concat(chunks));
      });
      outputStream.on('error', (err) => {
        clearTimeout(timeoutId);
        inputStream.destroy();
        reject(err);
      });

      ffmpeg(inputStream)
        .outputOptions(['-ac 1', '-ar 16000']) // Mono, 16kHz for Whisper
        .format('mp3')
        .on('error', (err) => {
          clearTimeout(timeoutId);
          logger.error({ err }, 'Ошибка конвертации аудио');
          inputStream.destroy();
          outputStream.destroy();
          reject(new SttError('Не удалось сконвертировать аудио файл для распознавания'));
        })
        .pipe(outputStream, { end: true });
    });
  }

  /**
   * Транскрибирует аудио буфер в текстовую строку
   * @param audioBuffer Буфер с аудиоданными
   * @param language Опциональный код языка (по умолчанию 'ru')
   * @returns Распознанный текст
   */
  async transcribe(audioBuffer: Buffer, language: string = 'ru'): Promise<string> {
    try {
      const start = Date.now();
      logger.debug('Начало конвертации аудио...');

      // Конвертируем OGG в MP3 в памяти
      const mp3Buffer = await this.convertAudio(audioBuffer);

      logger.debug(`Аудио сконвертировано за ${Date.now() - start}ms. Отправка в OpenAI...`);

      // Отправляем в OpenAI Whisper API, преобразуя буфер в File объект
      const file = await toFile(mp3Buffer, 'audio.mp3', { type: 'audio/mp3' });

      // Обертка с Retry на случай нестабильного 502 Bad Gateway или 429
      const response = await withRetry(
        () =>
          this.openai.audio.transcriptions.create({
            file,
            model: 'whisper-1',
            language: language,
          }),
        'Whisper STT',
        { maxRetries: 2, baseDelayMs: 2000 },
      );

      logger.info({ durationMs: Date.now() - start }, 'Аудио успешно распознано');

      return response.text;
    } catch (error: unknown) {
      logger.error({ err: error }, 'Ошибка при работе со Speech-to-Text API');
      const message =
        error instanceof Error
          ? error.message
          : 'Произошла ошибка при распознавании голосового сообщения';
      throw new SttError(message);
    }
  }
}
