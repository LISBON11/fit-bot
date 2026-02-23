import { PrismaClient } from '@prisma/client';
import { workoutService } from '../../src/services/index.js';
import type { ParsedWorkout } from '../../src/nlu/nlu.types.js';

const prisma = new PrismaClient();

describe('Workout Flow Integration', () => {
  let userId: string;

  beforeEach(async () => {
    // Создаем пользователя для тестов
    const user = await prisma.user.create({
      data: {
        telegramId: '123456789',
        telegramUsername: 'testuser',
      },
    });
    userId = user.id;

    // Сидируем одно упражнение для маппинга
    await prisma.exercise.create({
      data: {
        id: '11111111-1111-1111-1111-111111111111',
        canonicalName: 'squat',
        displayNameRu: 'Приседания со штангой',
        displayNameEn: 'Barbell Squat',
        isGlobal: true,
        muscleGroups: ['LEGS'],
      },
    });

    await prisma.exerciseSynonym.create({
      data: {
        exerciseId: '11111111-1111-1111-1111-111111111111',
        synonym: 'присед',
        language: 'ru',
        isGlobal: true,
      },
    });
  });

  const sampleParsedWorkout: ParsedWorkout = {
    date: new Date().toISOString().split('T')[0],
    focus: 'legs',
    exercises: [
      {
        originalName: 'присед',
        mappedExerciseId: null,
        isAmbiguous: false,
        sets: [
          { reps: 10, weight: 60, duration: null, distance: null, rpe: null },
          { reps: 8, weight: 65, duration: null, distance: null, rpe: null },
        ],
        comments: [],
      },
    ],
    generalComments: [],
  };

  test('should create draft, approve it and save all nested data', async () => {
    // 1. Создание черновика
    const result = await workoutService.createDraft(userId, sampleParsedWorkout);

    expect(result.status).toBe('created');
    if (result.status !== 'created') throw new Error('Failed to create draft');

    const draftId = result.workout.id;

    // Проверяем статус DRAFT в БД
    const dbWorkout = await prisma.workout.findUnique({ where: { id: draftId } });
    expect(dbWorkout?.status).toBe('DRAFT');

    // 2. Аппрув
    await workoutService.approveDraft(draftId);

    // 3. Проверяем изменения в БД
    const dbWorkoutWithRelations = await prisma.workout.findUnique({
      where: { id: draftId },
      include: {
        workoutExercises: {
          include: {
            sets: true,
            exercise: true,
          },
        },
      },
    });

    expect(dbWorkoutWithRelations?.status).toBe('APPROVED');
    expect(dbWorkoutWithRelations?.workoutExercises).toHaveLength(1);

    const workoutExercise = dbWorkoutWithRelations?.workoutExercises[0];
    expect(workoutExercise).toBeDefined();
    expect(workoutExercise?.exercise.canonicalName).toBe('squat');
    expect(workoutExercise?.sets).toHaveLength(2);
    expect(Number(workoutExercise?.sets[0]?.weight)).toBe(60);
  });

  test('should create draft and cancel it', async () => {
    const result = await workoutService.createDraft(userId, sampleParsedWorkout);

    expect(result.status).toBe('created');
    if (result.status !== 'created') throw new Error('Failed to create draft');

    const draftId = result.workout.id;

    // Отменяем
    await workoutService.cancelDraft(draftId);

    // Проверяем что тренировка и зависимые сущности удалены
    const dbWorkout = await prisma.workout.findUnique({ where: { id: draftId } });
    expect(dbWorkout).toBeNull();

    // Также можно проверить, что exercises и sets тоже удалились (каскадно)
    const count = await prisma.workoutExercise.count({ where: { workoutId: draftId } });
    expect(count).toBe(0);
  });
});
