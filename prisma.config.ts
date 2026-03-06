import 'dotenv/config';
import { defineConfig, env } from '@prisma/config';

/**
 * Конфигурация Prisma CLI.
 * Заменяет устаревшую секцию `package.json#prisma`.
 * При наличии этого файла Prisma отключает авто-загрузку `.env`,
 * поэтому переменные загружаются явно через `dotenv/config`.
 * @see https://pris.ly/prisma-config
 */
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
