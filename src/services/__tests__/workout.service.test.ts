import type { DeepMockProxy } from 'jest-mock-extended';
import type { ParsedWorkout } from '../../nlu/nlu.types.js';
import { createMockWorkoutRepository } from '../../__tests__/utils/mockRepositories.js';
import { createMockExerciseService } from '../../__tests__/utils/mockServices.js';
import { WorkoutService } from '../workout.service.js';
import type { WorkoutRepository } from '../../repositories/workout.repository.js';
import type { ExerciseService } from '../exercise.service.js';
import { WorkoutStatus } from '@prisma/client';
import type { Exercise, Workout } from '@prisma/client';
import type { WorkoutWithRelations } from '../../bot/formatters/workoutFormatter.js';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let workoutRepoMock: DeepMockProxy<WorkoutRepository>;
  let exerciseServiceMock: DeepMockProxy<ExerciseService>;

  beforeEach(() => {
    workoutRepoMock = createMockWorkoutRepository();
    exerciseServiceMock = createMockExerciseService();

    service = new WorkoutService(workoutRepoMock, exerciseServiceMock);
  });

  describe('createDraft', () => {
    const mockParsedWorkout: ParsedWorkout = {
      date: '2026-02-22',
      focus: 'legs',
      exercises: [
        {
          originalName: 'squat',
          mappedExerciseId: null,
          isAmbiguous: false,
          sets: [{ reps: 10, weight: 50, duration: null, distance: null, rpe: null }],
          comments: [],
        },
      ],
      generalComments: [],
    };

    it('should return needs_disambiguation if exercise not resolved', async () => {
      exerciseServiceMock.resolveExercise.mockResolvedValue({ status: 'not_found' });

      const result = await service.createDraft('user1', mockParsedWorkout);

      expect(result.status).toBe('needs_disambiguation');
      if (result.status === 'needs_disambiguation') {
        expect(result.ambiguousExercises.length).toBe(1);
        expect(result.ambiguousExercises[0].isAmbiguous).toBe(true);
      }
    });

    it('should create draft if all exercises resolved successfully', async () => {
      exerciseServiceMock.resolveExercise.mockResolvedValue({
        status: 'resolved',
        exercise: { id: 'ex1' } as unknown as Exercise,
      });
      workoutRepoMock.findDraftByUser.mockResolvedValue(null);
      workoutRepoMock.createWithRelations.mockResolvedValue({
        id: 'workout1',
        status: WorkoutStatus.DRAFT,
      } as unknown as Workout);

      const result = await service.createDraft('user1', mockParsedWorkout);

      expect(result.status).toBe('created');
      expect(workoutRepoMock.createWithRelations).toHaveBeenCalled();
    });

    it('should delete existing draft before creating new one', async () => {
      exerciseServiceMock.resolveExercise.mockResolvedValue({
        status: 'resolved',
        exercise: { id: 'ex1' } as unknown as Exercise,
      });
      workoutRepoMock.findDraftByUser.mockResolvedValue({
        id: 'old-draft',
      } as unknown as WorkoutWithRelations);
      workoutRepoMock.createWithRelations.mockResolvedValue({
        id: 'workout1',
        status: WorkoutStatus.DRAFT,
      } as unknown as Workout);

      const result = await service.createDraft('user1', mockParsedWorkout);

      expect(workoutRepoMock.deleteById).toHaveBeenCalledWith('old-draft');
      expect(result.status).toBe('created');
    });

    it('should use mappedExerciseId if provided', async () => {
      const mockWithMapped: ParsedWorkout = {
        date: '2026-02-21',
        focus: 'legs',
        exercises: [
          {
            originalName: 'unknown',
            sets: [],
            isAmbiguous: false,
            comments: [],
            mappedExerciseId: 'mapped1',
          },
        ],
        generalComments: [],
      };

      workoutRepoMock.findDraftByUser.mockResolvedValue(null);
      workoutRepoMock.createWithRelations.mockResolvedValue({
        id: 'workout1',
        status: WorkoutStatus.DRAFT,
      } as unknown as Workout);

      const result = await service.createDraft('user1', mockWithMapped);

      expect(exerciseServiceMock.resolveExercise).not.toHaveBeenCalled();
      expect(workoutRepoMock.createWithRelations).toHaveBeenCalledWith(
        'user1',
        expect.any(Date),
        ['legs'],
        [{ parsed: mockWithMapped.exercises[0], exerciseId: 'mapped1' }],
        [],
      );
      expect(result.status).toBe('created');
    });
  });

  describe('approveDraft', () => {
    it('should update status to APPROVED', async () => {
      await service.approveDraft('w1');
      expect(workoutRepoMock.updateStatus).toHaveBeenCalledWith('w1', WorkoutStatus.APPROVED);
    });
  });

  describe('cancelDraft', () => {
    it('should delete draft by id', async () => {
      await service.cancelDraft('w1');
      expect(workoutRepoMock.deleteById).toHaveBeenCalledWith('w1');
    });
  });

  describe('findByDate', () => {
    it('should call repository for specific user and date', async () => {
      const date = new Date();
      await service.findByDate('user1', date);
      expect(workoutRepoMock.findByUserAndDate).toHaveBeenCalledWith('user1', date);
    });
  });

  describe('getDraftForUser', () => {
    it('should return the current draft for a user', async () => {
      workoutRepoMock.findDraftByUser.mockResolvedValue({
        id: 'draft-id',
      } as unknown as WorkoutWithRelations);
      const result = await service.getDraftForUser('user1');
      expect(result).toEqual({ id: 'draft-id' });
      expect(workoutRepoMock.findDraftByUser).toHaveBeenCalledWith('user1');
    });
  });

  describe('applyEdits', () => {
    const mockParsedWorkout: ParsedWorkout = {
      date: '2026-02-22',
      focus: 'legs',
      exercises: [],
      generalComments: [],
    };

    it('should throw AppError if workout not found', async () => {
      workoutRepoMock.findById.mockResolvedValue(null);
      await expect(service.applyEdits('w1', 'user1', mockParsedWorkout)).rejects.toThrow(
        'Тренировка не найдена',
      );
    });

    it('should throw AppError if user does not own workout', async () => {
      workoutRepoMock.findById.mockResolvedValue({ userId: 'other-user' } as unknown as Workout);
      await expect(service.applyEdits('w1', 'user1', mockParsedWorkout)).rejects.toThrow(
        'Нет прав на редактирование этой тренировки',
      );
    });

    it('should call replaceExercises and return updated status', async () => {
      workoutRepoMock.findById.mockResolvedValue({ userId: 'user1' } as unknown as Workout);
      workoutRepoMock.replaceExercises.mockResolvedValue({ id: 'w1' } as unknown as Workout);

      const result = await service.applyEdits('w1', 'user1', mockParsedWorkout);

      expect(result.status).toBe('updated');
      expect(workoutRepoMock.replaceExercises).toHaveBeenCalled();
    });

    it('should return needs_disambiguation if exercise is ambiguous during edit', async () => {
      workoutRepoMock.findById.mockResolvedValue({ userId: 'user1' } as unknown as Workout);
      exerciseServiceMock.resolveExercise.mockResolvedValue({
        status: 'ambiguous',
        options: [],
      });

      const mockWithExercise: ParsedWorkout = {
        date: '2026-02-22',
        focus: 'legs',
        exercises: [
          {
            originalName: 'тяга',
            mappedExerciseId: null,
            isAmbiguous: false,
            sets: [],
            comments: [],
          },
        ],
        generalComments: [],
      };

      const result = await service.applyEdits('w1', 'user1', mockWithExercise);

      expect(result.status).toBe('needs_disambiguation');
      expect(workoutRepoMock.replaceExercises).not.toHaveBeenCalled();
    });
  });
});
