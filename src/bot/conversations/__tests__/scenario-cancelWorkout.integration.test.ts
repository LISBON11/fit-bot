import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import type { Bot } from 'grammy';
import { session } from 'grammy';
import { conversations, createConversation } from '@grammyjs/conversations';
import type { CustomContext } from '../../types.js';

import {
  mockWorkoutService,
  mockUserService,
  mockNluParser,
  ChatSimulator,
  setupTestBot,
  mockTelegramUtils,
  mockUserContextService,
} from './_testUtils.js';

const { newWorkout } = await import('../newWorkout.js');
const { cancelWorkoutFlow } = await import('../../utils/cancelFlow.js');
const { CANCEL_WORKOUT_CALLBACK } = await import('../../utils/progressTracker.js');

describe('Сценарий: Отмена создания тренировки', () => {
  let bot: Bot<CustomContext>;
  let chat: ChatSimulator;

  beforeEach(() => {
    jest.clearAllMocks();
    chat = new ChatSimulator();

    bot = setupTestBot(chat);

    bot.use(session({ initial: () => ({}) }));
    bot.use(conversations());
    bot.use(createConversation(newWorkout));

    // Настраиваем callback отмены
    bot.callbackQuery(CANCEL_WORKOUT_CALLBACK, async (ctx) => {
      if (ctx.from) {
        // Мы передаем bot.api прямо в ctx, так как ChatSimulator к нему подключен
        await cancelWorkoutFlow({ ctx, userId: ctx.from.id });
      }
    });

    bot.on('message:text', async (ctx) => {
      ctx.user = { id: 'db-user-123' } as unknown as CustomContext['user'];
      await ctx.conversation.enter('newWorkout');
    });

    bot.on('message:voice', async (ctx) => {
      ctx.user = { id: 'db-user-123' } as unknown as CustomContext['user'];
      await ctx.conversation.enter('newWorkout');
    });

    // Настраиваем фейковый storage для userContext
    let fakeRedisContext: Record<string, unknown> = {};
    mockUserContextService.saveUserContext.mockImplementation(async (userId, data) => {
      fakeRedisContext = { ...fakeRedisContext, ...(data as Record<string, unknown>) };
    });
    mockUserContextService.getUserContext.mockImplementation(async () => fakeRedisContext);
    mockUserContextService.clearUserContext.mockImplementation(async () => {
      fakeRedisContext = {};
    });
  });

  it('Отмена во время распознавания голоса (STT)', async () => {
    mockUserService.getOrCreateByTelegram.mockResolvedValue({ id: 'db-user-123' });

    let resolveStt: (v: string) => void = () => {};
    mockTelegramUtils.downloadAndTranscribeVoice.mockImplementation(() => {
      return new Promise((r) => {
        resolveStt = r;
      });
    });

    // Отправляем аудио (STT повисает)
    const updatePromise = bot.handleUpdate({
      update_id: 1,
      message: {
        message_id: 10,
        date: Date.now() / 1000,
        chat: { id: 111, type: 'private', first_name: 'Test' },
        from: { id: 111, is_bot: false, first_name: 'Test' },
        voice: {
          file_id: 'voice_123',
          file_unique_id: 'voice_123_unique',
          duration: 5,
        },
      },
    });

    // Даем микротаскам отработать (чтобы трекер отправился и записал activeStatusMessage)
    await new Promise(setImmediate);

    // Симулируем нажатие кнопки Отмена
    await bot.handleUpdate({
      update_id: 2,
      callback_query: {
        id: 'cq-cancel',
        from: { id: 111, is_bot: false, first_name: 'Test' },
        message: {
          message_id: chat.messages[0].message_id,
          date: Date.now() / 1000,
          chat: { id: 111, type: 'private', first_name: 'Test' },
          text: 'Tracker text',
        },
        chat_instance: '1',
        data: CANCEL_WORKOUT_CALLBACK,
      },
    });

    // Теперь разрешаем STT
    if (resolveStt) resolveStt('распознанный текст из голосового');
    await updatePromise;

    // В чате отправился только трекер, превью не отрисовано
    const smMessages = chat.messages.filter((m) => m.type === 'sendMessage');
    expect(smMessages.length).toBe(1);

    // Проверяем, что трекер был изменён на "❌ Отмена..." (самое свежее изменение)
    const editMessages = chat.messages.filter(
      (m) => m.type === 'editMessageText' && m.message_id === smMessages[0].message_id,
    );
    expect(editMessages.length).toBeGreaterThan(0);
    const lastEdit = editMessages[editMessages.length - 1];
    expect(lastEdit.text).toContain('❌ Отмена...');
    // Проверяем, что инлайн-клавиатура (с кнопкой отмены) удалена у статус-сообщения
    expect(lastEdit.reply_markup?.inline_keyboard?.length).toBe(0);
  });

  it('Отмена во время запроса к NLU', async () => {
    mockUserService.getOrCreateByTelegram.mockResolvedValue({ id: 'db-user-123' });

    let resolveNlu: (v: unknown) => void = () => {};
    mockNluParser.parse.mockImplementation(() => {
      return new Promise((r) => {
        resolveNlu = r;
      });
    });

    // Оправляем текст (NLU повисает)
    const updatePromise = bot.handleUpdate({
      update_id: 3,
      message: {
        message_id: 11,
        date: Date.now() / 1000,
        chat: { id: 111, type: 'private', first_name: 'Test' },
        from: { id: 111, is_bot: false, first_name: 'Test' },
        text: 'сегодня жал от груди',
      },
    });

    await new Promise(setImmediate);

    // Симулируем нажатие Отмена
    await bot.handleUpdate({
      update_id: 4,
      callback_query: {
        id: 'cq-cancel-2',
        from: { id: 111, is_bot: false, first_name: 'Test' },
        message: {
          message_id: chat.messages[0].message_id,
          date: Date.now() / 1000,
          chat: { id: 111, type: 'private', first_name: 'Test' },
          text: 'Tracker text',
        },
        chat_instance: '1',
        data: CANCEL_WORKOUT_CALLBACK,
      },
    });

    if (resolveNlu) {
      resolveNlu({
        location: 'Gym',
        exercises: [{ originalName: 'Bench press', sets: [] }],
      });
    }
    await updatePromise;

    // Проверяем: NLU отработал, создание прервалось
    expect(mockNluParser.parse).toHaveBeenCalled();
    expect(mockWorkoutService.createDraft).not.toHaveBeenCalled();
    expect(mockWorkoutService.getDraftForUser).not.toHaveBeenCalled();

    const smMessages = chat.messages.filter((m) => m.type === 'sendMessage');
    expect(smMessages.length).toBe(1);

    const editMessages = chat.messages.filter(
      (m) => m.type === 'editMessageText' && m.message_id === smMessages[0].message_id,
    );
    expect(editMessages.length).toBeGreaterThan(0);
    const lastEdit = editMessages[editMessages.length - 1];
    expect(lastEdit.text).toContain('❌ Отмена...');
  });
});
