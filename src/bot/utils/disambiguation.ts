import type { Conversation } from '@grammyjs/conversations';
import type { CustomContext } from '../types.js';
import type { ParsedWorkout, ParsedExercise } from '../../nlu/nlu.types.js';
import { exerciseService, workoutService } from '../../services/index.js';
import { createExercisePickerKeyboard } from '../keyboards/exercisePicker.js';
import {
  createMuscleGroupPickerKeyboard,
  MUSCLE_GROUP_CALLBACK_REGEX,
  MUSCLE_GROUPS,
} from '../keyboards/muscleGroupPicker.js';
import type { MuscleGroupEntry } from '../keyboards/muscleGroupPicker.js';
import { InlineKeyboard } from 'grammy';
import type { Exercise } from '@prisma/client';
import { createLogger } from '../../logger/logger.js';
import { downloadAndTranscribeVoice } from './telegram.js';

const logger = createLogger('disambiguation');

/** Максимальное количество упражнений для одного сообщения со списком */
const EXERCISE_LIST_CHUNK_SIZE = 30;

/** Callback_data для кнопки «Назад» */
const BACK_CALLBACK = 'back_to_groups';

/**
 * Формирует текстовый список упражнений для показа пользователю при голосовом выборе.
 * Если упражнений больше EXERCISE_LIST_CHUNK_SIZE, список разбивается на части.
 *
 * @param exercises Массив упражнений
 * @returns Массив строк-чанков для отправки несколькими сообщениями
 */
function buildExerciseListChunks(exercises: Exercise[]): string[] {
  const lines = exercises.map((e, i) => `${i + 1}. ${e.displayNameRu ?? e.canonicalName}`);
  const chunks: string[] = [];
  for (let i = 0; i < lines.length; i += EXERCISE_LIST_CHUNK_SIZE) {
    chunks.push(lines.slice(i, i + EXERCISE_LIST_CHUNK_SIZE).join('\n'));
  }
  return chunks;
}

/**
 * Запускает цикл разрешения неоднозначностей упражнений (Disambiguation FSM).
 * Спрашивает пользователя о каждом нераспознанном упражнении и обновляет маппинги.
 *
 * Варианты ответа пользователя:
 * - `map:{exerciseId}` — выбрать готовый вариант из списка
 * - `new_exercise` — создать новое упражнение с оригинальным именем
 * - `voice_list` — выбрать из списка по группам мышц (текст или голос), с возможностью вернуться
 *
 * @param conversation Контекст стейт-машины
 * @param ctx Текущий контекст grammY
 * @param parsedDelta Объект с тренировкой или дельтой (содержит exercises)
 * @param workoutId ID текущей тренировки (черновика или редактируемой)
 * @param userId ID пользователя
 * @param isEditMode Режим редактирования
 * @returns Финальный статус (обычно 'created' или 'updated')
 */
