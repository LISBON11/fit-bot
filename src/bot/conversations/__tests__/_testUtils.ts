import { jest } from '@jest/globals';
import { Bot } from 'grammy';
import type { CustomContext } from '../../types.js';

// 1. Мокаем сервисы
export const mockWorkoutService = {
  getDraftForUser: jest.fn<() => Promise<unknown>>(),
  updateMessageIds: jest.fn<() => Promise<unknown>>(),
  approveDraft: jest.fn<() => Promise<unknown>>(),
  createDraft: jest.fn<() => Promise<unknown>>(),
  applyEdits: jest.fn<() => Promise<unknown>>(),
};

export const mockUserService = {
  getOrCreateByTelegram: jest.fn<() => Promise<unknown>>(),
  getById: jest.fn<() => Promise<unknown>>(),
};

export const mockExerciseService = {
  getExerciseListForNlu: jest.fn<() => Promise<unknown>>().mockResolvedValue([]),
  getAllExercises: jest.fn<() => Promise<unknown>>().mockResolvedValue([]),
  resolveExercise: jest.fn<() => Promise<unknown>>(),
  createUserExercise: jest.fn<() => Promise<unknown>>(),
  confirmMapping: jest.fn<() => Promise<unknown>>(),
};

export const mockNluParser = {
  parse: jest.fn<() => Promise<unknown>>(),
  parseEdit: jest.fn<() => Promise<unknown>>(),
};

export const mockPublisher = { publish: jest.fn<() => Promise<unknown>>() };

// Прогресс трекер использует Redis для статуса.
// Но мы можем мокнуть userContext.
export const mockUserContext = { activeStatusMessage: { chatId: 1, messageId: 999 } };

jest.unstable_mockModule('../../../services/index.js', () => ({
  workoutService: mockWorkoutService,
  userService: mockUserService,
  exerciseService: mockExerciseService,
  getNluParser: () => mockNluParser,
}));

jest.unstable_mockModule('../../../services/publisher.service.js', () => ({
  PublisherService: jest.fn(() => mockPublisher),
}));

export const mockTelegramUtils = {
  downloadAndTranscribeVoice: jest.fn<() => Promise<unknown>>(),
};

export const mockUserContextService = {
  saveUserContext: jest.fn<() => Promise<unknown>>(),
  clearUserContext: jest.fn<() => Promise<unknown>>(),
  getUserContext: jest.fn<() => Promise<unknown>>().mockResolvedValue(mockUserContext),
};

jest.unstable_mockModule('../../utils/telegram.js', () => mockTelegramUtils);
jest.unstable_mockModule('../../utils/userContext.js', () => mockUserContextService);

jest.unstable_mockModule('../../utils/processingLock.js', () => ({
  unlockUser: jest.fn<() => Promise<unknown>>().mockResolvedValue(undefined),
  lockUser: jest.fn<() => Promise<unknown>>().mockResolvedValue(true),
}));

// 2. Chat Simulator
export const EMOJI = { pending: '〇', running: '➤\u2009', done: '✔', skipped: '✖\u2009' };

export function buildExpectedTrackerText(
  statuses: {
    stt?: 'pending' | 'running' | 'done' | 'skipped';
    nlu?: 'pending' | 'running' | 'done' | 'skipped';
    exercises?: 'pending' | 'running' | 'done' | 'skipped';
    save?: 'pending' | 'running' | 'done' | 'skipped';
    clarify?: 'pending' | 'running' | 'done' | 'skipped';
    publish?: 'pending' | 'running' | 'done' | 'skipped';
  } = {},
): string {
  return [
    '<b>Обрабатываю тренировку...</b>',
    '',
    `${EMOJI[statuses.stt || 'pending']} Речь в текст`,
    `${EMOJI[statuses.nlu || 'pending']} Понимаем тренировку`,
    `${EMOJI[statuses.exercises || 'pending']} Добавляем новые упражнения`,
    `${EMOJI[statuses.save || 'pending']} Сохраняем в базу`,
    `${EMOJI[statuses.clarify || 'pending']} Уточняем детали`,
    `${EMOJI[statuses.publish || 'pending']} Публикуем в канал`,
  ].join('\n');
}

export type ChatMessageDetail = {
  type: string;
  text?: string;
  reply_markup?: { inline_keyboard?: Array<Array<{ callback_data?: string }>> };
  message_id: number;
};
export class ChatSimulator {
  messages: Array<ChatMessageDetail> = [];
  nextMessageId = 100;

  get history() {
    return this.messages;
  }

  clear() {
    this.messages = [];
    this.nextMessageId = 100;
  }
}

// 3. Инициализация мок-бота
export function setupTestBot(chat: ChatSimulator): Bot<CustomContext> {
  return new Bot<CustomContext>('dummy-token', {
    botInfo: {
      id: 12345,
      is_bot: true,
      first_name: 'Test Bot',
      username: 'test_bot',
      can_join_groups: true,
      can_read_all_group_messages: false,
      supports_inline_queries: false,
    } as unknown as CustomContext['me'],
    client: {
      fetch: async (url: string | URL | globalThis.Request, init?: globalThis.RequestInit) => {
        let p: Record<string, unknown> = {};
        if (init?.body) {
          p = JSON.parse(init.body as string);
        }
        const urlStr = url.toString();
        const id = chat.nextMessageId++;

        if (urlStr.includes('/sendMessage')) {
          chat.messages.push({
            type: 'sendMessage',
            text: (p.text as string) || '',
            reply_markup: p.reply_markup as {
              inline_keyboard?: Array<Array<{ callback_data?: string }>>;
            },
            message_id: id,
          });
          return {
            ok: true,
            status: 200,
            text: async () =>
              JSON.stringify({
                ok: true,
                result: {
                  message_id: id,
                  chat: { id: p.chat_id || 111, type: 'private', first_name: 'Test' },
                  date: Math.floor(Date.now() / 1000),
                },
              }),
            json: async () => ({
              ok: true,
              result: {
                message_id: id,
                chat: { id: p.chat_id || 111, type: 'private', first_name: 'Test' },
                date: Math.floor(Date.now() / 1000),
              },
            }),
          } as unknown as globalThis.Response;
        } else if (urlStr.includes('/editMessageText')) {
          chat.messages.push({
            type: 'editMessageText',
            text: p.text as string,
            message_id: p.message_id as number,
            reply_markup: p.reply_markup as {
              inline_keyboard?: Array<Array<{ callback_data?: string }>>;
            },
          });
          return {
            ok: true,
            status: 200,
            json: async () => ({ ok: true, result: true }),
            text: async () => JSON.stringify({ ok: true, result: true }),
          } as unknown as globalThis.Response;
        } else if (urlStr.includes('/deleteMessage')) {
          chat.messages.push({
            type: 'deleteMessage',
            message_id: p.message_id as number,
          });
          return {
            ok: true,
            status: 200,
            json: async () => ({ ok: true, result: true }),
            text: async () => JSON.stringify({ ok: true, result: true }),
          } as unknown as globalThis.Response;
        }

        return {
          ok: true,
          status: 200,
          json: async () => ({ ok: true, result: true }),
          text: async () => JSON.stringify({ ok: true, result: true }),
        } as unknown as globalThis.Response;
      },
    },
  });
}
