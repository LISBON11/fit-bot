import 'dotenv/config';
import {
  ExerciseCategory,
  Equipment,
  ExerciseType,
  ExperienceLevel,
  MovementPattern,
  Muscle,
} from '../src/generated/prisma/index.js';
import { getPrismaClient } from '../src/config/database.js';
import fs from 'fs';
import path from 'path';

const prisma = getPrismaClient();

const jsonFilePath = path.join(process.cwd(), 'prisma', 'data', 'exercises.json');
const rawData = fs.readFileSync(jsonFilePath, 'utf8');
const exercises = JSON.parse(rawData) as Record<string, unknown>[];

/**
 * Наполняет / обновляет таблицу упражнений через upsert.
 * Пользовательские данные (users, workouts и т.д.) не затрагиваются.
 */
async function seed(): Promise<void> {
  console.log('🌱 Начинаю seed упражнений из JSON-файла...');

  for (const ex of exercises) {
    if (!ex.canonicalName) continue;

    const data = {
      displayNameRu: (ex.displayNameRu as string) || null,
      displayNameEn: (ex.displayNameEn as string) || null,
      primaryMuscles: Array.isArray(ex.primaryMuscles) ? (ex.primaryMuscles as Muscle[]) : [],
      movementPattern: (ex.movementPattern as MovementPattern) || null,
      equipment: (ex.equipment as Equipment) || null,
      secondaryMuscles: Array.isArray(ex.secondaryMuscles) ? (ex.secondaryMuscles as Muscle[]) : [],
      category: (ex.category as ExerciseCategory) || null,
      level: (ex.level as ExperienceLevel) || null,
      instructions: Array.isArray(ex.instructions) ? (ex.instructions as string[]) : [],
      exerciseType: (ex.exerciseType as ExerciseType) || null,
    };

    await prisma.exercise.upsert({
      where: { canonicalName: ex.canonicalName as string },
      update: data,
      create: { canonicalName: ex.canonicalName as string, ...data },
    });
  }

  const count = await prisma.exercise.count();
  console.log(`\n🏋️  Seed завершён: ${count} упражнений в базе`);
}

seed()
  .catch((error: unknown) => {
    console.error('❌ Ошибка при seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
