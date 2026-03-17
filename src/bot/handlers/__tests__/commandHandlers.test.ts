import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { createMockCtx } from '../../__tests__/utils/mockCtx.js';
import type { DeepMockProxy } from 'jest-mock-extended';
import type { CustomContext } from '../../types.js';
import type { User } from '../../../generated/prisma/index.js';

// 1. Сначала мокируем
jest.unstable_mockModule('../../utils/cancelFlow.js', () => ({
  cancelWorkoutFlow: jest.fn(),
}));

jest.unstable_mockModule('../../utils/conversationHelpers.js', () => ({
  enterWithLock: jest.fn(),
}));

// 2. Импортируем тестируемые хэндлеры ПОСЛЕ моков
const { handleStart, handleHelp, handleCancel, handleEdit } = await import('../commandHandlers.js');
const { cancelWorkoutFlow } = await import('../../utils/cancelFlow.js');
const { enterWithLock } = await import('../../utils/conversationHelpers.js');

describe('Command Handlers', () => {
  let mockCtx: DeepMockProxy<CustomContext>;

  beforeEach(() => {
    mockCtx = createMockCtx({
      user: {
        id: 'u1',
        telegramId: '123',
        displayName: 'John Doe',
        telegramUsername: 'johndoe',
      } as User,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleStart', () => {
    it('должен приветствовать пользователя по имени из базы', async () => {
      await handleStart(mockCtx);
      expect(mockCtx.reply).toHaveBeenCalledWith(expect.stringContaining('Привет, John Doe! 👋'));
    });

    it('должен приветствовать по имени из Telegram, если нет имени в БД', async () => {
      mockCtx.user = undefined;
      await handleStart(mockCtx);
      expect(mockCtx.reply).toHaveBeenCalledWith(expect.stringContaining('Привет, Test! 👋'));
    });

    it('должен использовать дефолтное имя "Спортсмен", если нет никаких имен', async () => {
      mockCtx.user = undefined;
      if (mockCtx.from) mockCtx.from.first_name = '';
      await handleStart(mockCtx);
      expect(mockCtx.reply).toHaveBeenCalledWith(expect.stringContaining('Привет, Спортсмен! 👋'));
    });
  });

  describe('handleHelp', () => {
    it('должен отправлять инструкцию по использованию', async () => {
      await handleHelp(mockCtx);
      expect(mockCtx.reply).toHaveBeenCalledWith(
        expect.stringContaining('Как использовать FitBot:'),
        { parse_mode: 'Markdown' },
      );
    });
  });

  describe('handleCancel', () => {
    it('должен вызывать cancelWorkoutFlow с правильными параметрами', async () => {
      await handleCancel(mockCtx);

      expect(cancelWorkoutFlow).toHaveBeenCalledWith({
        ctx: mockCtx,
        userId: mockCtx.from?.id,
      });
    });
  });

  describe('handleEdit', () => {
    it('должен вызывать enterWithLock с правильными параметрами', async () => {
      await handleEdit(mockCtx);

      expect(enterWithLock).toHaveBeenCalledWith({
        ctx: mockCtx,
        conversationName: 'editWorkout',
      });
    });

    it('не должен ничего делать, если нет userId', async () => {
      const mockCtxNoUser = createMockCtx({ from: undefined });
      await handleEdit(mockCtxNoUser);
      expect(enterWithLock).not.toHaveBeenCalled();
    });
  });
});
