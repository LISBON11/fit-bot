import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import type { DeepMockProxy } from 'jest-mock-extended';
import { createMockCtx } from '../../__tests__/utils/mockCtx.js';
import type { CustomContext } from '../../types.js';

// 1. Сначала описываем моки
jest.unstable_mockModule('../../../services/index.js', () => ({
  workoutService: {
    findById: jest.fn(),
    cancelDraft: jest.fn(),
  },
}));

jest.unstable_mockModule('../userContext.js', () => ({
  getUserContext: jest.fn().mockResolvedValue({} as never),
  clearUserContext: jest.fn().mockResolvedValue(undefined as never),
}));

jest.unstable_mockModule('../processingLock.js', () => ({
  unlockUser: jest.fn().mockResolvedValue(undefined as never),
}));

// 2. Импортируем тестируемый модуль и моки ПОСЛЕ unstable_mockModule
const { cancelWorkoutFlow } = await import('../cancelFlow.js');
const { workoutService } = await import('../../../services/index.js');
const { getUserContext, clearUserContext } = await import('../userContext.js');
const { unlockUser } = await import('../processingLock.js');

describe('cancelWorkoutFlow', () => {
  let mockCtx: DeepMockProxy<CustomContext>;
  const userId = 12345;

  beforeEach(() => {
    mockCtx = createMockCtx({
      from: { id: userId, is_bot: false, first_name: 'Test' },
    });
    jest.clearAllMocks();
  });

  it('должен корректно провести отмену при наличии статус-сообщения и черновика', async () => {
    const chatId = 555;
    const statusMsgId = 666;
    const previewMsgId = 777;
    const draftId = 'draft-123';

    mockCtx = createMockCtx({
      from: { id: userId, is_bot: false, first_name: 'Test' },
      chat: { id: chatId, type: 'private', first_name: 'Test' },
    });

    (getUserContext as unknown as jest.Mock).mockResolvedValue({
      activeStatusMessage: { chatId, messageId: statusMsgId },
      currentDraftId: draftId,
    } as never);

    (workoutService.findById as unknown as jest.Mock).mockResolvedValue({
      id: draftId,
      previewMessageId: previewMsgId,
    } as never);

    await cancelWorkoutFlow({ ctx: mockCtx, userId });

    // Проверяем UI
    expect(mockCtx.api.editMessageText).toHaveBeenCalledWith(
      chatId,
      statusMsgId,
      '❌ Отмена...',
      expect.any(Object),
    );

    // Проверяем выход из диалога
    expect(mockCtx.conversation.exit).toHaveBeenCalledWith('newWorkout');
    expect(mockCtx.conversation.exit).toHaveBeenCalledWith('editWorkout');

    // Проверяем удаление сообщений и черновика
    expect(mockCtx.api.deleteMessage).toHaveBeenCalledWith(chatId, previewMsgId);
    expect(workoutService.cancelDraft).toHaveBeenCalledWith(draftId);

    // Проверяем очистку контекста и блокировки
    expect(clearUserContext).toHaveBeenCalledWith(userId);
    expect(unlockUser).toHaveBeenCalledWith(userId);
  });

  it('должен просто отправить сообщение об отмене, если нет статус-сообщения', async () => {
    (getUserContext as unknown as jest.Mock).mockResolvedValue({} as never);

    await cancelWorkoutFlow({ ctx: mockCtx, userId });

    expect(mockCtx.reply).toHaveBeenCalledWith('❌ Отмена...');
    expect(mockCtx.api.editMessageText).not.toHaveBeenCalled();
  });

  it('не должен пытаться удалить превью, если его нет в черновике', async () => {
    (getUserContext as unknown as jest.Mock).mockResolvedValue({ currentDraftId: 'd1' } as never);
    (workoutService.findById as unknown as jest.Mock).mockResolvedValue({
      id: 'd1',
      previewMessageId: null,
    } as never);

    await cancelWorkoutFlow({ ctx: mockCtx, userId });

    expect(mockCtx.api.deleteMessage).not.toHaveBeenCalled();
    expect(workoutService.cancelDraft).toHaveBeenCalledWith('d1');
  });

  it('должен игнорировать ошибки при обновлении UI и продолжать отмену', async () => {
    (getUserContext as unknown as jest.Mock).mockResolvedValue({ currentDraftId: 'd1' } as never);
    (workoutService.findById as unknown as jest.Mock).mockResolvedValue({ id: 'd1' } as never);
    mockCtx.reply.mockRejectedValue(new Error('Telegram error') as never);

    await expect(cancelWorkoutFlow({ ctx: mockCtx, userId })).resolves.not.toThrow();

    expect(workoutService.cancelDraft).toHaveBeenCalledWith('d1');
    expect(clearUserContext).toHaveBeenCalledWith(userId);
    expect(unlockUser).toHaveBeenCalledWith(userId);
  });
});
