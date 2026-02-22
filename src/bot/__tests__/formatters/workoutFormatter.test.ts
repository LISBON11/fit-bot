import { formatPreview } from '../../formatters/workoutFormatter.js';
import type { WorkoutWithRelations } from '../../formatters/workoutFormatter.js';
import { WorkoutStatus, CommentType, Prisma } from '@prisma/client';
import { WeightUnit } from '@prisma/client';

describe('workoutFormatter', () => {
  it('должен корректно форматировать тренировку со всеми связями', () => {
    const mockWorkout: WorkoutWithRelations = {
      id: 'mock-id',
      userId: 'mock-user',
      workoutDate: new Date('2026-02-21T12:00:00Z'),
      status: WorkoutStatus.DRAFT,
      focus: ['Legs', 'Glutes'],
      location: 'Alushta Home',
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
          rawName: 'Присед',
          createdAt: new Date(),
          exercise: {
            id: 'ex-1',
            canonicalName: 'back_squat',
            displayNameRu: 'Приседания со штангой',
            displayNameEn: 'Back Squat',
            muscleGroups: ['Legs'],
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
              createdAt: new Date(),
            },
            {
              id: 'set-2',
              workoutExerciseId: 'we-1',
              setNumber: 2,
              reps: 10,
              weight: new Prisma.Decimal(45),
              unit: WeightUnit.KG,
              createdAt: new Date(),
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

    expect(result).toContain('📅 21.02.2026');
    expect(result).toContain('🏠 Alushta Home');
    expect(result).toContain('🎯 Legs, Glutes');
    expect(result).toContain('1️⃣ <b>Приседания со штангой</b> • 2 подходов');
    expect(result).toContain('└ Подход 1: 12 повт. @ 40 кг');
    expect(result).toContain('└ Подход 2: 10 повт. @ 45 кг');
    expect(result).toContain('<i>💬 Тяжело пошло</i>');
    expect(result).toContain('📝 Комментарии');
    expect(result).toContain('• <i>Отличная тренировка</i>');
  });
});
