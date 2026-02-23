import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import type { NextFunction } from 'grammy';
import { createMockCtx } from '../../__tests__/utils/mockCtx.js';
import { AppError } from '../../../errors/app-errors.js';
import type { CustomContext } from '../../types.js';
import type { DeepMockProxy } from 'jest-mock-extended';
const { errorMiddleware } = await import('../errorMiddleware.js');

describe('Error Middleware', () => {
  let mockCtx: DeepMockProxy<CustomContext>;
  let mockNext: jest.Mock<(...args: unknown[]) => Promise<unknown>>;

  beforeEach(() => {
    mockCtx = createMockCtx();
    mockNext = jest.fn<(...args: unknown[]) => Promise<unknown>>();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должна вызывать next() и не перехватывать успешное выполнение', async () => {
    mockNext.mockResolvedValueOnce(undefined);

    await errorMiddleware(mockCtx, mockNext as NextFunction);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockCtx.reply).not.toHaveBeenCalled();
    expect(mockCtx.answerCallbackQuery).not.toHaveBeenCalled();
  });

  it('должна перехватывать AppError (isOperational=true) и отвечать текстом ошибки', async () => {
    const appError = new AppError('Моя кастомная ошибка', 400, true);
    mockNext.mockRejectedValueOnce(appError);

    await errorMiddleware(mockCtx, mockNext as NextFunction);

    expect(mockCtx.reply).toHaveBeenCalledWith('⚠️ Моя кастомная ошибка');
    expect(mockCtx.answerCallbackQuery).not.toHaveBeenCalled();
  });

  it('должна перехватывать неизвестные ошибки (isOperational=false) и отдавать дефолтный текст', async () => {
    const unknownError = new Error('Database went away');
    mockNext.mockRejectedValueOnce(unknownError);

    await errorMiddleware(mockCtx, mockNext as NextFunction);

    expect(mockCtx.reply).toHaveBeenCalledWith(
      '⚠️ Произошла непредвиденная ошибка, попробуй ещё раз чуть позже.',
    );
  });

  it('должна использовать answerCallbackQuery, если ошибка произошла при нажатии на inline-кнопку', async () => {
    const defaultFrom = mockCtx.from || {
      id: 456,
      is_bot: false,
      first_name: 'Test',
      is_premium: undefined,
      added_to_attachment_menu: undefined,
      can_join_groups: undefined,
      can_read_all_group_messages: undefined,
      supports_inline_queries: undefined,
      can_connect_to_business: undefined,
      has_main_web_app: undefined,
      language_code: undefined,
      last_name: undefined,
      username: undefined,
    };

    const mockCtxWithCallback = {
      ...mockCtx,
      callbackQuery: {
        id: 'cb_1',
        from: defaultFrom,
        chat_instance: '123',
      },
    } as unknown as DeepMockProxy<CustomContext>;

    const appError = new AppError('Кнопка устарела', 400, true);
    mockNext.mockRejectedValueOnce(appError);

    await errorMiddleware(mockCtxWithCallback, mockNext as NextFunction);

    expect(mockCtxWithCallback.answerCallbackQuery).toHaveBeenCalledWith({
      text: '⚠️ Кнопка устарела',
      show_alert: true,
    });
    expect(mockCtx.reply).not.toHaveBeenCalled();
  });

  it('не должна крашить приложение, если сам ctx.reply выбросит ошибку', async () => {
    const originalError = new Error('First Error');
    mockNext.mockRejectedValueOnce(originalError);

    // Имитируем падение самого Телеграма
    mockCtx.reply.mockRejectedValueOnce(new Error('Telegram API down'));

    // errorMiddleware должен проглотить ошибку отправки ответа и выкинуть исходную ошибку дальше экспрессу/grammy.
    // Ожидаем, что промис зареджектится с оригинальной `First Error`, так как это обычная ошибка 500
    await expect(errorMiddleware(mockCtx, mockNext as NextFunction)).rejects.toThrow('First Error');
    expect(mockCtx.reply).toHaveBeenCalled();
  });
});
