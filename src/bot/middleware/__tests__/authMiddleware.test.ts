import type { NextFunction } from 'grammy';
import type { CustomContext } from '../../types.js';
import { jest } from '@jest/globals';

/** Интерфейс мока Prisma клиента для тестов auth middleware */
interface MockPrismaClient {
  authProvider: {
    findUnique: jest.Mock<(...args: unknown[]) => Promise<unknown>>;
    create: jest.Mock<(...args: unknown[]) => Promise<unknown>>;
  };
  user: {
    create: jest.Mock<(...args: unknown[]) => Promise<unknown>>;
  };
  $transaction: jest.Mock<
    (callback: (tx: MockPrismaClient) => Promise<unknown>) => Promise<unknown>
  >;
}

// Мокаем получение Prisma клиента
jest.unstable_mockModule('../../../config/database.js', () => ({
  getPrismaClient: jest.fn(),
}));

const { authMiddleware } = await import('../authMiddleware.js');
const { getPrismaClient } = await import('../../../config/database.js');

describe('Auth Middleware', () => {
  let mockCtx: Partial<CustomContext>;
  let mockNext: NextFunction;
  let mockPrisma: MockPrismaClient;

  beforeEach(() => {
    mockCtx = {
      from: {
        id: 123456789,
        is_bot: false,
        first_name: 'Test',
        username: 'testuser',
      },
    };
    mockNext = jest
      .fn<() => Promise<void>>()
      .mockResolvedValue(undefined) as unknown as NextFunction;

    const authProviderFindUnique = jest.fn<(...args: unknown[]) => Promise<unknown>>();
    const authProviderCreate = jest.fn<(...args: unknown[]) => Promise<unknown>>();
    const userCreate = jest.fn<(...args: unknown[]) => Promise<unknown>>();

    const prisma: MockPrismaClient = {
      authProvider: {
        findUnique: authProviderFindUnique,
        create: authProviderCreate,
      },
      user: {
        create: userCreate,
      },
      $transaction: jest
        .fn<(callback: (tx: MockPrismaClient) => Promise<unknown>) => Promise<unknown>>()
        .mockImplementation(async (callback) => {
          return callback(prisma);
        }),
    };

    mockPrisma = prisma;

    (getPrismaClient as jest.Mock).mockReturnValue(mockPrisma);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('сохраняет существующего пользователя в контексте и вызывает next()', async () => {
    const mockUser = { id: 'user-id-1', displayName: 'Test User' };
    const mockAuthProvider = {
      userId: mockUser.id,
      user: mockUser,
    };

    mockPrisma.authProvider.findUnique.mockResolvedValue(mockAuthProvider);

    await authMiddleware(mockCtx as CustomContext, mockNext);

    expect(mockPrisma.authProvider.findUnique).toHaveBeenCalledWith({
      where: {
        provider_providerUserId: {
          provider: 'telegram',
          providerUserId: '123456789',
        },
      },
      include: { user: true },
    });
    expect(mockCtx.user).toEqual(mockUser);
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockPrisma.user.create).not.toHaveBeenCalled();
  });

  it('создает нового пользователя, если он не найден, сохраняет в контекст и вызывает next()', async () => {
    mockPrisma.authProvider.findUnique.mockResolvedValue(null);

    const newUser = {
      id: 'new-user-id',
      telegramId: '123456789',
      telegramUsername: 'testuser',
      displayName: 'Test',
    };
    mockPrisma.user.create.mockResolvedValue(newUser);
    mockPrisma.authProvider.create.mockResolvedValue({});

    await authMiddleware(mockCtx as CustomContext, mockNext);

    expect(mockPrisma.authProvider.findUnique).toHaveBeenCalled();
    expect(mockPrisma.$transaction).toHaveBeenCalledTimes(1);
    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: {
        telegramId: '123456789',
        telegramUsername: 'testuser',
        displayName: 'Test',
      },
    });
    expect(mockPrisma.authProvider.create).toHaveBeenCalledWith({
      data: {
        userId: 'new-user-id',
        provider: 'telegram',
        providerUserId: '123456789',
      },
    });
    expect(mockCtx.user).toEqual(newUser);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('пропускает обработку, если нет ctx.from', async () => {
    const ctxWithoutFrom: Partial<CustomContext> = {};

    await authMiddleware(ctxWithoutFrom as CustomContext, mockNext);

    expect(mockPrisma.authProvider.findUnique).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
