import { jest } from '@jest/globals';
import { mockDeep, type DeepMockProxy } from 'jest-mock-extended';
import type { CustomContext } from '../../types.js';

export function createMockCtx(
  overrides: Partial<CustomContext> = {},
): DeepMockProxy<CustomContext> {
  const mockCtx = mockDeep<CustomContext>({ fallbackMockImplementation: jest.fn });

  // Базовые значения, которые часто нужны в тестах
  Object.assign(mockCtx, {
    update: { update_id: 123 },
    from: {
      id: 123456789,
      is_bot: false,
      first_name: 'Test',
      username: 'testuser',
    },
    chat: { id: 123456789, type: 'private', first_name: 'Test' },
    // mockDeep делает все дочерние свойства proxy-объектами (truthy).
    // Мы должны явно указать undefined для полей, проверка которых (if (ctx.callbackQuery)) должна давать false.
    callbackQuery: undefined,
    message: undefined,
  });

  // Мокаем часто используемые методы
  mockCtx.reply.mockResolvedValue({} as never);
  mockCtx.answerCallbackQuery.mockResolvedValue(true as never);
  mockCtx.replyWithChatAction.mockResolvedValue(true as never);
  mockCtx.getFile.mockResolvedValue({ file_path: 'test.ogg' } as never);
  // Применяем переопределения
  Object.assign(mockCtx, overrides);

  return mockCtx;
}
