import type { WorkoutRepository } from '../repositories/workout.repository.js';
import type { ExerciseService } from './exercise.service.js';
import type { ParsedWorkout, ParsedExercise } from '../nlu/nlu.types.js';
import type { Workout } from '@prisma/client';
import { WorkoutStatus } from '@prisma/client';

export type CreateDraftResult =
  | { status: 'created'; workout: Workout }
  | { status: 'needs_disambiguation'; ambiguousExercises: ParsedExercise[] };

export class WorkoutService {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
    private readonly exerciseService: ExerciseService,
  ) {}

  /**
   * Создает черновик тренировки на основе распарсенных данных.
   * Если есть неизвестные или неоднозначные упражнения - возвращает needs_disambiguation.
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
   */
  async approveDraft(workoutId: string): Promise<Workout> {
    return this.workoutRepository.updateStatus(workoutId, WorkoutStatus.APPROVED);
  }

  /**
   * Удаляет черновик
   */
  async cancelDraft(workoutId: string): Promise<Workout> {
    return this.workoutRepository.deleteById(workoutId);
  }

  /**
   * Возвращает текущий черновик пользователя
   */
  async getDraftForUser(userId: string): Promise<Workout | null> {
    return this.workoutRepository.findDraftByUser(userId);
  }

  /**
   * Находит завершенную/отменную тренировку по дате
   */
  async findByDate(userId: string, targetDate: Date): Promise<Workout | null> {
    return this.workoutRepository.findByUserAndDate(userId, targetDate);
  }

  /**
   * Применяет дельту правок (для шага 4.2)
   */
  async applyEdits(_workoutId: string, _parsedDelta: unknown): Promise<void> {
    // В рамках текущего этапа эта функция будет реализована позже (Шаг 4.2)
    throw new Error('Method applyEdits not implemented yet.');
  }
}
