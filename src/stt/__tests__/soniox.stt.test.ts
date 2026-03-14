import { jest } from '@jest/globals';

// Глобальный мок fetch
const mockFetch = jest.fn<typeof fetch>();
global.fetch = mockFetch;

// Мокаем конфигурацию
jest.unstable_mockModule('../../config/env.js', () => ({
  getConfig: jest.fn<(...args: unknown[]) => unknown>().mockReturnValue({
    SONIOX_API_KEY: 'test-soniox-key',
    LOG_LEVEL: 'info',
    NODE_ENV: 'test',
  }),
}));

// Получаем классы после регистрации моков
const { SonioxStt: SttClass, SttError: ErrorClass } = await import('../soniox.stt.js');

/** Вспомогательная фабрика Response-объекта */
function makeResponse(params: { body: unknown; ok?: boolean; status?: number }): Response {
  const { body, ok = true, status = 200 } = params;
  return {
    ok,
    status,
    text: () => Promise.resolve(JSON.stringify(body)),
    json: () => Promise.resolve(body),
  } as unknown as Response;
}

const FILE_ID = 'file_abc123';
const TRANSCRIPTION_ID = 'trn_xyz456';
const EXPECTED_TEXT = 'жим лёжа 4 подхода по 10 повторений';

describe('SonioxStt', () => {
  let sttService: InstanceType<typeof SttClass>;

  beforeEach(() => {
    jest.clearAllMocks();
    sttService = new SttClass();
  });

  it('успешно транскрибирует аудио за одну итерацию поллинга', async () => {
    const fakeBuffer = Buffer.from('fake-ogg-data');

    // 1. Загрузка файла
    mockFetch.mockResolvedValueOnce(makeResponse({ body: { id: FILE_ID } }));
    // 2. Создание транскрипции
    mockFetch.mockResolvedValueOnce(
      makeResponse({ body: { id: TRANSCRIPTION_ID, status: 'processing' } }),
    );
    // 3. Поллинг — сразу completed
    mockFetch.mockResolvedValueOnce(
      makeResponse({ body: { id: TRANSCRIPTION_ID, status: 'completed' } }),
    );
    // 4. Получение транскрипта
    mockFetch.mockResolvedValueOnce(
      makeResponse({
        body: {
          tokens: [{ text: 'жим лёжа ' }, { text: '4 подхода ' }, { text: 'по 10 повторений' }],
        },
      }),
    );
    // 5. Удаление транскрипции (cleanup)
    mockFetch.mockResolvedValueOnce(makeResponse({ body: {} }));
    // 6. Удаление файла (cleanup)
    mockFetch.mockResolvedValueOnce(makeResponse({ body: {} }));

    const result = await sttService.transcribe(fakeBuffer, 'ru');

    expect(result).toBe(EXPECTED_TEXT);
    expect(mockFetch).toHaveBeenCalledTimes(6);
  });

  it('ждёт завершения при нескольких итерациях поллинга (pending → processing → completed)', async () => {
    const fakeBuffer = Buffer.from('fake-ogg-data');

    mockFetch
      .mockResolvedValueOnce(makeResponse({ body: { id: FILE_ID } }))
      .mockResolvedValueOnce(makeResponse({ body: { id: TRANSCRIPTION_ID, status: 'pending' } }))
      .mockResolvedValueOnce(makeResponse({ body: { id: TRANSCRIPTION_ID, status: 'pending' } }))
      .mockResolvedValueOnce(makeResponse({ body: { id: TRANSCRIPTION_ID, status: 'processing' } }))
      .mockResolvedValueOnce(makeResponse({ body: { id: TRANSCRIPTION_ID, status: 'completed' } }))
      .mockResolvedValueOnce(makeResponse({ body: { tokens: [{ text: 'присед' }] } }))
      .mockResolvedValueOnce(makeResponse({ body: {} }))
      .mockResolvedValueOnce(makeResponse({ body: {} }));

    const result = await sttService.transcribe(fakeBuffer);

    expect(result).toBe('присед');
  });

  it('использует язык ru по умолчанию в запросе к API', async () => {
    const fakeBuffer = Buffer.from('fake-ogg-data');

    mockFetch
      .mockResolvedValueOnce(makeResponse({ body: { id: FILE_ID } }))
      .mockResolvedValueOnce(makeResponse({ body: { id: TRANSCRIPTION_ID, status: 'processing' } }))
      .mockResolvedValueOnce(makeResponse({ body: { id: TRANSCRIPTION_ID, status: 'completed' } }))
      .mockResolvedValueOnce(makeResponse({ body: { tokens: [{ text: 'тест' }] } }))
      .mockResolvedValueOnce(makeResponse({ body: {} }))
      .mockResolvedValueOnce(makeResponse({ body: {} }));

    await sttService.transcribe(fakeBuffer);

    // Второй вызов fetch — создание транскрипции
    const [, createCall] = mockFetch.mock.calls;
    const bodyStr = createCall[1]?.body as string;
    const body = JSON.parse(bodyStr) as { language_hints: string[]; file_id: string };

    expect(body.language_hints).toContain('ru');
    expect(body.file_id).toBe(FILE_ID);
  });

  it('выбрасывает SttError при ошибке загрузки файла', async () => {
    const fakeBuffer = Buffer.from('fake-ogg-data');

    mockFetch.mockResolvedValueOnce(
      makeResponse({ body: { error: 'Bad Request' }, ok: false, status: 400 }),
    );
    // cleanup вызовы (transcriptionId = null, fileId = null — не будет вызовов)

    await expect(sttService.transcribe(fakeBuffer, 'ru')).rejects.toThrow(ErrorClass);
  });

  it('выбрасывает SttError при статусе error от Soniox в процессе поллинга', async () => {
    const fakeBuffer = Buffer.from('fake-ogg-data');

    mockFetch
      .mockResolvedValueOnce(makeResponse({ body: { id: FILE_ID } }))
      .mockResolvedValueOnce(makeResponse({ body: { id: TRANSCRIPTION_ID, status: 'processing' } }))
      .mockResolvedValueOnce(
        makeResponse({
          body: { id: TRANSCRIPTION_ID, status: 'error', details: 'Audio decode failed' },
        }),
      )
      // cleanup
      .mockResolvedValueOnce(makeResponse({ body: {} }))
      .mockResolvedValueOnce(makeResponse({ body: {} }));

    await expect(sttService.transcribe(fakeBuffer, 'ru')).rejects.toThrow(ErrorClass);
  });

  it('выбрасывает SttError если транскрипт пустой', async () => {
    const fakeBuffer = Buffer.from('fake-ogg-data');

    mockFetch
      .mockResolvedValueOnce(makeResponse({ body: { id: FILE_ID } }))
      .mockResolvedValueOnce(makeResponse({ body: { id: TRANSCRIPTION_ID, status: 'processing' } }))
      .mockResolvedValueOnce(makeResponse({ body: { id: TRANSCRIPTION_ID, status: 'completed' } }))
      .mockResolvedValueOnce(makeResponse({ body: { tokens: [{ text: '   ' }] } }))
      // cleanup
      .mockResolvedValueOnce(makeResponse({ body: {} }))
      .mockResolvedValueOnce(makeResponse({ body: {} }));

    await expect(sttService.transcribe(fakeBuffer, 'ru')).rejects.toThrow(ErrorClass);
  });

  it('выбрасывает SttError при сетевой ошибке', async () => {
    const fakeBuffer = Buffer.from('fake-ogg-data');

    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(sttService.transcribe(fakeBuffer, 'ru')).rejects.toThrow(ErrorClass);
  });
});
