import { PrismaClient, ExerciseCategory } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

/**
 * Данные для начального заполнения справочника упражнений.
 * Каждое упражнение — глобальное (is_global = true) с синонимами на русском и английском.
 */
const exercises = [
  {
    canonicalName: 'back_squat',
    displayNameRu: 'Присед со штангой',
    displayNameEn: 'Back Squat',
    primaryMuscle: 'legs',
    movementPattern: 'squat',
    equipment: 'barbell',
    secondaryMuscles: ['glutes', 'hamstrings', 'quadriceps'],
    category: 'COMPOUND',
    synonyms: [
      { synonym: 'присед со штангой', language: 'ru' },
      { synonym: 'приседания', language: 'ru' },
      { synonym: 'присед', language: 'ru' },
      { synonym: 'back squat', language: 'en' },
    ],
  },
  {
    canonicalName: 'front_squat',
    displayNameRu: 'Фронтальный присед',
    displayNameEn: 'Front Squat',
    primaryMuscle: 'legs',
    movementPattern: 'squat',
    equipment: 'barbell',
    secondaryMuscles: ['quadriceps', 'glutes', 'core'],
    category: 'COMPOUND',
    synonyms: [
      { synonym: 'фронтальный присед', language: 'ru' },
      { synonym: 'фронтальные приседания', language: 'ru' },
      { synonym: 'front squat', language: 'en' },
    ],
  },
  {
    canonicalName: 'deadlift',
    displayNameRu: 'Становая тяга',
    displayNameEn: 'Deadlift',
    primaryMuscle: 'legs',
    movementPattern: 'hinge',
    equipment: 'barbell',
    secondaryMuscles: ['hamstrings', 'glutes', 'back', 'core'],
    category: 'COMPOUND',
    synonyms: [
      { synonym: 'становая тяга', language: 'ru' },
      { synonym: 'становая', language: 'ru' },
      { synonym: 'deadlift', language: 'en' },
    ],
  },
  {
    canonicalName: 'romanian_deadlift',
    displayNameRu: 'Румынская тяга',
    displayNameEn: 'Romanian Deadlift',
    primaryMuscle: 'legs',
    movementPattern: 'hinge',
    equipment: 'barbell',
    secondaryMuscles: ['hamstrings', 'glutes'],
    category: 'COMPOUND',
    synonyms: [
      { synonym: 'румынская тяга', language: 'ru' },
      { synonym: 'румынка', language: 'ru' },
      { synonym: 'рдл', language: 'ru' },
      { synonym: 'romanian deadlift', language: 'en' },
      { synonym: 'rdl', language: 'en' },
    ],
  },
  {
    canonicalName: 'bench_press',
    displayNameRu: 'Жим лёжа',
    displayNameEn: 'Bench Press',
    primaryMuscle: 'chest',
    movementPattern: 'push',
    equipment: 'barbell',
    secondaryMuscles: ['triceps', 'shoulders'],
    category: 'COMPOUND',
    synonyms: [
      { synonym: 'жим лёжа', language: 'ru' },
      { synonym: 'жим лежа', language: 'ru' },
      { synonym: 'жим', language: 'ru' },
      { synonym: 'bench press', language: 'en' },
    ],
  },
  {
    canonicalName: 'overhead_press',
    displayNameRu: 'Жим стоя',
    displayNameEn: 'Overhead Press',
    primaryMuscle: 'shoulders',
    movementPattern: 'push',
    equipment: 'barbell',
    secondaryMuscles: ['triceps'],
    category: 'COMPOUND',
    synonyms: [
      { synonym: 'жим стоя', language: 'ru' },
      { synonym: 'жим над головой', language: 'ru' },
      { synonym: 'overhead press', language: 'en' },
      { synonym: 'ohp', language: 'en' },
    ],
  },
  {
    canonicalName: 'hip_thrust',
    displayNameRu: 'Ягодичный мостик со штангой',
    displayNameEn: 'Hip Thrust',
    primaryMuscle: 'glutes',
    movementPattern: 'hinge',
    equipment: 'barbell',
    secondaryMuscles: ['hamstrings'],
    category: 'COMPOUND',
    synonyms: [
      { synonym: 'хип траст', language: 'ru' },
      { synonym: 'ягодичный мостик', language: 'ru' },
      { synonym: 'мостик со штангой', language: 'ru' },
      { synonym: 'hip thrust', language: 'en' },
    ],
  },
  {
    canonicalName: 'leg_press',
    displayNameRu: 'Жим ногами',
    displayNameEn: 'Leg Press',
    primaryMuscle: 'legs',
    movementPattern: 'squat',
    equipment: 'machine',
    secondaryMuscles: ['quadriceps', 'glutes'],
    category: 'COMPOUND',
    synonyms: [
      { synonym: 'жим ногами', language: 'ru' },
      { synonym: 'жим платформы', language: 'ru' },
      { synonym: 'leg press', language: 'en' },
    ],
  },
  {
    canonicalName: 'lat_pulldown',
    displayNameRu: 'Тяга верхнего блока',
    displayNameEn: 'Lat Pulldown',
    primaryMuscle: 'back',
    movementPattern: 'pull',
    equipment: 'cable',
    secondaryMuscles: ['lats', 'biceps'],
    category: 'COMPOUND',
    synonyms: [
      { synonym: 'тяга верхнего блока', language: 'ru' },
      { synonym: 'вертикальная тяга', language: 'ru' },
      { synonym: 'lat pulldown', language: 'en' },
    ],
  },
  {
    canonicalName: 'barbell_row',
    displayNameRu: 'Тяга штанги в наклоне',
    displayNameEn: 'Barbell Row',
    primaryMuscle: 'back',
    movementPattern: 'pull',
    equipment: 'barbell',
    secondaryMuscles: ['lats', 'rhomboids', 'biceps'],
    category: 'COMPOUND',
    synonyms: [
      { synonym: 'тяга штанги в наклоне', language: 'ru' },
      { synonym: 'тяга в наклоне', language: 'ru' },
      { synonym: 'barbell row', language: 'en' },
    ],
  },
  {
    canonicalName: 'pull_up',
    displayNameRu: 'Подтягивания',
    displayNameEn: 'Pull-Up',
    primaryMuscle: 'back',
    movementPattern: 'pull',
    equipment: 'bodyweight',
    secondaryMuscles: ['lats', 'biceps', 'core'],
    category: 'COMPOUND',
    synonyms: [
      { synonym: 'подтягивания', language: 'ru' },
      { synonym: 'подтягивание', language: 'ru' },
      { synonym: 'pull up', language: 'en' },
    ],
  },
  {
    canonicalName: 'goblet_squat',
    displayNameRu: 'Гоблет присед',
    displayNameEn: 'Goblet Squat',
    primaryMuscle: 'legs',
    movementPattern: 'squat',
    equipment: 'dumbbell',
    secondaryMuscles: ['quadriceps', 'glutes'],
    category: 'COMPOUND',
    synonyms: [
      { synonym: 'гоблет присед', language: 'ru' },
      { synonym: 'кубковый присед', language: 'ru' },
      { synonym: 'goblet squat', language: 'en' },
    ],
  },
  {
    canonicalName: 'bulgarian_split_squat',
    displayNameRu: 'Болгарские выпады',
    displayNameEn: 'Bulgarian Split Squat',
    primaryMuscle: 'legs',
    movementPattern: 'lunge',
    secondaryMuscles: ['quadriceps', 'glutes'],
    category: 'COMPOUND',
    synonyms: [
      { synonym: 'болгарские выпады', language: 'ru' },
      { synonym: 'сплит присед', language: 'ru' },
      { synonym: 'bulgarian split squat', language: 'en' },
    ],
  },
  {
    canonicalName: 'lunges',
    displayNameRu: 'Выпады',
    displayNameEn: 'Lunges',
    primaryMuscle: 'legs',
    movementPattern: 'lunge',
    secondaryMuscles: ['quadriceps', 'glutes'],
    category: 'COMPOUND',
    synonyms: [
      { synonym: 'выпады', language: 'ru' },
      { synonym: 'выпад', language: 'ru' },
      { synonym: 'lunges', language: 'en' },
    ],
  },
  {
    canonicalName: 'leg_curl',
    displayNameRu: 'Сгибание ног',
    displayNameEn: 'Leg Curl',
    primaryMuscle: 'legs',
    movementPattern: 'hinge', // Hamstring curl is posterior chain
    equipment: 'machine',
    secondaryMuscles: ['hamstrings'],
    category: 'ISOLATION',
    synonyms: [
      { synonym: 'сгибание ног', language: 'ru' },
      { synonym: 'сгибание ног лёжа', language: 'ru' },
      { synonym: 'leg curl', language: 'en' },
    ],
  },
  {
    canonicalName: 'leg_extension',
    displayNameRu: 'Разгибание ног',
    displayNameEn: 'Leg Extension',
    primaryMuscle: 'legs',
    movementPattern: 'squat', // Knee extension
    equipment: 'machine',
    secondaryMuscles: ['quadriceps'],
    category: 'ISOLATION',
    synonyms: [
      { synonym: 'разгибание ног', language: 'ru' },
      { synonym: 'разгибание', language: 'ru' },
      { synonym: 'leg extension', language: 'en' },
    ],
  },
  {
    canonicalName: 'cable_row',
    displayNameRu: 'Тяга нижнего блока',
    displayNameEn: 'Cable Row',
    primaryMuscle: 'back',
    movementPattern: 'pull',
    equipment: 'cable',
    secondaryMuscles: ['lats', 'rhomboids'],
    category: 'COMPOUND',
    synonyms: [
      { synonym: 'тяга нижнего блока', language: 'ru' },
      { synonym: 'горизонтальная тяга', language: 'ru' },
      { synonym: 'cable row', language: 'en' },
    ],
  },
  {
    canonicalName: 'dumbbell_curl',
    displayNameRu: 'Сгибание рук с гантелями',
    displayNameEn: 'Dumbbell Curl',
    primaryMuscle: 'arms',
    movementPattern: 'pull',
    equipment: 'dumbbell',
    secondaryMuscles: ['biceps'],
    category: 'ISOLATION',
    synonyms: [
      { synonym: 'сгибание рук', language: 'ru' },
      { synonym: 'бицепс с гантелями', language: 'ru' },
      { synonym: 'dumbbell curl', language: 'en' },
    ],
  },
  {
    canonicalName: 'tricep_pushdown',
    displayNameRu: 'Разгибание рук на блоке',
    displayNameEn: 'Tricep Pushdown',
    primaryMuscle: 'arms',
    movementPattern: 'push',
    equipment: 'cable',
    secondaryMuscles: ['triceps'],
    category: 'ISOLATION',
    synonyms: [
      { synonym: 'разгибание рук на блоке', language: 'ru' },
      { synonym: 'трицепс на блоке', language: 'ru' },
      { synonym: 'tricep pushdown', language: 'en' },
    ],
  },
  {
    canonicalName: 'plank',
    displayNameRu: 'Планка',
    displayNameEn: 'Plank',
    primaryMuscle: 'core',
    movementPattern: 'core',
    equipment: 'bodyweight',
    secondaryMuscles: [],
    category: 'ISOLATION',
    synonyms: [
      { synonym: 'планка', language: 'ru' },
      { synonym: 'plank', language: 'en' },
    ],
  },
  {
    canonicalName: 'lateral_raise',
    displayNameRu: 'Махи гантелями в стороны',
    displayNameEn: 'Lateral Raise',
    primaryMuscle: 'shoulders',
    movementPattern: 'push',
    equipment: 'dumbbell',
    secondaryMuscles: [],
    category: 'ISOLATION',
    synonyms: [
      { synonym: 'махи в стороны', language: 'ru' },
      { synonym: 'разводка гантелей', language: 'ru' },
      { synonym: 'lateral raise', language: 'en' },
    ],
  },
  {
    canonicalName: 'glute_bridge',
    displayNameRu: 'Ягодичный мостик',
    displayNameEn: 'Glute Bridge',
    primaryMuscle: 'glutes',
    movementPattern: 'hinge',
    equipment: 'bodyweight',
    secondaryMuscles: [],
    category: 'ISOLATION',
    synonyms: [
      { synonym: 'ягодичный мостик без штанги', language: 'ru' },
      { synonym: 'мостик', language: 'ru' },
      { synonym: 'glute bridge', language: 'en' },
    ],
  },
  {
    canonicalName: 'calf_raise',
    displayNameRu: 'Подъём на носки',
    displayNameEn: 'Calf Raise',
    primaryMuscle: 'legs',
    movementPattern: 'squat',
    equipment: 'machine',
    secondaryMuscles: ['calves'],
    category: 'ISOLATION',
    synonyms: [
      { synonym: 'подъём на носки', language: 'ru' },
      { synonym: 'подъем на носки', language: 'ru' },
      { synonym: 'calf raise', language: 'en' },
    ],
  },
  {
    canonicalName: 'dumbbell_fly',
    displayNameRu: 'Разводка гантелей лёжа',
    displayNameEn: 'Dumbbell Fly',
    primaryMuscle: 'chest',
    movementPattern: 'push',
    equipment: 'dumbbell',
    secondaryMuscles: [],
    category: 'ISOLATION',
    synonyms: [
      { synonym: 'разводка лёжа', language: 'ru' },
      { synonym: 'разводка гантелей лёжа', language: 'ru' },
      { synonym: 'dumbbell fly', language: 'en' },
    ],
  },
];

