import { formatPreview, formatPublish, formatWorkoutForNlu } from '../workoutFormatter.js';
import type { WorkoutWithRelations } from '../workoutFormatter.js';

describe('workoutFormatter', () => {
  const getMockWorkout = () =>
    ({
      id: 'w1',
      userId: 'u1',
      workoutDate: new Date('2023-10-25T10:00:00.000Z'),
      rawText: 'Test text',
      status: 'COMPLETED',
      createdAt: new Date(),
      updatedAt: new Date(),
      location: 'Gym',
      focus: ['Legs', 'Back'],
      publisherId: null,
      workoutExercises: [
        {
          id: 'we1',
          workoutId: 'w1',
          exerciseId: 'e1',
          rawName: 'Squat',
          order: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          exercise: {
            id: 'e1',
            canonicalName: 'Squat',
            displayNameRu: 'Приседания',
            aliases: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          sets: [
            {
              id: 's1',
              workoutExerciseId: 'we1',
              setNumber: 1,
              reps: 10,
              weight: 50,
              unit: 'KG',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: 's2',
              workoutExerciseId: 'we1',
              setNumber: 2,
              reps: 8,
              weight: 55,
              unit: 'KG',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          comments: [
            {
              id: 'c1',
              workoutExerciseId: 'we1',
              workoutId: null,
              rawText: 'Hard set',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        },
        {
          id: 'we2',
          workoutId: 'w1',
          exerciseId: null,
          rawName: 'Unknown Exercise',
          order: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          exercise: null as unknown as NonNullable<
            WorkoutWithRelations['workoutExercises'][0]['exercise']
          >,
          sets: [
            {
              id: 's3',
              workoutExerciseId: 'we2',
              setNumber: 1,
              reps: 5,
              weight: 10,
              unit: 'LB',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          comments: [],
        },
      ],
      comments: [
        {
          id: 'c2',
          workoutId: 'w1',
          workoutExerciseId: null,
          rawText: 'Great workout',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    }) as unknown as WorkoutWithRelations;

  describe('formatPreview', () => {
    it('should format workout with location and focus', () => {
      const workout = getMockWorkout();
      const html = formatPreview(workout);

      expect(html).toContain('<b>📅 25.10.2023</b> | 🏠 Gym / 🎯 Legs, Back');
      expect(html).toContain('1️⃣ <b>Приседания</b> • 2 подходов');
      expect(html).toContain('└ Подход 1: 10 повт. @ 50 кг');
      expect(html).toContain('└ Подход 2: 8 повт. @ 55 кг');
      expect(html).toContain('<i>💬 Hard set</i>');

      expect(html).toContain('2️⃣ <b>Unknown Exercise</b> • 1 подходов');
      expect(html).toContain('└ Подход 1: 5 повт. @ 10 lb');

      expect(html).toContain('<b>📝 Комментарии:</b>');
      expect(html).toContain('• <i>Great workout</i>');
    });

    it('should handle workout without location or focus', () => {
      const workout = getMockWorkout();
      workout.location = null;
      workout.focus = [];

      const html = formatPreview(workout);
      expect(html).toContain('<b>📅 25.10.2023</b>\n\n');
      expect(html).not.toContain('🏠');
      expect(html).not.toContain('🎯');
    });

    it('should use default exercise name if no names available', () => {
      const workout = getMockWorkout();
      workout.workoutExercises[0].exercise = null as unknown as NonNullable<
        WorkoutWithRelations['workoutExercises'][0]['exercise']
      >;
      workout.workoutExercises[0].rawName = null as unknown as string;

      const html = formatPreview(workout);
      expect(html).toContain('1️⃣ <b>Упражнение</b>');
    });

    it('should handle weights and emojis correctly', () => {
      const workout = getMockWorkout();
      // more than 10 exercises
      for (let i = 2; i < 15; i++) {
        workout.workoutExercises.push({
          id: `we${i + 1}`,
          workoutId: 'w1',
          exerciseId: null as unknown as string,
          rawName: 'Test',
          sortOrder: i + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          exercise: null as unknown as NonNullable<
            WorkoutWithRelations['workoutExercises'][0]['exercise']
          >,
          sets: [],
          comments: [],
        } as unknown as WorkoutWithRelations['workoutExercises'][0]);
      }
      const html = formatPreview(workout);
      expect(html).toContain('11. <b>Test</b>');
    });
  });

  describe('formatPublish', () => {
    it('should call formatPreview', () => {
      const workout = getMockWorkout();
      expect(formatPublish(workout)).toEqual(formatPreview(workout));
    });
  });

  describe('formatWorkoutForNlu', () => {
    it('should format workout properly for NLU', () => {
      const workout = getMockWorkout();
      const dto = formatWorkoutForNlu(workout);

      expect(dto.date).toBe('2023-10-25');
      expect(dto.focus).toEqual(['Legs', 'Back']);
      expect(dto.location).toBe('Gym');
      expect(dto.comments).toEqual(['Great workout']);

      type NluExercise = {
        name: string;
        comments: string[];
        sets: { reps: number; weight: number; unit: string }[];
      };
      const ex1 = (dto.exercises as Array<NluExercise>)[0];
      expect(ex1.name).toBe('Приседания');
      expect(ex1.comments).toEqual(['Hard set']);
      expect(ex1.sets[0]).toEqual({ reps: 10, weight: 50, unit: 'KG' });
      expect(ex1.sets[1]).toEqual({ reps: 8, weight: 55, unit: 'KG' });

      const ex2 = (dto.exercises as Array<NluExercise>)[1];
      expect(ex2.name).toBe('Unknown Exercise');
      expect(ex2.sets[0]).toEqual({ reps: 5, weight: 10, unit: 'LB' });
    });
  });
});
