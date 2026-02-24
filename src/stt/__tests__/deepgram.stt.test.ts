import { jest } from '@jest/globals';

/** Мок метода transcribeFile */
const mockTranscribeFile = jest.fn<(...args: unknown[]) => Promise<unknown>>();

/** Мок prerecorded объекта */
const mockPrerecorded = {
  transcribeFile: mockTranscribeFile,
};

/** Мок клиента Deepgram */
const mockDeepgramClient = {
  listen: {
    prerecorded: mockPrerecorded,
  },
};

/** Мок фабричной функции createClient */
const mockCreateClient = jest.fn(() => mockDeepgramClient);

// Мокаем @deepgram/sdk
jest.unstable_mockModule('@deepgram/sdk', () => ({
  createClient: mockCreateClient,
}));

// Мокаем конфигурацию
jest.unstable_mockModule('../../config/env.js', () => ({
  getConfig: jest.fn<(...args: unknown[]) => unknown>().mockReturnValue({
    DEEPGRAM_API_KEY: 'test-deepgram-key',

    LOG_LEVEL: 'info',
    NODE_ENV: 'test',
  }),
}));

// Получаем классы после регистрации моков
const { DeepgramStt: SttClass, SttError: ErrorClass } = await import('../deepgram.stt.js');

/** Вспомогательный билдер успешного ответа Deepgram */
const buildSuccessResult = (transcript: string) => ({
  result: {
    results: {
      channels: [{ alternatives: [{ transcript }] }],
    },
  },
  error: null,
});

describe('DeepgramStt', () => {
  let sttService: typeof SttClass.prototype;

  beforeEach(() => {
    jest.clearAllMocks();
    sttService = new SttClass();
  });

  it('успешно транскрибирует аудио буфер', async () => {
    const fakeBuffer = Buffer.from('fake-ogg-data');
    const expectedText = 'присед 4 по 10 восемьдесят кило';

    mockTranscribeFile.mockResolvedValue(buildSuccessResult(expectedText));

    const result = await sttService.transcribe(fakeBuffer, 'ru');

    expect(result).toBe(expectedText);
    expect(mockTranscribeFile).toHaveBeenCalledTimes(1);
    expect(mockTranscribeFile).toHaveBeenCalledWith(fakeBuffer, {
      model: 'nova-3',
      language: 'ru',
      smart_format: true,
    });
  });

  it('использует язык ru по умолчанию', async () => {
    const fakeBuffer = Buffer.from('fake-ogg-data');
    mockTranscribeFile.mockResolvedValue(buildSuccessResult('текст'));

    await sttService.transcribe(fakeBuffer);

    expect(mockTranscribeFile).toHaveBeenCalledWith(
      fakeBuffer,
      expect.objectContaining({ language: 'ru' }),
    );
  });

  it('выбрасывает SttError если Deepgram вернул error', async () => {
    const fakeBuffer = Buffer.from('fake-ogg-data');
    mockTranscribeFile.mockResolvedValue({
      result: null,
      error: { message: 'Bad Request' },
    });

    await expect(sttService.transcribe(fakeBuffer, 'ru')).rejects.toThrow(ErrorClass);
  });

  it('выбрасывает SttError если транскрипт отсутствует в ответе', async () => {
    const fakeBuffer = Buffer.from('fake-ogg-data');
    mockTranscribeFile.mockResolvedValue({
      result: { results: { channels: [] } },
      error: null,
    });

    await expect(sttService.transcribe(fakeBuffer, 'ru')).rejects.toThrow(ErrorClass);
  });

  it('выбрасывает SttError при сетевой ошибке', async () => {
    const fakeBuffer = Buffer.from('fake-ogg-data');
    mockTranscribeFile.mockRejectedValue(new Error('Network error'));

    await expect(sttService.transcribe(fakeBuffer, 'ru')).rejects.toThrow(ErrorClass);
  });
});
