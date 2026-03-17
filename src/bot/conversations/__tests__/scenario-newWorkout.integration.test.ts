import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import type { Bot } from 'grammy';
import { session } from 'grammy';
import { conversations, createConversation } from '@grammyjs/conversations';
import type { CustomContext } from '../../types.js';

import {
  mockWorkoutService,
  mockUserService,
  mockNluParser,
  mockPublisher,
  ChatSimulator,
  setupTestBot,
  mockTelegramUtils,
  mockUserContextService,
  buildExpectedTrackerText,
} from './_testUtils.js';

// Импорт самой конверсации после моков
const { newWorkout } = await import('../newWorkout.js');

describe('Сценарий: Добавление классической тренировки', () => {
  let bot: Bot<CustomContext>;
  let chat: ChatSimulator;

  beforeEach(() => {
    jest.clearAllMocks();
    chat = new ChatSimulator();

    bot = setupTestBot(chat);

    bot.use(session({ initial: () => ({}) }));
    bot.use(conversations());
    bot.use(createConversation(newWorkout));

    bot.on('message:text', async (ctx) => {
      ctx.user = { id: 'db-user-123' } as unknown as CustomContext['user'];
      await ctx.conversation.enter('newWorkout');
    });

    bot.on('message:voice', async (ctx) => {
      ctx.user = { id: 'db-user-123' } as unknown as CustomContext['user'];
      await ctx.conversation.enter('newWorkout');
    });
  });

  it('Happy Path: текст -> NLU -> preview -> approve -> publish', async () => {
    // 1. Настраиваем моки
    mockUserService.getOrCreateByTelegram.mockResolvedValue({ id: 'db-user-123' });

    mockNluParser.parse.mockResolvedValue({
      location: 'Gym',
      exercises: [{ originalName: 'Bench press', sets: [] }],
    });

    mockWorkoutService.createDraft.mockResolvedValue({
      status: 'created',
      workout: { id: 'draft-1' },
    });

    mockWorkoutService.getDraftForUser.mockResolvedValue({
      id: 'draft-1',
      workoutDate: new Date(),
      location: 'Gym',
      focus: [],
      userId: 'db-user-123',
      workoutExercises: [
        {
          exercise: { canonicalName: 'Жим лежа', displayNameRu: 'Жим лежа' },
          sets: [],
          comments: [],
        },
      ],
      comments: [],
    } as never);

    mockWorkoutService.approveDraft.mockResolvedValue(true);
    mockPublisher.publish.mockResolvedValue(true);

    // 2. Симулируем отправку сообщения пользователем
    await bot.handleUpdate({
      update_id: 1,
      message: {
        message_id: 10,
        date: Date.now() / 1000,
        chat: { id: 111, type: 'private', first_name: 'Test' },
        from: { id: 111, is_bot: false, first_name: 'Test' },
        text: 'сегодня жал от груди',
      },
    });

    // 3. Проверяем сообщения после парсинга текста:
    // Теперь ProgressTracker инициализируется и для текстового ввода
    const sendMessages = chat.messages.filter((m) => m.type === 'sendMessage');
    const deleteMessages = chat.messages.filter((m) => m.type === 'deleteMessage');

    // Ожидаем 2 сообщения (Трекер + Превью)
    expect(sendMessages).toHaveLength(2);
    expect(deleteMessages).toHaveLength(0); // Трекер удаляется только после аппрува

    const trackerMessage = sendMessages[0];
    const previewMessage = sendMessages[1];

    // Убеждаемся, что так как это текст, этап STT пропущен (крестик)
    const trackerEdits = chat.messages.filter(
      (m) => m.type === 'editMessageText' && m.message_id === trackerMessage.message_id,
    );
    const lastTrackerState =
      trackerEdits.length > 0 ? trackerEdits[trackerEdits.length - 1].text : trackerMessage.text;
    expect(lastTrackerState).toContain('✖\u2009 Речь в текст');

    const inlineKeyboard = previewMessage.reply_markup?.inline_keyboard;
    expect(inlineKeyboard).toBeDefined();
    // Проверяем наличие кнопки Approve в первом ряду
    expect(inlineKeyboard?.[0]).toContainEqual(
      expect.objectContaining({ callback_data: 'appr:draft-1' }),
    );

    // 4. Имитируем нажатие "Approve" (Утвердить) на сообщении превью
    await bot.handleUpdate({
      update_id: 2,
      callback_query: {
        id: 'cq-1',
        from: { id: 111, is_bot: false, first_name: 'Test' },
        message: {
          message_id: previewMessage.message_id,
          date: Date.now() / 1000,
          chat: { id: 111, type: 'private', first_name: 'Test' },
          text: previewMessage.text,
        },
        chat_instance: '1',
        data: 'appr:draft-1',
      },
    });

    // 5. Проверки
    expect(mockWorkoutService.approveDraft).toHaveBeenCalledWith('draft-1');
    expect(mockPublisher.publish).toHaveBeenCalled();

    // 6. Убеждаемся, что трекер был удален
    const finalDeleteMessages = chat.messages.filter((m) => m.type === 'deleteMessage');
    expect(finalDeleteMessages).toHaveLength(1);
    expect(finalDeleteMessages[0].message_id).toBe(trackerMessage.message_id);

    const postApproveEdits = chat.messages.filter(
      (m) => m.type === 'editMessageText' && m.message_id === previewMessage.message_id,
    );
    expect(postApproveEdits.length).toBeGreaterThanOrEqual(1);

    const finalEdit = postApproveEdits[postApproveEdits.length - 1];
    expect(finalEdit.text).toContain('✅ <i>Тренировка успешно опубликована!</i>');
    expect(finalEdit.reply_markup?.inline_keyboard).toEqual([]);
  });

  it('Happy Path: голос (STT) -> трекер -> NLU -> preview -> approve', async () => {
    // 1. Настраиваем моки (учитываем моки для STT и контекста)
    mockUserService.getOrCreateByTelegram.mockResolvedValue({ id: 'db-user-123' });

    mockTelegramUtils.downloadAndTranscribeVoice.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      return 'сегодня жал от груди';
    });

    // Имитируем, что пользователь не отменял задачу (статус-сообщение живо)
    mockUserContextService.getUserContext.mockResolvedValue({
      activeStatusMessage: { chatId: 111, messageId: 100 },
    });

    mockNluParser.parse.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      return {
        location: 'Gym',
        exercises: [{ originalName: 'Bench press', sets: [] }],
      };
    });

    mockWorkoutService.createDraft.mockResolvedValue({
      status: 'created',
      workout: { id: 'draft-2' },
    });

    mockWorkoutService.getDraftForUser.mockResolvedValue({
      id: 'draft-2',
      workoutDate: new Date(),
      location: 'Gym',
      focus: [],
      userId: 'db-user-123',
      workoutExercises: [],
      comments: [],
    } as never);

    mockWorkoutService.approveDraft.mockResolvedValue(true);
    mockPublisher.publish.mockResolvedValue(true);

    // 2. Симулируем отправку голосового сообщения пользователем
    await bot.handleUpdate({
      update_id: 3,
      message: {
        message_id: 11,
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

    // 3. Анализируем состояние чата. Должен отработать трекер (sendMessage -> editMessageText -> deleteMessage) и потом превью
    const sendMessages = chat.messages.filter((m) => m.type === 'sendMessage');
    const deleteMessages = chat.messages.filter((m) => m.type === 'deleteMessage');
    const editMessages = chat.messages.filter((m) => m.type === 'editMessageText');

    // Ожидаем:
    // - 1 раз отправка начального статуса трекера
    // - 1 раз отправка финального превью тренировки
    // Итого 2 отправки sendMessage
    expect(sendMessages).toHaveLength(2);

    // Сообщение трекера
    const trackerMessage = sendMessages[0];
    expect(trackerMessage.text).toContain('Обрабатываю тренировку');

    // Превью тренировки
    const previewMessage = sendMessages[1];
    expect(previewMessage.text).not.toContain('Обрабатываю тренировку');

    // Трекер удаляется только после успешного аппрува, а не перед превью
    expect(deleteMessages).toHaveLength(0);

    // Трекер должен был обновить свой статус при прохождении STT и NLU
    expect(editMessages.length).toBeGreaterThanOrEqual(1);

    // 4. Имитируем нажатие "Approve" (Утвердить) на сообщении превью
    await bot.handleUpdate({
      update_id: 4,
      callback_query: {
        id: 'cq-2',
        from: { id: 111, is_bot: false, first_name: 'Test' },
        message: {
          message_id: previewMessage.message_id,
          date: Date.now() / 1000,
          chat: { id: 111, type: 'private', first_name: 'Test' },
          text: previewMessage.text,
        },
        chat_instance: '1',
        data: 'appr:draft-2',
      },
    });

    expect(mockWorkoutService.approveDraft).toHaveBeenCalledWith('draft-2');

    // 5. Проверяем сообщения после "Approve"
    // Трекер должен быть удален
    const deleteMessagesAfterApprove = chat.messages.filter((m) => m.type === 'deleteMessage');
    expect(deleteMessagesAfterApprove).toHaveLength(1);
    expect(deleteMessagesAfterApprove[0].message_id).toBe(trackerMessage.message_id);

    // Сообщение превью должно быть отредактировано на финальный текст без кнопок
    const postApproveEdits = chat.messages.filter(
      (m) => m.type === 'editMessageText' && m.message_id === previewMessage.message_id,
    );
    expect(postApproveEdits.length).toBeGreaterThanOrEqual(1);

    const finalEdit = postApproveEdits[postApproveEdits.length - 1];
    expect(finalEdit.text).toContain('✅ <i>Тренировка успешно опубликована!</i>');
    expect(finalEdit.reply_markup?.inline_keyboard).toEqual([]);
  });

  it('Отслеживание смены иконок и статусов в Progress Tracker', async () => {
    // 1. Настраиваем моки
    const { mockTelegramUtils, mockUserContextService } = await import('./_testUtils.js');
    mockUserService.getOrCreateByTelegram.mockResolvedValue({ id: 'db-user-123' });

    // Имитируем небольшие задержки для STT и NLU, чтобы трекер успел обновиться
    mockTelegramUtils.downloadAndTranscribeVoice.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 15));
      return 'распознанный текст';
    });

    mockUserContextService.getUserContext.mockResolvedValue({
      activeStatusMessage: { chatId: 111, messageId: 100 },
    });

    mockNluParser.parse.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 15));
      return { location: 'Gym', exercises: [] };
    });

    // Для ускорения теста замокаем создание и аппрув одним днем
    mockWorkoutService.createDraft.mockResolvedValue({ status: 'created', workout: { id: 'd3' } });
    mockWorkoutService.getDraftForUser.mockResolvedValue({
      id: 'd3',
      workoutDate: new Date(),
      location: 'Gym',
      focus: [],
      userId: 'user',
      workoutExercises: [],
      comments: [],
    } as never);

    const { mockPublisher } = await import('./_testUtils.js');
    mockPublisher.publish.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 15));
      return true;
    });

    // 2. Симулируем отправку голосового сообщения
    await bot.handleUpdate({
      update_id: 5,
      message: {
        message_id: 12,
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

    // Получаем сообщение превью для нажатия кнопки
    const sendMessages = chat.messages.filter((m) => m.type === 'sendMessage');
    const trackerMessage = sendMessages[0];
    const previewMessage = sendMessages[1];

    // Симулируем нажатие Approve
    await bot.handleUpdate({
      update_id: 6,
      callback_query: {
        id: 'cq-3',
        from: { id: 111, is_bot: false, first_name: 'Test' },
        message: {
          message_id: previewMessage.message_id,
          date: Date.now() / 1000,
          chat: { id: 111, type: 'private', first_name: 'Test' },
          text: previewMessage.text,
        },
        chat_instance: '1',
        data: 'appr:d3',
      },
    });

    // 3. Анализируем смену иконок в трекере

    const trackerEdits = chat.messages.filter(
      (m) => m.type === 'editMessageText' && m.message_id === trackerMessage.message_id,
    );

    // Собираем все текстовые состояния трекера в массив
    const trackerStates = [trackerMessage.text, ...trackerEdits.map((e) => e.text)];

    // 0. Начальное состояние
    expect(trackerStates).toContain(buildExpectedTrackerText({}));

    // 1. STT в running
    expect(trackerStates).toContain(buildExpectedTrackerText({ stt: 'running' }));

    // 2. Переход STT в done, NLU в running
    expect(trackerStates).toContain(buildExpectedTrackerText({ stt: 'done', nlu: 'running' }));

    // 3. Упражнения пропущены, так как у нас нет новых упражнений, а Сохранение выполнено
    expect(trackerStates).toContain(
      buildExpectedTrackerText({
        stt: 'done',
        nlu: 'done',
        exercises: 'skipped',
        save: 'done',
        clarify: 'pending',
      }),
    );

    // 4. CLARIFY (Уточняем детали) - запущен (ожидает аппрува превью)
    expect(trackerStates).toContain(
      buildExpectedTrackerText({
        stt: 'done',
        nlu: 'done',
        exercises: 'skipped',
        save: 'done',
        clarify: 'running',
      }),
    );

    // 5. CLARIFY выполнен, PUBLISH запущен
    expect(trackerStates).toContain(
      buildExpectedTrackerText({
        stt: 'done',
        nlu: 'done',
        exercises: 'skipped',
        save: 'done',
        clarify: 'done',
        publish: 'running',
      }),
    );

    // 6. PUBLISH выполнен (финальное состояние перед удалением сообщения)
    expect(trackerStates).toContain(
      buildExpectedTrackerText({
        stt: 'done',
        nlu: 'done',
        exercises: 'skipped',
        save: 'done',
        clarify: 'done',
        publish: 'done',
      }),
    );
  });
});
