import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeEach(async () => {
  // Очищаем таблицы перед каждым тестом (TRUNCATE обеспечивает сброс ID для SERIAL/AUTO_INCREMENT, хотя мы используем UUID)
  // CASCADE помогает очистить связанные таблицы безопасно
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename != '_prisma_migrations';`;

  const tables = tablenames.map(({ tablename }) => tablename).join('", "');

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tables}" CASCADE;`);
  } catch (error) {
    console.log('Teardown database error', error);
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});
