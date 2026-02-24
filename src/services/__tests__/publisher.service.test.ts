import { jest, describe, beforeEach, afterEach, it, expect } from '@jest/globals';
import { PublisherService } from '../publisher.service.js';
import type { Api } from 'grammy';
import { _resetConfigForTesting, validateConfig } from '../../config/env.js';

jest.mock('../../logger/logger.js', () => ({
  logger: {
    child: jest.fn<(...args: unknown[]) => unknown>().mockReturnValue({
      info: jest.fn(),
      error: jest.fn(),
    }),
  },
}));

describe('PublisherService', () => {
  let apiMock: jest.Mocked<Api>;
  let publisherService: PublisherService;

  beforeEach(() => {
    _resetConfigForTesting();
    process.env.BOT_TOKEN = 'test_token';
    process.env.DEEPSEEK_API_KEY = 'test_deepseek_key';
    process.env.DEEPGRAM_API_KEY = 'test_deepgram_key';
    process.env.DATABASE_URL = 'http://test';
    process.env.PUBLISH_CHAT_ID = '-1001234567890';
    validateConfig();

    apiMock = {
      sendMessage: jest.fn(async () => ({ message_id: 100 })),
    } as unknown as jest.Mocked<Api>;

    publisherService = new PublisherService(apiMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должен отправлять сообщение в правильный чат и возвращать message_id', async () => {
    const formattedText = '<b>Тренировка</b>';
    const messageId = await publisherService.publish(formattedText);

    expect(messageId).toBe(100);
    expect(apiMock.sendMessage).toHaveBeenCalledTimes(1);
    expect(apiMock.sendMessage).toHaveBeenCalledWith('-1001234567890', formattedText, {
      parse_mode: 'HTML',
    });
  });

  it('должен пробрасывать ошибку, если sendMessage падает', async () => {
    apiMock.sendMessage.mockRejectedValueOnce(new Error('Network Error'));

    await expect(publisherService.publish('text')).rejects.toThrow('Network Error');
  });
});
