import { PrismaClient } from '@prisma/client';
import { exerciseService } from '../../src/services/index.js';

const prisma = new PrismaClient();

describe('Exercise Resolving Integration', () => {
  const userId = '33333333-3333-3333-3333-333333333333';

  beforeEach(async () => {
    // 1. Создаем пользователя
    try {
      await prisma.user.create({
        data: {
          id: userId,
          telegramId: '99887766',
        },
      });
    } catch {
      // ignore if exists
    }

    // 2. Создаем базовые упражнения
    await prisma.exercise.createMany({
      data: [
        {
          id: '11111111-1111-1111-1111-111111111111',
          canonicalName: 'deadlift',
          displayNameRu: 'Становая тяга',
          isGlobal: true,
          muscleGroups: ['BACK'],
        },
        {
          id: '22222222-2222-2222-2222-222222222222',
          canonicalName: 'romanian_deadlift',
          displayNameRu: 'Румынская тяга',
          isGlobal: true,
          muscleGroups: ['LEGS'],
        },
      ],
    });

    // 3. Создаем глобальные синонимы (только 1 для ex-1)
    await prisma.exerciseSynonym.create({
      data: {
        exerciseId: '11111111-1111-1111-1111-111111111111',
        synonym: 'становая',
        language: 'ru',
        isGlobal: true,
      },
    });

    // 4. Добавим неоднозначный синоним "тяга" к обоим
    await prisma.exerciseSynonym.createMany({
      data: [
        {
          exerciseId: '11111111-1111-1111-1111-111111111111',
          synonym: 'тяга',
          language: 'ru',
          isGlobal: true,
        },
        {
          exerciseId: '22222222-2222-2222-2222-222222222222',
          synonym: 'тяга',
          language: 'ru',
          isGlobal: true,
        },
      ],
    });
  });

  test('should exact match one exercise by synonym', async () => {
    const result = await exerciseService.resolveExercise('СТАНОВАЯ', userId);

    expect(result.status).toBe('resolved');
    if (result.status === 'resolved') {
      expect(result.exercise.id).toBe('11111111-1111-1111-1111-111111111111');
      expect(result.exercise.canonicalName).toBe('deadlift');
    }
  });

  test('should return ambiguous matches for overlapping synonym', async () => {
    const result = await exerciseService.resolveExercise('тяга', userId);

    expect(result.status).toBe('ambiguous');
    if (result.status === 'ambiguous') {
      expect(result.options).toHaveLength(2);
      const ids = result.options.map((o) => o.id);
      expect(ids).toContain('11111111-1111-1111-1111-111111111111');
      expect(ids).toContain('22222222-2222-2222-2222-222222222222');
    }
  });

  test('should resolve by user mapping after confirmMapping', async () => {
    // Пользователь выбирает Румынскую тягу
    await exerciseService.confirmMapping(userId, 'тяга', '22222222-2222-2222-2222-222222222222');

    // Повторный резолв
    const result = await exerciseService.resolveExercise('тяга', userId);

    expect(result.status).toBe('resolved');
    if (result.status === 'resolved') {
      expect(result.exercise.id).toBe('22222222-2222-2222-2222-222222222222');
      expect(result.exercise.canonicalName).toBe('romanian_deadlift');
    }
  });

  test('should return not_found if no synonym matches', async () => {
    const result = await exerciseService.resolveExercise('швунг', userId);
    expect(result.status).toBe('not_found');
  });
});
