import type { User } from '@prisma/client';
import type { UserRepository } from '../repositories/user.repository.js';
import { createLogger } from '../logger/logger.js';

const logger = createLogger('UserService');

/**
 * Сервис для бизнес-логики, связанной с пользователями
 */
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Находит пользователя по telegramId или создает нового, если он не найден
   * @param telegramId Идентификатор пользователя в Telegram
   * @param username Имя пользователя в Telegram (опционально)
   * @param firstName Имя пользователя из Telegram
   * @returns Найденный или созданный пользователь
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
