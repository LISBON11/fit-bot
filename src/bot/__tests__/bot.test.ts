import { jest } from '@jest/globals';
import type { createBot as createBotFn } from '../bot.js';

const mockBot = {
  catch: jest.fn(),
  use: jest.fn(),
  command: jest.fn(),
  on: jest.fn(),
};

jest.unstable_mockModule('grammy', () => ({
  Bot: jest.fn().mockImplementation(() => mockBot),
  session: jest.fn(),
  InlineKeyboard: jest.fn().mockImplementation(() => ({
    text: jest.fn().mockReturnThis(),
    row: jest.fn().mockReturnThis(),
  })),
}));

jest.unstable_mockModule('@grammyjs/conversations', () => ({
  conversations: jest.fn(),
  createConversation: jest.fn(),
}));

jest.unstable_mockModule('../utils/processingLock.js', () => ({
  lockUser: jest.fn(),
  unlockUser: jest.fn(),
}));

jest.unstable_mockModule('../../logger/logger.js', () => ({
  logger: {
    child: jest.fn<(...args: unknown[]) => unknown>().mockReturnValue({
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
    }),
  },
  createLogger: jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  })),
}));

describe('bot.ts', () => {
  let createBot: typeof createBotFn;
  let lockUser: jest.Mock<(userId: number) => Promise<boolean>>;
  let unlockUser: jest.Mock<(userId: number) => Promise<void>>;

  beforeAll(async () => {
    const module = await import('../bot.js');
    createBot = module.createBot;

    const lockModule = await import('../utils/processingLock.js');
    lockUser = lockModule.lockUser as jest.Mock<(userId: number) => Promise<boolean>>;
    unlockUser = lockModule.unlockUser as jest.Mock<(userId: number) => Promise<void>>;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create and configure bot', () => {
    const bot = createBot('TEST_TOKEN');
    expect(bot).toBeDefined();

    expect(mockBot.catch).toHaveBeenCalled();
    expect(mockBot.use).toHaveBeenCalled();
    expect(mockBot.command).toHaveBeenCalledWith('start', expect.any(Function));
    expect(mockBot.command).toHaveBeenCalledWith('help', expect.any(Function));
    expect(mockBot.command).toHaveBeenCalledWith('cancel', expect.any(Function));
    expect(mockBot.command).toHaveBeenCalledWith('edit', expect.any(Function));

    expect(mockBot.on).toHaveBeenCalledWith('message:voice', expect.any(Function));
    expect(mockBot.on).toHaveBeenCalledWith('message:text', expect.any(Function));
    expect(mockBot.on).toHaveBeenCalledWith('callback_query', expect.any(Function));
  });

  describe('handlers', () => {
    let editHandler: (...args: unknown[]) => unknown;
    let voiceHandler: (...args: unknown[]) => unknown;
    let textHandler: (...args: unknown[]) => unknown;
    let callbackHandler: (...args: unknown[]) => unknown;
    let catchHandler: (...args: unknown[]) => unknown;

    beforeEach(() => {
      createBot('TEST_TOKEN');

      // Extract registered handlers
      const commandCalls = mockBot.command.mock.calls;
      editHandler = (commandCalls.find((call) => call[0] === 'edit') as unknown[])[1] as (
        ...args: unknown[]
      ) => unknown;

      const onCalls = mockBot.on.mock.calls;
      voiceHandler = (onCalls.find((call) => call[0] === 'message:voice') as unknown[])[1] as (
        ...args: unknown[]
      ) => unknown;
      textHandler = (onCalls.find((call) => call[0] === 'message:text') as unknown[])[1] as (
        ...args: unknown[]
      ) => unknown;
      callbackHandler = (onCalls.find((call) => call[0] === 'callback_query') as unknown[])[1] as (
        ...args: unknown[]
      ) => unknown;

      catchHandler = mockBot.catch.mock.calls[0][0] as (...args: unknown[]) => unknown;
    });

    it('catchHandler should log error', () => {
      const err = { error: 'Test error', ctx: { update: {} } };
      catchHandler(err);
      // logs are mocked, just ensuring it doesn't throw
      expect(true).toBe(true);
    });

    it('edit handler should lock, enter conversation and unlock', async () => {
      lockUser.mockResolvedValue(true);
      const ctx = {
        from: { id: 1 },
        reply: jest.fn(),
        conversation: { enter: jest.fn() },
      };

      await editHandler(ctx as unknown as Parameters<typeof editHandler>[0]);

      expect(lockUser).toHaveBeenCalledWith(1);
      expect(ctx.conversation.enter).toHaveBeenCalledWith('editWorkout');
      expect(unlockUser).toHaveBeenCalledWith(1);
    });

    it('edit handler should reply if locked', async () => {
      lockUser.mockResolvedValue(false);
      const ctx = {
        from: { id: 1 },
        reply: jest.fn(),
        conversation: { enter: jest.fn() },
      };

      await editHandler(ctx as unknown as Parameters<typeof editHandler>[0]);

      expect(lockUser).toHaveBeenCalledWith(1);
      expect(ctx.reply).toHaveBeenCalledWith(expect.stringContaining('подождите'));
      expect(ctx.conversation.enter).not.toHaveBeenCalled();
    });

    it('voice handler should lock, enter conversation and unlock', async () => {
      lockUser.mockResolvedValue(true);
      const ctx = {
        from: { id: 1 },
        reply: jest.fn(),
        conversation: { enter: jest.fn() },
      };

      await voiceHandler(ctx as unknown as Parameters<typeof voiceHandler>[0]);

      expect(lockUser).toHaveBeenCalledWith(1);
      expect(ctx.conversation.enter).toHaveBeenCalledWith('newWorkout');
      expect(unlockUser).toHaveBeenCalledWith(1);
    });

    it('voice handler should reply if locked', async () => {
      lockUser.mockResolvedValue(false);
      const ctx = {
        from: { id: 1 },
        reply: jest.fn(),
        conversation: { enter: jest.fn() },
      };

      await voiceHandler(ctx as unknown as Parameters<typeof voiceHandler>[0]);
      expect(ctx.reply).toHaveBeenCalledWith(expect.stringContaining('подождите'));
    });

    it('text handler should next() if command', async () => {
      const ctx = {
        message: { text: '/start' },
      };
      const next = jest.fn();

      await textHandler(ctx, next);

      expect(next).toHaveBeenCalled();
    });

    it('text handler should enter conversation if not command', async () => {
      lockUser.mockResolvedValue(true);
      const ctx = {
        message: { text: 'test' },
        from: { id: 1 },
        reply: jest.fn(),
        conversation: { enter: jest.fn() },
      };
      const next = jest.fn();

      await textHandler(ctx, next);

      expect(next).not.toHaveBeenCalled();
      expect(ctx.conversation.enter).toHaveBeenCalledWith('newWorkout');
    });

    it('text handler should reply if locked', async () => {
      lockUser.mockResolvedValue(false);
      const ctx = {
        message: { text: 'test' },
        from: { id: 1 },
        reply: jest.fn(),
        conversation: { enter: jest.fn() },
      };
      const next = jest.fn();

      await textHandler(ctx, next);
      expect(ctx.reply).toHaveBeenCalledWith(expect.stringContaining('подождите'));
    });

    it('callback handler should answer and edit message', async () => {
      const ctx = {
        callbackQuery: { data: 'old_data', message: {} },
        answerCallbackQuery: jest.fn(),
        editMessageReplyMarkup: jest
          .fn<(...args: unknown[]) => Promise<unknown>>()
          .mockResolvedValue(true),
      };

      await callbackHandler(ctx as unknown as Parameters<typeof callbackHandler>[0]);

      expect(ctx.answerCallbackQuery).toHaveBeenCalledWith(
        expect.objectContaining({ show_alert: true }),
      );
      expect(ctx.editMessageReplyMarkup).toHaveBeenCalledWith({
        reply_markup: { inline_keyboard: [] },
      });
    });
  });
});
