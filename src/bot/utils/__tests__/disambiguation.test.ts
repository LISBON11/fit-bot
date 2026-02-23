import { jest } from '@jest/globals';
import type { ParsedExercise, ParsedWorkout } from '../../../nlu/nlu.types.js';
import type { CustomContext } from '../../types.js';
import type { Conversation } from '@grammyjs/conversations';
import { createMockCtx } from '../../__tests__/utils/mockCtx.js';
import { mockDeep } from 'jest-mock-extended';

const mockExerciseService = {
  resolveExercise: jest.fn(),
  confirmMapping: jest.fn(),
};

const mockWorkoutService = {
  createDraft: jest.fn(),
  applyEdits: jest.fn(),
};

jest.unstable_mockModule('../../../services/index.js', () => ({
  exerciseService: mockExerciseService,
  workoutService: mockWorkoutService,
}));

jest.unstable_mockModule('../../keyboards/exercisePicker.js', () => ({
  createExercisePickerKeyboard: jest.fn(() => ({ reply_markup: 'mocked' })),
}));

describe('disambiguation loop', () => {
  let runDisambiguationLoop: (
    conversation: Conversation<CustomContext, CustomContext>,
    ctx: CustomContext,
    workoutContext: ParsedWorkout,
    draftId: string,
    isEditMode?: boolean,
  ) => Promise<{ status: string; ambiguousExercises?: ParsedExercise[]; workout?: { id: string } }>;

  beforeAll(async () => {
    const module = await import('../disambiguation.js');
    runDisambiguationLoop = module.runDisambiguationLoop;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw if no userId', async () => {
    const ctx = createMockCtx();
    Object.assign(ctx, { user: undefined });
    const conversation = mockDeep<Conversation<CustomContext, CustomContext>>();
    await expect(
      runDisambiguationLoop(conversation, ctx, {} as ParsedWorkout, 'w1', false),
    ).rejects.toThrow('User is not authorized');
  });

  it('should return created status immediately if no ambiguous exercises', async () => {
    const ctx = createMockCtx({ user: { id: 'u1' } as never });
    const conversation = mockDeep<Conversation<CustomContext, CustomContext>>();
    conversation.external.mockImplementation((async <R>(fn: unknown) => {
      return typeof fn === 'function' ? (fn() as R) : (undefined as unknown as R);
    }) as never);

    mockWorkoutService.createDraft.mockResolvedValue({
      status: 'created',
      workout: { id: 'w1' },
    } as never);

    const result = await runDisambiguationLoop(
      conversation,
      ctx,
      {} as ParsedWorkout,
      'draft',
      false,
    );

    expect(result.status).toBe('created');
    expect(mockWorkoutService.createDraft).toHaveBeenCalled();
  });

  it('should handle edit mode without ambiguous exercises', async () => {
    const ctx = createMockCtx({ user: { id: 'u1' } as never });
    const conversation = mockDeep<Conversation<CustomContext, CustomContext>>();
    conversation.external.mockImplementation((async <R>(fn: unknown) => {
      return typeof fn === 'function' ? (fn() as R) : (undefined as unknown as R);
    }) as never);

    mockWorkoutService.applyEdits.mockResolvedValue({
      status: 'updated',
      workout: { id: 'w1' },
    } as never);

    const result = await runDisambiguationLoop(
      conversation,
      ctx,
      { update: [] } as unknown as ParsedWorkout,
      'w1',
      true,
    );

    expect(result.status).toBe('updated');
    expect(mockWorkoutService.applyEdits).toHaveBeenCalled();
  });

  it('should run disambiguation loop if ambiguous exercises exist', async () => {
    const ctx = createMockCtx({ user: { id: 'u1' } as never });
    let callCount = 0;

    mockWorkoutService.createDraft.mockImplementation(() => {
      callCount++;
      if (callCount === 1) {
        return Promise.resolve({
          status: 'needs_disambiguation',
          ambiguousExercises: [{ originalName: 'Pull up' } as ParsedExercise],
        });
      }
      return Promise.resolve({ status: 'created' });
    });

    mockExerciseService.resolveExercise.mockResolvedValue({
      status: 'ambiguous',
      options: [{ id: 'e1', canonicalName: 'Pull-up', displayNameRu: 'Подтягивание' }],
    } as never);

    const conversation = mockDeep<Conversation<CustomContext, CustomContext>>();
    conversation.external.mockImplementation((async <R>(fn: unknown) => {
      return typeof fn === 'function' ? (fn() as R) : (undefined as unknown as R);
    }) as never);
    conversation.waitForCallbackQuery.mockResolvedValue({
      callbackQuery: { data: 'map:e1', message: { message_id: 123 } },
      chat: { id: 456 },
      answerCallbackQuery: jest.fn(),
      api: {
        deleteMessage: jest.fn<(...args: unknown[]) => Promise<unknown>>().mockResolvedValue(true),
      },
    } as never);

    const result = await runDisambiguationLoop(
      conversation,
      ctx,
      {} as ParsedWorkout,
      'draft',
      false,
    );

    expect(result.status).toBe('created');
    expect(ctx.reply).toHaveBeenCalled();
    expect(mockExerciseService.resolveExercise).toHaveBeenCalledWith('Pull up', 'u1');
    expect(mockExerciseService.confirmMapping).toHaveBeenCalledWith('u1', 'Pull up', 'e1');
  });

  it('should handle new_exercise choice in loop', async () => {
    const ctx = createMockCtx({ user: { id: 'u1' } as never });

    mockWorkoutService.createDraft
      .mockResolvedValueOnce({
        status: 'needs_disambiguation',
        ambiguousExercises: [{ originalName: 'Unknown exercise' } as ParsedExercise],
      } as never)
      .mockResolvedValueOnce({ status: 'created' } as never);

    mockExerciseService.resolveExercise.mockResolvedValue({
      status: 'not_found',
    } as never);

    const conversation = mockDeep<Conversation<CustomContext, CustomContext>>();
    conversation.external.mockImplementation((async <R>(fn: unknown) => {
      return typeof fn === 'function' ? (fn() as R) : (undefined as unknown as R);
    }) as never);
    conversation.waitForCallbackQuery.mockResolvedValue({
      callbackQuery: { data: 'new_exercise', message: { message_id: 123 } },
      chat: { id: 456 },
      answerCallbackQuery: jest.fn(),
      api: {
        deleteMessage: jest.fn<(...args: unknown[]) => Promise<unknown>>().mockResolvedValue(true),
      },
    } as never);

    const result = await runDisambiguationLoop(
      conversation,
      ctx,
      {} as ParsedWorkout,
      'draft',
      false,
    );

    expect(result.status).toBe('created');
    expect(conversation.waitForCallbackQuery).toHaveBeenCalledWith(
      [/^map:/, 'new_exercise'],
      expect.any(Object),
    );
  });
});
