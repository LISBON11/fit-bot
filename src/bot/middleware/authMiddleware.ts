import type { NextFunction } from 'grammy';
import type { CustomContext } from '../types.js';
import { getPrismaClient } from '../../config/database.js';
import { logger } from '../../logger/logger.js';

const authLogger = logger.child({ module: 'AuthMiddleware' });

export async function authMiddleware(ctx: CustomContext, next: NextFunction) {
  if (!ctx.from || !ctx.from.id) {
    return next();
  }

  const telegramId = ctx.from.id.toString();
  const username = ctx.from.username || null;
  const firstName = ctx.from.first_name;

  const prisma = getPrismaClient();

  try {
    // Attempt to find the user via auth_providers
    const authProvider = await prisma.authProvider.findUnique({
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

    if (authProvider && authProvider.user) {
      authLogger.debug({ userId: authProvider.user.id }, 'User authenticated');
      ctx.user = authProvider.user;
      return next();
    }

    // User not found, create new user + auth_provider inside a transaction
    const newUser = await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.create({
        data: {
          telegramId: telegramId, // nullable, but we can set it
          telegramUsername: username,
          displayName: firstName || username || 'User',
        },
      });

      await tx.authProvider.create({
        data: {
          userId: user.id,
          provider: 'telegram',
          providerUserId: telegramId,
          // Optionally, store the full ctx.from object as metadata
        },
      });

      return user;
    });

    authLogger.info({ userId: newUser.id, telegramId }, 'Created new user');
    ctx.user = newUser;
  } catch (error) {
    authLogger.error({ error, telegramId }, 'Failed to authenticate or create user');
    // Proceed without setting ctx.user, or consider throwing/handling appropriately depending on strictness
    // Usually, we want to let errorMiddleware catch it, but throwing here might break updates if not careful
    throw error;
  }

  await next();
}
