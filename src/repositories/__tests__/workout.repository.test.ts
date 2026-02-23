import { mockDeep, type DeepMockProxy } from 'jest-mock-extended';
import { WorkoutRepository } from '../workout.repository.js';
import { WorkoutStatus, type PrismaClient } from '@prisma/client';
import type { ParsedExercise, ParsedComment } from '../../nlu/nlu.types.js';

describe('WorkoutRepository', () => {
  let repository: WorkoutRepository;
  let prismaMock: DeepMockProxy<PrismaClient>;
  let txMock: DeepMockProxy<PrismaClient>;

  beforeEach(() => {
    prismaMock = mockDeep<PrismaClient>();
    txMock = mockDeep<PrismaClient>();

    repository = new WorkoutRepository(prismaMock as unknown as PrismaClient);
  });

  describe('createWithRelations', () => {
    it('should create workout with exercises, sets, and comments', async () => {
      const date = new Date();
      txMock.workout.create.mockResolvedValue({ id: 'w1' } as never);
      txMock.workoutExercise.create.mockResolvedValue({ id: 'we1' } as never);
      txMock.workout.findUnique.mockResolvedValue({ id: 'w1', workoutExercises: [] } as never);
      prismaMock.$transaction.mockImplementation(async (cb: unknown) => {
        if (typeof cb === 'function') {
          return cb(txMock);
        }
        return Promise.resolve();
      });

      const exercises = [
        {
          exerciseId: 'e1',
          parsed: {
            originalName: 'Pull ups',
            sets: [{ reps: 10, weight: null }],
            comments: [{ text: 'Hard' }],
          } as ParsedExercise,
        },
      ];
      const generalComments: ParsedComment[] = [{ text: 'Good workout' }];

      const result = await repository.createWithRelations(
        'u1',
        date,
        ['Back'],
        exercises,
        generalComments,
      );

      expect(prismaMock.$transaction).toHaveBeenCalled();
      expect(txMock.workout.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            user: { connect: { id: 'u1' } },
            workoutDate: date,
            focus: ['Back'],
            status: WorkoutStatus.DRAFT,
          }),
        }),
      );
      expect(txMock.workoutExercise.create).toHaveBeenCalled();
      expect(txMock.exerciseSet.createMany).toHaveBeenCalled();
      expect(txMock.workoutComment.createMany).toHaveBeenCalledTimes(2); // Local and global comments
      expect(result?.id).toBe('w1');
    });
  });

  describe('findById', () => {
    it('should find workout by ID with relations', async () => {
      prismaMock.workout.findUnique.mockResolvedValue({ id: 'w1' } as never);
      const result = await repository.findById('w1');
      expect(prismaMock.workout.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'w1' }, include: expect.any(Object) }),
      );
      expect(result?.id).toBe('w1');
    });
  });

  describe('findByUserAndDate', () => {
    it('should find requested user workout for given day', async () => {
      prismaMock.workout.findFirst.mockResolvedValue({ id: 'w1' } as never);
      const targetDate = new Date('2023-01-01T15:00:00Z');

      const result = await repository.findByUserAndDate('u1', targetDate);

      expect(prismaMock.workout.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            userId: 'u1',
            workoutDate: {
              gte: expect.any(Date),
              lte: expect.any(Date),
            },
          },
        }),
      );
      expect(result?.id).toBe('w1');
    });
  });

  describe('findDraftByUser', () => {
    it('should find a draft workout for the user', async () => {
      prismaMock.workout.findFirst.mockResolvedValue({
        id: 'w1',
        status: WorkoutStatus.DRAFT,
      } as never);
      const result = await repository.findDraftByUser('u1');
      expect(prismaMock.workout.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 'u1', status: WorkoutStatus.DRAFT },
        }),
      );
      expect(result?.id).toBe('w1');
    });
  });

  describe('updateStatus', () => {
    it('should update workout status', async () => {
      prismaMock.workout.update.mockResolvedValue({
        id: 'w1',
        status: WorkoutStatus.APPROVED,
      } as never);
      const result = await repository.updateStatus('w1', WorkoutStatus.APPROVED);
      expect(prismaMock.workout.update).toHaveBeenCalledWith({
        where: { id: 'w1' },
        data: { status: WorkoutStatus.APPROVED },
      });
      expect(result.status).toBe(WorkoutStatus.APPROVED);
    });
  });

  describe('updateMessageIds', () => {
    it('should update message related fields', async () => {
      prismaMock.workout.update.mockResolvedValue({ id: 'w1', previewMessageId: 100 } as never);
      await repository.updateMessageIds('w1', { previewMessageId: 100 });
      expect(prismaMock.workout.update).toHaveBeenCalledWith({
        where: { id: 'w1' },
        data: { previewMessageId: 100 },
      });
    });
  });

  describe('deleteById', () => {
    it('should delete workout by ID', async () => {
      prismaMock.workout.delete.mockResolvedValue({ id: 'w1' } as never);
      await repository.deleteById('w1');
      expect(prismaMock.workout.delete).toHaveBeenCalledWith({ where: { id: 'w1' } });
    });
  });

  describe('replaceExercises', () => {
    it('should clear old exercises and replace with new ones', async () => {
      txMock.workout.update.mockResolvedValue({ id: 'w1' } as never);
      txMock.workoutExercise.create.mockResolvedValue({ id: 'we1' } as never);
      txMock.workout.findUniqueOrThrow.mockResolvedValue({ id: 'w1' } as never);
      prismaMock.$transaction.mockImplementation(async (cb: unknown) => {
        if (typeof cb === 'function') {
          return cb(txMock);
        }
        return Promise.resolve();
      });

      const exercises = [
        {
          exerciseId: 'e2',
          parsed: {
            originalName: 'Push ups',
            sets: [],
            comments: [],
            isAmbiguous: false,
            mappedExerciseId: 'e2',
          } as ParsedExercise,
        },
      ];

      const result = await repository.replaceExercises('w1', { focus: ['Chest'] }, exercises, []);

      expect(prismaMock.$transaction).toHaveBeenCalled();
      expect(txMock.workoutExercise.deleteMany).toHaveBeenCalledWith({
        where: { workoutId: 'w1' },
      });
      expect(txMock.workoutComment.deleteMany).toHaveBeenCalledWith({
        where: { workoutId: 'w1', workoutExerciseId: null },
      });
      expect(txMock.workout.update).toHaveBeenCalledWith({
        where: { id: 'w1' },
        data: { focus: ['Chest'] },
      });
      expect(txMock.workoutExercise.create).toHaveBeenCalled();
      expect(txMock.workout.findUniqueOrThrow).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'w1' } }),
      );
      expect(result.id).toBe('w1');
    });
  });
});
