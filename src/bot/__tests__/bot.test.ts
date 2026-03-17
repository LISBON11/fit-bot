import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// 1. Описываем моки всех зависимостей, чтобы избежать выполнения реального кода и ошибок конфига
const mockBot = {
  catch: jest.fn(),
  use: jest.fn(),
  command: jest.fn(),
  on: jest.fn(),
  callbackQuery: jest.fn(),
};

jest.unstable_mockModule('grammy', () => ({
  Bot: jest.fn().mockImplementation(() => mockBot),
  session: jest.fn(),
  InlineKeyboard: jest.fn().mockImplementation(() => ({
    text: jest.fn().mockReturnThis(),
    row: jest.fn().mockReturnThis(),
  })),
}));

jest.unstable_mockModule('@grammyjs/storage-redis', () => ({
  RedisAdapter: jest.fn().mockImplementation(() => ({})),
}));

jest.unstable_mockModule('@grammyjs/conversations', () => ({
  conversations: jest.fn(),
  createConversation: jest.fn(),
}));

jest.unstable_mockModule('../../config/redis.js', () => ({
  getRedisClient: jest.fn().mockReturnValue({}),
}));

jest.unstable_mockModule('../../logger/logger.js', () => ({
  logger: {
    child: jest.fn().mockReturnValue({
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
    }),
  },
  createLogger: jest.fn().mockReturnValue({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  }),
}));

// Хэндлеры и хелперы
jest.unstable_mockModule('../handlers/commandHandlers.js', () => ({
  handleStart: jest.fn(),
  handleHelp: jest.fn(),
  handleCancel: jest.fn(),
  handleEdit: jest.fn(),
}));

jest.unstable_mockModule('../handlers/callbackHandlers.js', () => ({
  handleCancelWorkoutCallback: jest.fn(),
}));

jest.unstable_mockModule('../utils/conversationHelpers.js', () => ({
  enterWithLock: jest.fn(),
}));

// Конво (пустые функции)
jest.unstable_mockModule('../conversations/newWorkout.js', () => ({
  newWorkout: jest.fn(),
}));
jest.unstable_mockModule('../conversations/editWorkout.js', () => ({
  editWorkout: jest.fn(),
}));

// 2. Импортируем тестируемый модуль ПОСЛЕ моков
const { createBot } = await import('../bot.js');
const { handleEdit } = await import('../handlers/commandHandlers.js');
const { enterWithLock } = await import('../utils/conversationHelpers.js');

describe('bot.ts construction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('должен корректно создать бота и зарегистрировать все плагины и хэндлеры', () => {
    const bot = createBot('TEST_TOKEN');
    expect(bot).toBeDefined();

    // Плагины
    expect(mockBot.use).toHaveBeenCalled();
    expect(mockBot.catch).toHaveBeenCalled();

    // Команды
    expect(mockBot.command).toHaveBeenCalledWith('start', expect.any(Function));
    expect(mockBot.command).toHaveBeenCalledWith('help', expect.any(Function));
    expect(mockBot.command).toHaveBeenCalledWith('cancel', expect.any(Function));
    expect(mockBot.command).toHaveBeenCalledWith('edit', expect.any(Function));

    // Коллбеки
    expect(mockBot.callbackQuery).toHaveBeenCalledWith(
      expect.any(String), // CANCEL_WORKOUT_CALLBACK
      expect.any(Function),
    );

    // События
    expect(mockBot.on).toHaveBeenCalledWith('message:voice', expect.any(Function));
    expect(mockBot.on).toHaveBeenCalledWith('message:text', expect.any(Function));
    expect(mockBot.on).toHaveBeenCalledWith('callback_query', expect.any(Function));
  });

  describe('интеграция хэндлеров через bot.ts', () => {
    it('команда /edit должна использовать хэндлер handleEdit', async () => {
      createBot('TEST_TOKEN');
      expect(mockBot.command).toHaveBeenCalledWith('edit', handleEdit);
    });

    it('обработчик message:voice должен вызывать enterWithLock', async () => {
      createBot('TEST_TOKEN');
      const voiceHandlerCall = mockBot.on.mock.calls.find((call) => call[0] === 'message:voice');
      if (!voiceHandlerCall) throw new Error('Voice handler not found');
      const voiceHandler = voiceHandlerCall[1] as (ctx: unknown) => Promise<void>;
      const ctx = { from: { id: 1 } };

      await voiceHandler(ctx);

      expect(enterWithLock).toHaveBeenCalledWith({
        ctx,
        conversationName: 'newWorkout',
        errorMessage: expect.any(String),
      });
    });

    it('обработчик message:text должен вызывать enterWithLock (если не команда)', async () => {
      createBot('TEST_TOKEN');
      const textHandlerCall = mockBot.on.mock.calls.find((call) => call[0] === 'message:text');
      if (!textHandlerCall) throw new Error('Text handler not found');
      const textHandler = textHandlerCall[1] as (
        ctx: unknown,
        next?: () => Promise<void>,
      ) => Promise<void>;
      const next = jest.fn(async () => {});
      const ctx = { message: { text: 'Привет' }, from: { id: 1 } };

      await textHandler(ctx, next);

      expect(enterWithLock).toHaveBeenCalledWith({
        ctx,
        conversationName: 'newWorkout',
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('обработчик message:text должен пропускать команды через next()', async () => {
      createBot('TEST_TOKEN');
      const textHandlerCallForCommand = mockBot.on.mock.calls.find(
        (call) => call[0] === 'message:text',
      );
      if (!textHandlerCallForCommand) throw new Error('Text handler (command) not found');
      const textHandler = textHandlerCallForCommand[1] as (
        ctx: unknown,
        next?: () => Promise<void>,
      ) => Promise<void>;
      const next = jest.fn(async () => {});
      const ctx = { message: { text: '/any_command' } };

      await textHandler(ctx, next);

      expect(next).toHaveBeenCalled();
      expect(enterWithLock).not.toHaveBeenCalled();
    });
  });
});
