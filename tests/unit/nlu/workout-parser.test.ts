import type { WorkoutParser } from '../../../src/nlu/workout-parser.js';
import type { ParsedWorkout } from '../../../src/nlu/nlu.types.js';
import { jest } from '@jest/globals';

/** Интерфейс мока конструктора OpenAI для подмены в тестах */
interface MockOpenAIConstructor {
  new (): {
    chat: {
      completions: {
        parse: jest.Mock<(...args: unknown[]) => Promise<unknown>>;
      };
    };
  };
  APIError: new (message?: string) => Error;
}

// Мокаем получение конфигурации
jest.unstable_mockModule('../../../src/config/env.js', () => ({
  getConfig: jest.fn().mockReturnValue({
    OPENAI_API_KEY: 'test-api-key',
    LOG_LEVEL: 'info',
    NODE_ENV: 'test',
  }),
}));

/** Создаёт мок конструктора OpenAI, возвращающий успешный ответ парсинга */
const mockParseSuccess = (mockResponse: ParsedWorkout): MockOpenAIConstructor => {
  const parseMock = jest.fn<(...args: unknown[]) => Promise<unknown>>().mockResolvedValue({
    choices: [
      {
        message: {
          parsed: mockResponse,
        },
      },
    ],
  });

  const MockOpenAI = jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        parse: parseMock,
      },
    },
  })) as unknown as MockOpenAIConstructor;

  MockOpenAI.APIError = Error;

  return MockOpenAI;
};

/** Создаёт мок конструктора OpenAI, возвращающий отказ (refusal) */
const mockParseFailure = (refusalMessage: string): MockOpenAIConstructor => {
  const parseMock = jest.fn<(...args: unknown[]) => Promise<unknown>>().mockResolvedValue({
    choices: [
      {
        message: {
          parsed: null,
          refusal: refusalMessage,
        },
      },
    ],
  });

  const MockOpenAI = jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        parse: parseMock,
      },
    },
  })) as unknown as MockOpenAIConstructor;

  // Добавляем статический APIError для корректной работы instanceof OpenAI.APIError
  MockOpenAI.APIError = class APIError extends Error {};

  return MockOpenAI;
};

describe('WorkoutParser', () => {
  let ParserClass: typeof WorkoutParser;

  beforeEach(async () => {
    jest.resetModules();
  });

  it('успешно парсит валидную тренировку', async () => {
    const validWorkout: ParsedWorkout = {
      date: '2023-10-27',
      focus: 'legs',
      exercises: [
        {
          originalName: 'Присед',
          isAmbiguous: false,
          mappedExerciseId: null,
          sets: [{ weight: 50, reps: 10, duration: null, distance: null, rpe: null }],
          comments: [],
        },
      ],
      generalComments: [],
    };

    jest.unstable_mockModule('openai', () => ({
      OpenAI: mockParseSuccess(validWorkout),
    }));

    const imported = await import('../../../src/nlu/workout-parser.js');
    ParserClass = imported.WorkoutParser;

    const parser = new ParserClass();
    const result = await parser.parse('Сегодня качал ноги, присед 50 на 10', '2023-10-27');

    expect(result).toEqual(validWorkout);
  });

  it('выбрасывает NluParseError, когда модель отказывается отвечать (refusal)', async () => {
    jest.unstable_mockModule('openai', () => ({
      OpenAI: mockParseFailure('Я не могу обработать этот запрос.'),
    }));

    const imported = await import('../../../src/nlu/workout-parser.js');
    ParserClass = imported.WorkoutParser;

    const parser = new ParserClass();

    await expect(parser.parse('Какой-то странный текст', '2023-10-27')).rejects.toThrow(
      'Я не могу обработать этот запрос.',
    );
  });
});
