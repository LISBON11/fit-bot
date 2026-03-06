import { PrismaClient } from '../../src/generated/prisma/index.js';

export default async function globalTeardown() {
  console.log('🧹 Cleaning up test database...');

  const { Pool } = await import('pg');
  const { PrismaPg } = await import('@prisma/adapter-pg');
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  // Здесь можно выполнить дроп схемы или другие глобальные действия,
  // но TRUNCATE обычно достаточно, и он делается в beforeEach.
  // Для полной очистки:
  await prisma.$executeRawUnsafe(`
    DO $$ DECLARE
      r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'test' AND tablename != '_prisma_migrations') LOOP
        EXECUTE 'TRUNCATE TABLE "test".' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
    END $$;
  `);

  await prisma.$disconnect();

  console.log('✅ Test database cleaned.');
}
