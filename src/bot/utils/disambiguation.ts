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
import type { Exercise } from '../../generated/prisma/index.js';
import { createLogger } from '../../logger/logger.js';
import { downloadAndTranscribeVoice } from './telegram.js';
import type { ProgressTracker } from './progressTracker.js';
import { WorkoutStep } from './progressTracker.js';
import { WorkoutParser } from '../../nlu/workout-parser.js';
const logger = createLogger('disambiguation');

/** Callback_data для кнопки «Назад» */
const BACK_CALLBACK = 'back_to_groups';

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
 * @param tracker Опциональный ProgressTracker для обновления статусов UI
 * @returns Финальный статус (обычно 'created' или 'updated')
 */
export async function runDisambiguationLoop({
  conversation,
  ctx,
  parsedDelta,
  workoutId,
  userId,
  isEditMode = false,
  tracker,
}: {
  conversation: Conversation<CustomContext, CustomContext>;
  ctx: CustomContext;
  parsedDelta: ParsedWorkout | { add?: unknown[]; update?: unknown[]; remove?: string[] };
  workoutId: string;
  userId: string;
  isEditMode: boolean;
  tracker?: ProgressTracker;
}): Promise<{ status: string; ambiguousExercises?: ParsedExercise[]; workout?: { id: string } }> {
  tracker?.setRunning({ step: WorkoutStep.SAVE });
  let result = await conversation.external(async () => {
    const fn = isEditMode
      ? await workoutService.applyEdits({
          workoutId,
          userId,
          parsedWorkout: parsedDelta as ParsedWorkout,
        })
      : await workoutService.createDraft({ userId, parsedWorkout: parsedDelta as ParsedWorkout });
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

  // Если нет неоднозначных упражнений — сразу сохраняем и пропускаем шаг EXERCISES
  // CLARIFY не трогаем — им управляет newWorkout.ts (фаза preview/review)
  if (result.status !== 'needs_disambiguation') {
    tracker?.setSkipped({ step: WorkoutStep.EXERCISES });
    tracker?.setDone({ step: WorkoutStep.SAVE });
    return result;
  }

  // Есть неоднозначные — собираем подсписок и переходим к EXERCISES, а SAVE возвращаем в ожидание
  tracker?.setPending({ step: WorkoutStep.SAVE });

  while (result.status === 'needs_disambiguation') {
    const ambiguousExercises = result.ambiguousExercises || [];

    // При первом входе в цикл — добавляем подсписок к шагу EXERCISES
    const newExerciseNames = ambiguousExercises
      .filter((a) => !a.mappedExerciseId)
      .map((a) => a.originalName);

    if (newExerciseNames.length > 0) {
      tracker?.setRunning({ step: WorkoutStep.EXERCISES });
      tracker?.addSubItems({ step: WorkoutStep.EXERCISES, items: newExerciseNames });
      // CLARIFY не устанавливаем здесь — им управляет newWorkout.ts
    }

    let subItemIndex = 0;
    for (const ambig of ambiguousExercises) {
      if (ambig.mappedExerciseId) continue;

      tracker?.setSubItemRunning({ step: WorkoutStep.EXERCISES, index: subItemIndex });

      const resolveResult = await conversation.external(() =>
        exerciseService.resolveExercise({ inputText: ambig.originalName, userId }),
      );

      const options: Array<Pick<Exercise, 'id' | 'canonicalName' | 'displayNameRu'>> =
        resolveResult.status === 'ambiguous' ? resolveResult.options : [];

      const kb = createExercisePickerKeyboard({
        options: options,
        originalName: ambig.originalName,
      });

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

      const messageId = responseCtx.callbackQuery.message?.message_id;

      // Вместо удаления сообщения меняем его текст, оставляя историю выбора
      if (messageId && responseCtx.chat?.id) {
        responseCtx.api.editMessageText(responseCtx.chat.id, messageId, choiceText).catch(() => {});
      }

      if (data.startsWith('map:')) {
        // Пользователь выбрал готовый вариант из списка
        const exerciseId = data.split(':')[1];
        await conversation.external(() =>
          exerciseService.confirmMapping({ userId, inputText: ambig.originalName, exerciseId }),
        );
        ambig.mappedExerciseId = exerciseId;
      } else if (data === 'new_exercise') {
        // Пользователь хочет создать новое упражнение с оригинальным именем
        logger.info({ originalName: ambig.originalName }, 'Creating new user exercise');
        const newExercise = await conversation.external(() =>
          exerciseService.createUserExercise({ userId, name: ambig.originalName }),
        );
        ambig.mappedExerciseId = newExercise.id;
        logger.info({ exerciseId: newExercise.id }, 'New exercise created');
      } else if (data === 'voice_list') {
        // Двухшаговый выбор с навигацией: группа мышц → список → [Назад] → группа
        const resolved = await handleVoiceListSelection({
          conversation: conversation,
          ctx: ctx,
          originalName: ambig.originalName,
          userId: userId,
          messageId: messageId,
        });

        if (messageId && responseCtx.chat?.id) {
          const finalText =
            resolved === 'raw'
              ? `✅ Упражнение «${ambig.originalName}» создано.`
              : `✅ Упражнение «${ambig.originalName}» сопоставлено.`;
          ctx.api.editMessageText(responseCtx.chat.id, messageId, finalText).catch(() => {});
        }

        if (resolved === 'raw') {
          logger.info({ originalName: ambig.originalName }, 'Voice list: creating new exercise');
          const newExercise = await conversation.external(() =>
            exerciseService.createUserExercise({ userId, name: ambig.originalName }),
          );
          ambig.mappedExerciseId = newExercise.id;
        } else {
          ambig.mappedExerciseId = resolved;
        }
      }

      tracker?.setSubItemDone({ step: WorkoutStep.EXERCISES, index: subItemIndex });
      subItemIndex++;
    }

    tracker?.setDone({ step: WorkoutStep.EXERCISES });

    tracker?.setRunning({ step: WorkoutStep.SAVE });
    result = await conversation.external(async () => {
      const fn = isEditMode
        ? await workoutService.applyEdits({
            workoutId,
            userId,
            parsedWorkout: parsedDelta as ParsedWorkout,
          })
        : await workoutService.createDraft({ userId, parsedWorkout: parsedDelta as ParsedWorkout });
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
    tracker?.setDone({ step: WorkoutStep.SAVE });
  }

  // CLARIFY не завершаем здесь — его завершает newWorkout.ts после Approve
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
async function handleVoiceListSelection({
  conversation,
  ctx,
  originalName,
  userId,
  messageId,
}: {
  conversation: Conversation<CustomContext, CustomContext>;
  ctx: CustomContext;
  originalName: string;
  userId: string;
  messageId?: number;
}): Promise<string> {
  // Группы мышц — фиксированный список, запрос в БД не нужен
  if (MUSCLE_GROUPS.length === 0) {
    // В этой ветке кнопки «Назад» нет — null означает «нет выбора», трактуем как 'raw'
    return (
      (await handleFlatList({
        conversation: conversation,
        ctx: ctx,
        originalName: originalName,
        userId: userId,
        muscleGroup: null,
        messageId: messageId,
      })) ?? 'raw'
    );
  }

  // Цикл навигации: выбор группы → список → [Назад] → возврат к выбору группы
  while (true) {
    const groupKb = createMuscleGroupPickerKeyboard({
      groups: [...MUSCLE_GROUPS],
      originalName: originalName,
    });

    const text = `🔍 Поиск по категориям для «${originalName}»...\n\n💪 Выберите группу мышц:`;
    if (messageId && ctx.chat?.id) {
      await ctx.api
        .editMessageText(ctx.chat.id, messageId, text, { reply_markup: groupKb })
        .catch(() => {});
    } else {
      const msg = await ctx.reply(text, { reply_markup: groupKb });
      messageId = msg.message_id;
    }

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

    if (groupCtx.callbackQuery.data === 'new_exercise') {
      return 'raw';
    }

    const raw = groupCtx.callbackQuery.data.slice('mg:'.length);

    // 'all' → нет фильтра; числовой индекс → берём MuscleGroupEntry по индексу
    const selectedEntry = raw === 'all' ? null : (MUSCLE_GROUPS[parseInt(raw, 10)] ?? null);

    const result = await handleFlatList({
      conversation: conversation,
      ctx: ctx,
      originalName: originalName,
      userId: userId,
      muscleGroup: selectedEntry,
      messageId: messageId,
    });

    // null — сигнал «вернуться назад», снова показываем группы
    if (result !== null) {
      return result;
    }
    // При null — цикл продолжается: показываем группы снова
  }
}

/**
 * Очищает ввод пользователя от порядкового номера (числа) в начале строки,
 * чтобы при поиске по названию номер не мешал (например, "8 зашагивание").
 */
function cleanInputFromDigit(text: string): string {
  return text.replace(/^(?:номер|вариант)?\s*\d+[.)-]*\s*/i, '').trim();
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
async function handleFlatList({
  conversation,
  ctx,
  originalName,
  userId,
  muscleGroup,
  messageId,
}: {
  conversation: Conversation<CustomContext, CustomContext>;
  ctx: CustomContext;
  originalName: string;
  userId: string;
  muscleGroup: MuscleGroupEntry | null;
  messageId?: number;
}): Promise<string | null> {
  const exercises =
    muscleGroup !== null
      ? await conversation.external(() =>
          exerciseService.getByMuscleGroup([...muscleGroup.dbValues]),
        )
      : await conversation.external(() => exerciseService.getAllExercises());

  const groupLabel = muscleGroup?.label ?? 'Все упражнения';
  const listText = exercises
    .map((e, i) => `${i + 1}. ${e.displayNameRu ?? e.canonicalName}`)
    .join('\n');

  const fullText = `📋 ${groupLabel}:\n\n${listText}\n\nСкажите или напишите название нужного упражнения:`;

  const backKb = new InlineKeyboard().text('⬅️ Назад к группам', BACK_CALLBACK);

  if (messageId && ctx.chat?.id) {
    await ctx.api
      .editMessageText(ctx.chat.id, messageId, fullText, { reply_markup: backKb })
      .catch(() => {});
  } else {
    await ctx.reply(fullText, { reply_markup: backKb });
  }

  // Ждём любое обновление: текст, голос или нажатие «Назад»
  const inputCtx = await conversation.wait();

  // Пользователь нажал «Назад»
  if (inputCtx.callbackQuery?.data === BACK_CALLBACK) {
    inputCtx.answerCallbackQuery().catch(() => {});
    return null; // сигнал «вернуться к списку групп»
  }

  // Пользователь передал голосовое сообщение
  let inputText: string;
  if (inputCtx.message?.voice) {
    try {
      inputText = await downloadAndTranscribeVoice({
        ctx: inputCtx as CustomContext,
        conversation: conversation,
      });
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

  // 1. Проверяем точный номер из цифр: это быстро, экономим NLU запрос
  // Если в тексте только ОДНО число (цифрами), доверяем ему.
  // Если чисел больше одного (например "99, а нет, 5"), отправляем в NLU.
  const allDigits = inputText.match(/\d+/g);
  let selectedListIndex: number | null = null;

  if (allDigits && allDigits.length === 1) {
    const match = inputText.toLowerCase().match(/^(?:номер|вариант)?\s*(\d+)/i);
    if (match) {
      selectedListIndex = parseInt(match[1], 10) - 1;
    }
  }

  if (selectedListIndex === null) {
    // 2. Отдаем в NLU для распознавания текста (имена, словесные числительные на любых языках)
    const parser = new WorkoutParser();
    const optionsText = exercises.map((e) => e.displayNameRu ?? e.canonicalName);
    selectedListIndex = await conversation.external(() =>
      parser.parseListSelection({ rawText: inputText, options: optionsText }),
    );
  }

  // Если нашли индекс и он валидный
  if (
    selectedListIndex !== null &&
    selectedListIndex >= 0 &&
    selectedListIndex < exercises.length
  ) {
    const selectedExercise = exercises[selectedListIndex];
    logger.info(
      { originalName, selectedExerciseId: selectedExercise.id, inputText },
      'User selected exercise from the list (digit or NLU)',
    );
    await conversation.external(() =>
      exerciseService.confirmMapping({
        userId,
        inputText: originalName,
        exerciseId: selectedExercise.id,
      }),
    );
    return selectedExercise.id;
  }

  // Если после очистки осталась пустая строка (и пользователь почему-то ввел номер вне допустимого диапазона),
  // то падаем на создание raw.
  const cleanedInputText = cleanInputFromDigit(inputText);
  if (!cleanedInputText) {
    logger.info({ originalName, inputText }, 'Invalid number or empty text after cleaning');
    return 'raw';
  }

  // 2. Ищем прямое совпадение со списком (пользователь сказал или написал точное название из списка)
  const matchedExercise = exercises.find((ex) => {
    const nameStr = (ex.displayNameRu ?? ex.canonicalName).toLowerCase();
    // Проверка на точное совпадение очищенного текста
    return nameStr === cleanedInputText.toLowerCase();
  });

  if (matchedExercise) {
    logger.info(
      { originalName, matchedExerciseId: matchedExercise.id, inputText: cleanedInputText },
      'User selected exercise by exact name from the list',
    );
    await conversation.external(() =>
      exerciseService.confirmMapping({
        userId,
        inputText: originalName,
        exerciseId: matchedExercise.id,
      }),
    );
    return matchedExercise.id;
  }

  // 3. Если совпадений нет — делегируем глобальному сервису (с очищенным от цифр текстом)
  const resolved = await conversation.external(() =>
    exerciseService.resolveExercise({ inputText: cleanedInputText, userId }),
  );

  if (resolved.status === 'resolved') {
    await conversation.external(() =>
      exerciseService.confirmMapping({
        userId,
        inputText: originalName,
        exerciseId: resolved.exercise.id,
      }),
    );
    return resolved.exercise.id;
  }

  if (resolved.status === 'ambiguous' && resolved.options.length > 0) {
    const kb = createExercisePickerKeyboard({ options: resolved.options, originalName: inputText });

    // Отправляем новое сообщение, так как это шаг уточнения
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
        exerciseService.confirmMapping({ userId, inputText: originalName, exerciseId }),
      );
      return exerciseId;
    }
    return 'raw';
  }

  logger.info({ inputText }, 'Exercise not found after voice list — will create with user input');
  return 'raw';
}