export async function runDisambiguationLoop(
  conversation: Conversation<CustomContext, CustomContext>,
  ctx: CustomContext,
  parsedDelta: ParsedWorkout | { add?: unknown[]; update?: unknown[]; remove?: string[] },
  workoutId: string,
  userId: string,
  isEditMode: boolean = false,
): Promise<{ status: string; ambiguousExercises?: ParsedExercise[]; workout?: { id: string } }> {
  let result = await conversation.external(async () => {
    const fn = isEditMode
      ? await workoutService.applyEdits(workoutId, userId, parsedDelta as ParsedWorkout)
      : await workoutService.createDraft(userId, parsedDelta as ParsedWorkout);
    return {
      status: fn.status,
      ambiguousExercises: 'ambiguousExercises' in fn ? fn.ambiguousExercises : undefined,
      workout: 'workout' in fn && fn.workout ? { id: fn.workout.id } : undefined,
    } as {
      status: string;
      ambiguousExercises?: ParsedExercise[];
      workout?: { id: string };
    };
  });

  while (result.status === 'needs_disambiguation') {
    const ambiguousExercises = result.ambiguousExercises || [];

    for (const ambig of ambiguousExercises) {
      if (ambig.mappedExerciseId) continue;

      const resolveResult = await conversation.external(() =>
        exerciseService.resolveExercise(ambig.originalName, userId),
      );

      const options: Array<Pick<Exercise, 'id' | 'canonicalName' | 'displayNameRu'>> =
        resolveResult.status === 'ambiguous' ? resolveResult.options : [];

      const kb = createExercisePickerKeyboard(options, ambig.originalName);

      await ctx.reply(
        `Немного не понял упражнение: «${ambig.originalName}». Выберите из списка или создайте новое:`,
        { reply_markup: kb },
      );

      const responseCtx = await conversation.waitForCallbackQuery(
        [/^map:/, 'new_exercise', 'voice_list'],
        {
          otherwise: (otherCtx) =>
            otherCtx.reply('Пожалуйста, выберите вариант из меню выше 👆', {
              reply_to_message_id: otherCtx.message?.message_id,
            }),
        },
      );
      const data = responseCtx.callbackQuery.data;

      // answerCallbackQuery убирает spinner у кнопки — делаем первым, не ждём
      responseCtx.answerCallbackQuery().catch(() => {});

      let choiceText = '⏳ Обработка...';
      if (data.startsWith('map:')) {
        choiceText = `✅ Упражнение «${ambig.originalName}» сопоставлено.`;
      } else if (data === 'new_exercise') {
        choiceText = `✅ Упражнение «${ambig.originalName}» будет создано.`;
      } else if (data === 'voice_list') {
        choiceText = `🔍 Поиск по категориям для «${ambig.originalName}»...`;
      }

      // Вместо удаления сообщения меняем его текст, оставляя историю выбора
      if (responseCtx.callbackQuery.message && responseCtx.chat?.id) {
        responseCtx.api
          .editMessageText(
            responseCtx.chat.id,
            responseCtx.callbackQuery.message.message_id,
            choiceText,
          )
          .catch(() => {});
      }

      if (data.startsWith('map:')) {
        // Пользователь выбрал готовый вариант из списка
        const exerciseId = data.split(':')[1];
        await conversation.external(() =>
          exerciseService.confirmMapping(userId, ambig.originalName, exerciseId),
        );
        ambig.mappedExerciseId = exerciseId;
      } else if (data === 'new_exercise') {
        // Пользователь хочет создать новое упражнение с оригинальным именем
        logger.info({ originalName: ambig.originalName }, 'Creating new user exercise');
        const newExercise = await conversation.external(() =>
          exerciseService.createUserExercise(userId, ambig.originalName),
        );
        ambig.mappedExerciseId = newExercise.id;
        logger.info({ exerciseId: newExercise.id }, 'New exercise created');
      } else if (data === 'voice_list') {
        // Двухшаговый выбор с навигацией: группа мышц → список → [Назад] → группа
        const resolved = await handleVoiceListSelection(
          conversation,
          ctx,
          ambig.originalName,
          userId,
        );
        if (resolved === 'raw') {
          logger.info({ originalName: ambig.originalName }, 'Voice list: creating new exercise');
          const newExercise = await conversation.external(() =>
            exerciseService.createUserExercise(userId, ambig.originalName),
          );
          ambig.mappedExerciseId = newExercise.id;
        } else {
          ambig.mappedExerciseId = resolved;
        }
      }
    }

    result = await conversation.external(async () => {
      const fn = isEditMode
        ? await workoutService.applyEdits(workoutId, userId, parsedDelta as ParsedWorkout)
        : await workoutService.createDraft(userId, parsedDelta as ParsedWorkout);
      return {
        status: fn.status,
        ambiguousExercises: 'ambiguousExercises' in fn ? fn.ambiguousExercises : undefined,
        workout: 'workout' in fn && fn.workout ? { id: fn.workout.id } : undefined,
      } as {
        status: string;
        ambiguousExercises?: ParsedExercise[];
        workout?: { id: string };
      };
    });
  }

  return result;
}

