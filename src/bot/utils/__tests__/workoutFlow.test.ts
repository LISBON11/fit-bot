import { jest } from '@jest/globals';
import type { ParsedWorkout, ParsedExercise } from '../../../nlu/nlu.types.js';
import { createMockCtx } from '../../__tests__/utils/mockCtx.js';
import type { Conversation } from '@grammyjs/conversations';
import type { CustomContext } from '../../types.js';
const mockNluParser = {
  parse: jest.fn<() => Promise<unknown>>(),
  parseEdit: jest.fn<() => Promise<unknown>>(),
};

const mockExerciseService = {
  getExerciseListForNlu: jest.fn<() => Promise<unknown>>().mockResolvedValue([]),
};

jest.unstable_mockModule('../../../services/index.js', () => ({
  getNluParser: jest.fn(() => mockNluParser),
  exerciseService: mockExerciseService,
  services: {
    nluParser: mockNluParser,
  },
}));

jest.unstable_mockModule('../telegram.js', () => ({
  withChatAction: jest.fn(async ({ work }: { work: () => unknown }) => work()),
}));

jest.unstable_mockModule('../disambiguation.js', () => ({
  runDisambiguationLoop: jest.fn(),
}));

jest.unstable_mockModule('../../../utils/date.js', () => ({
  getCurrentDateString: jest.fn(() => '2023-01-01'),
}));

jest.unstable_mockModule('../../../logger/logger.js', () => ({
  createLogger: () => ({ info: jest.fn(), error: jest.fn() }),
}));

describe('workoutFlow', () => {
  let parseAndDisambiguateUserInput: (params: {
    conversation: Conversation<CustomContext, CustomContext>;
    ctx: CustomContext;
    rawText: string;
    mode: 'new' | 'edit';
    userId: string;
    existingWorkoutContext?: string;
    workoutIdForDelta?: string;
  }) => Promise<
    | { status: string; ambiguousExercises?: ParsedExercise[]; workout?: { id: string } }
    | null
    | undefined
  >;
  let runDisambiguationLoop: jest.Mock | Record<string, unknown> | unknown;

  beforeAll(async () => {
    const disambiguationModule = await import('../disambiguation.js');
    runDisambiguationLoop = disambiguationModule.runDisambiguationLoop;

    const module = await import('../workoutFlow.js');
    parseAndDisambiguateUserInput = module.parseAndDisambiguateUserInput;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('parseAndDisambiguateUserInput', () => {
    it('should parse new workout and run disambiguation', async () => {
      mockNluParser.parse.mockResolvedValue({ originalName: 'Test' } as unknown as ParsedWorkout);
      (runDisambiguationLoop as jest.Mock).mockResolvedValue({ status: 'created' } as never);

      const ctx = createMockCtx();
      const conversation = {
        external: jest.fn(async (fn: () => unknown) => fn()),
      } as unknown as Conversation<CustomContext, CustomContext>;

      const result = await parseAndDisambiguateUserInput({
        conversation,
        ctx,
        rawText: '10 pull ups',
        mode: 'new',
        userId: 'u1',
      });

      expect(mockNluParser.parse).toHaveBeenCalledWith({
        rawText: '10 pull ups',
        currentDate: '2023-01-01',
        knownExercises: [],
      });
      expect(runDisambiguationLoop).toHaveBeenCalledWith({
        conversation,
        ctx,
        parsedDelta: expect.any(Object),
        workoutId: 'draft',
        userId: 'u1',
        isEditMode: false,
        tracker: undefined,
      });
      expect(result?.status).toBe('created');
    });

    it('should parse edit workout and run disambiguation', async () => {
      mockNluParser.parseEdit.mockResolvedValue({ add: [] });
      (runDisambiguationLoop as jest.Mock).mockResolvedValue({ status: 'updated' } as never);

      const ctx = createMockCtx();
      const conversation = {
        external: jest.fn(async (fn: () => unknown) => fn()),
      } as unknown as Conversation<CustomContext, CustomContext>;

      const result = await parseAndDisambiguateUserInput({
        conversation,
        ctx,
        rawText: 'change pull ups to 12',
        mode: 'edit',
        userId: 'u1',
        existingWorkoutContext: 'current context',
        workoutIdForDelta: 'w1',
      });

      expect(mockNluParser.parseEdit).toHaveBeenCalledWith({
        rawText: 'change pull ups to 12',
        currentDate: '2023-01-01',
        currentWorkoutJson: 'current context',
      });
      expect(runDisambiguationLoop).toHaveBeenCalledWith({
        conversation,
        ctx,
        parsedDelta: expect.any(Object),
        workoutId: 'w1',
        userId: 'u1',
        isEditMode: true,
        tracker: undefined,
      });
      expect(result?.status).toBe('updated');
    });

    it('should throw if edit mode lacks context', async () => {
      const ctx = createMockCtx();
      const conversation = {
        external: jest.fn(async (fn: () => unknown) => fn()),
      } as unknown as Conversation<CustomContext, CustomContext>;

      await parseAndDisambiguateUserInput({
        conversation,
        ctx,
        rawText: 'text',
        mode: 'edit',
        userId: 'u1',
        existingWorkoutContext: '',
        workoutIdForDelta: 'w1',
      });
      // Throws AppError which triggers catch block and returns null
      expect(ctx.reply).toHaveBeenCalledWith(
        expect.stringContaining('Не удалось автоматически разобрать'),
        expect.any(Object),
      );
    });

    it('should catch NLU parsing generic error, reply to user and return null', async () => {
      mockNluParser.parse.mockRejectedValue(new Error('NLU Error'));

      const ctx = createMockCtx();
      const conversation = {
        external: jest.fn(async (fn: () => unknown) => fn()),
      } as unknown as Conversation<CustomContext, CustomContext>;

      const result = await parseAndDisambiguateUserInput({
        conversation,
        ctx,
        rawText: 'bad input',
        mode: 'new',
        userId: 'u1',
      });

      expect(ctx.reply).toHaveBeenCalledWith(
        expect.stringContaining('Не удалось автоматически разобрать'),
        expect.any(Object),
      );
      expect(result).toBeNull();
    });
  });
});