/**
 * Seed-функция: заполняет БД начальными данными упражнений и синонимов.
 */
async function seed(): Promise<void> {
  console.log('🌱 Начинаю seed базы данных...');

  for (const ex of exercises) {
    const exercise = await prisma.exercise.upsert({
      where: { canonicalName: ex.canonicalName },
      update: {
        displayNameRu: ex.displayNameRu,
        displayNameEn: ex.displayNameEn,
        primaryMuscle: ex.primaryMuscle,
        movementPattern: ex.movementPattern,
        equipment: ex.equipment,
        secondaryMuscles: ex.secondaryMuscles,
        category: ex.category as ExerciseCategory,
      },
      create: {
        canonicalName: ex.canonicalName,
        displayNameRu: ex.displayNameRu,
        displayNameEn: ex.displayNameEn,
        primaryMuscle: ex.primaryMuscle,
        movementPattern: ex.movementPattern,
        equipment: ex.equipment,
        secondaryMuscles: ex.secondaryMuscles,
        category: ex.category as ExerciseCategory,
      },
    });

    for (const syn of ex.synonyms) {
      const existingSynonym = await prisma.exerciseSynonym.findFirst({
        where: { exerciseId: exercise.id, synonym: syn.synonym },
      });

      if (!existingSynonym) {
        await prisma.exerciseSynonym.create({
          data: {
            exerciseId: exercise.id,
            synonym: syn.synonym.toLowerCase(),
            language: syn.language,
          },
        });
      }
    }

    console.log(`  ✅ ${ex.canonicalName} (${ex.synonyms.length} синонимов)`);
  }

  const count = await prisma.exercise.count();
  const synonymCount = await prisma.exerciseSynonym.count();
  console.log(`\n🏋️ Seed завершён: ${count} упражнений, ${synonymCount} синонимов`);
}

seed()
  .catch((error: unknown) => {
    console.error('❌ Ошибка при seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
