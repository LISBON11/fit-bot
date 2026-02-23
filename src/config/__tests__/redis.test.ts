import { jest } from '@jest/globals';
import type * as RedisModule from '../redis.js';

const mockRedisInstance = {
  ping: jest.fn<() => Promise<string>>(),
  quit: jest.fn<() => Promise<unknown>>(),
  on: jest.fn<(...args: unknown[]) => void>(),
};

jest.unstable_mockModule('ioredis', () => ({
  Redis: jest.fn(() => mockRedisInstance),
}));

jest.unstable_mockModule('../../logger/logger.js', () => ({
  createLogger: () => ({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  }),
}));

jest.unstable_mockModule('../env.js', () => ({
  getConfig: () => ({ REDIS_URL: 'redis://localhost:6379' }),
}));

describe('redis.ts', () => {
  let redisModule: typeof RedisModule;

  beforeAll(async () => {
    redisModule = await import('../redis.js');
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(async () => {
    jest.useRealTimers();
    if (redisModule.disconnectRedis) {
      await redisModule.disconnectRedis();
    }
  });

  it('getRedisClient should return singleton instance', () => {
    const client1 = redisModule.getRedisClient();
    const client2 = redisModule.getRedisClient();

    expect(client1).toBeDefined();
    expect(client1).toBe(client2);
    expect(mockRedisInstance.on).toHaveBeenCalledWith('connect', expect.any(Function));
  });

  it('connectRedis should ping successfully on first try', async () => {
    mockRedisInstance.ping.mockResolvedValueOnce('PONG' as never);

    await redisModule.connectRedis();

    expect(mockRedisInstance.ping).toHaveBeenCalledTimes(1);
  });

  it('connectRedis should retry and connect on second try', async () => {
    mockRedisInstance.ping
      .mockRejectedValueOnce(new Error('Ping failed'))
      .mockResolvedValueOnce('PONG');

    const connectPromise = redisModule.connectRedis();

    await Promise.resolve();
    jest.advanceTimersByTime(1000);

    await connectPromise;

    expect(mockRedisInstance.ping).toHaveBeenCalledTimes(2);
  });

  it('connectRedis should throw after max retries (3)', async () => {
    mockRedisInstance.ping.mockRejectedValue(new Error('Persistent ping failure'));

    const connectPromise = redisModule.connectRedis();

    for (let i = 0; i < 3; i++) {
      await Promise.resolve();
      jest.advanceTimersByTime(4000);
    }

    await expect(connectPromise).rejects.toThrow('Не удалось подключиться к Redis после 3 попыток');
    expect(mockRedisInstance.ping).toHaveBeenCalledTimes(3);
  });

  it('disconnectRedis should call quit and clear singleton', async () => {
    redisModule.getRedisClient();

    mockRedisInstance.quit.mockResolvedValue(true);

    await redisModule.disconnectRedis();

    expect(mockRedisInstance.quit).toHaveBeenCalled();
  });
});
