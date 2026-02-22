import type { User } from '@prisma/client';
import type { UserRepository } from '../repositories/user.repository.js';
import { createLogger } from '../logger/logger.js';

const logger = createLogger('UserService');

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Находит пользователя по telegramId или создает нового, если он не найден.
   */
  async getOrCreateByTelegram(
    telegramId: string,
    username: string | null,
    firstName: string | undefined,
  ): Promise<User> {
    const existingUser = await this.userRepository.findByTelegramId(telegramId);

    if (existingUser) {
      return existingUser;
    }

    const newUser = await this.userRepository.createWithTelegram(telegramId, username, firstName);
    logger.info({ userId: newUser.id, telegramId }, 'Created new user');
    return newUser;
  }
}
