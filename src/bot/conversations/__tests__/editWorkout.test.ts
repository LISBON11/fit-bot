import { jest } from '@jest/globals';
import type { editWorkout as editWorkoutFn } from '../editWorkout.js';

const mockWorkoutService = {
  findByDate: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
  findById: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
  getDraftForUser: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
  updateMessageIds: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
  approveDraft: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
  cancelDraft: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
};

const mockNluParser = {
  parseDate: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
};

const mockPublisher = {
  publish: jest.fn(),
};

jest.unstable_mockModule('../../../services/index.js', () => ({
  workoutService: mockWorkoutService,
  getNluParser: jest.fn(() => mockNluParser),
}));

jest.unstable_mockModule('../../../services/publisher.service.js', () => ({
  PublisherService: jest.fn(() => mockPublisher),
}));

jest.unstable_mockModule('../../utils/telegram.js', () => ({
  withChatAction: jest.fn(async (_ctx: unknown, _conv: unknown, work: () => unknown) => work()),
  downloadAndTranscribeVoice: jest.fn(),
}));

jest.unstable_mockModule('../../utils/workoutFlow.js', () => ({
  parseAndDisambiguateUserInput: jest.fn(),
}));

jest.unstable_mockModule('../../formatters/workoutFormatter.js', () => ({
  formatPreview: jest.fn(() => 'preview_html'),
  formatWorkoutForNlu: jest.fn(() => ({ nlu_dto: true })),
}));

describe('editWorkout conversation', () => {
  let editWorkout: typeof editWorkoutFn;

  beforeAll(async () => {
    const module = await import('../editWorkout.js');
    editWorkout = module.editWorkout as typeof editWorkoutFn;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw if no user', async () => {
    const ctx = { user: undefined };
    await expect(
      editWorkout(
        {} as unknown as Parameters<typeof editWorkoutFn>[0],
        ctx as unknown as Parameters<typeof editWorkoutFn>[1],
      ),
    ).rejects.toThrow('Пользователь не авторизован');
  });

  it('should ask for date if no match text and resolve', async () => {
    const ctx = {
      user: { id: 'u1' },
      message: { text: '/edit' },
      reply: jest
        .fn<(...args: unknown[]) => Promise<unknown>>()
        .mockResolvedValue({ message_id: 222 }),
      api: {
        deleteMessage: jest.fn<(...args: unknown[]) => Promise<unknown>>().mockResolvedValue(true),
      },
    };

    const actionCtxCancel = {
      callbackQuery: { data: 'canc:w1' },
      answerCallbackQuery: jest.fn(),
      deleteMessage: jest.fn<(...args: unknown[]) => Promise<unknown>>().mockResolvedValue(true),
    };

    const conversation = {
      external: jest.fn(async (fn: () => unknown) => fn()),
      waitFor: jest
        .fn<(...args: unknown[]) => Promise<unknown>>()
        .mockResolvedValue({ message: { text: 'вчера' } }),
      waitForCallbackQuery: jest
        .fn<(...args: unknown[]) => Promise<unknown>>()
        .mockResolvedValue(actionCtxCancel),
    };

    mockNluParser.parseDate.mockResolvedValue('2023-01-01');
    mockWorkoutService.findByDate.mockResolvedValue({ id: 'w1' });
    mockWorkoutService.findById.mockResolvedValue({ id: 'w1' });

    await editWorkout(conversation as never, ctx as never);

    expect(ctx.reply).toHaveBeenCalledWith(expect.stringContaining('Введите дату'));
    expect(mockNluParser.parseDate).toHaveBeenCalledWith('вчера', expect.any(String));
    expect(ctx.reply).toHaveBeenCalledWith('❌ Редактирование закрыто.');
  });

  it('should handle direct edit command with target and approve', async () => {
    const ctx = {
      user: { id: 'u1' },
      message: { text: '/edit вчера', message_id: 111 },
      reply: jest
        .fn<(...args: unknown[]) => Promise<unknown>>()
        .mockResolvedValue({ message_id: 222 }),
      api: {
        deleteMessage: jest.fn<(...args: unknown[]) => Promise<unknown>>().mockResolvedValue(true),
      },
    };

    const actionCtxApprove = {
      callbackQuery: { data: 'appr:w1' },
      answerCallbackQuery: jest.fn(),
      deleteMessage: jest.fn<(...args: unknown[]) => Promise<unknown>>().mockResolvedValue(true),
    };

    const conversation = {
      external: jest.fn(async (fn: () => unknown) => fn()),
      waitForCallbackQuery: jest
        .fn<(...args: unknown[]) => Promise<unknown>>()
        .mockResolvedValue(actionCtxApprove),
    };

    mockNluParser.parseDate.mockResolvedValue('2023-01-01');
    mockWorkoutService.findByDate.mockResolvedValue({ id: 'w1' });
    mockWorkoutService.findById.mockResolvedValue({ id: 'w1' });
    mockWorkoutService.approveDraft.mockResolvedValue(true);

    await editWorkout(conversation as never, ctx as never);

    expect(mockNluParser.parseDate).toHaveBeenCalledWith('вчера', expect.any(String));
    expect(mockWorkoutService.approveDraft).toHaveBeenCalledWith('w1');
    expect(ctx.reply).toHaveBeenCalledWith('✅ Тренировка обновлена и опубликована!');
  });
});
