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

const mockUserService = {
  getOrCreateByTelegram: jest
    .fn<(...args: unknown[]) => Promise<unknown>>()
    .mockResolvedValue({ id: 'u1' }),
};

jest.unstable_mockModule('../../../services/index.js', () => ({
  workoutService: mockWorkoutService,
  userService: mockUserService,
}));

jest.unstable_mockModule('../../../services/publisher.service.js', () => ({
  PublisherService: jest.fn(() => mockPublisher),
}));

jest.unstable_mockModule('../../utils/telegram.js', () => ({
  downloadAndTranscribeVoice: jest.fn(),
}));

jest.unstable_mockModule('../../utils/userContext.js', () => ({
  saveUserContext: jest.fn(),
  clearUserContext: jest.fn(),
  getUserContext: jest
    .fn()
    .mockResolvedValue({ activeStatusMessage: { chatId: 1, messageId: 2 } } as never),
}));

const mockUnlockUser = jest.fn<() => Promise<void>>().mockResolvedValue(undefined);

jest.unstable_mockModule('../../utils/processingLock.js', () => ({
  unlockUser: mockUnlockUser,
  lockUser: jest.fn<() => Promise<boolean>>().mockResolvedValue(true),
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
    Object.defineProperty(ctx, 'from', { value: undefined });

    const conversation = mockDeep<Conversation<CustomContext, CustomContext>>();
    await expect(newWorkout(conversation, ctx)).rejects.toThrow('Пользователь не идентифицирован');
  });

  it('should ask for text if no text and no voice', async () => {
    const ctx = createMockCtx();
    Object.defineProperty(ctx, 'from', { value: { id: 12345 } });
    Object.defineProperty(ctx, 'message', { value: { message_id: 111 } });

    const conversation = mockDeep<Conversation<CustomContext, CustomContext>>();
    conversation.external.mockImplementation((async <R>(fn: unknown) => {
      return typeof fn === 'function' ? (fn() as R) : (undefined as unknown as R);
    }) as never);
    await newWorkout(conversation, ctx as never);

    expect(ctx.reply).toHaveBeenCalledWith(
      expect.stringContaining('отправьте текст или голосовое'),
    );
  });

  it('should handle text input, create draft, and publish', async () => {
    const ctx = createMockCtx();
    Object.defineProperty(ctx, 'from', { value: { id: 12345 } });
    Object.defineProperty(ctx, 'message', { value: { text: 'test workout', message_id: 111 } });
    Object.defineProperty(ctx, 'chat', { value: { id: 100 } });

    ctx.reply.mockResolvedValue({ message_id: 222 } as never);
    ctx.api.deleteMessage = jest.fn().mockResolvedValue(true as never) as never;
    ctx.api.editMessageText = jest.fn().mockResolvedValue(true as never) as never;

    const actionCtxCancelOrApprove =
      createMockCtx() as unknown as CallbackQueryContext<CustomContext>;
    actionCtxCancelOrApprove.deleteMessage = jest.fn().mockResolvedValue(true as never) as never;
    Object.defineProperty(actionCtxCancelOrApprove, 'api', {
      value: {
        deleteMessage: jest.fn().mockResolvedValue(true as never),
        editMessageText: jest.fn().mockResolvedValue(true as never),
      },
      writable: true,
    });
    Object.defineProperty(actionCtxCancelOrApprove, 'callbackQuery', {
      value: { data: 'appr:w1' },
    });
    Object.defineProperty(actionCtxCancelOrApprove, 'match', { value: 'appr:w1' });

    const conversation = mockDeep<Conversation<CustomContext, CustomContext>>();
    conversation.external.mockImplementation((async <R>(fn: unknown) => {
      return typeof fn === 'function' ? (fn() as R) : (undefined as unknown as R);
    }) as never);
    conversation.waitFor.mockResolvedValue(actionCtxCancelOrApprove);

    parseAndDisambiguateUserInput.mockResolvedValue({
      status: 'success',
      workout: { id: 'w1' } as unknown as never,
    });
    mockWorkoutService.getDraftForUser.mockResolvedValue({ id: 'w1' } as never);
    mockWorkoutService.approveDraft.mockResolvedValue(true);

    await newWorkout(conversation, ctx);

    expect(parseAndDisambiguateUserInput).toHaveBeenCalledWith({
      conversation,
      ctx,
      rawText: 'test workout',
      mode: 'new',
      userId: 'u1',
      existingWorkoutContext: undefined,
      workoutIdForDelta: undefined,
      tracker: expect.any(Object),
    });
    expect(mockWorkoutService.updateMessageIds).toHaveBeenCalledWith({
      id: 'w1',
      data: { sourceMessageId: 111, previewMessageId: 222 },
    });
    expect(mockWorkoutService.approveDraft).toHaveBeenCalledWith('w1');
    expect(mockPublisher.publish).toHaveBeenCalledWith('preview_html');
    expect(ctx.api.editMessageText).toHaveBeenCalledWith(
      100,
      222,
      expect.stringContaining('✅'),
      expect.objectContaining({ reply_markup: { inline_keyboard: [] } }),
    );
  });

  it('should stop if cancelled during STT', async () => {
    const ctx = createMockCtx();
    Object.defineProperty(ctx, 'from', { value: { id: 12345 } });
    Object.defineProperty(ctx, 'message', { value: { voice: {}, message_id: 111 } });

    const conversation = mockDeep<Conversation<CustomContext, CustomContext>>();
    conversation.external.mockImplementation((async <R>(fn: unknown) => {
      return typeof fn === 'function' ? (fn() as R) : (undefined as unknown as R);
    }) as never);

    downloadAndTranscribeVoice.mockResolvedValue('test voice');

    // Mock getUserContext to return empty object (no activeStatusMessage)
    const userContextModule = await import('../../utils/userContext.js');
    (userContextModule.getUserContext as jest.Mock).mockResolvedValueOnce({} as never);

    await newWorkout(conversation, ctx);

    expect(downloadAndTranscribeVoice).toHaveBeenCalled();
    // Should NOT proceed to parseAndDisambiguateUserInput
    expect(parseAndDisambiguateUserInput).not.toHaveBeenCalled();
  });
});
