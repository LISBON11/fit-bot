import type { DeepMockProxy } from 'jest-mock-extended';
import { createMockPrismaClient } from '../../__tests__/utils/mockPrisma.js';
import { ExerciseRepository } from '../exercise.repository.js';
import {
  Muscle,
  MovementPattern,
  Equipment,
  ExperienceLevel,
  ExerciseType,
  type PrismaClient,
  type Exercise,
} from '../../generated/prisma/index.js';

describe('ExerciseRepository', () => {
  let repository: ExerciseRepository;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(() => {
    prismaMock = createMockPrismaClient();
    repository = new ExerciseRepository(prismaMock as unknown as PrismaClient);
  });

  describe('findSynonyms', () => {
    it('should find synonyms case-insensitively', async () => {
      prismaMock.exerciseSynonym.findMany.mockResolvedValue([
        {
          id: '1',
          synonym: 'test',
          exerciseId: 'e1',
          exercise: { id: 'e1' },
        },
      ] as never);

      const result = await repository.findSynonyms({ text: 'TEST' });

      expect(prismaMock.exerciseSynonym.findMany).toHaveBeenCalledWith({
        where: {
          synonym: { equals: 'test', mode: 'insensitive' },
        },
        include: { exercise: true },
      });
      expect(result).toHaveLength(1);
    });

    it('should find synonyms for empty text', async () => {
      prismaMock.exerciseSynonym.findMany.mockResolvedValue([] as never);

      await repository.findSynonyms({ text: 'TEST' });

      expect(prismaMock.exerciseSynonym.findMany).toHaveBeenCalledWith({
        where: {
          synonym: { equals: 'test', mode: 'insensitive' },
        },
        include: { exercise: true },
      });
    });
  });

  describe('findByExactName', () => {
    it('should find exercise by canonicalName or displayNameRu (case-insensitive)', async () => {
      const mockExercise = [{ id: 'e1', canonicalName: 'bench_press', displayNameRu: 'Жим лёжа' }];
      prismaMock.exercise.findMany.mockResolvedValue(mockExercise as never);

      const result = await repository.findByExactName({ name: 'Жим лёжа' });

      expect(prismaMock.exercise.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { canonicalName: { equals: 'жим лёжа', mode: 'insensitive' } },
            { displayNameRu: { equals: 'Жим лёжа', mode: 'insensitive' } },
          ],
        },
      });
      expect(result).toEqual(mockExercise);
    });

    it('should return empty array if nothing found', async () => {
      prismaMock.exercise.findMany.mockResolvedValue([] as never);

      const result = await repository.findByExactName({ name: 'неизвестное' });

      expect(result).toEqual([]);
    });
  });

  describe('findUserMapping', () => {
    it('should find user mapping', async () => {
      const mockResult = { id: '1', inputText: 'test', exerciseId: 'e1', userId: 'u1' };
      prismaMock.userExerciseMapping.findFirst.mockResolvedValue(mockResult as never);

      const result = await repository.findUserMapping({ userId: 'u1', inputText: 'TEST' });

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

      const result = await repository.upsertUserMapping({
        userId: 'u1',
        inputText: 'test_input',
        exerciseId: 'e1',
      });

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

      const result = await repository.upsertUserMapping({
        userId: 'u1',
        inputText: 'test_input',
        exerciseId: 'e1',
      });

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
        canonicalName: 'squat',
        displayNameRu: 'Приседания',
        displayNameEn: 'Squat',
        movementPattern: MovementPattern.PUSH,
        equipment: Equipment.BARBELL,
        primaryMuscles: [Muscle.QUADRICEPS],
        secondaryMuscles: [Muscle.GLUTES],
        level: ExperienceLevel.INTERMEDIATE,
        instructions: [],
        exerciseType: ExerciseType.STRENGTH,
        category: null,
        isGlobal: true,
        createdBy: null,
      };
      prismaMock.exercise.create.mockResolvedValue({
        id: 'e1',
        createdAt: new Date(),
        ...data,
      } as never);

      const result = await repository.create(data as unknown as Omit<Exercise, 'id' | 'createdAt'>);

      expect(prismaMock.exercise.create).toHaveBeenCalledWith({ data });
      expect(result.id).toBe('e1');
    });
  });

  describe('getAllWithSynonyms', () => {
    it('should return global exercises with all their synonyms', async () => {
      const mockData = [
        {
          id: 'e1',
          isGlobal: true,
          synonyms: [{ id: 's1', synonym: 'жим' }],
        },
      ];
      prismaMock.exercise.findMany.mockResolvedValue(mockData as never);

      const result = await repository.getAllWithSynonyms();

      expect(prismaMock.exercise.findMany).toHaveBeenCalledWith({
        where: { isGlobal: true },
        include: { synonyms: true },
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('getMuscleGroups', () => {
    it('should return unique muscle groups via $queryRaw', async () => {
      prismaMock.$queryRaw.mockResolvedValue([{ muscle: 'CHEST' }, { muscle: 'BACK' }] as never);

      const result = await repository.getMuscleGroups();

      expect(result).toEqual(['CHEST', 'BACK']);
      expect(prismaMock.$queryRaw).toHaveBeenCalled();
    });

    it('should return empty array if no muscle groups', async () => {
      prismaMock.$queryRaw.mockResolvedValue([] as never);

      const result = await repository.getMuscleGroups();

      expect(result).toEqual([]);
    });
  });

  describe('getByMuscleGroup', () => {
    it('should filter exercises by primaryMuscles', async () => {
      const mockExercises = [{ id: 'e1', primaryMuscles: ['CHEST'] }];
      prismaMock.exercise.findMany.mockResolvedValue(mockExercises as never);

      const result = await repository.getByMuscleGroup(['CHEST']);

      expect(prismaMock.exercise.findMany).toHaveBeenCalledWith({
        where: {
          isGlobal: true,
          primaryMuscles: { hasSome: ['CHEST'] },
        },
        orderBy: { displayNameRu: 'asc' },
      });
      expect(result).toEqual(mockExercises);
    });
  });
});
