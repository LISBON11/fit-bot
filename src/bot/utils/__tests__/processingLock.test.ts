import { jest } from '@jest/globals';

import type { Redis } from 'ioredis';
import { mockDeep } from 'jest-mock-extended';

const mockRedisClient = mockDeep<Redis>();

jest.unstable_mockModule('../../../config/redis.js', () => ({
  getRedisClient: jest.fn(() => mockRedisClient),
}));

describe('processingLock', () => {
  let lockUser: (userId: number) => Promise<boolean>;
  let unlockUser: (userId: number) => Promise<void>;

  beforeAll(async () => {
    const module = await import('../processingLock.js');
    lockUser = module.lockUser;
    unlockUser = module.unlockUser;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('lockUser', () => {
    it('should lock user if not locked', async () => {
      mockRedisClient.set.mockResolvedValue('OK');
      const result = await lockUser(123);
      expect(mockRedisClient.set).toHaveBeenCalledWith('processing_lock:123', '1', 'EX', 60, 'NX');
      expect(result).toBe(true);
    });

    it('should return false if already locked', async () => {
      mockRedisClient.set.mockResolvedValue(null);
      const result = await lockUser(123);
      expect(mockRedisClient.set).toHaveBeenCalledWith('processing_lock:123', '1', 'EX', 60, 'NX');
      expect(result).toBe(false);
    });
  });

  describe('unlockUser', () => {
    it('should unlock user', async () => {
      mockRedisClient.del.mockResolvedValue(1);
      await unlockUser(123);
      expect(mockRedisClient.del).toHaveBeenCalledWith('processing_lock:123');
    });
  });
});
