import type { DeepMockProxy } from 'jest-mock-extended';
import { createMockExerciseRepository } from '../../__tests__/utils/mockRepositories.js';
import { ExerciseService } from '../exercise.service.js';
import type { ExerciseRepository } from '../../repositories/exercise.repository.js';
import type { Exercise, UserExerciseMapping } from '@prisma/client';

describe('ExerciseService', () => {
  let service: ExerciseService;
  let repositoryMock: DeepMockProxy<ExerciseRepository>;

  const mockExercise1: Exercise = {
    id: 'e1',
    canonicalName: 'squat',
    displayNameRu: 'Присед',
    displayNameEn: 'Squat',
    muscleGroups: ['legs'],
    category: 'COMPOUND',
    isGlobal: true,
    createdBy: null,
    createdAt: new Date(),
  };

  const mockExercise2: Exercise = {
    id: 'e2',
    canonicalName: 'front_squat',
    displayNameRu: 'Фронтальный присед',
    displayNameEn: 'Front Squat',
    muscleGroups: ['legs'],
    category: 'COMPOUND',
    isGlobal: true,
    createdBy: null,
    createdAt: new Date(),
  };

  beforeEach(() => {
    repositoryMock = createMockExerciseRepository();
    service = new ExerciseService(repositoryMock);
  });

  describe('resolveExercise', () => {
    it('1. should resolve using user mapping if exact match found', async () => {
      repositoryMock.findUserMapping.mockResolvedValue({
        id: '1',
        userId: 'user1',
        inputText: 'присед',
        exerciseId: 'e1',
        useCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        exercise: mockExercise1,
      } as unknown as UserExerciseMapping & { exercise: Exercise });

      const result = await service.resolveExercise('присед', 'user1');

      expect(result).toEqual({ status: 'resolved', exercise: mockExercise1 });
      expect(repositoryMock.findUserMapping).toHaveBeenCalledWith('user1', 'присед');
      expect(repositoryMock.findSynonyms).not.toHaveBeenCalled();
    });

    it('2. should resolve single synonym successfully (prioritizing user synonyms)', async () => {
      repositoryMock.findUserMapping.mockResolvedValue(null);
      repositoryMock.findSynonyms.mockResolvedValue([
        {
          id: 's1',
          exerciseId: 'e1',
          synonym: 'присед',
          language: 'ru',
          isGlobal: true,
          userId: null,
          createdAt: new Date(),
          exercise: mockExercise1,
        },
        {
          id: 's2',
          exerciseId: 'e2',
          synonym: 'присед',
          language: 'ru',
          isGlobal: false,
          userId: 'user1',
          createdAt: new Date(),
          exercise: mockExercise2,
        },
      ]);

      const result = await service.resolveExercise('присед', 'user1');

      // Should pick user1's synonym!
      expect(result).toEqual({ status: 'resolved', exercise: mockExercise2 });
    });

    it('3. should return ambiguous if multiple unique exercises match the synonym', async () => {
      repositoryMock.findUserMapping.mockResolvedValue(null);
      repositoryMock.findSynonyms.mockResolvedValue([
        {
          id: 's1',
          exerciseId: 'e1',
          synonym: 'присед',
          language: 'ru',
          isGlobal: true,
          userId: null,
          createdAt: new Date(),
          exercise: mockExercise1,
        },
        {
          id: 's3',
          exerciseId: 'e2',
          synonym: 'присед',
          language: 'ru',
          isGlobal: true,
          userId: null,
          createdAt: new Date(),
          exercise: mockExercise2,
        },
      ]);

      const result = await service.resolveExercise('присед', 'user1');

      expect(result).toEqual({
        status: 'ambiguous',
        options: [mockExercise1, mockExercise2],
      });
    });

    it('4. should return not_found if no matches', async () => {
      repositoryMock.findUserMapping.mockResolvedValue(null);
      repositoryMock.findSynonyms.mockResolvedValue([]);

      const result = await service.resolveExercise('неизвестное_упражнение', 'user1');

      expect(result).toEqual({ status: 'not_found' });
    });
  });

  describe('confirmMapping', () => {
    it('should call repository to upsert user mapping', async () => {
      repositoryMock.upsertUserMapping.mockResolvedValue({} as unknown as UserExerciseMapping);
      await service.confirmMapping('user1', 'text', 'ex1');
      expect(repositoryMock.upsertUserMapping).toHaveBeenCalledWith('user1', 'text', 'ex1');
    });
  });

  describe('getExerciseListForNlu', () => {
    it('should map exercises to simplified list for NLU', async () => {
      repositoryMock.getAll.mockResolvedValue([mockExercise1, mockExercise2]);

      const result = await service.getExerciseListForNlu();

      expect(result).toEqual([
        { canonicalName: 'squat', displayNameRu: 'Присед' },
        { canonicalName: 'front_squat', displayNameRu: 'Фронтальный присед' },
      ]);
    });
  });
});
