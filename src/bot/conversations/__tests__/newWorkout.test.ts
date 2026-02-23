import { jest } from '@jest/globals';
import type { newWorkout as newWorkoutFn } from '../newWorkout.js';
import type { parseAndDisambiguateUserInput as parseAndDisambiguateUserInputFn } from '../../utils/workoutFlow.js';
import type { downloadAndTranscribeVoice as downloadAndTranscribeVoiceFn } from '../../utils/telegram.js';
import { mockDeep } from 'jest-mock-extended';
import { createMockCtx } from '../../__tests__/utils/mockCtx.js';
import type { CustomContext } from '../../types.js';
import type { Conversation } from '@grammyjs/conversations';
import type { CallbackQueryContext } from 'grammy';

const mockWorkoutService = {
  getDraftForUser: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
  updateMessageIds: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
  approveDraft: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
  cancelDraft: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
};

const mockPublisher = {
  publish: jest.fn<(...args: unknown[]) => Promise<unknown>>(),
};

jest.unstable_mockModule('../../../services/index.js', () => ({
  workoutService: mockWorkoutService,
}));

jest.unstable_mockModule('../../../services/publisher.service.js', () => ({
  PublisherService: jest.fn(() => mockPublisher),
}));

jest.unstable_mockModule('../../utils/telegram.js', () => ({
  downloadAndTranscribeVoice: jest.fn(),
}));

jest.unstable_mockModule('../../utils/workoutFlow.js', () => ({
  parseAndDisambiguateUserInput: jest.fn(),
}));

jest.unstable_mockModule('../../formatters/workoutFormatter.js', () => ({
  formatPreview: jest.fn(() => 'preview_html'),
}));

describe('newWorkout conversation', () => {
  let newWorkout: typeof newWorkoutFn;
  let parseAndDisambiguateUserInput: jest.Mock<typeof parseAndDisambiguateUserInputFn>;
  let downloadAndTranscribeVoice: jest.Mock<typeof downloadAndTranscribeVoiceFn>;

  beforeAll(async () => {
    const module = await import('../newWorkout.js');
    newWorkout = module.newWorkout as typeof newWorkoutFn;

    const flowModule = await import('../../utils/workoutFlow.js');
    parseAndDisambiguateUserInput = flowModule.parseAndDisambiguateUserInput as jest.Mock<
      typeof parseAndDisambiguateUserInputFn
    >;

    const tgModule = await import('../../utils/telegram.js');
    downloadAndTranscribeVoice = tgModule.downloadAndTranscribeVoice as jest.Mock<
      typeof downloadAndTranscribeVoiceFn
    >;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw if no user', async () => {
    const ctx = createMockCtx();
    ctx.user = undefined;

    const conversation = mockDeep<Conversation<CustomContext, CustomContext>>();
    await expect(newWorkout(conversation, ctx)).rejects.toThrow('Пользователь не авторизован');
  });

  it('should ask for text if no text and no voice', async () => {
    const ctx = createMockCtx();
    ctx.user = { id: 'u1' } as never;
    Object.defineProperty(ctx, 'message', { value: { message_id: 111 } });

    const conversation = mockDeep<Conversation<CustomContext, CustomContext>>();
    await newWorkout(conversation, ctx as never);

    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining('отправьте текст или голосовое'),
    );
  });

  it('should handle text input, create draft, and publish', async () => {
    const ctx = createMockCtx();
    ctx.user = { id: 'u1' } as never;
    Object.defineProperty(ctx, 'message', { value: { text: 'test workout', message_id: 111 } });
    Object.defineProperty(ctx, 'chat', { value: { id: 100 } });

    ctx.reply.mockResolvedValue({ message_id: 222 } as never);
    ctx.api.deleteMessage.mockResolvedValue(true as never);

    const actionCtxCancelOrApprove =
      createMockCtx() as unknown as CallbackQueryContext<CustomContext>;
    actionCtxCancelOrApprove.deleteMessage = jest.fn().mockResolvedValue(true as never) as never;
    Object.defineProperty(actionCtxCancelOrApprove, 'callbackQuery', {
      value: { data: 'appr:w1' },
    });
    Object.defineProperty(actionCtxCancelOrApprove, 'match', { value: 'appr:w1' });

    const conversation = mockDeep<Conversation<CustomContext, CustomContext>>();
    conversation.external.mockImplementation((async <R>(fn: unknown) => {
      return typeof fn === 'function' ? (fn() as R) : (undefined as unknown as R);
    }) as never);
    conversation.waitForCallbackQuery.mockResolvedValue(actionCtxCancelOrApprove);

    parseAndDisambiguateUserInput.mockResolvedValue({
      status: 'success',
      workout: { id: 'w1' } as unknown as never,
    });
    mockWorkoutService.getDraftForUser.mockResolvedValue({ id: 'w1' } as never);
    mockWorkoutService.approveDraft.mockResolvedValue(true);

    await newWorkout(conversation, ctx);

    expect(parseAndDisambiguateUserInput).toHaveBeenCalledWith(
      conversation,
      ctx,
      'test workout',
      'new',
    );
    expect(mockWorkoutService.updateMessageIds).toHaveBeenCalledWith('w1', {
      sourceMessageId: 111,
      previewMessageId: 222,
    });
    expect(mockWorkoutService.approveDraft).toHaveBeenCalledWith('w1');
    expect(mockPublisher.publish).toHaveBeenCalledWith('preview_html');
    expect(ctx.reply).toHaveBeenCalledWith('✅ Тренировка успешно опубликована!');
  });

  it('should handle voice input and cancel', async () => {
    const ctx = createMockCtx();
    ctx.user = { id: 'u1' } as never;
    Object.defineProperty(ctx, 'message', { value: { voice: {}, message_id: 111 } });
    Object.defineProperty(ctx, 'chat', { value: { id: 100 } });

    ctx.reply.mockResolvedValue({ message_id: 222 } as never);
    ctx.api.deleteMessage.mockResolvedValue(true as never);

    const actionCtxCancel = createMockCtx() as unknown as CallbackQueryContext<CustomContext>;
    actionCtxCancel.deleteMessage = jest.fn().mockResolvedValue(true as never) as never;
    Object.defineProperty(actionCtxCancel, 'callbackQuery', { value: { data: 'canc:w1' } });
    Object.defineProperty(actionCtxCancel, 'match', { value: 'canc:w1' });

    const conversation = mockDeep<Conversation<CustomContext, CustomContext>>();
    conversation.external.mockImplementation((async <R>(fn: unknown) => {
      return typeof fn === 'function' ? (fn() as R) : (undefined as unknown as R);
    }) as never);
    conversation.waitForCallbackQuery.mockResolvedValue(actionCtxCancel);

    downloadAndTranscribeVoice.mockResolvedValue('test voice');
    parseAndDisambiguateUserInput.mockResolvedValue({
      status: 'success',
      workout: { id: 'w1' } as never,
    });
    mockWorkoutService.getDraftForUser.mockResolvedValue({ id: 'w1' } as never);
    mockWorkoutService.cancelDraft.mockResolvedValue(true);

    await newWorkout(conversation, ctx);

    expect(downloadAndTranscribeVoice).toHaveBeenCalled();
    expect(parseAndDisambiguateUserInput).toHaveBeenCalledWith(
      conversation,
      ctx,
      'test voice',
      'new',
    );
    expect(mockWorkoutService.cancelDraft).toHaveBeenCalledWith('w1');
    expect(ctx.reply).toHaveBeenCalledWith('❌ Тренировка отменена.');
  });
});
