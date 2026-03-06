# 12. Миграция конфигурации Prisma в prisma.config.ts

Дата: 2026-03-06

## Статус

Принято

## Контекст

При использовании Prisma ORM (версия 6+) вместе с объявлением настроек `prisma` (например, seed-скриптов) в `package.json` CLI выводит предупреждение о том, что данное свойство объявлено устаревшим (deprecated) и будет удалено в Prisma 7.
В журнале ошибок отображается: `warn The configuration property package.json#prisma is deprecated and will be removed in Prisma 7. Please migrate to a Prisma config file (e.g., prisma.config.ts).`

## Решение

Было принято решение перенести конфигурацию Prisma CLI в отдельный файл `prisma.config.ts` в корне проекта.

1. Создан файл `prisma.config.ts`, использующий `defineConfig` из `@prisma/config`\*.
2. Раздел `"prisma": { "seed": ... }` удалён из `package.json`.
3. Поскольку при наличии файла конфигурации Prisma **перестаёт автоматически загружать файл `.env`**, в `prisma.config.ts` добавлен импорт `import 'dotenv/config'` и явная передача переменных окружения (`env('DATABASE_URL')`, `env('DIRECT_URL')`) в параметр `datasource`.

_\*Примечание: в Prisma CLI `@prisma/config` или `prisma/config` используются для определения структуры конфига взамен старого подхода._

## Последствия

### Положительные

- Устранение предупреждения (Warning) об устаревшей опции в `package.json`.
- Подготовка проекта к мажорному обновлению Prisma v7.
- Более гибкая возможность конфигурирования Prisma CLI (например, настройки директории миграций).

### Отрицательные (Риски)

- Явная настройка `dotenv/config` теперь является обязательной для работы Prisma CLI, иначе CLI не увидит `DATABASE_URL` и `DIRECT_URL` и выдаст ошибку `P1012`.
