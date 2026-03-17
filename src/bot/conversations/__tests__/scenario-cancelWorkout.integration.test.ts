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

    // Обычный тестовый слушатель
    bot.on('message:text', async (ctx) => {
      ctx.user = { id: 'db-user-123' } as unknown as CustomContext['user'];
      await ctx.conversation.enter('newWorkout');
    });

    bot.on('message:voice', async (ctx) => {
      ctx.user = { id: 'db-user-123' } as unknown as CustomContext['user'];
      await ctx.conversation.enter('newWorkout');
    });

    // Дефолтный корректный контекст пользователя (не отменен)
    mockUserContextService.getUserContext.mockResolvedValue({
      activeStatusMessage: { chatId: 111, messageId: 999 },
    });
  });

  it('Отмена во время распознавания голоса (STT)', async () => {
    mockUserService.getOrCreateByTelegram.mockResolvedValue({ id: 'db-user-123' });

    // Эмулируем задержку STT и то, что пользователь в это время нажал "Отмена"
    mockTelegramUtils.downloadAndTranscribeVoice.mockImplementation(async () => {
      // Имитируем, что статус отменён к моменту завершения STT
      mockUserContextService.getUserContext.mockResolvedValue({
        activeStatusMessage: undefined, // Ключевой маркер отмены
      });
      return 'распознанный текст из голосового';
    });

    await bot.handleUpdate({
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

    // Проверяем, что парсер NLU не был вызван, так как мы прервали процесс после STT
    expect(mockTelegramUtils.downloadAndTranscribeVoice).toHaveBeenCalled();
    expect(mockNluParser.parse).not.toHaveBeenCalled();
    expect(mockWorkoutService.createDraft).not.toHaveBeenCalled();

    // Проверяем, что отправилось только сообщение со статусом STT,
    // и превью или другие сообщения не появлялись
    const replies = chat.messages.filter((m) => m.type === 'sendMessage');
    expect(replies.length).toBe(1); // Только трекер "Распознаю голос..."
  });

  it('Отмена во время запроса к NLU', async () => {
    mockUserService.getOrCreateByTelegram.mockResolvedValue({ id: 'db-user-123' });

    // NLU парсер возвращает готовую тренировку, но эмулируем отмену в процессе
    mockNluParser.parse.mockImplementation(async () => {
      // Имитируем, что в процессе парсинга (занимает время) стаус был отменён
      mockUserContextService.getUserContext.mockResolvedValue({
        currentDraftId: 'draft-1',
        activeStatusMessage: undefined, // Ключевой маркер отмены
      });

      return {
        location: 'Gym',
        exercises: [{ originalName: 'Bench press', sets: [] }],
      };
    });

    mockWorkoutService.createDraft.mockResolvedValue({
      status: 'created',
      workout: { id: 'draft-1' },
    });

    await bot.handleUpdate({
      update_id: 2,
      message: {
        message_id: 11,
        date: Date.now() / 1000,
        chat: { id: 111, type: 'private', first_name: 'Test' },
        from: { id: 111, is_bot: false, first_name: 'Test' },
        text: 'сегодня жал от груди',
      },
    });

    // Проверяем: NLU отработал, процесс прервался
    expect(mockNluParser.parse).toHaveBeenCalled();
    expect(mockWorkoutService.createDraft).not.toHaveBeenCalled();

    // getDraftForUser (для превью) вызван не был, потому что процесс прервался
    expect(mockWorkoutService.getDraftForUser).not.toHaveBeenCalled();

    // В чате только трекер, превью не отрисовано
    const smMessages = chat.messages.filter((m) => m.type === 'sendMessage');
    expect(smMessages.length).toBe(0); // Трекер для текста не инициализируется

    // Не должно быть editMessageText с превью тренировки
    const editMessages = chat.messages.filter((m) => m.type === 'editMessageText');
    // Могли быть эдиты от трекера, но никаких кнопок вроде 'appr:draft-1'
    expect(
      editMessages.some((m) =>
        m.reply_markup?.inline_keyboard?.some((row) =>
          row.some((btn) => btn.callback_data === 'appr:draft-1'),
        ),
      ),
    ).toBe(false);
  });
});
