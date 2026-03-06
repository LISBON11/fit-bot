import { formatPreview } from '../../formatters/workoutFormatter.js';
import type { WorkoutWithRelations } from '../../formatters/workoutFormatter.js';
import { WorkoutStatus, CommentType, Prisma, WeightUnit } from '@prisma/client';

describe('workoutFormatter', () => {
  it('должен корректно форматировать тренировку со всеми связями', () => {
    const mockWorkout: WorkoutWithRelations = {
      id: 'mock-id',
      userId: 'mock-user',
      workoutDate: new Date('2026-02-21T12:00:00Z'),
      status: WorkoutStatus.DRAFT,
      focus: ['Legs', 'Glutes'],
      location: 'Alushta Home',
      comment: null,
      rawTranscript: null,
      sourceMessageId: null,
      previewMessageId: null,
      publishedMessageId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      workoutExercises: [
        {
          id: 'we-1',
          workoutId: 'mock-id',
          exerciseId: 'ex-1',
          sortOrder: 0,
          exercise: {
            id: 'ex-1',
            canonicalName: 'back_squat',
            displayNameRu: 'Приседания со штангой',
            displayNameEn: 'Back Squat',
            movementPattern: 'squat',
            equipment: 'barbell',
            primaryMuscle: 'legs',
            secondaryMuscles: [],
            category: 'COMPOUND',
            isGlobal: true,
            createdBy: null,
            createdAt: new Date(),
          },
          sets: [
            {
              id: 'set-1',
              workoutExerciseId: 'we-1',
              setNumber: 1,
              reps: 12,
              weight: new Prisma.Decimal(40),
              unit: WeightUnit.KG,
            },
            {
              id: 'set-2',
              workoutExerciseId: 'we-1',
              setNumber: 2,
              reps: 10,
              weight: new Prisma.Decimal(45),
              unit: WeightUnit.KG,
            },
          ],
          comments: [
            {
              id: 'wc-1',
              workoutId: 'mock-id',
              workoutExerciseId: 'we-1',
              commentType: CommentType.OTHER,
              bodyPart: null,
              side: null,
              sensationType: null,
              rawText: 'Тяжело пошло',
              createdAt: new Date(),
            },
          ],
        },
      ],
      comments: [
        {
          id: 'wc-2',
          workoutId: 'mock-id',
          workoutExerciseId: null,
          commentType: CommentType.OTHER,
          bodyPart: null,
          side: null,
          sensationType: null,
          rawText: 'Отличная тренировка',
          createdAt: new Date(),
        },
      ],
    };

    const result = formatPreview(mockWorkout);

    // Заголовок: дата + день недели
    expect(result).toContain('21.02.2026, суббота');
    // Локация и фокус на отдельных строках
    expect(result).toContain('🏠 <b>Alushta Home</b>');
    expect(result).toContain('🏋 <b>Ноги, Ягодицы</b>');
    // Упражнение с разными подходами (не группируются)
    expect(result).toContain('1. Приседания со штангой — 40×12, 45×10');
    // Комментарий к упражнению как blockquote
    expect(result).toContain('<blockquote>Тяжело пошло</blockquote>');
    // Общий комментарий к тренировке как blockquote
    expect(result).toContain('<blockquote>Отличная тренировка</blockquote>');
  });
});
