import 'dotenv/config';
import { getPrismaClient } from '../src/config/database.js';

const prisma = getPrismaClient();

/**
 * Сбрасывает ВСЕ таблицы базы данных через TRUNCATE CASCADE.
 * После очистки автоматически запускается seed упражнений.
 *
 * ⚠️ ВНИМАНИЕ: Удаляет все данные, включая пользователей и тренировки.
 * Используй только в dev/staging окружении.
 */
async function resetDatabase(): Promise<void> {
  console.log('⚠️  Сбрасываю все таблицы базы данных...');
  await prisma.$executeRaw`
    TRUNCATE TABLE
      workout_comments,
      exercise_sets,
      workout_exercises,
      workouts,
      user_exercise_mappings,
      exercise_synonyms,
      exercises,
      auth_providers,
      users
    RESTART IDENTITY CASCADE
  `;
  console.log('✅ Все таблицы очищены');
}

resetDatabase()
  .catch((error: unknown) => {
    console.error('❌ Ошибка при сбросе БД:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
