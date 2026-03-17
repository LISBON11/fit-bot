import type { Conversation } from '@grammyjs/conversations';
import type { CustomContext } from '../types.js';

import { getNluParser, exerciseService, userService } from '../../services/index.js';

import { getUserContext } from './userContext.js';
import { runDisambiguationLoop } from './disambiguation.js';
import { AppError } from '../../errors/app-errors.js';
import { createLogger } from '../../logger/logger.js';
import type { ParsedWorkout, ParsedExercise } from '../../nlu/nlu.types.js';
import { getCurrentDateString } from '../../utils/date.js';
import type { ProgressTracker } from './progressTracker.js';
import { WorkoutStep } from './progressTracker.js';

const logger = createLogger('WorkoutFlowHelper');

type WorkoutFlowMode = 'new' | 'edit';

/**
 * Основная функция флоу обработки тренировки: парсинг текста через NLU и запуск цикла уточнения упражнений.
 * Обрабатывает как создание новой тренировки, так и редактирование существующей.
 *
 * @param params Объект с параметрами
 * @param params.conversation Объект сессии/конво из @grammyjs/conversations
 * @param params.ctx Контекст сообщения
 * @param params.rawText Исходный текст (или транскрипция), который нужно обработать
 * @param params.mode Режим работы: 'new' (создание) или 'edit' (редактирование существующей)
 * @param params.userId Внутренний ID пользователя
 * @param params.existingWorkoutContext JSON-строка текущей тренировки (обязательно для режима 'edit')
 * @param params.workoutIdForDelta ID тренировки в базе (обязательно для режима 'edit' для сохранения изменений)
 * @param params.tracker Опциональный инстанс ProgressTracker для отображения прогресса в UI
 *
 * @returns Объект со статусом выполнения или null в случае ошибки парсинга, которую нельзя обработать автоматически
 */
export async function parseAndDisambiguateUserInput({
  conversation,
  ctx,
  rawText,
  mode,
  userId,
  existingWorkoutContext,
  workoutIdForDelta,
  tracker,
}: {
  conversation: Conversation<CustomContext, CustomContext>;
  ctx: CustomContext;
  rawText: string;
  mode: WorkoutFlowMode;
  userId: string;
  existingWorkoutContext?: string;
  workoutIdForDelta?: string;
  tracker?: ProgressTracker;
}): Promise<{
  status: string;
  ambiguousExercises?: ParsedExercise[];
  workout?: { id: string };
} | null> {
  let parsedWorkoutOrDelta:
    | ParsedWorkout
    | { add?: unknown[]; update?: unknown[]; remove?: string[] };
  const nluParser = getNluParser();
  const today = getCurrentDateString();

  try {
    logger.info('parseAndDisambiguateUserInput: starting parse');
    tracker?.setRunning({ step: WorkoutStep.NLU });

    if (mode === 'new') {
      // Загружаем список упражнений с синонимами — DeepSeek использует их
      // для маппинга оригинального названия на mappedExerciseId (в т.ч. при опечатках)
      const knownExercises = await conversation.external(() =>
        exerciseService.getExerciseListForNlu(),
      );
      logger.info(
        { exerciseCount: knownExercises.length },
        'parseAndDisambiguateUserInput: knownExercises loaded for NLU',
      );
      parsedWorkoutOrDelta = await conversation.external(() =>
        nluParser.parse({
          rawText: rawText,
          currentDate: today,
          knownExercises: knownExercises.map((e) => ({
            id: e.id,
            name: e.displayNameRu ?? e.canonicalName,
            aliases: e.aliases,
          })),
        }),
      );

      // Если в NLU не определена локация, подтягиваем дефолтную локацию пользователя
      if (!parsedWorkoutOrDelta.location) {
        const user = await conversation.external(() => userService.getById(userId));
        if (user?.defaultLocation) {
          logger.info({ userId }, 'Using default user location for new workout');
          parsedWorkoutOrDelta.location = user.defaultLocation;
        }
      }
    } else {
      if (!existingWorkoutContext) throw new AppError('Требуется контекст для редактирования', 500);
      parsedWorkoutOrDelta = await conversation.external(() =>
        nluParser.parseEdit({
          rawText: rawText,
          currentDate: today,
          currentWorkoutJson: existingWorkoutContext,
        }),
      );
      console.log('parsedWorkoutOrDelta =>', parsedWorkoutOrDelta);
    }

    // Проверяем, не отменил ли пользователь создание тренировки во время NLU
    if (ctx.from?.id) {
      const userId = ctx.from.id;
      const userContext = await conversation.external(() => getUserContext(userId));
      if (!userContext.activeStatusMessage) {
        logger.info('Workout creation cancelled by user during NLU, aborting');
        return null;
      }
    }

    tracker?.setDone({ step: WorkoutStep.NLU });
  } catch (err: unknown) {
    console.log(err);
    logger.error({ err }, 'Ошибка при парсинге NLU');

    const escapedText = rawText
      .replace(/_/g, '\\_')
      .replace(/\*/g, '\\*')
      .replace(/\[/g, '\\[')
      .replace(/`/g, '\\`');

    await ctx.reply(
      `⚠️ Не удалось автоматически разобрать текст. Попробуйте снова или отредактируйте вручную:\n\n\`${escapedText}\``,
      { parse_mode: 'Markdown' },
    );
    return null; // Signals to caller to break/continue
  }

  // Запуск цикла уточнения (Disambiguation)
  logger.info('parseAndDisambiguateUserInput: calling runDisambiguationLoop');
  return await runDisambiguationLoop({
    conversation: conversation,
    ctx: ctx,
    parsedDelta: parsedWorkoutOrDelta,
    workoutId: mode === 'new' ? 'draft' : (workoutIdForDelta as string),
    userId: userId,
    isEditMode: mode === 'edit',
    tracker: tracker,
  });
}
