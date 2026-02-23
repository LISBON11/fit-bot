import { jest } from '@jest/globals';
import type { ParsedWorkout, ParsedExercise } from '../../../nlu/nlu.types.js';
import { createMockCtx } from '../../__tests__/utils/mockCtx.js';
import type { Conversation } from '@grammyjs/conversations';
import type { CustomContext } from '../../types.js';
const mockNluParser = {
  parse: jest.fn<() => Promise<unknown>>(),
  parseEdit: jest.fn<() => Promise<unknown>>(),
};

jest.unstable_mockModule('../../../services/index.js', () => ({
  getNluParser: jest.fn(() => mockNluParser),
  services: {
    nluParser: mockNluParser,
  },
}));

jest.unstable_mockModule('../telegram.js', () => ({
  withChatAction: jest.fn(async (_ctx: unknown, _conv: unknown, work: () => unknown) => work()),
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
  let parseAndDisambiguateUserInput: (
    conversation: Conversation<CustomContext, CustomContext>,
    ctx: CustomContext,
    inputText: string,
    mode: 'new' | 'edit',
    workoutContext?: string,
    draftId?: string,
  ) => Promise<
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

      const result = await parseAndDisambiguateUserInput(conversation, ctx, '10 pull ups', 'new');

      expect(mockNluParser.parse).toHaveBeenCalledWith('10 pull ups', '2023-01-01');
      expect(runDisambiguationLoop).toHaveBeenCalledWith(
        conversation,
        ctx,
        expect.any(Object),
        'draft',
        false,
      );
      expect(result?.status).toBe('created');
    });

    it('should parse edit workout and run disambiguation', async () => {
      mockNluParser.parseEdit.mockResolvedValue({ add: [] });
      (runDisambiguationLoop as jest.Mock).mockResolvedValue({ status: 'updated' } as never);

      const ctx = createMockCtx();
      const conversation = {
        external: jest.fn(async (fn: () => unknown) => fn()),
      } as unknown as Conversation<CustomContext, CustomContext>;

      const result = await parseAndDisambiguateUserInput(
        conversation,
        ctx,
        'change pull ups to 12',
        'edit',
        'current context',
        'w1',
      );

      expect(mockNluParser.parseEdit).toHaveBeenCalledWith(
        'change pull ups to 12',
        '2023-01-01',
        'current context',
      );
      expect(runDisambiguationLoop).toHaveBeenCalledWith(
        conversation,
        ctx,
        expect.any(Object),
        'w1',
        true,
      );
      expect(result?.status).toBe('updated');
    });

    it('should throw if edit mode lacks context', async () => {
      const ctx = createMockCtx();
      const conversation = {
        external: jest.fn(async (fn: () => unknown) => fn()),
      } as unknown as Conversation<CustomContext, CustomContext>;

      await parseAndDisambiguateUserInput(conversation, ctx, 'text', 'edit', '', 'w1');
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

      const result = await (parseAndDisambiguateUserInput as typeof parseAndDisambiguateUserInput)(
        conversation,
        ctx,
        'bad input',
        'new',
      );

      expect(ctx.reply).toHaveBeenCalledWith(
        expect.stringContaining('Не удалось автоматически разобрать'),
        expect.any(Object),
      );
      expect(result).toBeNull();
    });
  });
});
