import type { CustomContext } from '../types.js';
import { createLogger } from '../../logger/logger.js';

const logger = createLogger('ProgressTracker');

/**
 * Шаги обработки голосового сообщения.
 * Используется как ключ для обновления статусов в {@link ProgressTracker}.
 */
export enum WorkoutStep {
  STT = 'stt',
  NLU = 'nlu',
  EXERCISES = 'exercises',
  SAVE = 'save',
  CLARIFY = 'clarify',
  PUBLISH = 'publish',
}

/** Эмодзи статусов шагов. После однобайтных символов добавлен тонкий пробел (\u2009)
 *  чтобы выровнять текст по вертикали с широким символом 〇 */
const EMOJI = {
  pending: '〇',
  running: '➤\u2009',
  done: '✔',
  skipped: '✖\u2009',
} as const;

type StepStatus = keyof typeof EMOJI;

interface StepState {
  /** Отображаемый текст шага */
  label: string;
  /** Текущий статус */
  status: StepStatus;
  /** Подпункты (например, список создаваемых упражнений) */
  subItems: Array<{ label: string; status: StepStatus }>;
}

/** Порядок отображения шагов */
const STEP_ORDER: WorkoutStep[] = [
  WorkoutStep.STT,
  WorkoutStep.NLU,
  WorkoutStep.EXERCISES,
  WorkoutStep.SAVE,
  WorkoutStep.CLARIFY,
  WorkoutStep.PUBLISH,
];

/** Метки для каждого шага */
const STEP_LABELS: Record<WorkoutStep, string> = {
  [WorkoutStep.STT]: 'Речь в текст',
  [WorkoutStep.NLU]: 'Понимаем тренировку',
  [WorkoutStep.EXERCISES]: 'Добавляем новые упражнения',
  [WorkoutStep.SAVE]: 'Сохраняем в базу',
  [WorkoutStep.CLARIFY]: 'Уточняем детали',
  [WorkoutStep.PUBLISH]: 'Публикуем в канал',
};

/**
 * Управляет живым статус-сообщением при обработке голосового сообщения.
 *
 * Паттерн использования:
 * 1. `await tracker.send()` — отправляет начальное сообщение
 * 2. `tracker.setRunning(step)` / `tracker.setDone(step)` — обновляет статусы
 * 3. `await tracker.delete()` — удаляет при завершении
 *
 * Все методы кроме `send()` — graceful: если сообщение ещё не отправлено, работают как noop.
 */
export class ProgressTracker {
  private chatId: number | null = null;
  private messageId: number | null = null;
  private readonly steps: Map<WorkoutStep, StepState>;
  /**
   * Очередь обновлений сообщения — каждый вызов edit() цепляется к предыдущему,
   * гарантируя последовательную отправку и отсутствие ошибок 429 Too Many Requests.
   */
  private editQueue: Promise<void> = Promise.resolve();

  /**
   * @param ctx Контекст grammY — нужен для отправки и редактирования сообщения
   */
  constructor(private readonly ctx: CustomContext) {
    this.steps = new Map(
      STEP_ORDER.map((step) => [
        step,
        { label: STEP_LABELS[step], status: 'pending' as StepStatus, subItems: [] },
      ]),
    );
  }

  /**
   * Отправляет начальное статус-сообщение со всеми шагами в статусе ⬜.
   * Должен быть вызван перед любыми другими методами.
   */
  async send(): Promise<void> {
    try {
      const text = this.buildText();
      const msg = await this.ctx.reply(text, { parse_mode: 'HTML' });
      this.chatId = this.ctx.chat?.id ?? null;
      this.messageId = msg.message_id;
      logger.debug({ messageId: this.messageId }, 'ProgressTracker: сообщение отправлено');
    } catch (err) {
      logger.warn({ err }, 'ProgressTracker: не удалось отправить статус-сообщение');
    }
  }

  /**
   * Помечает шаг как выполняется и обновляет сообщение.
   * @param step Шаг для обновления
   */
  setRunning({ step }: { step: WorkoutStep }): void {
    this.updateStep({ step, status: 'running' });
  }

  /**
   * Помечает шаг как выполнено и обновляет сообщение.
   * @param step Шаг для обновления
   */
  setDone({ step }: { step: WorkoutStep }): void {
    this.updateStep({ step, status: 'done' });
  }

