/**
 * Интерфейс сервиса для преобразования речи в текст
 */
export interface SttService {
  /**
   * Транскрибирует аудио буфер в текстовую строку.
   *
   * @param audioBuffer Буфер с аудиоданными (OGG Opus, MP3, WAV и другие поддерживаемые форматы)
   * @param language Опциональный код языка (ISO-639-1), например 'ru' или 'en'
   * @returns Распознанный текст
   * @throws SttError если произошла ошибка транскрибации
   */
  transcribe(audioBuffer: Buffer, language?: string): Promise<string>;
}
