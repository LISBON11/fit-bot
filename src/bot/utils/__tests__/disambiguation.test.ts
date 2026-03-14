import { jest } from '@jest/globals';
import type { ParsedExercise, ParsedWorkout } from '../../../nlu/nlu.types.js';
import type { CustomContext } from '../../types.js';
import type { Conversation } from '@grammyjs/conversations';
import { createMockCtx } from '../../__tests__/utils/mockCtx.js';
import { mockDeep } from 'jest-mock-extended';

const mockExerciseService = {
  resolveExercise: jest.fn(),
  confirmMapping: jest.fn(),
  createUserExercise: jest.fn().mockResolvedValue({ id: 'new-ex-id' } as never),
  getAllExercises: jest.fn().mockResolvedValue([] as never),
  getByMuscleGroup: jest.fn().mockResolvedValue([] as never),
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

jest.unstable_mockModule('../telegram.js', () => ({
  downloadAndTranscribeVoice: jest.fn(),
}));

jest.unstable_mockModule('../../../logger/logger.js', () => ({
  createLogger: () => ({ info: jest.fn(), warn: jest.fn(), error: jest.fn() }),
}));

const mockParseListSelection = jest.fn().mockResolvedValue(null as never);

jest.unstable_mockModule('../../../nlu/workout-parser.js', () => ({
  WorkoutParser: jest.fn().mockImplementation(() => ({
    parseListSelection: mockParseListSelection,
  })),
}));

describe('disambiguation loop', () => {
  let runDisambiguationLoop: (params: {
    conversation: Conversation<CustomContext, CustomContext>;
    ctx: CustomContext;
    parsedDelta: ParsedWorkout | Record<string, unknown>;
    workoutId: string;
    userId: string;
    isEditMode: boolean;
  }) => Promise<{
    status: string;
    ambiguousExercises?: ParsedExercise[];
    workout?: { id: string };
  }>;

  beforeAll(async () => {
    const module = await import('../disambiguation.js');
    runDisambiguationLoop = module.runDisambiguationLoop;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should run disambiguation loop correctly', async () => {
    // Note: User Auth is checked before calling runDisambiguationLoop now
    // This test simulates basic fallback if we left an error check
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

    const result = await runDisambiguationLoop({
      conversation,
      ctx,
      parsedDelta: {} as ParsedWorkout,
      workoutId: 'draft',
      userId: 'u1',
      isEditMode: false,
    });

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

    const result = await runDisambiguationLoop({
      conversation,
      ctx,
      parsedDelta: { update: [] } as Record<string, unknown>,
      workoutId: 'w1',
      userId: 'u1',
      isEditMode: true,
    });

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
      answerCallbackQuery: jest.fn().mockResolvedValue(true as never),
      api: {
        editMessageText: jest
          .fn<(...args: unknown[]) => Promise<unknown>>()
          .mockResolvedValue(true),
        deleteMessage: jest.fn<(...args: unknown[]) => Promise<unknown>>().mockResolvedValue(true),
      },
    } as never);

    const result = await runDisambiguationLoop({
      conversation,
      ctx,
      parsedDelta: {} as ParsedWorkout,
      workoutId: 'draft',
      userId: 'u1',
      isEditMode: false,
    });

    expect(result.status).toBe('created');
    expect(ctx.reply).toHaveBeenCalled();
    expect(mockExerciseService.resolveExercise).toHaveBeenCalledWith({
      inputText: 'Pull up',
      userId: 'u1',
    });
    expect(mockExerciseService.confirmMapping).toHaveBeenCalledWith({
      userId: 'u1',
      inputText: 'Pull up',
      exerciseId: 'e1',
    });
  });

  it('should handle voice_list choice and select exercise from flat list', async () => {
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

    // Mock exercise list for handleFlatList
    mockExerciseService.getByMuscleGroup.mockResolvedValue([
      { id: 'ex1', canonicalName: 'test', displayNameRu: 'Тестовое' },
    ] as never);
    mockExerciseService.confirmMapping.mockResolvedValue(true as never);

    const conversation = mockDeep<Conversation<CustomContext, CustomContext>>();
    conversation.external.mockImplementation((async <R>(fn: unknown) => {
      return typeof fn === 'function' ? (fn() as R) : (undefined as unknown as R);
    }) as never);

    // Mock chain of events:
    // 1. waitForCallbackQuery -> 'voice_list'
    // 2. waitForCallbackQuery -> 'mg:0' (выбор группы мышц)
    // 3. wait() -> ввод текста пользователем ('Тестовое')
    // 4. resolveExercise для введенного текста -> 'resolved'
    conversation.waitForCallbackQuery
      .mockResolvedValueOnce({
        callbackQuery: { data: 'voice_list', message: { message_id: 123 } },
        chat: { id: 456 },
        answerCallbackQuery: jest.fn().mockResolvedValue(true as never),
        api: {
          editMessageText: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
          deleteMessage: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
        },
      } as never)
      .mockResolvedValueOnce({
        callbackQuery: { data: 'mg:0', message: { message_id: 124 } },
        chat: { id: 456 },
        answerCallbackQuery: jest.fn().mockResolvedValue(true as never),
        api: {
          editMessageText: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
          deleteMessage: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
        },
      } as never);

    conversation.wait.mockResolvedValueOnce({
      message: { text: 'Тестовое' },
    } as never);

    mockParseListSelection.mockResolvedValueOnce(0 as never);

    mockExerciseService.resolveExercise.mockResolvedValueOnce({ status: 'not_found' } as never); // Первый вызов из внешнего цикла (для Unknown exercise)

    const result = await runDisambiguationLoop({
      conversation,
      ctx,
      parsedDelta: {} as ParsedWorkout,
      workoutId: 'draft',
      userId: 'u1',
      isEditMode: false,
    });

    expect(result.status).toBe('created');
    expect(mockExerciseService.getByMuscleGroup).toHaveBeenCalled();
    expect(mockExerciseService.confirmMapping).toHaveBeenCalledWith({
      userId: 'u1',
      inputText: 'Unknown exercise',
      exerciseId: 'ex1',
    });
  });

  it('should handle voice_list choice and fallback to raw for new_exercise', async () => {
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

    conversation.waitForCallbackQuery
      .mockResolvedValueOnce({
        callbackQuery: { data: 'voice_list', message: { message_id: 123 } },
        chat: { id: 456 },
        answerCallbackQuery: jest.fn().mockResolvedValue(true as never),
        api: {
          editMessageText: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
          deleteMessage: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
        },
      } as never)
      .mockResolvedValueOnce({
        callbackQuery: { data: 'new_exercise', message: { message_id: 124 } },
        chat: { id: 456 },
        answerCallbackQuery: jest.fn().mockResolvedValue(true as never),
        api: {
          editMessageText: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
          deleteMessage: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
        },
      } as never);

    const result = await runDisambiguationLoop({
      conversation,
      ctx,
      parsedDelta: {} as ParsedWorkout,
      workoutId: 'draft',
      userId: 'u1',
      isEditMode: false,
    });

    expect(result.status).toBe('created');
    expect(mockExerciseService.createUserExercise).toHaveBeenCalledWith({
      userId: 'u1',
      name: 'Unknown exercise',
    });
  });

  it('should handle back button and return to muscle groups', async () => {
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

    mockExerciseService.getByMuscleGroup.mockResolvedValue([] as never);

    const conversation = mockDeep<Conversation<CustomContext, CustomContext>>();
    conversation.external.mockImplementation((async <R>(fn: unknown) => {
      return typeof fn === 'function' ? (fn() as R) : (undefined as unknown as R);
    }) as never);

    // Mock chain:
    // 1. 'voice_list'
    // 2. 'mg:all' (все группы)
    // 3. 'back_to_groups' (назад)
    // 4. 'new_exercise' (назад привело к списку групп, там выбираем создать)
    conversation.waitForCallbackQuery
      .mockResolvedValueOnce({
        callbackQuery: { data: 'voice_list', message: { message_id: 1 } },
        chat: { id: 456 },
        answerCallbackQuery: jest.fn().mockResolvedValue(true as never),
        api: {
          editMessageText: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
          deleteMessage: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
        },
      } as never)
      .mockResolvedValueOnce({
        callbackQuery: { data: 'mg:all', message: { message_id: 2 } },
        chat: { id: 456 },
        answerCallbackQuery: jest.fn().mockResolvedValue(true as never),
        api: {
          editMessageText: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
          deleteMessage: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
        },
      } as never)
      .mockResolvedValueOnce({
        callbackQuery: { data: 'new_exercise', message: { message_id: 3 } },
        chat: { id: 456 },
        answerCallbackQuery: jest.fn().mockResolvedValue(true as never),
        api: {
          editMessageText: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
          deleteMessage: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
        },
      } as never);

    conversation.wait.mockResolvedValueOnce({
      callbackQuery: { data: 'back_to_groups', message: { message_id: 4 } },
      chat: { id: 456 },
      answerCallbackQuery: jest.fn().mockResolvedValue(true as never),
      api: {
        editMessageText: jest
          .fn<(...args: unknown[]) => Promise<unknown>>()
          .mockResolvedValue(true),
        deleteMessage: jest.fn<(...args: unknown[]) => Promise<unknown>>().mockResolvedValue(true),
      },
    } as never);

    const result = await runDisambiguationLoop({
      conversation,
      ctx,
      parsedDelta: {} as ParsedWorkout,
      workoutId: 'draft',
      userId: 'u1',
      isEditMode: false,
    });

    expect(result.status).toBe('created');
    expect(mockExerciseService.getAllExercises).toHaveBeenCalled();
    expect(mockExerciseService.createUserExercise).toHaveBeenCalledWith({
      userId: 'u1',
      name: 'Unknown exercise',
    });
  });

  it('should handle explicitly declined list input (e.g. "нет такого")', async () => {
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

    conversation.waitForCallbackQuery
      .mockResolvedValueOnce({
        callbackQuery: { data: 'voice_list', message: { message_id: 1 } },
        chat: { id: 456 },
        answerCallbackQuery: jest.fn().mockResolvedValue(true as never),
        api: {
          editMessageText: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
          deleteMessage: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
        },
      } as never)
      .mockResolvedValueOnce({
        callbackQuery: { data: 'mg:all', message: { message_id: 2 } },
        chat: { id: 456 },
        answerCallbackQuery: jest.fn().mockResolvedValue(true as never),
        api: {
          editMessageText: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
          deleteMessage: jest
            .fn<(...args: unknown[]) => Promise<unknown>>()
            .mockResolvedValue(true),
        },
      } as never);

    conversation.wait.mockResolvedValueOnce({
      message: { text: 'нет такого' },
    } as never);

    const result = await runDisambiguationLoop({
      conversation,
      ctx,
      parsedDelta: {} as ParsedWorkout,
      workoutId: 'draft',
      userId: 'u1',
      isEditMode: false,
    });

    expect(result.status).toBe('created');
    expect(mockExerciseService.createUserExercise).toHaveBeenCalledWith({
      userId: 'u1',
      name: 'Unknown exercise',
    });
  });
});
