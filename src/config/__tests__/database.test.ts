import { jest } from '@jest/globals';
import type * as DbModule from '../database.js';

const mockPrismaClientInstance = {
  $connect: jest.fn<() => Promise<void>>(),
  $disconnect: jest.fn<() => Promise<void>>(),
  $extends: jest.fn<() => unknown>().mockReturnThis(),
};

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrismaClientInstance),
}));

jest.unstable_mockModule('../../logger/logger.js', () => ({
  createLogger: () => ({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  }),
}));

describe('database.ts', () => {
  let dbModule: typeof DbModule;

  beforeAll(async () => {
    dbModule = await import('../database.js');
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    // Reset singleton if possible, but it's an exported local variable in the module
    // We can reset it using disconnectDatabase
    if (dbModule.disconnectDatabase) {
      return dbModule.disconnectDatabase();
    }
  });

  it('getPrismaClient should create and return singleton instance', () => {
    const client1 = dbModule.getPrismaClient();
    const client2 = dbModule.getPrismaClient();

    expect(client1).toBeDefined();
    expect(client1).toBe(client2); // Singleton check
    expect(mockPrismaClientInstance.$extends).toHaveBeenCalled();
  });

  it('connectDatabase should connect successfully on first try', async () => {
    mockPrismaClientInstance.$connect.mockResolvedValueOnce(undefined as never);

    await dbModule.connectDatabase();

    expect(mockPrismaClientInstance.$connect).toHaveBeenCalledTimes(1);
  });

  it('connectDatabase should retry and connect on second try', async () => {
    mockPrismaClientInstance.$connect
      .mockRejectedValueOnce(new Error('Connection failed'))
      .mockResolvedValueOnce(undefined);

    const connectPromise = dbModule.connectDatabase();

    // Fast-forward initial backoff (1000ms)
    await Promise.resolve(); // flush pending promises
    jest.advanceTimersByTime(1000);

    await connectPromise;

    expect(mockPrismaClientInstance.$connect).toHaveBeenCalledTimes(2);
  });

  it('connectDatabase should throw after max retries (3)', async () => {
    mockPrismaClientInstance.$connect.mockRejectedValue(new Error('Persistent failure'));

    const connectPromise = dbModule.connectDatabase();

    for (let i = 0; i < 3; i++) {
      await Promise.resolve(); // flush promises
      jest.advanceTimersByTime(4000); // clear any timeouts easily
    }

    await expect(connectPromise).rejects.toThrow(
      'Не удалось подключиться к PostgreSQL после 3 попыток',
    );
    expect(mockPrismaClientInstance.$connect).toHaveBeenCalledTimes(3);
  });

  it('disconnectDatabase should call $disconnect and clear singleton', async () => {
    // initialize
    dbModule.getPrismaClient();

    mockPrismaClientInstance.$disconnect.mockResolvedValue(undefined as never);

    await dbModule.disconnectDatabase();

    expect(mockPrismaClientInstance.$disconnect).toHaveBeenCalled();
  });
});
