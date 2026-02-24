# ADR-0003: Использование Supabase вместо self-hosted PostgreSQL в production

**Дата:** 2026-02-23  
**Статус:** Принято  
**Контекст:** Деплой MVP FitBot (Этап 6)

---

## Контекст

При подготовке production-деплоя стоял выбор: поднимать PostgreSQL самостоятельно в Docker на VPS или использовать managed-решение.

## Решение

Использовать **Supabase** как managed PostgreSQL-хостинг вместо self-hosted PostgreSQL в Docker.

## Обоснование

| Критерий                | Self-hosted (Docker)              | Supabase                           |
| ----------------------- | --------------------------------- | ---------------------------------- |
| Бэкапы                  | ❌ Вручную (cron + pg_dump)       | ✅ Автоматически                   |
| UI для просмотра данных | ❌ Нет (только CLI/Prisma Studio) | ✅ Есть (Table Editor, SQL Editor) |
| Стоимость               | ~$0 (входит в VPS)                | ✅ Free tier до 500 MB             |
| Надёжность              | ⚠️ Зависит от VPS и настроек      | ✅ Managed SLA                     |
| Сложность поддержки     | ⚠️ Нужно следить за версиями      | ✅ Обновляется автоматически       |
| Масштабирование         | ⚠️ Ручное                         | ✅ Легко через UI                  |

Для MVP с одним пользователем 500 MB бесплатного хранилища более чем достаточно.

## Последствия

- PostgreSQL **удалён** из `docker-compose.prod.yml` — на VPS теперь только `redis` и `bot`
- `DATABASE_URL` использует **Transaction Pooler** (порт 6543) с параметром `?pgbouncer=true&connection_limit=1` — это требование Prisma при работе через PgBouncer
- Локальная разработка (`docker-compose.yml`) **не изменяется** — PostgreSQL остаётся в Docker для локальной среды
- При росте до v2 (сотни пользователей) — перейти на Supabase Pro ($25/мес) или развернуть свой PostgreSQL с репликами

## Связанные файлы

- `docker-compose.prod.yml` — убран сервис postgres
- `.env.example` — обновлён DATABASE_URL с примером Supabase connection string
- `docs/infrastructure/DEPLOYMENT.md` — подробная инструкция по настройке Supabase
