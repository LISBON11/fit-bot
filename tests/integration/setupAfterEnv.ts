import { PrismaClient } from '../../src/generated/prisma/index.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

beforeEach(async () => {
  // Очищаем таблицы перед каждым тестом (TRUNCATE обеспечивает сброс ID для SERIAL/AUTO_INCREMENT, хотя мы используем UUID)
  // CASCADE помогает очистить связанные таблицы безопасно
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='test' AND tablename != '_prisma_migrations';`;

  const tables = tablenames.map(({ tablename }) => `"test"."${tablename}"`).join(', ');

  try {
    if (tables.length > 0) {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    }
  } catch (error) {
    console.log('Teardown database error', error);
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});
