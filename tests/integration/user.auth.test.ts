import { PrismaClient } from '@prisma/client';
import { userService } from '../../src/services/index.js';

const prisma = new PrismaClient();

describe('User Authentication Integration', () => {
  const testTelegramId = 555444333n;

  test('should create user and auth provider if not exists', async () => {
    // 1. Убедимся что пользователя нет
    await prisma.authProvider.deleteMany({ where: { providerUserId: testTelegramId.toString() } });

    // 2. Авто-регистрация
    const user = await userService.getOrCreateByTelegram(
      testTelegramId.toString(),
      'new_test_username',
      'Test First Name',
    );

    expect(user).toBeDefined();
    expect(user.telegramUsername).toBe('new_test_username');

    // 3. Проверка в БД
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { authProviders: true },
    });

    expect(dbUser).toBeDefined();
    expect(dbUser?.authProviders).toHaveLength(1);
    const authProvider = dbUser?.authProviders[0];
    expect(authProvider).toBeDefined();
    expect(authProvider?.provider).toBe('telegram');
    expect(authProvider?.providerUserId).toBe(testTelegramId.toString());
  });

  test('should return existing user without creating a new one', async () => {
    // 1. Создаем пользователя первого
    const firstUser = await userService.getOrCreateByTelegram(
      testTelegramId.toString(),
      'new_test_username',
      undefined,
    );

    // 2. Идем еще раз к сервису с тем же telegramId
    const secondUser = await userService.getOrCreateByTelegram(
      testTelegramId.toString(),
      'another_username',
      undefined,
    );

    // 3. ID должен совпадать
    expect(secondUser.id).toBe(firstUser.id);

    const count = await prisma.user.count({ where: { id: firstUser.id } });
    expect(count).toBe(1);
  });
});
