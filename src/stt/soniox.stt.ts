import type { SttService } from './stt.interface.js';
import { AppError } from '../errors/app-errors.js';
import { getConfig } from '../config/env.js';
import { createLogger } from '../logger/logger.js';

const logger = createLogger('stt');

const SONIOX_API_BASE_URL = 'https://api.soniox.com';
const POLL_INTERVAL_MS = 500;
const POLL_TIMEOUT_MS = 30_000;

/**
 * Ошибка работы со Speech-to-Text сервисом
 */
export class SttError extends AppError {
  constructor(message: string, isOperational = true) {
    super(message, 500, isOperational);
    this.name = 'SttError';
  }
}

/** Статус задачи транскрипции Soniox */
type TranscriptionStatus = 'pending' | 'processing' | 'completed' | 'error';

/** Ответ на создание задачи транскрипции */
interface CreateTranscriptionResponse {
  id: string;
  status: TranscriptionStatus;
}

/** Ответ на запрос статуса задачи */
interface GetTranscriptionResponse {
  id: string;
  status: TranscriptionStatus;
  details?: string;
}

/** Один токен из результата транскрипции */
interface TranscriptionToken {
  text: string;
  start_time?: number;
  end_time?: number;
}

/** Ответ на запрос транскрипта */
interface TranscriptResponse {
  tokens: TranscriptionToken[];
}

/** Ответ на загрузку файла */
interface UploadFileResponse {
  id: string;
}

/**
 * Фитнес-термины для улучшения точности распознавания в Soniox context.
 * Передаются как подсказки модели для специализированной лексики.
 */
const FITNESS_TERMS: string[] = [
  'жим лёжа',
  'жим штанги',
  'жим гантелей',
  'становая тяга',
  'приседания',
  'присед',
  'подтягивания',
  'тяга в наклоне',
  'тяга штанги',
  'тяга гантели',
  'жим над головой',
  'жим Арнольда',
  'разведения',
  'разгибания',
  'сгибания',
  'гиперэкстензия',
  'пуловер',
  'кроссовер',
  'румынская тяга',
  'выпады',
  'жим ногами',
  'разгибание ног',
  'сгибание ног',
  'икры',
  'подъём на носки',
  'скручивания',
  'планка',
  'отжимания',
  'дипсы',
  'брусья',
  'гантели',
  'штанга',
  'блок',
  'кабель',
  'тренажёр',
  'бодибар',
  'гиря',
  'повторения',
  'подходы',
  'рабочий вес',
  'разминка',
];

/**
 * Реализация STT сервиса с использованием Soniox stt-async-v4.
 *
 * Процесс транскрипции:
 * 1. Загрузка аудио-буфера через Files API → получение file_id
 * 2. Создание задачи транскрипции с file_id и фитнес-контекстом
 * 3. Поллинг статуса задачи до завершения (timeout: 30s)
 * 4. Получение текста транскрипта из токенов
 * 5. Очистка: удаление задачи и файла
 */
