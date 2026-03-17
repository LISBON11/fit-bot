import { InlineKeyboard } from 'grammy';
import type { CustomContext } from '../types.js';
import { createLogger } from '../../logger/logger.js';

const logger = createLogger('ProgressTracker');

/**
 * Callback-данные кнопки отмены создания тренировки.
 * Обрабатывается глобальным обработчиком в bot.ts (до conversations()).
 */
export const CANCEL_WORKOUT_CALLBACK = 'cancel_workout_creation';

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

/** Inline-клавиатура с кнопкой отмены, добавляемая к статус-сообщению */
function buildCancelKeyboard(): InlineKeyboard {
  return new InlineKeyboard().text('❌ Отменить создание', CANCEL_WORKOUT_CALLBACK);
}

/**
 * Управляет живым статус-сообщением при обработке голосового сообщения.
 *
 * Паттерн использования:
 * 1. `await tracker.send(conversation)` — отправляет начальное сообщение и сохраняет координаты в сессию
 * 2. `tracker.setRunning(step)` / `tracker.setDone(step)` — обновляет статусы
 * 3. `await tracker.delete()` — удаляет при завершении
 *
 * Все методы кроме `send()` — graceful: если сообщение ещё не отправлено, работают как noop.
 */
export class ProgressTracker {
  /** ID чата, в котором находится статус-сообщение */
  private chatId: number | null = null;
  /** ID отправленного статус-сообщения */
  private messageId: number | null = null;
  /** Карта текущих состояний для каждого шага тренировки */
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
   *
   * Возвращает координаты отправленного сообщения (chatId, messageId), которые
   * вызывающий код должен сохранить в сессию через conversation.external, чтобы
   * глобальный обработчик cancel_workout_creation мог мгновенно отредактировать сообщение.
   *
   * @returns Координаты сообщения или null при ошибке отправки
   */
  async send(): Promise<{ chatId: number; messageId: number } | null> {
    try {
      const text = this.buildText();
      const keyboard = buildCancelKeyboard();
      const msg = await this.ctx.reply(text, {
        parse_mode: 'HTML',
        reply_markup: keyboard,
      });
      this.chatId = this.ctx.chat?.id ?? null;
      this.messageId = msg.message_id;
      logger.debug({ messageId: this.messageId }, 'ProgressTracker: сообщение отправлено');

      if (this.chatId && this.messageId) {
        return { chatId: this.chatId, messageId: this.messageId };
      }
      return null;
    } catch (err) {
      logger.warn({ err }, 'ProgressTracker: не удалось отправить статус-сообщение');
      return null;
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
   * Помечает шаг как возвращенный в ожидание и обновляет сообщение.
   * @param step Шаг для обновления
   */
  setPending({ step }: { step: WorkoutStep }): void {
    this.updateStep({ step, status: 'pending' });
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

  /**
   * Возвращает статусы к этапу NLU (например, для режима редактирования)
   * Сбрасывает все последующие шаги в ожидание и очищает подпункты.
   */
  resetToNLU(): void {
    const stepsToReset = [
      WorkoutStep.NLU,
      WorkoutStep.EXERCISES,
      WorkoutStep.SAVE,
      WorkoutStep.CLARIFY,
      WorkoutStep.PUBLISH,
    ];
    for (const step of stepsToReset) {
      const state = this.steps.get(step);
      if (state) {
        state.status = step === WorkoutStep.NLU ? 'running' : 'pending';
        state.subItems = [];
      }
    }
    this.enqueueEdit();
  }

  /**
   * Заменяет текст статус-сообщения на произвольный (вместо списка шагов) и дожидается окончания всех предыдущих правок.
   * Полезно для вывода финального результата или уведомления об ошибке.
   * Кнопка отмены убирается, так как действие уже завершено.
   *
   * @param text Новый HTML-текст сообщения
   */
  async replaceWithTextAndStop(text: string): Promise<void> {
    if (!this.chatId || !this.messageId) return;
    await this.editQueue;
    try {
      await this.ctx.api.editMessageText(this.chatId, this.messageId, text, {
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: [] },
      });
    } catch (err: unknown) {
      logger.debug({ err }, 'ProgressTracker: пропущено обновление текста сообщения');
    }
  }

  // ─── Приватные методы ────────────────────────────────────────────────────────

  /**
   * Внутренний метод для изменения статуса конкретного шага и постановки задачи на обновление сообщения.
   *
   * @param params.step Шаг, который нужно обновить
   * @param params.status Новый статус для установки
   */
  private updateStep({ step, status }: { step: WorkoutStep; status: StepStatus }): void {
    const state = this.steps.get(step);
    if (!state) return;
    state.status = status;
    this.enqueueEdit();
  }

  /**
   * Внутренний метод для изменения статуса подпункта конкретного шага.
   *
   * @param params.step Родительский шаг
   * @param params.index Индекс подпункта в массиве
   * @param params.status Новый статус для установки
   */
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
   * Кнопка отмены сохраняется при каждом обновлении.
   */
  private enqueueEdit(): void {
    if (!this.chatId || !this.messageId) return;
    // Снимаем текст прямо сейчас — к моменту выполнения состояние может измениться,
    // но нам важен актуальный снимок на данный момент вызова.
    const text = this.buildText();
    const keyboard = buildCancelKeyboard();
    const chatId = this.chatId;
    const messageId = this.messageId;

    this.editQueue = this.editQueue.then(async () => {
      try {
        await this.ctx.api.editMessageText(chatId, messageId, text, {
          parse_mode: 'HTML',
          reply_markup: keyboard,
        });
      } catch (err: unknown) {
        // Игнорируем «message is not modified» и прочие безвредные ошибки
        logger.debug({ err }, 'ProgressTracker: пропущено обновление сообщения');
      }
    });
  }
}
