import { PrismaClient } from '@prisma/client';

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
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
    category: 'compound',
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
    muscleGroups: ['quadriceps', 'glutes', 'core'],
    category: 'compound',
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
    muscleGroups: ['hamstrings', 'glutes', 'back', 'core'],
    category: 'compound',
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
    muscleGroups: ['hamstrings', 'glutes'],
    category: 'compound',
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
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    category: 'compound',
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
    muscleGroups: ['shoulders', 'triceps'],
    category: 'compound',
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
    muscleGroups: ['glutes', 'hamstrings'],
    category: 'compound',
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
    muscleGroups: ['quadriceps', 'glutes'],
    category: 'compound',
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
    muscleGroups: ['lats', 'biceps'],
    category: 'compound',
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
    muscleGroups: ['lats', 'rhomboids', 'biceps'],
    category: 'compound',
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
    muscleGroups: ['lats', 'biceps', 'core'],
    category: 'compound',
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
    muscleGroups: ['quadriceps', 'glutes'],
    category: 'compound',
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
    muscleGroups: ['quadriceps', 'glutes'],
    category: 'compound',
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
    muscleGroups: ['quadriceps', 'glutes'],
    category: 'compound',
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
    muscleGroups: ['hamstrings'],
    category: 'isolation',
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
    muscleGroups: ['quadriceps'],
    category: 'isolation',
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
    muscleGroups: ['lats', 'rhomboids'],
    category: 'compound',
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
    muscleGroups: ['biceps'],
    category: 'isolation',
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
    muscleGroups: ['triceps'],
    category: 'isolation',
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
    muscleGroups: ['core'],
    category: 'isolation',
    synonyms: [
      { synonym: 'планка', language: 'ru' },
      { synonym: 'plank', language: 'en' },
    ],
  },
  {
    canonicalName: 'lateral_raise',
    displayNameRu: 'Махи гантелями в стороны',
    displayNameEn: 'Lateral Raise',
    muscleGroups: ['shoulders'],
    category: 'isolation',
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
    muscleGroups: ['glutes'],
    category: 'isolation',
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
    muscleGroups: ['calves'],
    category: 'isolation',
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
    muscleGroups: ['chest'],
    category: 'isolation',
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
        muscleGroups: ex.muscleGroups,
        category: ex.category,
      },
      create: {
        canonicalName: ex.canonicalName,
        displayNameRu: ex.displayNameRu,
        displayNameEn: ex.displayNameEn,
        muscleGroups: ex.muscleGroups,
        category: ex.category,
        isGlobal: true,
      },
    });

    // Удаляем старые глобальные синонимы и создаём заново
    await prisma.exerciseSynonym.deleteMany({
      where: { exerciseId: exercise.id, isGlobal: true },
    });

    await prisma.exerciseSynonym.createMany({
      data: ex.synonyms.map((syn) => ({
        exerciseId: exercise.id,
        synonym: syn.synonym,
        language: syn.language,
        isGlobal: true,
      })),
    });

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
