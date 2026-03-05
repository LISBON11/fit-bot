import { jest, describe, it, expect, beforeEach, beforeAll } from '@jest/globals';
import { mockDeep, type DeepMockProxy } from 'jest-mock-extended';
import type { CustomContext } from '../../types.js';
import type {
  ProgressTracker as ProgressTrackerType,
  WorkoutStep as WorkoutStepType,
} from '../progressTracker.js';

// Мокаем логгер, чтобы избежать шума в тестах
jest.unstable_mockModule('../../../logger/logger.js', () => ({
  createLogger: () => ({
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }),
}));

let ProgressTracker: new (ctx: CustomContext) => ProgressTrackerType;
let WorkoutStep: typeof WorkoutStepType;

beforeAll(async () => {
  const m = await import('../progressTracker.js');
  ProgressTracker = m.ProgressTracker;
  WorkoutStep = m.WorkoutStep;
});

/**
 * Создаёт мок контекста с необходимыми для ProgressTracker методами.
 */
function createTrackerCtx(): DeepMockProxy<CustomContext> {
  const ctx = mockDeep<CustomContext>({ fallbackMockImplementation: jest.fn });

  Object.assign(ctx, {
    chat: { id: 999, type: 'private', first_name: 'Test' },
  });

  ctx.reply.mockResolvedValue({ message_id: 42 } as never);
  ctx.api.editMessageText.mockResolvedValue({} as never);
  ctx.api.deleteMessage.mockResolvedValue(true as never);

  return ctx;
}

/**
 * Ждёт выполнения всех microtask-ов в текущей очереди.
 * Нужно потому что enqueueEdit() добавляет работу в Promise-цепочку (не await-ится снаружи).
 */
async function flushQueue(): Promise<void> {
  // Два прохода достаточно: первый разрешает сам .then(enqueueEdit),
  // второй — async колбэк внутри него.
  await Promise.resolve();
  await Promise.resolve();
}

