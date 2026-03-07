import 'dotenv/config';
import { ExerciseCategory } from '../src/generated/prisma/index.js';
import { getPrismaClient, connectDatabase, disconnectDatabase } from '../src/config/database.js';
import fs from 'fs';
import path from 'path';

const prisma = getPrismaClient();

const jsonFilePath = path.join(process.cwd(), 'prisma', 'data', 'exercises.json');
const rawData = fs.readFileSync(jsonFilePath, 'utf8');
const exercises = JSON.parse(rawData);

async function seed(): Promise<void> {
  console.log('🌱 Начинаю seed базы данных из JSON-файла...');

  for (const ex of exercises) {
    if (!ex.canonicalName) continue; // Skip invalid entries

    await prisma.exercise.upsert({
      where: { canonicalName: ex.canonicalName },
      update: {
        displayNameRu: ex.displayNameRu || null,
        displayNameEn: ex.displayNameEn || null,
        primaryMuscles: Array.isArray(ex.primaryMuscles) ? ex.primaryMuscles : [],
        movementPattern: ex.movementPattern || null,
        equipment: ex.equipment || null,
        secondaryMuscles: Array.isArray(ex.secondaryMuscles) ? ex.secondaryMuscles : [],
        category: ex.category,
        level: ex.level || null,
        instructions: Array.isArray(ex.instructions) ? ex.instructions : [],
        exerciseType: ex.exerciseType || null,
      },
      create: {
        canonicalName: ex.canonicalName,
        displayNameRu: ex.displayNameRu || null,
        displayNameEn: ex.displayNameEn || null,
        primaryMuscles: Array.isArray(ex.primaryMuscles) ? ex.primaryMuscles : [],
        movementPattern: ex.movementPattern || null,
        equipment: ex.equipment || null,
        secondaryMuscles: Array.isArray(ex.secondaryMuscles) ? ex.secondaryMuscles : [],
        category: ex.category,
        level: ex.level || null,
        instructions: Array.isArray(ex.instructions) ? ex.instructions : [],
        exerciseType: ex.exerciseType || null,
      },
    });
  }

  const count = await prisma.exercise.count();
  console.log(`\n🏋️ Seed завершён: ${count} упражнений в базе`);
}

seed()
  .catch((error: unknown) => {
    console.error('❌ Ошибка при seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
