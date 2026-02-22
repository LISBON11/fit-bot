import type { PrismaClient, User } from '@prisma/client';
import { getPrismaClient } from '../config/database.js';

export class UserRepository {
  private get prisma(): PrismaClient {
    return getPrismaClient();
  }

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