describe('ProgressTracker', () => {
  let ctx: DeepMockProxy<CustomContext>;

  beforeEach(() => {
    ctx = createTrackerCtx();
  });

  describe('send()', () => {
    it('отправляет начальное сообщение и сохраняет message_id', async () => {
      const tracker = new ProgressTracker(ctx);
      await tracker.send();

      expect(ctx.reply).toHaveBeenCalledWith(expect.stringContaining('Обрабатываю тренировку'), {
        parse_mode: 'HTML',
      });
    });

    it('начальное сообщение содержит все 6 шагов', async () => {
      const tracker = new ProgressTracker(ctx);
      await tracker.send();

      const [text] = ctx.reply.mock.calls[0] as [string, unknown];
      expect(text).toContain('Речь в текст');
      expect(text).toContain('Понимаем тренировку');
      expect(text).toContain('Добавляем новые упражнения');
      expect(text).toContain('Сохраняем в базу');
      expect(text).toContain('Уточняем детали');
      expect(text).toContain('Публикуем в канал');
    });

    it('при ошибке отправки не выбрасывает исключение', async () => {
      ctx.reply.mockRejectedValue(new Error('Network error') as never);
      const tracker = new ProgressTracker(ctx);
      await expect(tracker.send()).resolves.not.toThrow();
    });
  });

  describe('setRunning() / setDone() / setSkipped()', () => {
    it('setRunning вызывает editMessageText с символом ➤', async () => {
      const tracker = new ProgressTracker(ctx);
      await tracker.send();

      tracker.setRunning({ step: WorkoutStep.STT });
      await flushQueue();

      expect(ctx.api.editMessageText).toHaveBeenCalledWith(999, 42, expect.stringContaining('➤'), {
        parse_mode: 'HTML',
      });
    });

    it('setDone вызывает editMessageText с символом ✔', async () => {
      const tracker = new ProgressTracker(ctx);
      await tracker.send();

      tracker.setDone({ step: WorkoutStep.NLU });
      await flushQueue();

      expect(ctx.api.editMessageText).toHaveBeenCalledWith(999, 42, expect.stringContaining('✔'), {
        parse_mode: 'HTML',
      });
    });

    it('setSkipped вызывает editMessageText с символом ✖', async () => {
      const tracker = new ProgressTracker(ctx);
      await tracker.send();

      tracker.setSkipped({ step: WorkoutStep.EXERCISES });
      await flushQueue();

      expect(ctx.api.editMessageText).toHaveBeenCalledWith(999, 42, expect.stringContaining('✖'), {
        parse_mode: 'HTML',
      });
    });

    it('методы — graceful noop если send() не был вызван', () => {
      const tracker = new ProgressTracker(ctx);

      tracker.setRunning({ step: WorkoutStep.STT });
      tracker.setDone({ step: WorkoutStep.STT });
      tracker.setSkipped({ step: WorkoutStep.EXERCISES });

      expect(ctx.api.editMessageText).not.toHaveBeenCalled();
    });
  });

  describe('addSubItems()', () => {
    it('добавляет подсписок с ⬜ и вызывает editMessageText', async () => {
      const tracker = new ProgressTracker(ctx);
      await tracker.send();

      tracker.addSubItems({ step: WorkoutStep.EXERCISES, items: ['Отжимания', 'Подтягивания'] });
      await flushQueue();

      const lastCall = ctx.api.editMessageText.mock.calls.at(-1) as
        | [number, number, string, unknown]
        | undefined;
      expect(lastCall).toBeDefined();
      expect(lastCall?.[2]).toContain('Отжимания');
      expect(lastCall?.[2]).toContain('Подтягивания');
      expect(lastCall?.[2]).toContain('〇');
    });

    it('не падает если send() не вызван (graceful noop)', () => {
      const tracker = new ProgressTracker(ctx);
      expect(() =>
        tracker.addSubItems({ step: WorkoutStep.EXERCISES, items: ['Отжимания'] }),
      ).not.toThrow();
    });
  });

  describe('setSubItemRunning() / setSubItemDone()', () => {
    it('помечает конкретный подпункт ⏳', async () => {
      const tracker = new ProgressTracker(ctx);
      await tracker.send();
      tracker.addSubItems({ step: WorkoutStep.EXERCISES, items: ['Отжимания', 'Подтягивания'] });
      await flushQueue();

      tracker.setSubItemRunning({ step: WorkoutStep.EXERCISES, index: 1 });
      await flushQueue();

      const lastCall = ctx.api.editMessageText.mock.calls.at(-1) as
        | [number, number, string, unknown]
        | undefined;
      expect(lastCall?.[2]).toContain('Подтягивания');
      expect(lastCall?.[2]).toContain('➤');
    });

    it('помечает конкретный подпункт ✅', async () => {
      const tracker = new ProgressTracker(ctx);
      await tracker.send();
      tracker.addSubItems({ step: WorkoutStep.EXERCISES, items: ['Отжимания'] });
      await flushQueue();

      tracker.setSubItemDone({ step: WorkoutStep.EXERCISES, index: 0 });
      await flushQueue();

      const lastCall = ctx.api.editMessageText.mock.calls.at(-1) as
        | [number, number, string, unknown]
        | undefined;
      expect(lastCall?.[2]).toContain('Отжимания');
      expect(lastCall?.[2]).toContain('✔');
    });

    it('игнорирует некорректный индекс (graceful noop)', async () => {
      const tracker = new ProgressTracker(ctx);
      await tracker.send();
      tracker.addSubItems({ step: WorkoutStep.EXERCISES, items: ['Отжимания'] });
      await flushQueue();
      const callCountBefore = ctx.api.editMessageText.mock.calls.length;

      tracker.setSubItemRunning({ step: WorkoutStep.EXERCISES, index: 99 });
      await flushQueue();

      expect(ctx.api.editMessageText.mock.calls.length).toBe(callCountBefore);
    });
  });

  describe('delete()', () => {
    it('вызывает deleteMessage с правильными аргументами', async () => {
      const tracker = new ProgressTracker(ctx);
      await tracker.send();

      await tracker.delete();

      expect(ctx.api.deleteMessage).toHaveBeenCalledWith(999, 42);
    });

    it('не падает если send() не вызван (graceful noop)', async () => {
      const tracker = new ProgressTracker(ctx);
      await expect(tracker.delete()).resolves.not.toThrow();
      expect(ctx.api.deleteMessage).not.toHaveBeenCalled();
    });

    it('не выбрасывает исключение при ошибке deleteMessage', async () => {
      ctx.api.deleteMessage.mockRejectedValue(new Error('Message not found') as never);
      const tracker = new ProgressTracker(ctx);
      await tracker.send();

      await expect(tracker.delete()).resolves.not.toThrow();
    });
  });
});
