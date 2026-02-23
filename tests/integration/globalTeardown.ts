import { PrismaClient } from '@prisma/client';

export default async function globalTeardown() {
  console.log('🧹 Cleaning up test database...');

  const prisma = new PrismaClient();

  // Здесь можно выполнить дроп схемы или другие глобальные действия,
  // но TRUNCATE обычно достаточно, и он делается в beforeEach.
  // Для полной очистки:
  await prisma.$executeRawUnsafe(`
    DO $$ DECLARE
      r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
    END $$;
  `);

  await prisma.$disconnect();

  console.log('✅ Test database cleaned.');
}
