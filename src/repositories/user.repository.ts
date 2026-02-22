import type { PrismaClient, User } from '@prisma/client';
import { getPrismaClient } from '../config/database.js';

/**
 * Репозиторий для управления данными пользователей
 */
export class UserRepository {
  private get prisma(): PrismaClient {
    return getPrismaClient();
  }

  /**
   * Находит пользователя по его уникальному внутреннему ID
   * @param id ID пользователя
   * @returns Данные пользователя или null, если не найден
   */
  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Находит пользователя по его Telegram ID
   * @param telegramId Идентификатор пользователя в Telegram
   * @returns Данные пользователя или null, если не найден
   */
  async findByTelegramId(telegramId: string): Promise<User | null> {
    const authProvider = await this.prisma.authProvider.findUnique({
      where: {
        provider_providerUserId: {
          provider: 'telegram',
          providerUserId: telegramId,
        },
      },
      include: {
        user: true,
      },
    });

    return authProvider?.user || null;
  }

  /**
   * Создает нового пользователя и привязывает к нему Telegram аккаунт
   * @param telegramId Идентификатор пользователя в Telegram
   * @param username Имя пользователя в Telegram (опционально)
   * @param firstName Имя пользователя из Telegram
   * @returns Созданный пользователь
   */
  async createWithTelegram(
    telegramId: string,
    username: string | null,
    firstName: string | undefined,
  ): Promise<User> {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          telegramId: telegramId,
          telegramUsername: username,
          displayName: firstName || username || 'User',
        },
      });

      await tx.authProvider.create({
        data: {
          userId: user.id,
          provider: 'telegram',
          providerUserId: telegramId,
        },
      });

      return user;
    });
  }
}
