import type { WorkoutRepository } from '../repositories/workout.repository.js';
import type { ExerciseService } from './exercise.service.js';
import type { ParsedWorkout, ParsedExercise } from '../nlu/nlu.types.js';
import type { Workout } from '@prisma/client';
import { WorkoutStatus } from '@prisma/client';
import { AppError } from '../errors/app-errors.js';
import type { WorkoutWithRelations } from '../bot/formatters/workoutFormatter.js';

/**
 * Результат создания черновика тренировки
 */
export type CreateDraftResult =
  | { status: 'created'; workout: Workout }
  | { status: 'needs_disambiguation'; ambiguousExercises: ParsedExercise[] };

/**
 * Сервис для бизнес-логики, связанной с тренировками и их жизненным циклом (создание, черновики, подтверждение)
 */
export class WorkoutService {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
    private readonly exerciseService: ExerciseService,
  ) {}

  /**
   * Создает черновик тренировки на основе распарсенных данных.
   * Если есть неизвестные или неоднозначные упражнения - возвращает needs_disambiguation.
   * @param userId ID пользователя
   * @param parsedWorkout Распознанная тренировка из NLU
   * @returns Статус создания (успешно или требуется уточнение)
   */
  async createDraft(userId: string, parsedWorkout: ParsedWorkout): Promise<CreateDraftResult> {
    const ambiguousExercises: ParsedExercise[] = [];
    const resolvedExercises: Array<{ parsed: ParsedExercise; exerciseId: string }> = [];

    // 1. Resolve all exercises
    for (const parsedEx of parsedWorkout.exercises) {
      if (parsedEx.mappedExerciseId) {
        resolvedExercises.push({ parsed: parsedEx, exerciseId: parsedEx.mappedExerciseId });
        continue;
      }

      const resolveResult = await this.exerciseService.resolveExercise(
        parsedEx.originalName,
        userId,
      );

      if (resolveResult.status === 'ambiguous' || resolveResult.status === 'not_found') {
        ambiguousExercises.push({ ...parsedEx, isAmbiguous: true });
      } else if (resolveResult.status === 'resolved') {
        resolvedExercises.push({ parsed: parsedEx, exerciseId: resolveResult.exercise.id });
      }
    }

    // 2. If there are ambiguous exercises, return needs_disambiguation
    if (ambiguousExercises.length > 0) {
      return { status: 'needs_disambiguation', ambiguousExercises };
    }

    // 3. Prepare Prisma data
    const existingDraft = await this.workoutRepository.findDraftByUser(userId);
    if (existingDraft) {
      // Удаляем старый черновик, так как может быть только один активный
      await this.workoutRepository.deleteById(existingDraft.id);
    }

    const workoutDate = new Date(parsedWorkout.date);
    const focusArray = [parsedWorkout.focus];

    const workout = (await this.workoutRepository.createWithRelations(
      userId,
      workoutDate,
      focusArray,
      resolvedExercises,
      parsedWorkout.generalComments,
    )) as Workout;

    return { status: 'created', workout };
  }

  /**
   * Переводит черновик в статус APPROVED
   * @param workoutId ID черновика тренировки
   * @returns Обновленная тренировка со статусом APPROVED
   */
  async approveDraft(workoutId: string): Promise<Workout> {
    return this.workoutRepository.updateStatus(workoutId, WorkoutStatus.APPROVED);
  }

  /**
   * Удаляет черновик
   * @param workoutId ID черновика тренировки
   * @returns Удаленная тренировка
   */
  async cancelDraft(workoutId: string): Promise<Workout> {
    return this.workoutRepository.deleteById(workoutId);
  }

  /**
   * Возвращает текущий черновик пользователя
   * @param userId ID пользователя
   * @returns Черновик тренировки или null
   */
  async getDraftForUser(userId: string): Promise<WorkoutWithRelations | null> {
    return this.workoutRepository.findDraftByUser(userId);
  }

  /**
   * Находит завершенную/отменную тренировку по дате
   * @param userId ID пользователя
   * @param targetDate Целевая дата тренировки
   * @returns Найденная тренировка или null
   */
  async findByDate(userId: string, targetDate: Date): Promise<Workout | null> {
    return this.workoutRepository.findByUserAndDate(userId, targetDate);
  }

  /**
   * Возвращает тренировку по ID
   * @param id ID тренировки
   * @returns Тренировка или null
   */
  async findById(id: string): Promise<Workout | null> {
    return this.workoutRepository.findById(id);
  }

  /**
   * Обновляет ID сообщений Telegram, связанных с тренировкой
   * @param id ID тренировки
   * @param data Объект с идентификаторами сообщений (source, preview, published)
   * @returns Обновленная тренировка
   */
  async updateMessageIds(
    id: string,
    data: { sourceMessageId?: number; previewMessageId?: number; publishedMessageId?: number },
  ): Promise<Workout> {
    return this.workoutRepository.updateMessageIds(id, data);
  }

  /**
   * Применяет дельту правок (для шага 4.2)
   * @param workoutId ID тренировки
   * @param userId ID пользователя
   * @param parsedWorkout Распарсенный обновленный объект тренировки от NLU
   * @returns Результат обновления или необходимости уточнения неоднозначностей
   */
  async applyEdits(
    workoutId: string,
    userId: string,
    parsedWorkout: ParsedWorkout,
  ): Promise<{
    status: 'updated' | 'needs_disambiguation';
    workout?: Workout;
    ambiguousExercises?: ParsedExercise[];
  }> {
    const existingWorkout = await this.workoutRepository.findById(workoutId);
    if (!existingWorkout) {
      throw new AppError('Тренировка не найдена', 404);
    }
    if (existingWorkout.userId !== userId) {
      throw new AppError('Нет прав на редактирование этой тренировки', 403);
    }

    const resolvedExercises = [];
    const ambiguousExercises = [];

    // 1. Resolve all exercises
    for (const parsedEx of parsedWorkout.exercises) {
      if (parsedEx.mappedExerciseId) {
        resolvedExercises.push({ parsed: parsedEx, exerciseId: parsedEx.mappedExerciseId });
        continue;
      }

      const resolveResult = await this.exerciseService.resolveExercise(
        parsedEx.originalName,
        userId,
      );

      if (resolveResult.status === 'ambiguous' || resolveResult.status === 'not_found') {
        ambiguousExercises.push({ ...parsedEx, isAmbiguous: true });
      } else if (resolveResult.status === 'resolved') {
        resolvedExercises.push({ parsed: parsedEx, exerciseId: resolveResult.exercise.id });
      }
    }

    if (ambiguousExercises.length > 0) {
      return { status: 'needs_disambiguation', ambiguousExercises };
    }

    // 2. Оформляем обновление тренировки
    const workoutDate = new Date(parsedWorkout.date);
    const focusArray =
      typeof parsedWorkout.focus === 'string' ? [parsedWorkout.focus] : parsedWorkout.focus;

    const workoutUpdateData = {
      workoutDate,
      focus: focusArray,
    };

    const updatedWorkout = await this.workoutRepository.replaceExercises(
      workoutId,
      workoutUpdateData,
      resolvedExercises,
      parsedWorkout.generalComments,
    );

    return { status: 'updated', workout: updatedWorkout as Workout };
  }
}
