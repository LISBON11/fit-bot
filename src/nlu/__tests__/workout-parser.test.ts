import { jest } from '@jest/globals';
import type {
  WorkoutParser as WorkoutParserClass,
  NluParseError as NluParseErrorClass,
} from '../workout-parser.js';

const mockParse = jest.fn<(...args: unknown[]) => Promise<unknown>>();

class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'APIError';
  }
}

jest.unstable_mockModule('openai', () => ({
  OpenAI: class {
    chat = {
      completions: {
        parse: mockParse,
      },
    };
    static APIError = APIError;
  },
}));

jest.unstable_mockModule('../../logger/logger.js', () => ({
  createLogger: () => ({
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }),
}));

jest.unstable_mockModule('../../config/env.js', () => ({
  getConfig: () => ({ OPENAI_API_KEY: 'test_key' }),
}));

jest.unstable_mockModule('../../utils/retry.js', () => ({
  withRetry: jest.fn(async (operation: () => unknown) => await operation()),
}));

describe('WorkoutParser', () => {
  let WorkoutParser: typeof WorkoutParserClass;
  let NluParseError: typeof NluParseErrorClass;

  beforeAll(async () => {
    const module = await import('../workout-parser.js');
    WorkoutParser = module.WorkoutParser;
    NluParseError = module.NluParseError;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('parse', () => {
    it('should parse raw text successfully', async () => {
      const parser = new WorkoutParser();
      mockParse.mockResolvedValue({
        choices: [{ message: { parsed: { date: '2023-10-01', focus: 'legs' } } }],
      });

      const result = await parser.parse('Вчера дома', '2023-10-02');
      expect(result).toEqual({ date: '2023-10-01', focus: 'legs' });
      expect(mockParse).toHaveBeenCalled();
    });

    it('should throw NluParseError if LLM refuses', async () => {
      const parser = new WorkoutParser();
      mockParse.mockResolvedValue({
        choices: [{ message: { refusal: 'Refused to parse' } }],
      });

      await expect(parser.parse('Вчера', '2023-10-02')).rejects.toThrow(NluParseError);
    });

    it('should wrap OpenAI.APIError in NluParseError', async () => {
      const parser = new WorkoutParser();
      mockParse.mockRejectedValue(new APIError('Rate limit exceeded'));

      await expect(parser.parse('Вчера', '2023-10-02')).rejects.toThrow(
        'Ошибка API OpenAI: Rate limit exceeded',
      );
    });

    it('should throw NluParseError for other errors', async () => {
      const parser = new WorkoutParser();
      mockParse.mockRejectedValue(new Error('Unknown generic error'));

      await expect(parser.parse('Вчера', '2023-10-02')).rejects.toThrow('Unknown generic error');
    });
  });

  describe('parseEdit', () => {
    it('should parse edit delta successfully', async () => {
      const parser = new WorkoutParser();
      mockParse.mockResolvedValue({
        choices: [{ message: { parsed: { date: '2023-10-01', focus: 'fullbody' } } }],
      });

      const result = await parser.parseEdit('в зале', '2023-10-02', '{}');
      expect((result as { focus: string }).focus).toBe('fullbody');
    });

    it('should throw NluParseError if LLM refuses during edit', async () => {
      const parser = new WorkoutParser();
      mockParse.mockResolvedValue({
        choices: [{ message: { refusal: 'Cannot apply edit' } }],
      });

      await expect(parser.parseEdit('в зале', '2023-10-02', '{}')).rejects.toThrow(NluParseError);
    });

    it('should format wrap APIError during edit', async () => {
      const parser = new WorkoutParser();
      mockParse.mockRejectedValue(new APIError('API down'));

      await expect(parser.parseEdit('в зале', '2023-10-02', '{}')).rejects.toThrow(
        'Ошибка API OpenAI: API down',
      );
    });
  });

  describe('parseDate', () => {
    it('should parse date successfully', async () => {
      const parser = new WorkoutParser();
      mockParse.mockResolvedValue({
        choices: [{ message: { parsed: { date: '2023-10-01' } } }],
      });

      const date = await parser.parseDate('вчера', '2023-10-02');
      expect(date).toBe('2023-10-01');
    });

    it('should throw NluParseError if parsed date is empty', async () => {
      const parser = new WorkoutParser();
      mockParse.mockResolvedValue({
        choices: [{ message: { parsed: {} } }],
      });

      await expect(parser.parseDate('неясно когда', '2023-10-02')).rejects.toThrow(NluParseError);
    });

    it('should re-throw NluParseError on date parse failure', async () => {
      const parser = new WorkoutParser();
      mockParse.mockRejectedValue(new NluParseError('Direct Nlu error'));

      await expect(parser.parseDate('давно', '2023-10-02')).rejects.toThrow('Direct Nlu error');
    });

    it('should wrap other errors with generic OpenAI Error message', async () => {
      const parser = new WorkoutParser();
      mockParse.mockRejectedValue(new Error('Random string error'));

      await expect(parser.parseDate('завтра', '2023-10-02')).rejects.toThrow(/OpenAI API Error/);
    });
  });
});
