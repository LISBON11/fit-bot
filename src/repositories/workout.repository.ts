import type { PrismaClient, Prisma, Workout } from '@prisma/client';
import { WorkoutStatus, CommentType } from '@prisma/client';
import type { ParsedExercise, ParsedComment } from '../nlu/nlu.types.js';
import type { WorkoutWithRelations } from '../bot/formatters/workoutFormatter.js';

/**
 * Репозиторий для управления тренировками и связанными сущностями (упражнения, подходы, комментарии)
 */
export class WorkoutRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Создает тренировку со всеми вложенными связями (упражнения, подходы, комментарии)
   * @param userId ID пользователя, для которого создается тренировка
   * @param workoutDate Дата тренировки
   * @param focusArray Массив мышечных групп, на которые направлена тренировка
   * @param resolvedExercises Список распознанных упражнений с их подходами
   * @param generalComments Общие комментарии к тренировке
   * @returns Созданная тренировка со всеми вложенными связями или null при ошибке
   */
  async createWithRelations(
    userId: string,
    workoutDate: Date,
    focusArray: string[],
    resolvedExercises: { exerciseId: string; parsed: ParsedExercise }[],
    generalComments: ParsedComment[],
  ): Promise<Workout | null> {
    return this.prisma.$transaction(async (tx) => {
      const workout = await tx.workout.create({
        data: {
          user: { connect: { id: userId } },
          workoutDate,
          focus: focusArray,
          status: WorkoutStatus.DRAFT,
        },
      });

      for (let i = 0; i < resolvedExercises.length; i++) {
        const resData = resolvedExercises[i];
        const we = await tx.workoutExercise.create({
          data: {
            workoutId: workout.id,
            exerciseId: resData.exerciseId,
            sortOrder: i,
            rawName: resData.parsed.originalName,
          },
        });

        if (resData.parsed.sets.length > 0) {
          await tx.exerciseSet.createMany({
            data: resData.parsed.sets.map((set, setIndex) => ({
              workoutExerciseId: we.id,
              setNumber: setIndex + 1,
              reps: set.reps || 0,
              weight: set.weight || null,
            })),
          });
        }

        if (resData.parsed.comments.length > 0) {
          await tx.workoutComment.createMany({
            data: resData.parsed.comments.map((c) => ({
              workoutId: workout.id,
              workoutExerciseId: we.id,
              commentType: CommentType.OTHER,
              rawText: c.text,
            })),
          });
        }
      }

      if (generalComments.length > 0) {
        await tx.workoutComment.createMany({
          data: generalComments.map((c) => ({
            workoutId: workout.id,
            commentType: CommentType.OTHER,
            rawText: c.text,
          })),
        });
      }

      return tx.workout.findUnique({
        where: { id: workout.id },
        include: {
          workoutExercises: {
            include: {
              exercise: true,
              sets: { orderBy: { setNumber: 'asc' } },
              comments: true,
            },
            orderBy: { sortOrder: 'asc' },
          },
          comments: true,
        },
      });
    });
  }

  /**
   * Находит тренировку по ID со всеми связями
   * @param id ID тренировки
   * @returns Тренировка со всеми вложенными связями или null, если не найдена
   */
  async findById(id: string): Promise<Workout | null> {
    return this.prisma.workout.findUnique({
      where: { id },
      include: {
        workoutExercises: {
          include: {
            exercise: true,
            sets: {
              orderBy: { setNumber: 'asc' },
            },
            comments: true,
          },
          orderBy: { sortOrder: 'asc' },
        },
        comments: true,
      },
    });
  }

  /**
   * Находит тренировку пользователя за указанную дату
   * @param userId ID пользователя
   * @param targetDate Целевая дата поиска
   * @returns Тренировка за указанный день со всеми связями или null, если не найдена
   */
  async findByUserAndDate(userId: string, targetDate: Date): Promise<Workout | null> {
    // В PostgreSQL db.Date хранит только дату. Но в Prisma это объект Date.
    // Сделаем поиск по диапазону дня (с начала до конца суток в UTC), чтобы быть уверенными.
    const startOfDay = new Date(targetDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    return this.prisma.workout.findFirst({
      where: {
        userId,
        workoutDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        workoutExercises: {
          include: {
            exercise: true,
            sets: {
              orderBy: { setNumber: 'asc' },
            },
            comments: true,
          },
          orderBy: { sortOrder: 'asc' },
        },
        comments: true,
      },
    });
  }

  /**
   * Находит черновик тренировки пользователя
   * @param userId ID пользователя
   * @returns Тренировка со статусом DRAFT и всеми связями или null, если черновика нет
   */
  async findDraftByUser(userId: string): Promise<WorkoutWithRelations | null> {
    return this.prisma.workout.findFirst({
      where: {
        userId,
        status: WorkoutStatus.DRAFT,
      },
      include: {
        workoutExercises: {
          include: {
            exercise: true,
            sets: {
              orderBy: { setNumber: 'asc' },
            },
            comments: true,
          },
          orderBy: { sortOrder: 'asc' },
        },
        comments: true,
      },
    });
  }

  /**
   * Обновляет статус тренировки
   * @param id ID тренировки
   * @param status Новый статус тренировки
   * @returns Обновленная тренировка
   */
  async updateStatus(id: string, status: WorkoutStatus): Promise<Workout> {
    return this.prisma.workout.update({
      where: { id },
      data: { status },
    });
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
    return this.prisma.workout.update({
      where: { id },
      data,
    });
  }

  /**
   * Удаляет тренировку по ID
   * @param id ID тренировки
   * @returns Удаленная тренировка
   */
  async deleteById(id: string): Promise<Workout> {
    return this.prisma.workout.delete({
      where: { id },
    });
  }

  /**
   * Полностью заменяет старые упражнения на новые в рамках транзакции и обновляет саму тренировку (дату, фокус).
   * @param workoutId ID тренировки
   * @param workoutUpdateData Данные для обновления самой тренировки (дата, фокус)
   * @param resolvedExercises Список распознанных упражнений
   * @param generalComments Общие комментарии
   * @returns Обновленная тренировка с новыми упражнениями
   */
  async replaceExercises(
    workoutId: string,
    workoutUpdateData: Prisma.WorkoutUpdateInput,
    resolvedExercises: { exerciseId: string; parsed: ParsedExercise }[],
    generalComments: ParsedComment[],
  ): Promise<Workout> {
    return this.prisma.$transaction(async (tx) => {
      // 1. Удаляем все старые упражнения и их комментарии
      await tx.workoutExercise.deleteMany({
        where: { workoutId },
      });
      // 2. Удаляем старые общие комментарии к тренировке
      await tx.workoutComment.deleteMany({
        where: { workoutId, workoutExerciseId: null },
      });

      // 3. Обновляем базовые поля тренировки
      await tx.workout.update({
        where: { id: workoutId },
        data: workoutUpdateData,
      });

      // 4. Воссоздаем упражнения, подходы и комментарии
      for (let i = 0; i < resolvedExercises.length; i++) {
        const resData = resolvedExercises[i];
        const we = await tx.workoutExercise.create({
          data: {
            workoutId,
            exerciseId: resData.exerciseId,
            sortOrder: i,
            rawName: resData.parsed.originalName,
          },
        });

        if (resData.parsed.sets.length > 0) {
          await tx.exerciseSet.createMany({
            data: resData.parsed.sets.map((set, setIndex) => ({
              workoutExerciseId: we.id,
              setNumber: setIndex + 1,
              reps: set.reps || 0,
              weight: set.weight || null,
            })),
          });
        }

        if (resData.parsed.comments.length > 0) {
          await tx.workoutComment.createMany({
            data: resData.parsed.comments.map((c) => ({
              workoutId,
              workoutExerciseId: we.id,
              commentType: CommentType.OTHER,
              rawText: c.text,
            })),
          });
        }
      }

      if (generalComments.length > 0) {
        await tx.workoutComment.createMany({
          data: generalComments.map((c) => ({
            workoutId,
            commentType: CommentType.OTHER,
            rawText: c.text,
          })),
        });
      }

      return tx.workout.findUniqueOrThrow({
        where: { id: workoutId },
        include: {
          workoutExercises: {
            include: {
              exercise: true,
              sets: { orderBy: { setNumber: 'asc' } },
              comments: true,
            },
            orderBy: { sortOrder: 'asc' },
          },
          comments: true,
        },
      });
    });
  }
}
