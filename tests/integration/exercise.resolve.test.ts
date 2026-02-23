import { PrismaClient } from '@prisma/client';
import { exerciseService } from '../../src/services/index.js';

const prisma = new PrismaClient();

describe('Exercise Resolving Integration', () => {
  const userId = 'user-uuid-1234';

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
          id: 'ex-1',
          canonicalName: 'deadlift',
          displayNameRu: 'Становая тяга',
          isGlobal: true,
          muscleGroups: ['BACK'],
        },
        {
          id: 'ex-2',
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
        exerciseId: 'ex-1',
        synonym: 'становая',
        language: 'ru',
        isGlobal: true,
      },
    });

    // 4. Добавим неоднозначный синоним "тяга" к обоим
    await prisma.exerciseSynonym.createMany({
      data: [
        { exerciseId: 'ex-1', synonym: 'тяга', language: 'ru', isGlobal: true },
        { exerciseId: 'ex-2', synonym: 'тяга', language: 'ru', isGlobal: true },
      ],
    });
  });

  test('should exact match one exercise by synonym', async () => {
    const result = await exerciseService.resolveExercise('СТАНОВАЯ', userId);

    expect(result.status).toBe('resolved');
    if (result.status === 'resolved') {
      expect(result.exercise.id).toBe('ex-1');
      expect(result.exercise.canonicalName).toBe('deadlift');
    }
  });

  test('should return ambiguous matches for overlapping synonym', async () => {
    const result = await exerciseService.resolveExercise('тяга', userId);

    expect(result.status).toBe('ambiguous');
    if (result.status === 'ambiguous') {
      expect(result.options).toHaveLength(2);
      const ids = result.options.map((o) => o.id);
      expect(ids).toContain('ex-1');
      expect(ids).toContain('ex-2');
    }
  });

  test('should resolve by user mapping after confirmMapping', async () => {
    // Пользователь выбирает Румынскую тягу
    await exerciseService.confirmMapping(userId, 'тяга', 'ex-2');

    // Повторный резолв
    const result = await exerciseService.resolveExercise('тяга', userId);

    expect(result.status).toBe('resolved');
    if (result.status === 'resolved') {
      expect(result.exercise.id).toBe('ex-2');
      expect(result.exercise.canonicalName).toBe('romanian_deadlift');
    }
  });

  test('should return not_found if no synonym matches', async () => {
    const result = await exerciseService.resolveExercise('швунг', userId);
    expect(result.status).toBe('not_found');
  });
});
