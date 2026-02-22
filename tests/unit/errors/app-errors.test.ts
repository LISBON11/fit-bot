import { describe, it, expect } from '@jest/globals';
import {
  AppError,
  NotFoundError,
  ValidationError,
  SttError,
  NluParseError,
  ExternalServiceError,
} from '../../../src/errors/app-errors.js';

describe('AppError', () => {
  it('должен иметь правильные значения по умолчанию', () => {
    const error = new AppError('test error');

    expect(error.message).toBe('test error');
    expect(error.statusCode).toBe(500);
    expect(error.isOperational).toBe(true);
    expect(error.name).toBe('AppError');
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
    expect(error.stack).toBeDefined();
    // Убеждаемся, что captureStackTrace сработал (первая строка стэка не содержит сам конструктор AppError)
    expect(error.stack).not.toMatch(/^Error\n\s+at new AppError/);
  });

  it('должен принимать кастомные параметры', () => {
    const error = new AppError('custom', 418, false);

    expect(error.statusCode).toBe(418);
    expect(error.isOperational).toBe(false);
  });
});

describe('NotFoundError', () => {
  it('должен иметь statusCode 404', () => {
    const error = new NotFoundError();

    expect(error.statusCode).toBe(404);
    expect(error.isOperational).toBe(true);
    expect(error.name).toBe('NotFoundError');
    expect(error).toBeInstanceOf(AppError);
    expect(error).toBeInstanceOf(NotFoundError);
  });

  it('должен принимать кастомное сообщение', () => {
    const error = new NotFoundError('Пользователь не найден');

    expect(error.message).toBe('Пользователь не найден');
  });
});

describe('ValidationError', () => {
  it('должен иметь statusCode 400', () => {
    const error = new ValidationError();

    expect(error.statusCode).toBe(400);
    expect(error.isOperational).toBe(true);
    expect(error.name).toBe('ValidationError');
    expect(error).toBeInstanceOf(AppError);
  });

  it('должен принимать кастомное сообщение', () => {
    const error = new ValidationError('Неверный формат даты');
    expect(error.message).toBe('Неверный формат даты');
  });
});

describe('SttError', () => {
  it('должен иметь statusCode 502', () => {
    const error = new SttError();

    expect(error.statusCode).toBe(502);
    expect(error.isOperational).toBe(true);
    expect(error.name).toBe('SttError');
    expect(error).toBeInstanceOf(AppError);
  });

  it('должен принимать кастомное сообщение', () => {
    const error = new SttError('Whisper API timeout');

    expect(error.message).toBe('Whisper API timeout');
  });
});

describe('NluParseError', () => {
  it('должен иметь statusCode 422', () => {
    const error = new NluParseError();

    expect(error.statusCode).toBe(422);
    expect(error.isOperational).toBe(true);
    expect(error.name).toBe('NluParseError');
    expect(error).toBeInstanceOf(AppError);
  });

  it('должен принимать кастомное сообщение', () => {
    const error = new NluParseError('Не удалось извлечь вес');
    expect(error.message).toBe('Не удалось извлечь вес');
  });
});

describe('ExternalServiceError', () => {
  it('должен иметь statusCode 503', () => {
    const error = new ExternalServiceError();

    expect(error.statusCode).toBe(503);
    expect(error.isOperational).toBe(true);
    expect(error.name).toBe('ExternalServiceError');
    expect(error).toBeInstanceOf(AppError);
  });
});
