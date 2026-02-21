/**
 * Базовый класс ошибок приложения.
 * Все кастомные ошибки наследуются от него.
 */
export class AppError extends Error {
  /** HTTP-код ошибки */
  public readonly statusCode: number;

  /** Определяет, является ли ошибка операционной (ожидаемой) */
  public readonly isOperational: boolean;

  /**
   * @param message - Сообщение об ошибке
   * @param statusCode - HTTP-код (по умолчанию 500)
   * @param isOperational - Операционная ошибка (по умолчанию true)
   */
  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Ошибка «не найдено» (HTTP 404).
 */
export class NotFoundError extends AppError {
  constructor(message = 'Ресурс не найден') {
    super(message, 404);
  }
}

/**
 * Ошибка валидации (HTTP 400).
 */
export class ValidationError extends AppError {
  constructor(message = 'Ошибка валидации') {
    super(message, 400);
  }
}

/**
 * Ошибка распознавания речи (HTTP 502).
 */
export class SttError extends AppError {
  constructor(message = 'Ошибка распознавания речи') {
    super(message, 502);
  }
}

/**
 * Ошибка парсинга NLU (HTTP 422).
 */
export class NluParseError extends AppError {
  constructor(message = 'Ошибка парсинга тренировки') {
    super(message, 422);
  }
}

/**
 * Ошибка внешнего сервиса (HTTP 503).
 */
export class ExternalServiceError extends AppError {
  constructor(message = 'Внешний сервис недоступен') {
    super(message, 503);
  }
}
