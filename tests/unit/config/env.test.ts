import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { validateConfig, getConfig, _resetConfigForTesting } from '../../../src/config/env.js';

/**
 * Хелпер: устанавливает минимально валидные переменные окружения для тестов.
 */
function setValidEnv(): void {
  process.env.BOT_TOKEN = 'test-bot-token';
  process.env.OPENAI_API_KEY = 'test-openai-key';
  process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/testdb';
  process.env.REDIS_URL = 'redis://localhost:6379';
  process.env.LOG_LEVEL = 'info';
  process.env.NODE_ENV = 'test';
  process.env.PUBLISH_CHAT_ID = 'test-chat-id';
}

/**
 * Удаляет все env-переменные, связанные с конфигурацией.
 */
function clearEnv(): void {
  delete process.env.BOT_TOKEN;
  delete process.env.OPENAI_API_KEY;
  delete process.env.DATABASE_URL;
  delete process.env.REDIS_URL;
  delete process.env.LOG_LEVEL;
  delete process.env.NODE_ENV;
  delete process.env.PUBLISH_CHAT_ID;
}

describe('Config / env.ts', () => {
  beforeEach(() => {
    clearEnv();
    _resetConfigForTesting();
  });

  afterEach(() => {
    clearEnv();
    _resetConfigForTesting();
  });

  it('должен возвращать валидный конфиг при корректных переменных', () => {
    setValidEnv();
    const config = validateConfig();

    expect(config.BOT_TOKEN).toBe('test-bot-token');
    expect(config.OPENAI_API_KEY).toBe('test-openai-key');
    expect(config.DATABASE_URL).toBe('postgresql://user:pass@localhost:5432/testdb');
    expect(config.LOG_LEVEL).toBe('info');
    expect(config.NODE_ENV).toBe('test');
    expect(config.PUBLISH_CHAT_ID).toBe('test-chat-id');
  });

  it('должен выбрасывать ошибку при отсутствии обязательных переменных', () => {
    // Не устанавливаем env-переменные
    expect(() => validateConfig()).toThrow('Невалидная конфигурация');
    expect(() => validateConfig()).toThrow('BOT_TOKEN');
  });

  it('должен использовать значения по умолчанию для опциональных переменных', () => {
    process.env.BOT_TOKEN = 'test-token';
    process.env.OPENAI_API_KEY = 'test-key';
    process.env.DATABASE_URL = 'postgresql://localhost:5432/db';
    process.env.PUBLISH_CHAT_ID = 'test-id';
    // Не устанавливаем REDIS_URL, LOG_LEVEL, NODE_ENV — должны использовать defaults

    const config = validateConfig();

    expect(config.REDIS_URL).toBe('redis://localhost:6379');
    expect(config.LOG_LEVEL).toBe('info');
    expect(config.NODE_ENV).toBe('development');
  });

  it('должен отклонять невалидный LOG_LEVEL', () => {
    setValidEnv();
    process.env.LOG_LEVEL = 'invalid_level';

    expect(() => validateConfig()).toThrow('Невалидная конфигурация');
  });

  it('getConfig() должен выбрасывать ошибку, если конфигурация не загружена', () => {
    expect(() => getConfig()).toThrow('Конфигурация не загружена');
  });

  it('getConfig() должен возвращать конфигурацию после validateConfig()', () => {
    setValidEnv();
    validateConfig();
    const config = getConfig();

    expect(config.BOT_TOKEN).toBe('test-bot-token');
  });
});
