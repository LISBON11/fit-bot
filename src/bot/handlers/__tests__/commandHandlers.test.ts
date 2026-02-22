import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import type { CustomContext } from '../../types.js';
import type { User } from '@prisma/client';
import { handleStart, handleHelp, handleCancel } from '../commandHandlers.js';
import { createMockCtx } from '../../__tests__/utils/mockCtx.js';

describe('Command Handlers', () => {
  let mockCtx: Partial<CustomContext>;

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
      await handleStart(mockCtx as CustomContext);
      expect(mockCtx.reply).toHaveBeenCalledWith(expect.stringContaining('Привет, John Doe! 👋'));
    });

    it('должен приветствовать по имени из Telegram, если нет имени в БД', async () => {
      mockCtx.user = undefined;
      await handleStart(mockCtx as CustomContext);
      expect(mockCtx.reply).toHaveBeenCalledWith(expect.stringContaining('Привет, Test! 👋'));
    });

    it('должен использовать дефолтное имя "Спортсмен", если нет никаких имен', async () => {
      mockCtx.user = undefined;
      if (mockCtx.from) mockCtx.from.first_name = '';
      await handleStart(mockCtx as CustomContext);
      expect(mockCtx.reply).toHaveBeenCalledWith(expect.stringContaining('Привет, Спортсмен! 👋'));
    });
  });

  describe('handleHelp', () => {
    it('должен отправлять инструкцию по использованию', async () => {
      await handleHelp(mockCtx as CustomContext);
      expect(mockCtx.reply).toHaveBeenCalledWith(
        expect.stringContaining('Как использовать FitBot:'),
        { parse_mode: 'Markdown' },
      );
    });
  });

  describe('handleCancel', () => {
    it('должен очищать сессию и отправлять подтверждение', async () => {
      mockCtx.session = { currentDraftId: '123' };

      await handleCancel(mockCtx as CustomContext);

      expect(mockCtx.session).toEqual({});
      expect(mockCtx.reply).toHaveBeenCalledWith(expect.stringContaining('Действие отменено'));
    });
  });
});
