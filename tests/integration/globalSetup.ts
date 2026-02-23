import { execSync } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';

export default async function globalSetup() {
  // Загружаем переменные из .env.test если он есть
  dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL is not set for integration tests. Please provide .env.test with test DB URL',
    );
  }

  console.log('🔄 Running Prisma migrations for test database...');

  // Применяем миграции на тестовую базу данных
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });

  // При желании можно запустить seed, но интеграционные тесты обычно сами создают нужное состояние
  // execSync('npx prisma db seed', { stdio: 'inherit' });

  console.log('✅ Test database is ready.');
}