export class SonioxStt implements SttService {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = getConfig().SONIOX_API_KEY;
  }

  /**
   * Транскрибирует аудио буфер в текстовую строку.
   *
   * @param audioBuffer Буфер с аудиоданными (OGG Opus / любой формат, поддерживаемый Soniox)
   * @param language Код языка (ISO-639-1), по умолчанию 'ru'
   * @returns Распознанный текст
   * @throws SttError если произошла ошибка на любом этапе транскрипции
   */
  async transcribe(audioBuffer: Buffer, language = 'ru'): Promise<string> {
    const start = Date.now();
    let fileId: string | null = null;
    let transcriptionId: string | null = null;

    try {
      logger.debug('Загрузка аудио в Soniox Files API...');
      fileId = await this.uploadAudio(audioBuffer);

      logger.debug({ fileId }, 'Создание задачи транскрипции в Soniox...');
      transcriptionId = await this.createTranscription({ fileId, language });

      logger.debug({ transcriptionId }, 'Ожидание завершения транскрипции...');
      await this.pollUntilCompleted(transcriptionId);

      const transcript = await this.getTranscript(transcriptionId);

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
    } finally {
      await this.cleanup({ transcriptionId, fileId });
    }
  }

  /**
   * Загружает аудио-буфер в Soniox Files API.
   * Оборачивает Buffer в Blob/FormData для отправки через multipart/form-data.
   *
   * @param audioBuffer Буфер с аудиоданными
   * @returns Идентификатор загруженного файла (`file_id`)
   * @throws SttError если API вернуло не-OK статус
   */
  private async uploadAudio(audioBuffer: Buffer): Promise<string> {
    const formData = new FormData();
    const blob = new Blob(
      [
        audioBuffer.buffer.slice(
          audioBuffer.byteOffset,
          audioBuffer.byteOffset + audioBuffer.byteLength,
        ) as ArrayBuffer,
      ],
      { type: 'audio/ogg' },
    );
    formData.append('file', blob, 'audio.ogg');

    const response = await fetch(`${SONIOX_API_BASE_URL}/v1/files`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.apiKey}` },
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new SttError(`Ошибка загрузки файла в Soniox: ${response.status} ${text}`);
    }

    const data = (await response.json()) as UploadFileResponse;
    return data.id;
  }

  /**
   * Создаёт задачу асинхронной транскрипции в Soniox.
   *
   * @param params.fileId Идентификатор загруженного файла
   * @param params.language Код языка
   * @returns Идентификатор задачи транскрипции
   */
  private async createTranscription(params: { fileId: string; language: string }): Promise<string> {
    const { fileId, language } = params;

    const body = {
      model: 'stt-async-v4',
      file_id: fileId,
      language_hints: [language],
      context: {
        terms: FITNESS_TERMS,
      },
    };

    const response = await fetch(`${SONIOX_API_BASE_URL}/v1/transcriptions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new SttError(`Ошибка создания транскрипции Soniox: ${response.status} ${text}`);
    }

    const data = (await response.json()) as CreateTranscriptionResponse;
    return data.id;
  }

  /**
   * Опрашивает статус задачи транскрипции до её завершения.
   * Выбрасывает ошибку при превышении таймаута или при статусе 'error'.
   *
   * @param transcriptionId Идентификатор задачи транскрипции
   */
  private async pollUntilCompleted(transcriptionId: string): Promise<void> {
    const deadline = Date.now() + POLL_TIMEOUT_MS;

    while (Date.now() < deadline) {
      const response = await fetch(`${SONIOX_API_BASE_URL}/v1/transcriptions/${transcriptionId}`, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new SttError(`Ошибка проверки статуса транскрипции: ${response.status} ${text}`);
      }

      const data = (await response.json()) as GetTranscriptionResponse;
      logger.debug({ status: data.status }, 'Статус транскрипции Soniox');

      if (data.status === 'completed') {
        return;
      }

      if (data.status === 'error') {
        throw new SttError(
          `Soniox вернул ошибку транскрипции: ${data.details ?? 'неизвестная ошибка'}`,
        );
      }

      await new Promise<void>((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    }

    throw new SttError(`Превышен таймаут ожидания транскрипции (${POLL_TIMEOUT_MS / 1000}s)`);
  }

  /**
   * Получает текст транскрипции из завершённой задачи.
   *
   * @param transcriptionId Идентификатор задачи транскрипции
   * @returns Распознанный текст, собранный из токенов
   */
  private async getTranscript(transcriptionId: string): Promise<string> {
    const response = await fetch(
      `${SONIOX_API_BASE_URL}/v1/transcriptions/${transcriptionId}/transcript`,
      {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      },
    );

    if (!response.ok) {
      const text = await response.text();
      throw new SttError(`Ошибка получения транскрипта: ${response.status} ${text}`);
    }

    const data = (await response.json()) as TranscriptResponse;

    const transcript = data.tokens
      .map((t) => t.text)
      .join('')
      .trim();

    if (!transcript) {
      throw new SttError('Soniox не вернул текст транскрипции');
    }

    return transcript;
  }

  /**
   * Удаляет задачу транскрипции и загруженный файл из Soniox.
   * Ошибки при очистке логируются, но не пробрасываются.
   *
   * @param params.transcriptionId Идентификатор задачи (null — если не была создана)
   * @param params.fileId Идентификатор файла (null — если не был загружен)
   */
  private async cleanup(params: {
    transcriptionId: string | null;
    fileId: string | null;
  }): Promise<void> {
    const { transcriptionId, fileId } = params;

    if (transcriptionId) {
      try {
        await fetch(`${SONIOX_API_BASE_URL}/v1/transcriptions/${transcriptionId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${this.apiKey}` },
        });
      } catch (err) {
        logger.warn({ err, transcriptionId }, 'Не удалось удалить задачу транскрипции Soniox');
      }
    }

    if (fileId) {
      try {
        await fetch(`${SONIOX_API_BASE_URL}/v1/files/${fileId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${this.apiKey}` },
        });
      } catch (err) {
        logger.warn({ err, fileId }, 'Не удалось удалить файл из Soniox Files API');
      }
    }
  }
}
