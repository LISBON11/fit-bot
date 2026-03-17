import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import type { DeepMockProxy } from 'jest-mock-extended';
import { createMockCtx } from '../../__tests__/utils/mockCtx.js';
import type { CustomContext } from '../../types.js';

// 1. Описываем моки
jest.unstable_mockModule('../processingLock.js', () => ({
  lockUser: jest.fn(),
  unlockUser: jest.fn(),
}));

// 2. Импортируем ПОСЛЕ моков
const { enterWithLock } = await import('../conversationHelpers.js');
const { lockUser, unlockUser } = await import('../processingLock.js');

describe('enterWithLock', () => {
  let mockCtx: DeepMockProxy<CustomContext>;
  const userId = 12345;
  const conversationName = 'testConversation';

  beforeEach(() => {
    mockCtx = createMockCtx({
      from: { id: userId, is_bot: false, first_name: 'Test' },
    });
    jest.clearAllMocks();
  });

  it('должен войти в диалог при успехе блокировки и разблокировать', async () => {
    (lockUser as unknown as jest.Mock).mockResolvedValue(true as never);
    (unlockUser as unknown as jest.Mock).mockResolvedValue(undefined as never);

    await enterWithLock({ ctx: mockCtx, conversationName });

    expect(lockUser).toHaveBeenCalledWith(userId);
    expect(mockCtx.conversation.enter).toHaveBeenCalledWith(conversationName);
    expect(unlockUser).toHaveBeenCalledWith(userId);
  });

  it('должен отправить сообщение об ожидании, если блокировка не удалась', async () => {
    (lockUser as unknown as jest.Mock).mockResolvedValue(false as never);

    await enterWithLock({ ctx: mockCtx, conversationName });

    expect(lockUser).toHaveBeenCalledWith(userId);
    expect(mockCtx.reply).toHaveBeenCalledWith(expect.stringContaining('подождите'));
    expect(mockCtx.conversation.enter).not.toHaveBeenCalled();
    expect(unlockUser).not.toHaveBeenCalled();
  });

  it('должен использовать пользовательское сообщение об ошибке', async () => {
    (lockUser as unknown as jest.Mock).mockResolvedValue(false as never);
    const customMessage = 'СТОЙ! ЖДИ!';

    await enterWithLock({ ctx: mockCtx, conversationName, errorMessage: customMessage });

    expect(mockCtx.reply).toHaveBeenCalledWith(customMessage);
  });

  it('должен разблокировать пользователя даже при ошибке входа в диалог', async () => {
    (lockUser as unknown as jest.Mock).mockResolvedValue(true as never);
    (mockCtx.conversation.enter as unknown as jest.Mock).mockRejectedValue(
      new Error('Conversation error') as never,
    );

    await enterWithLock({ ctx: mockCtx, conversationName });

    expect(mockCtx.conversation.enter).toHaveBeenCalled();
    expect(mockCtx.reply).toHaveBeenCalledWith(
      '❌ Произошла ошибка при запуске процесса, попробуйте еще раз.',
    );
    expect(unlockUser).toHaveBeenCalledWith(userId);
  });
});
