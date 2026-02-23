import type { Conversation } from '@grammyjs/conversations';
import type { CustomContext } from '../types.js';
import type { Workout } from '@prisma/client';
import { getNluParser } from '../../services/index.js';
import { withChatAction } from './telegram.js';
import { runDisambiguationLoop } from './disambiguation.js';
import { AppError } from '../../errors/app-errors.js';
import { createLogger } from '../../logger/logger.js';
import type { ParsedWorkout, ParsedExercise } from '../../nlu/nlu.types.js';
import { getCurrentDateString } from '../../utils/date.js';

const logger = createLogger('WorkoutFlowHelper');

export type WorkoutFlowMode = 'new' | 'edit';

export async function parseAndDisambiguateUserInput(
  conversation: Conversation<CustomContext, CustomContext>,
  ctx: CustomContext,
  rawText: string,
  mode: WorkoutFlowMode,
  existingWorkoutContext?: string,
  workoutIdForDelta?: string,
): Promise<{ status: string; ambiguousExercises?: ParsedExercise[]; workout?: Workout } | null> {
  let parsedWorkoutOrDelta:
    | ParsedWorkout
    | { add?: unknown[]; update?: unknown[]; remove?: string[] };
  const nluParser = getNluParser();
  const today = getCurrentDateString();

  try {
    parsedWorkoutOrDelta = await withChatAction(ctx, conversation, async () => {
      if (mode === 'new') {
        return await conversation.external(() => nluParser.parse(rawText, today));
      } else {
        if (!existingWorkoutContext)
          throw new AppError('Требуется контекст для редактирования', 500);
        return await conversation.external(() =>
          nluParser.parseEdit(rawText, today, existingWorkoutContext),
        );
      }
    });
  } catch (err: unknown) {
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
  return await runDisambiguationLoop(
    conversation,
    ctx,
    parsedWorkoutOrDelta,
    mode === 'new' ? 'draft' : (workoutIdForDelta as string),
    mode === 'edit',
  );
}
