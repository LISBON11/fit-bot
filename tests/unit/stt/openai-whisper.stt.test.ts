import { OpenAiWhisperStt, SttError } from '../../../src/stt/openai-whisper.stt.js';
import { getConfig } from '../../../src/config/env.js';
import { jest } from '@jest/globals';
import EventEmitter from 'events';

// Мокаем fluent-ffmpeg
const mockFfmpeg = jest.fn();
jest.unstable_mockModule('fluent-ffmpeg', () => ({
    default: mockFfmpeg,
}));

// Мокаем OpenAI
const mockTranscriptionsCreate = jest.fn();
const mockOpenAI = jest.fn().mockImplementation(() => ({
    audio: {
        transcriptions: {
            create: mockTranscriptionsCreate,
        },
    },
}));

// Мокаем toFile
const mockToFile = jest.fn().mockResolvedValue('fake-file' as any);
jest.unstable_mockModule('openai', () => ({
    OpenAI: mockOpenAI,
    toFile: mockToFile,
}));

// Мокаем получение конфигурации
jest.unstable_mockModule('../../../src/config/env.js', () => ({
    getConfig: jest.fn().mockReturnValue({
        OPENAI_API_KEY: 'test-api-key',
        LOG_LEVEL: 'info',
        NODE_ENV: 'test',
    }),
}));

// Получаем класс после моков
const { OpenAiWhisperStt: SttClass, SttError: ErrorClass } = await import(
    '../../../src/stt/openai-whisper.stt.js'
);

describe('OpenAiWhisperStt', () => {
    let sttService: typeof SttClass.prototype;

    beforeEach(() => {
        jest.clearAllMocks();

        // Эмулируем успешную конвертацию ffmpeg по умолчанию
        mockFfmpeg.mockImplementation(() => {
            const emitter = new EventEmitter() as any;
            emitter.outputOptions = jest.fn().mockReturnThis();
            emitter.format = jest.fn().mockReturnThis();
            emitter.pipe = jest.fn().mockImplementation((stream: any) => {
                // Симулируем запись данных и конец потока
                process.nextTick(() => {
                    stream.emit('data', Buffer.from('fake-mp3-data'));
                    stream.emit('end');
                });
                return emitter;
            });
            return emitter;
        });

        sttService = new SttClass();
    });

    it('успешно транскрибирует аудио буфер in-memory', async () => {
        const fakeBuffer = Buffer.from('fake-audio-data');
        const expectedText = 'Распознанный текст тренировки';

        mockTranscriptionsCreate.mockResolvedValue({ text: expectedText });

        const result = await sttService.transcribe(fakeBuffer, 'ru');

        expect(result).toBe(expectedText);
        expect(mockFfmpeg).toHaveBeenCalledTimes(1);
        expect(mockToFile).toHaveBeenCalledWith(expect.any(Buffer), 'audio.mp3', { type: 'audio/mp3' });
        expect(mockTranscriptionsCreate).toHaveBeenCalledTimes(1);
        expect(mockTranscriptionsCreate).toHaveBeenCalledWith({
            file: 'fake-file',
            model: 'whisper-1',
            language: 'ru',
        });
    });

    it('выбрасывает SttError при ошибке конвертации ffmpeg', async () => {
        // Настраиваем ffmpeg на выброс ошибки
        mockFfmpeg.mockImplementation(() => {
            const emitter = new EventEmitter() as any;
            emitter.outputOptions = jest.fn().mockReturnThis();
            emitter.format = jest.fn().mockReturnThis();
            emitter.pipe = jest.fn().mockImplementation(() => {
                process.nextTick(() => emitter.emit('error', new Error('ffmpeg error')));
                return emitter;
            });
            return emitter;
        });

        const fakeBuffer = Buffer.from('fake-audio-data');

        await expect(sttService.transcribe(fakeBuffer, 'ru')).rejects.toThrow(ErrorClass);
        expect(mockTranscriptionsCreate).not.toHaveBeenCalled();
        expect(mockToFile).not.toHaveBeenCalled();
    });

    it('выбрасывает SttError при ошибке OpenAI API', async () => {
        const fakeBuffer = Buffer.from('fake-audio-data');

        // Настраиваем OpenAI на ошибку
        mockTranscriptionsCreate.mockRejectedValue(new Error('API Rate Limit Exceeded'));

        await expect(sttService.transcribe(fakeBuffer, 'ru')).rejects.toThrow(ErrorClass);
        expect(mockTranscriptionsCreate).toHaveBeenCalledTimes(1);
    });
});
