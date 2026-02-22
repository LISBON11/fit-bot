/**
 * Интерфейс сервиса для преобразования речи в текст
 */
export interface SttService {
  /**
   * Транскрибирует аудио буфер в текстовую строку.
   *
   * @param audioBuffer Буфер с аудиоданными (в форматах типа oga, mp3, wav, если они предварительно сконвертированы)
   * @param language Опциональный код языка (ISO-639-1), например 'ru' или 'en'
   * @returns Распознанный текст
   * @throws SttError если произошла ошибка транскрибации или конвертации
   */
  transcribe(audioBuffer: Buffer, language?: string): Promise<string>;
}
