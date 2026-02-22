import { WorkoutParser, NluParseError } from '../../../src/nlu/workout-parser.js';
import { ParsedWorkout } from '../../../src/nlu/nlu.types.js';
import { jest } from '@jest/globals';

// Мокаем получение конфигурации
jest.unstable_mockModule('../../../src/config/env.js', () => ({
    getConfig: jest.fn().mockReturnValue({
        OPENAI_API_KEY: 'test-api-key',
        LOG_LEVEL: 'info',
        NODE_ENV: 'test',
    }),
}));

// Функция для создания мока OpenAI с нужным ответом
const mockParseSuccess = (mockResponse: ParsedWorkout) => {
    const MockOpenAI = jest.fn().mockImplementation(() => ({
        beta: {
            chat: {
                completions: {
                    parse: jest.fn().mockResolvedValue({
                        choices: [
                            {
                                message: {
                                    parsed: mockResponse,
                                },
                            },
                        ],
                    }),
                },
            },
        },
    })) as any;

    MockOpenAI.APIError = class APIError extends Error { };

    return MockOpenAI;
};

const mockParseFailure = (refusalMessage: string) => {
    const MockOpenAI = jest.fn().mockImplementation(() => ({
        beta: {
            chat: {
                completions: {
                    parse: jest.fn().mockResolvedValue({
                        choices: [
                            {
                                message: {
                                    parsed: null,
                                    refusal: refusalMessage
                                },
                            },
                        ],
                    }),
                },
            },
        },
    })) as any;

    // Добавляем статический APIError для корректной работы instanceof OpenAI.APIError
    MockOpenAI.APIError = class APIError extends Error { };

    return MockOpenAI;
};

describe('WorkoutParser', () => {
    let ParserClass: typeof WorkoutParser;
    let ErrorClass: typeof NluParseError;

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
            OpenAI: mockParseFailure('Я не могу обработать этот запрос.')
        }));

        const imported = await import('../../../src/nlu/workout-parser.js');
        ParserClass = imported.WorkoutParser;
        ErrorClass = imported.NluParseError;

        const parser = new ParserClass();

        await expect(parser.parse('Какой-то странный текст', '2023-10-27')).rejects.toThrow('Я не могу обработать этот запрос.');
    });
});
