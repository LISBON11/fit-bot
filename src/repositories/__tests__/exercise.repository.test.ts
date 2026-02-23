import type { DeepMockProxy } from 'jest-mock-extended';
import { createMockPrismaClient } from '../../__tests__/utils/mockPrisma.js';
import { ExerciseRepository } from '../exercise.repository.js';
import type { PrismaClient } from '@prisma/client';

describe('ExerciseRepository', () => {
  let repository: ExerciseRepository;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(() => {
    prismaMock = createMockPrismaClient();
    repository = new ExerciseRepository(prismaMock as unknown as PrismaClient);
  });

  describe('findSynonyms', () => {
    it('should find synonyms considering case-insensitivity and global scope', async () => {
      prismaMock.exerciseSynonym.findMany.mockResolvedValue([
        {
          id: '1',
          synonym: 'test',
          exerciseId: 'e1',
          userId: null,
          isGlobal: true,
          exercise: { id: 'e1' },
        },
      ] as never);

      const result = await repository.findSynonyms('TEST', 'u1');

      expect(prismaMock.exerciseSynonym.findMany).toHaveBeenCalledWith({
        where: {
          AND: [
            { synonym: { equals: 'test', mode: 'insensitive' } },
            {
              OR: [{ userId: 'u1' }, { isGlobal: true }],
            },
          ],
        },
        include: { exercise: true },
      });
      expect(result).toHaveLength(1);
    });

    it('should find synonyms without userId', async () => {
      prismaMock.exerciseSynonym.findMany.mockResolvedValue([] as never);

      await repository.findSynonyms('TEST');

      expect(prismaMock.exerciseSynonym.findMany).toHaveBeenCalledWith({
        where: {
          AND: [
            { synonym: { equals: 'test', mode: 'insensitive' } },
            {
              OR: [{ isGlobal: true }],
            },
          ],
        },
        include: { exercise: true },
      });
    });
  });

  describe('findUserMapping', () => {
    it('should find user mapping', async () => {
      const mockResult = { id: '1', inputText: 'test', exerciseId: 'e1', userId: 'u1' };
      prismaMock.userExerciseMapping.findFirst.mockResolvedValue(mockResult as never);

      const result = await repository.findUserMapping('u1', 'TEST');

      expect(prismaMock.userExerciseMapping.findFirst).toHaveBeenCalledWith({
        where: { userId: 'u1', inputText: 'test' },
        include: { exercise: true },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('upsertUserMapping', () => {
    it('should update useCount if mapping exists', async () => {
      const existing = { id: 'm1', useCount: 1 };
      prismaMock.userExerciseMapping.findFirst.mockResolvedValue(existing as never);
      prismaMock.userExerciseMapping.update.mockResolvedValue({
        ...existing,
        useCount: 2,
      } as never);

      const result = await repository.upsertUserMapping('u1', 'test_input', 'e1');

      expect(prismaMock.userExerciseMapping.findFirst).toHaveBeenCalledWith({
        where: { userId: 'u1', inputText: 'test_input', exerciseId: 'e1' },
      });
      expect(prismaMock.userExerciseMapping.update).toHaveBeenCalledWith({
        where: { id: 'm1' },
        data: { useCount: { increment: 1 } },
      });
      expect(result.useCount).toBe(2);
    });

    it('should create new mapping if it does not exist', async () => {
      prismaMock.userExerciseMapping.findFirst.mockResolvedValue(null as never);
      prismaMock.userExerciseMapping.create.mockResolvedValue({ id: 'm2', useCount: 1 } as never);

      const result = await repository.upsertUserMapping('u1', 'test_input', 'e1');

      expect(prismaMock.userExerciseMapping.create).toHaveBeenCalledWith({
        data: {
          userId: 'u1',
          inputText: 'test_input',
          exerciseId: 'e1',
          useCount: 1,
        },
      });
      expect(result.useCount).toBe(1);
    });
  });

  describe('getAll', () => {
    it('should return all global exercises', async () => {
      const globalExercises = [{ id: 'e1', isGlobal: true }];
      prismaMock.exercise.findMany.mockResolvedValue(globalExercises as never);

      const result = await repository.getAll();

      expect(prismaMock.exercise.findMany).toHaveBeenCalledWith({
        where: { isGlobal: true },
      });
      expect(result).toEqual(globalExercises);
    });
  });

  describe('findById', () => {
    it('should return exercise by id', async () => {
      prismaMock.exercise.findUnique.mockResolvedValue({ id: 'e1' } as never);

      const result = await repository.findById('e1');

      expect(prismaMock.exercise.findUnique).toHaveBeenCalledWith({
        where: { id: 'e1' },
      });
      expect(result).toEqual({ id: 'e1' });
    });
  });

  describe('create', () => {
    it('should create an exercise', async () => {
      const data = {
        name: 'Squat',
        canonicalName: 'squat',
        displayNameRu: 'Приседания',
        displayNameEn: 'Squat',
        description: null,
        videoUrl: null,
        bodyParts: ['Legs'],
        muscleGroups: ['quads', 'glutes'],
        category: null,
        isGlobal: true,
        createdBy: null,
      };
      prismaMock.exercise.create.mockResolvedValue({ id: 'e1', ...data } as never);

      const result = await repository.create(data);

      expect(prismaMock.exercise.create).toHaveBeenCalledWith({ data });
      expect(result.id).toBe('e1');
    });
  });
});
