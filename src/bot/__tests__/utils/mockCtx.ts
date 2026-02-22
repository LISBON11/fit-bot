import { jest } from '@jest/globals';
import type { CustomContext } from '../../types.js';

export function createMockCtx(overrides: Partial<CustomContext> = {}): Partial<CustomContext> {
  return {
    update: { update_id: 123 },
    from: { id: 123456789, is_bot: false, first_name: 'Test', username: 'testuser' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reply: jest.fn<any>().mockResolvedValue({} as never),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    answerCallbackQuery: jest.fn<any>().mockResolvedValue(true as never),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    replyWithChatAction: jest.fn<any>().mockResolvedValue(true as never),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFile: jest.fn<any>().mockResolvedValue({ file_path: 'test.ogg' } as never),
    chat: { id: 123456789, type: 'private', first_name: 'Test' },
    ...overrides,
  };
}