/**
 * Обрабатывает сценарий выбора упражнения из списка с навигацией по группам мышц.
 *
 * UX (с возможностью вернуться назад):
 * 1. Показывает кнопки групп мышц.
 * 2. После выбора группы — присылает пронумерованный список упражнений + кнопку «⬅️ Назад».
 * 3. Пользователь либо вводит название (текст/голос), либо нажимает «Назад» → шаг 1.
 *
 * @param conversation Контекст стейт-машины
 * @param ctx Текущий контекст grammY
 * @param originalName Оригинальное название упражнения (fallback для создания)
 * @param userId ID пользователя
 * @returns ID выбранного упражнения, или 'raw' если нужно создать новое
 */
async function handleVoiceListSelection(
  conversation: Conversation<CustomContext, CustomContext>,
  ctx: CustomContext,
  originalName: string,
  userId: string,
): Promise<string> {
  // Группы мышц — фиксированный список, запрос в БД не нужен
  if (MUSCLE_GROUPS.length === 0) {
    // В этой ветке кнопки «Назад» нет — null означает «нет выбора», трактуем как 'raw'
    return (await handleFlatList(conversation, ctx, originalName, userId, null)) ?? 'raw';
  }

  // Цикл навигации: выбор группы → список → [Назад] → возврат к выбору группы
  while (true) {
    const groupKb = createMuscleGroupPickerKeyboard([...MUSCLE_GROUPS], originalName);
    await ctx.reply('💪 Выберите группу мышц:', { reply_markup: groupKb });

    const groupCtx = await conversation.waitForCallbackQuery(
      [MUSCLE_GROUP_CALLBACK_REGEX, 'new_exercise'],
      {
        otherwise: (otherCtx) =>
          otherCtx.reply('Выберите группу мышц или вариант из кнопок выше 👆', {
            reply_to_message_id: otherCtx.message?.message_id,
          }),
      },
    );
    groupCtx.answerCallbackQuery().catch(() => {});
    if (groupCtx.callbackQuery.message && groupCtx.chat?.id) {
      groupCtx.api
        .deleteMessage(groupCtx.chat.id, groupCtx.callbackQuery.message.message_id)
        .catch(() => {});
    }

    if (groupCtx.callbackQuery.data === 'new_exercise') {
      return 'raw';
    }

    const raw = groupCtx.callbackQuery.data.slice('mg:'.length);

    // 'all' → нет фильтра; числовой индекс → берём MuscleGroupEntry по индексу
    const selectedEntry = raw === 'all' ? null : (MUSCLE_GROUPS[parseInt(raw, 10)] ?? null);

    const result = await handleFlatList(conversation, ctx, originalName, userId, selectedEntry);

    // null — сигнал «вернуться назад», снова показываем группы
    if (result !== null) {
      return result;
    }
    // При null — цикл продолжается: показываем группы снова
  }
}

/**
 * Показывает список упражнений (по группе мышц или все) с кнопкой «⬅️ Назад»,
 * ждёт ввод от пользователя или нажатие «Назад».
 *
 * @param conversation Контекст стейт-машины
 * @param ctx Текущий контекст grammY
 * @param originalName Оригинальное название (для создания)
 * @param userId ID пользователя
 * @param muscleGroup Группа мышц или null для «всех»
 * @returns ID выбранного упражнения | 'raw' | null (null = пользователь нажал «Назад»)
 */
