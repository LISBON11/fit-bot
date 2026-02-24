import { jest } from '@jest/globals';
import type {
  WorkoutParser as WorkoutParserClass,
  NluParseError as NluParseErrorClass,
} from '../workout-parser.js';

/** Мок метода create (используется для DeepSeek через OpenAI-совместимый API) */
const mockCreate = jest.fn<(...args: unknown[]) => Promise<unknown>>();

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
        create: mockCreate,
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
  getConfig: () => ({ DEEPSEEK_API_KEY: 'test_deepseek_key' }),
}));

jest.unstable_mockModule('../../utils/retry.js', () => ({
  withRetry: jest.fn(async (operation: () => unknown) => await operation()),
}));

/** Строит успешный ответ в формате DeepSeek (JSON в content) */
const buildSuccessResponse = (data: unknown) => ({
  choices: [{ message: { content: JSON.stringify(data) } }],
});

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
    it('должен успешно парсить текст тренировки', async () => {
      const parser = new WorkoutParser();
      mockCreate.mockResolvedValue(
        buildSuccessResponse({
          date: '2023-10-01',
          focus: 'legs',
          exercises: [],
          generalComments: [],
        }),
      );

      const result = await parser.parse('Вчера дома', '2023-10-02');
      expect(result).toMatchObject({ date: '2023-10-01', focus: 'legs' });
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'deepseek-chat',
          response_format: { type: 'json_object' },
        }),
      );
    });

    it('должен выбрасывать NluParseError если content пустой', async () => {
      const parser = new WorkoutParser();
      mockCreate.mockResolvedValue({ choices: [{ message: { content: null } }] });

      await expect(parser.parse('Вчера', '2023-10-02')).rejects.toThrow(NluParseError);
    });

    it('должен выбрасывать NluParseError если JSON невалидный', async () => {
      const parser = new WorkoutParser();
      mockCreate.mockResolvedValue({ choices: [{ message: { content: 'not-json' } }] });

      await expect(parser.parse('Вчера', '2023-10-02')).rejects.toThrow(NluParseError);
    });

    it('должен оборачивать APIError в NluParseError', async () => {
      const parser = new WorkoutParser();
      mockCreate.mockRejectedValue(new APIError('Rate limit exceeded'));

      await expect(parser.parse('Вчера', '2023-10-02')).rejects.toThrow(
        'Ошибка API DeepSeek: Rate limit exceeded',
      );
    });

    it('должен выбрасывать NluParseError для прочих ошибок', async () => {
      const parser = new WorkoutParser();
      mockCreate.mockRejectedValue(new Error('Unknown generic error'));

      await expect(parser.parse('Вчера', '2023-10-02')).rejects.toThrow('Unknown generic error');
    });
  });

  describe('parseEdit', () => {
    it('должен успешно применять изменения', async () => {
      const parser = new WorkoutParser();
      mockCreate.mockResolvedValue(
        buildSuccessResponse({
          date: '2023-10-01',
          focus: 'fullbody',
          exercises: [],
          generalComments: [],
        }),
      );

      const result = await parser.parseEdit('в зале', '2023-10-02', '{}');
      expect((result as unknown as { focus: string }).focus).toBe('fullbody');
    });

    it('должен выбрасывать NluParseError если content пустой', async () => {
      const parser = new WorkoutParser();
      mockCreate.mockResolvedValue({ choices: [{ message: { content: null } }] });

      await expect(parser.parseEdit('в зале', '2023-10-02', '{}')).rejects.toThrow(NluParseError);
    });

    it('должен оборачивать APIError в NluParseError при редактировании', async () => {
      const parser = new WorkoutParser();
      mockCreate.mockRejectedValue(new APIError('API down'));

      await expect(parser.parseEdit('в зале', '2023-10-02', '{}')).rejects.toThrow(
        'Ошибка API DeepSeek: API down',
      );
    });
  });

  describe('parseDate', () => {
    it('должен успешно парсить дату', async () => {
      const parser = new WorkoutParser();
      mockCreate.mockResolvedValue(buildSuccessResponse({ date: '2023-10-01' }));

      const date = await parser.parseDate('вчера', '2023-10-02');
      expect(date).toBe('2023-10-01');
    });

    it('должен выбрасывать NluParseError если дата отсутствует', async () => {
      const parser = new WorkoutParser();
      mockCreate.mockResolvedValue(buildSuccessResponse({ date: null }));

      await expect(parser.parseDate('неясно когда', '2023-10-02')).rejects.toThrow(NluParseError);
    });

    it('должен пробрасывать NluParseError', async () => {
      const parser = new WorkoutParser();
      mockCreate.mockRejectedValue(
        new (await import('../workout-parser.js')).NluParseError('Direct NLU error'),
      );

      await expect(parser.parseDate('давно', '2023-10-02')).rejects.toThrow('Direct NLU error');
    });

    it('должен оборачивать прочие ошибки с DeepSeek сообщением', async () => {
      const parser = new WorkoutParser();
      mockCreate.mockRejectedValue(new Error('Random string error'));

      await expect(parser.parseDate('завтра', '2023-10-02')).rejects.toThrow(/DeepSeek API Error/);
    });
  });
});
