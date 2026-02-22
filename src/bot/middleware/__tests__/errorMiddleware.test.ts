import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import type { CustomContext } from '../../types.js';
import type { NextFunction } from 'grammy';
import { AppError } from '../../../errors/app-errors.js';
import { createMockCtx } from '../../__tests__/utils/mockCtx.js';

const { errorMiddleware } = await import('../errorMiddleware.js');

describe('Error Middleware', () => {
  let mockCtx: Partial<CustomContext>;
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

    await errorMiddleware(mockCtx as CustomContext, mockNext as unknown as NextFunction);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockCtx.reply).not.toHaveBeenCalled();
    expect(mockCtx.answerCallbackQuery).not.toHaveBeenCalled();
  });

  it('должна перехватывать AppError (isOperational=true) и отвечать текстом ошибки', async () => {
    const appError = new AppError('Моя кастомная ошибка', 400, true);
    mockNext.mockRejectedValueOnce(appError);

    await errorMiddleware(mockCtx as CustomContext, mockNext as unknown as NextFunction);

    expect(mockCtx.reply).toHaveBeenCalledWith('⚠️ Моя кастомная ошибка');
    expect(mockCtx.answerCallbackQuery).not.toHaveBeenCalled();
  });

  it('должна перехватывать неизвестные ошибки (isOperational=false) и отдавать дефолтный текст', async () => {
    const unknownError = new Error('Database went away');
    mockNext.mockRejectedValueOnce(unknownError);

    await errorMiddleware(mockCtx as CustomContext, mockNext as unknown as NextFunction);

    expect(mockCtx.reply).toHaveBeenCalledWith(
      '⚠️ Произошла непредвиденная ошибка, попробуй ещё раз чуть позже.',
    );
  });

  it('должна использовать answerCallbackQuery, если ошибка произошла при нажатии на inline-кнопку', async () => {
    const defaultFrom = mockCtx.from || { id: 456, is_bot: false, first_name: 'Test' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mockCtx as any).callbackQuery = { id: 'cb_1', from: defaultFrom, chat_instance: '123' };
    const appError = new AppError('Кнопка устарела', 400, true);
    mockNext.mockRejectedValueOnce(appError);

    await errorMiddleware(mockCtx as CustomContext, mockNext as unknown as NextFunction);

    expect(mockCtx.answerCallbackQuery).toHaveBeenCalledWith({
      text: '⚠️ Кнопка устарела',
      show_alert: true,
    });
    expect(mockCtx.reply).not.toHaveBeenCalled();
  });

  it('не должна крашить приложение, если сам ctx.reply выбросит ошибку', async () => {
    const originalError = new Error('First Error');
    mockNext.mockRejectedValueOnce(originalError);

    // Имитируем падение самого Телеграма
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mockCtx.reply as jest.Mock<any>).mockRejectedValueOnce(new Error('Telegram API down'));

    // errorMiddleware должен проглотить ошибку отправки ответа и выкинуть исходную ошибку дальше экспрессу/grammy.
    // Ожидаем, что промис зареджектится с оригинальной `First Error`, так как это обычная ошибка 500
    await expect(
      errorMiddleware(mockCtx as CustomContext, mockNext as unknown as NextFunction),
    ).rejects.toThrow('First Error');
    expect(mockCtx.reply).toHaveBeenCalled();
  });
});