  /**
   * Помечает шаг как пропущено и обновляет сообщение.
   * @param step Шаг для обновления
   */
  setSkipped({ step }: { step: WorkoutStep }): void {
    this.updateStep({ step, status: 'skipped' });
  }

  /**
   * Добавляет подсписок к шагу — все пункты в статусе ожидания.
   * Вызывать до первого `setSubItemRunning`.
   * @param step Шаг, к которому добавляется подсписок
   * @param items Названия подпунктов (например, имена упражнений)
   */
  addSubItems({ step, items }: { step: WorkoutStep; items: string[] }): void {
    const state = this.steps.get(step);
    if (!state) return;
    state.subItems = items.map((label) => ({ label, status: 'pending' as StepStatus }));
    this.enqueueEdit();
  }

  /**
   * Помечает подпункт шага как выполняется.
   * @param step Родительский шаг
   * @param index Индекс подпункта
   */
  setSubItemRunning({ step, index }: { step: WorkoutStep; index: number }): void {
    this.updateSubItem({ step, index, status: 'running' });
  }

  /**
   * Помечает подпункт шага как выполнено.
   * @param step Родительский шаг
   * @param index Индекс подпункта
   */
  setSubItemDone({ step, index }: { step: WorkoutStep; index: number }): void {
    this.updateSubItem({ step, index, status: 'done' });
  }

  /**
   * Удаляет статус-сообщение из чата.
   * Вызывать при подтверждении, отмене тренировки или при ошибке.
   */
  async delete(): Promise<void> {
    if (!this.chatId || !this.messageId) return;
    try {
      await this.ctx.api.deleteMessage(this.chatId, this.messageId);
      logger.debug({ messageId: this.messageId }, 'ProgressTracker: сообщение удалено');
    } catch (err) {
      logger.warn({ err }, 'ProgressTracker: не удалось удалить статус-сообщение');
    }
  }

  // ─── Приватные методы ────────────────────────────────────────────────────────

  /** Обновляет статус шага и ставит в очередь редактирование сообщения */
  private updateStep({ step, status }: { step: WorkoutStep; status: StepStatus }): void {
    const state = this.steps.get(step);
    if (!state) return;
    state.status = status;
    this.enqueueEdit();
  }

  /** Обновляет статус подпункта и ставит в очередь редактирование сообщения */
  private updateSubItem({
    step,
    index,
    status,
  }: {
    step: WorkoutStep;
    index: number;
    status: StepStatus;
  }): void {
    const state = this.steps.get(step);
    if (!state || index < 0 || index >= state.subItems.length) return;
    state.subItems[index].status = status;
    this.enqueueEdit();
  }

  /**
   * Формирует HTML-текст всего статус-сообщения.
   * Пример строки: `✅ 🎙 Речь в текст`
   * Подпункт:       `    ⏳ Отжимания`
   */
  private buildText(): string {
    const lines: string[] = ['<b>Обрабатываю тренировку...</b>', ''];

    for (const step of STEP_ORDER) {
      const state = this.steps.get(step);
      if (!state) continue;
      lines.push(`${EMOJI[state.status]} ${state.label}`);

      for (const sub of state.subItems) {
        lines.push(`    ${EMOJI[sub.status]} <i>${sub.label}</i>`);
      }
    }

    return lines.join('\n');
  }

  /**
   * Ставит отправку актуального состояния в очередь.
   * Snapshot текущего текста делается в момент попадания в очередь (не в момент старта).
   * Благодаря chaining-у промисов вызовы не пересекаются → нет ошибки 429.
   */
  private enqueueEdit(): void {
    if (!this.chatId || !this.messageId) return;
    // Снимаем текст прямо сейчас — к моменту выполнения состояние может измениться,
    // но нам важен актуальный снимок на данный момент вызова.
    const text = this.buildText();
    const chatId = this.chatId;
    const messageId = this.messageId;

    this.editQueue = this.editQueue.then(async () => {
      try {
        await this.ctx.api.editMessageText(chatId, messageId, text, { parse_mode: 'HTML' });
      } catch (err: unknown) {
        // Игнорируем «message is not modified» и прочие безвредные ошибки
        logger.debug({ err }, 'ProgressTracker: пропущено обновление сообщения');
      }
    });
  }
}
