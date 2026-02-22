import { jest } from '@jest/globals';
import { UserService } from '../user.service.js';
import type { UserRepository } from '../../repositories/user.repository.js';
import type { User } from '@prisma/client';

// Mock logger to avoid noisy output during tests
jest.mock('../../logger/logger.js', () => ({
  createLogger: () => ({
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  }),
}));

describe('UserService', () => {
  let service: UserService;
  let repositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    repositoryMock = {
      findById: jest.fn(),
      findByTelegramId: jest.fn(),
      createWithTelegram: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    service = new UserService(repositoryMock);
  });

  describe('getOrCreateByTelegram', () => {
    it('1. should return existing user if found by telegram id', async () => {
      repositoryMock.findByTelegramId.mockResolvedValue({
        id: 'u1',
        telegramId: '123',
      } as unknown as User);

      const result = await service.getOrCreateByTelegram('123', 'testuser', 'Test');

      expect(result.id).toBe('u1');
      expect(repositoryMock.findByTelegramId).toHaveBeenCalledWith('123');
      expect(repositoryMock.createWithTelegram).not.toHaveBeenCalled();
    });

    it('2. should create new user if not found by telegram id', async () => {
      repositoryMock.findByTelegramId.mockResolvedValue(null);
      repositoryMock.createWithTelegram.mockResolvedValue({
        id: 'u2',
        telegramId: '456',
      } as unknown as User);

      const result = await service.getOrCreateByTelegram('456', 'newuser', 'New');

      expect(result.id).toBe('u2');
      expect(repositoryMock.findByTelegramId).toHaveBeenCalledWith('456');
      expect(repositoryMock.createWithTelegram).toHaveBeenCalledWith('456', 'newuser', 'New');
    });
  });
});
