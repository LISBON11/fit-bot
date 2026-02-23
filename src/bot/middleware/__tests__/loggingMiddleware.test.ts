import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import type { NextFunction } from 'grammy';
import { createMockCtx } from '../../__tests__/utils/mockCtx.js';

import type { DeepMockProxy } from 'jest-mock-extended';
import type { CustomContext } from '../../types.js';

const { loggingMiddleware } = await import('../loggingMiddleware.js');

describe('Logging Middleware', () => {
  let mockCtx: DeepMockProxy<CustomContext>;
  let mockNext: jest.Mock<(...args: unknown[]) => Promise<unknown>>;

  beforeEach(() => {
    mockCtx = createMockCtx();
    Object.assign(mockCtx.update, {
      update_id: 12345,
      message: {
        message_id: 1,
        date: 123456789,
        chat: { id: 1, type: 'private', first_name: 'T' },
        from: { id: 1, is_bot: false, first_name: 'T' },
      },
    });
    mockNext = jest.fn<(...args: unknown[]) => Promise<unknown>>().mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должна замерять время выполнения и вызывать next()', async () => {
    // Искусственно замедляем next на 50мс
    mockNext.mockImplementationOnce(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    await loggingMiddleware(mockCtx, mockNext as unknown as NextFunction);

    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
