import { formatPreview, formatPublish, formatWorkoutForNlu } from '../workoutFormatter.js';
import type { WorkoutWithRelations } from '../workoutFormatter.js';
import { Prisma, WeightUnit } from '@prisma/client';

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
    it('должен форматировать тренировку с локацией и фокусом', () => {
      const workout = getMockWorkout();
      const html = formatPreview(workout);

      // Заголовок: дата + день недели
      expect(html).toContain('25.10.2023, среда');
      // Мышечные группы и локация на отдельных строках
      expect(html).toContain('💪 Legs, Back');
      expect(html).toContain('🏠 Gym');

      // Упражнение 1 с компактными подходами (разные веса — не группируются)
      expect(html).toContain('1. Приседания — 50×10, 55×8');
      // Комментарий к упражнению как blockquote
      expect(html).toContain('<blockquote>Hard set</blockquote>');

      // Упражнение 2 с lb
      expect(html).toContain('2. Unknown Exercise — 10×5');

      // Общий комментарий к тренировке как blockquote
      expect(html).toContain('<blockquote>Great workout</blockquote>');
    });

    it('должен корректно группировать одинаковые подходы', () => {
      const workout = getMockWorkout();
      // Заменяем подходы на одинаковые (50кг × 10 повт. × 3 подхода)
      workout.workoutExercises[0].sets = [
        {
          id: 's1',
          workoutExerciseId: 'we1',
          setNumber: 1,
          reps: 10,
          weight: new Prisma.Decimal(50),
          unit: WeightUnit.KG,
          createdAt: new Date(),
        },
        {
          id: 's2',
          workoutExerciseId: 'we1',
          setNumber: 2,
          reps: 10,
          weight: new Prisma.Decimal(50),
          unit: WeightUnit.KG,
          createdAt: new Date(),
        },
        {
          id: 's3',
          workoutExerciseId: 'we1',
          setNumber: 3,
          reps: 10,
          weight: new Prisma.Decimal(50),
          unit: WeightUnit.KG,
          createdAt: new Date(),
        },
      ] as unknown as WorkoutWithRelations['workoutExercises'][0]['sets'];

      const html = formatPreview(workout);
      expect(html).toContain('50×10×3');
    });

    it('должен обрабатывать тренировку без локации и фокуса', () => {
      const workout = getMockWorkout();
      workout.location = null;
      workout.focus = [];

      const html = formatPreview(workout);
      expect(html).not.toContain('🏠');
      expect(html).not.toContain('💪');
    });

    it('должен использовать дефолтное название упражнения если имена отсутствуют', () => {
      const workout = getMockWorkout();
      workout.workoutExercises[0].exercise = null as unknown as NonNullable<
        WorkoutWithRelations['workoutExercises'][0]['exercise']
      >;
      workout.workoutExercises[0].rawName = null as unknown as string;

      const html = formatPreview(workout);
      expect(html).toContain('1. Упражнение');
    });

    it('должен экранировать HTML-символы в названиях и комментариях', () => {
      const workout = getMockWorkout();
      workout.workoutExercises[0].rawName = '<script>alert(1)</script>';
      workout.workoutExercises[0].exercise = null as unknown as NonNullable<
        WorkoutWithRelations['workoutExercises'][0]['exercise']
      >;
      workout.workoutExercises[0].comments[0].rawText = 'Боль в <плече> & лопатке';

      const html = formatPreview(workout);
      // Имя упражнения экранировано
      expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
      expect(html).not.toContain('<script>');
      // Комментарий к упражнению экранирован и обёрнут в blockquote
      expect(html).toContain('<blockquote>Боль в &lt;плече&gt; &amp; лопатке</blockquote>');
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
