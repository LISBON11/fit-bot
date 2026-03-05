import { jest } from '@jest/globals';
import { AppError } from '../../../errors/app-errors.js';
import type { CustomContext } from '../../types.js';
import type { Conversation } from '@grammyjs/conversations';
import { createMockCtx } from '../../__tests__/utils/mockCtx.js';
const mockSttService = {
  transcribe: jest.fn(),
};

jest.unstable_mockModule('../../../services/index.js', () => ({
  getSttService: jest.fn(() => mockSttService),
}));

jest.unstable_mockModule('../../../config/env.js', () => ({
  getConfig: jest.fn(() => ({ BOT_TOKEN: 'mock-token' })),
}));

describe('telegram utils', () => {
  let withChatAction: (params: {
    ctx: CustomContext;
    work: () => Promise<unknown>;
  }) => Promise<unknown>;
  let downloadAndTranscribeVoice: (params: {
    ctx: CustomContext;
    conversation: Conversation<CustomContext, CustomContext>;
  }) => Promise<string>;

  beforeAll(async () => {
    const module = await import('../telegram.js');
    withChatAction = module.withChatAction;
    downloadAndTranscribeVoice = module.downloadAndTranscribeVoice;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('withChatAction', () => {
    it('should resolve work successfully', async () => {
      const work = jest.fn<() => Promise<unknown>>().mockResolvedValue('success');
      const ctx = createMockCtx();

      const result = await withChatAction({ ctx, work });

      expect(result).toBe('success');
      expect(work).toHaveBeenCalled();
    });
  });

  describe('downloadAndTranscribeVoice', () => {
    let ctxMock: ReturnType<typeof createMockCtx>;
    let conversationMock: Conversation<CustomContext, CustomContext>;

    beforeEach(() => {
      ctxMock = createMockCtx();
      Object.assign(ctxMock, {
        message: { voice: { file_id: 'mock_file_id' } },
        api: {
          sendChatAction: jest.fn().mockResolvedValue(true as never),
        },
      });
      ctxMock.getFile.mockResolvedValue({
        file_path: 'mock/path',
        file_id: 'mock_file_id',
        file_unique_id: 'mock_file_unique_id',
        file_size: 1234,
      } as never);

      conversationMock = {
        external: jest.fn(async (fn: () => unknown) => fn()),
      } as unknown as Conversation<CustomContext, CustomContext>;

      global.fetch = jest.fn<typeof fetch>().mockResolvedValue({
        ok: true,
        arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8) as never),
      } as unknown as Response);
    });

    it('should return empty string if no voice', async () => {
      ctxMock = createMockCtx();
      Object.assign(ctxMock, {
        message: { voice: undefined },
      });
      const result = await downloadAndTranscribeVoice({
        ctx: ctxMock,
        conversation: conversationMock,
      });
      expect(result).toBe('');
    });

    it('should throw if no file_path', async () => {
      ctxMock.getFile.mockResolvedValue({
        file_id: 'mock_file_id',
        file_unique_id: 'mock_file_unique_id',
        file_size: 1234,
      } as never);
      await expect(
        downloadAndTranscribeVoice({ ctx: ctxMock, conversation: conversationMock }),
      ).rejects.toThrow(AppError);
    });

    it('should throw if download fails', async () => {
      global.fetch = jest
        .fn<typeof fetch>()
        .mockResolvedValue({ ok: false } as unknown as Response);
      await expect(
        downloadAndTranscribeVoice({ ctx: ctxMock, conversation: conversationMock }),
      ).rejects.toThrow(AppError);
    });

    it('should download and transcribe', async () => {
      mockSttService.transcribe.mockResolvedValue('recognized text' as never);
      const result = await downloadAndTranscribeVoice({
        ctx: ctxMock,
        conversation: conversationMock,
      });
      expect(result).toBe('recognized text');
      expect(mockSttService.transcribe).toHaveBeenCalled();
    });

    it('should throw if transcription is empty', async () => {
      mockSttService.transcribe.mockResolvedValue('   ' as never);
      await expect(
        downloadAndTranscribeVoice({ ctx: ctxMock, conversation: conversationMock }),
      ).rejects.toThrow(AppError);
    });
  });
});