async function handleFlatList(
  conversation: Conversation<CustomContext, CustomContext>,
  ctx: CustomContext,
  originalName: string,
  userId: string,
  muscleGroup: MuscleGroupEntry | null,
): Promise<string | null> {
  const exercises =
    muscleGroup !== null
      ? await conversation.external(() =>
          exerciseService.getByMuscleGroup([...muscleGroup.dbValues]),
        )
      : await conversation.external(() => exerciseService.getAllExercises());

  const groupLabel = muscleGroup?.label ?? 'Все упражнения';
  const chunks = buildExerciseListChunks(exercises);

  await ctx.reply(`📋 ${groupLabel}:`);
  for (const chunk of chunks) {
    await ctx.reply(chunk);
  }

  // Кнопка «Назад» под вопросом — пользователь может либо написать/сказать, либо вернуться
  const backKb = new InlineKeyboard().text('⬅️ Назад к группам', BACK_CALLBACK);
  await ctx.reply('Скажите или напишите название нужного упражнения:', { reply_markup: backKb });

  // Ждём любое обновление: текст, голос или нажатие «Назад»
  const inputCtx = await conversation.wait();

  // Пользователь нажал «Назад»
  if (inputCtx.callbackQuery?.data === BACK_CALLBACK) {
    inputCtx.answerCallbackQuery().catch(() => {});
    if (inputCtx.callbackQuery?.message && inputCtx.chat?.id) {
      inputCtx.api
        .deleteMessage(inputCtx.chat.id, inputCtx.callbackQuery.message.message_id)
        .catch(() => {});
    }
    return null; // сигнал «вернуться к списку групп»
  }

  // Пользователь передал голосовое сообщение
  let inputText: string;
  if (inputCtx.message?.voice) {
    try {
      inputText = await downloadAndTranscribeVoice(inputCtx as CustomContext, conversation);
    } catch {
      logger.warn('Ошибка STT при голосовом выборе из списка — создаём с оригинальным именем');
      return 'raw';
    }
  } else if (inputCtx.message?.text) {
    inputText = inputCtx.message.text;
  } else {
    // Неожиданный тип обновления — игнорируем и просим повторить
    await ctx.reply('Пожалуйста, напишите или скажите название упражнения 👆');
    return 'raw';
  }

  // Пользователь говорит что такого нет
  if (!inputText.trim() || /нет такого|не знаю|создай/i.test(inputText)) {
    logger.info({ originalName }, 'User explicitly declined list — will create new exercise');
    return 'raw';
  }

  const resolved = await conversation.external(() =>
    exerciseService.resolveExercise(inputText, userId),
  );

  if (resolved.status === 'resolved') {
    await conversation.external(() =>
      exerciseService.confirmMapping(userId, originalName, resolved.exercise.id),
    );
    return resolved.exercise.id;
  }

  if (resolved.status === 'ambiguous' && resolved.options.length > 0) {
    const kb = createExercisePickerKeyboard(resolved.options, inputText);
    await ctx.reply(`Нашёл несколько вариантов для «${inputText}»:`, { reply_markup: kb });

    const pickCtx = await conversation.waitForCallbackQuery([/^map:/, 'new_exercise'], {
      otherwise: (otherCtx) =>
        otherCtx.reply('Выберите вариант из меню выше 👆', {
          reply_to_message_id: otherCtx.message?.message_id,
        }),
    });
    pickCtx.answerCallbackQuery().catch(() => {});

    const pickText = pickCtx.callbackQuery.data.startsWith('map:')
      ? `✅ Выбран вариант для «${inputText}».`
      : `✅ Будет создано новое упражнение для «${inputText}».`;

    if (pickCtx.callbackQuery.message && pickCtx.chat?.id) {
      pickCtx.api
        .editMessageText(pickCtx.chat.id, pickCtx.callbackQuery.message.message_id, pickText)
        .catch(() => {});
    }

    if (pickCtx.callbackQuery.data.startsWith('map:')) {
      const exerciseId = pickCtx.callbackQuery.data.split(':')[1];
      await conversation.external(() =>
        exerciseService.confirmMapping(userId, originalName, exerciseId),
      );
      return exerciseId;
    }
    return 'raw';
  }

  logger.info({ inputText }, 'Exercise not found after voice list — will create with user input');
  return 'raw';
}
