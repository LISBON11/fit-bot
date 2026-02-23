import { jest } from '@jest/globals';
import type { withRetry as withRetryFn } from '../retry.js';

jest.unstable_mockModule('../../logger/logger.js', () => ({
  createLogger: () => ({
    warn: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  }),
}));

describe('retry.ts', () => {
  let withRetry: typeof withRetryFn;
  let mockOperation: jest.Mock<(...args: unknown[]) => Promise<unknown>>;

  beforeAll(async () => {
    const module = await import('../retry.js');
    withRetry = module.withRetry;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockOperation = jest.fn<(...args: unknown[]) => Promise<unknown>>();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return result if operation succeeds first time', async () => {
    mockOperation.mockResolvedValue('success');

    const result = await withRetry(mockOperation, 'TestContext');
    expect(result).toBe('success');
    expect(mockOperation).toHaveBeenCalledTimes(1);
  });

  it('should retry on 429 status and succeed', async () => {
    const rateLimitError = new Error('Rate limit');
    (rateLimitError as Error & { status: number }).status = 429;

    mockOperation.mockRejectedValueOnce(rateLimitError).mockResolvedValueOnce('success');

    const promise = withRetry(mockOperation, 'TestContext');

    await Promise.resolve();
    jest.advanceTimersByTime(1000);

    const result = await promise;
    expect(result).toBe('success');
    expect(mockOperation).toHaveBeenCalledTimes(2);
  });

  it('should retry on 500 status and succeed', async () => {
    const serverError = new Error('Server Error');
    (serverError as Error & { status: number }).status = 502;

    mockOperation.mockRejectedValueOnce(serverError).mockResolvedValueOnce('success');

    const promise = withRetry(mockOperation, 'TestContext');

    await Promise.resolve();
    jest.advanceTimersByTime(1000);

    const result = await promise;
    expect(result).toBe('success');
    expect(mockOperation).toHaveBeenCalledTimes(2);
  });

  it('should not retry on other errors (like 400)', async () => {
    const badRequestError = new Error('Bad request');
    (badRequestError as Error & { status: number }).status = 400;

    mockOperation.mockRejectedValue(badRequestError);

    await expect(withRetry(mockOperation, 'TestContext')).rejects.toThrow('Bad request');
    expect(mockOperation).toHaveBeenCalledTimes(1);
  });

  it('should not retry if error is not an Error instance with status', async () => {
    mockOperation.mockRejectedValue('String error');

    await expect(withRetry(mockOperation, 'TestContext')).rejects.toBe('String error');
    expect(mockOperation).toHaveBeenCalledTimes(1);
  });

  it('should throw after maxRetries', async () => {
    const serverError = new Error('Server Error');
    (serverError as Error & { status: number }).status = 500;

    mockOperation.mockRejectedValue(serverError);

    const promise = withRetry(mockOperation, 'TestContext', { maxRetries: 2, baseDelayMs: 100 });

    // Attempt 1 fails, waits 100ms
    // Attempt 2 fails, waits 200ms
    // Attempt 3 fails, throws
    for (let i = 0; i < 3; i++) {
      await Promise.resolve();
      jest.advanceTimersByTime(500);
    }

    await expect(promise).rejects.toThrow('Server Error');
    expect(mockOperation).toHaveBeenCalledTimes(3);
  });

  it('should use custom shouldRetry function', async () => {
    const customError = new Error('Custom error');

    mockOperation.mockRejectedValueOnce(customError).mockResolvedValueOnce('success');

    const promise = withRetry(mockOperation, 'TestContext', {
      shouldRetry: (err) => err instanceof Error && err.message === 'Custom error',
    });

    await Promise.resolve();
    jest.advanceTimersByTime(1000);

    const result = await promise;
    expect(result).toBe('success');
    expect(mockOperation).toHaveBeenCalledTimes(2);
  });
});
