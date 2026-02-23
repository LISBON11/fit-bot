import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { createMockCtx } from '../../__tests__/utils/mockCtx.js';
import { AppError } from '../../../errors/app-errors.js';
import type { CustomContext } from '../../types.js';
// Мокаем зависимости (STT, NLU, env)
jest.unstable_mockModule('../../../services/index.js', () => ({
  getSttService: jest.fn(),
  getNluParser: jest.fn(),
}));

jest.unstable_mockModule('../../../config/env.js', () => ({
  getConfig: jest
    .fn<(...args: unknown[]) => unknown>()
    .mockReturnValue({ BOT_TOKEN: 'test-token' }),
}));

// Замокаем глобальный fetch
const mockFetch = jest.fn<(...args: unknown[]) => Promise<unknown>>();
global.fetch = mockFetch as typeof fetch;

const { handleVoiceMessage } = await import('../voiceHandler.js');
const { getSttService, getNluParser } = await import('../../../services/index.js');

describe('Voice Handler', () => {
  let mockCtx: Partial<CustomContext>;
  let mockSttService: { transcribe: jest.Mock<(...args: unknown[]) => Promise<unknown>> };
  let mockNluParser: { parse: jest.Mock<(...args: unknown[]) => Promise<unknown>> };

  beforeEach(() => {
    jest.useFakeTimers();

    mockSttService = {
      transcribe: jest
        .fn<(...args: unknown[]) => Promise<unknown>>()
        .mockResolvedValue('Тестовая расшифровка' as never),
    };
    (getSttService as jest.Mock).mockReturnValue(mockSttService);

    mockNluParser = {
      parse: jest
        .fn<(...args: unknown[]) => Promise<unknown>>()
        .mockResolvedValue({ date: '2026-02-22', exercises: [] } as never),
    };
    (getNluParser as jest.Mock).mockReturnValue(mockNluParser);

    mockCtx = createMockCtx({
      message: {
        message_id: 1,
        date: 123,
        from: { id: 1, is_bot: false, first_name: 'Test' },
        chat: { id: 1, type: 'private', first_name: 'Test' },
        voice: {
          file_id: 'test-file-id',
          duration: 10,
          mime_type: 'audio/ogg',
          file_unique_id: 'unique_voic_1',
        },
      },
    });

    mockFetch.mockResolvedValue({
      ok: true,
      arrayBuffer: jest
        .fn<(...args: unknown[]) => Promise<unknown>>()
        .mockResolvedValue(new ArrayBuffer(8) as never),
      statusText: 'OK',
    } as never);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('должен проходить полный цикл обработки голосового сообщения', async () => {
    const promise = handleVoiceMessage(mockCtx as CustomContext);

    // Промотаем время, чтобы сработали интервалы
    jest.advanceTimersByTime(5000);

    await promise;

    expect(mockCtx.replyWithChatAction).toHaveBeenCalledWith('typing');
    expect(mockCtx.getFile).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith('https://api.telegram.org/file/bottest-token/test.ogg');
    expect(mockSttService.transcribe).toHaveBeenCalled();
    expect(mockNluParser.parse).toHaveBeenCalledWith('Тестовая расшифровка', expect.any(String));
    expect(mockCtx.reply).toHaveBeenCalledWith(
      expect.stringContaining('Тренировка распознана'),
      expect.objectContaining({ parse_mode: 'Markdown' }),
    );
  });

  it('игнорирует сообщение, если это не голос', async () => {
    Object.defineProperty(mockCtx, 'message', {
      value: {
        message_id: 1,
        date: 123,
        chat: { id: 1, type: 'private', first_name: 'Test' },
        text: 'Привет',
      },
    });

    await handleVoiceMessage(mockCtx as CustomContext);

    expect(mockCtx.replyWithChatAction).not.toHaveBeenCalled();
    expect(mockCtx.getFile).not.toHaveBeenCalled();
  });

  it('выбрасывает AppError, если не удалось получить путь к файлу', async () => {
    mockCtx.getFile = jest
      .fn<(...args: unknown[]) => Promise<unknown>>()
      .mockResolvedValue({} as never) as unknown as typeof mockCtx.getFile; // Нет file_path

    await expect(handleVoiceMessage(mockCtx as CustomContext)).rejects.toThrow(AppError);
    await expect(handleVoiceMessage(mockCtx as CustomContext)).rejects.toThrow(
      'Не удалось получить путь к голосовому файлу',
    );
  });

  it('выбрасывает ошибку при неудачном HTTP запросе fetch', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, statusText: 'Not Found' });

    await expect(handleVoiceMessage(mockCtx as CustomContext)).rejects.toThrow(
      'Ошибка скачивания файла: Not Found',
    );
  });

  it('очищает интервал-таймер при ошибке во время STT', async () => {
    mockSttService.transcribe.mockRejectedValueOnce(new Error('STT Timeout'));

    await expect(handleVoiceMessage(mockCtx as CustomContext)).rejects.toThrow('STT Timeout');

    // Проверяем что интервалы очищены и нет активных таймеров
    expect(jest.getTimerCount()).toBe(0);
  });
});
