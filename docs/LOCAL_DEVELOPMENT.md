# Локальная разработка FitBot

Данный документ описывает процесс настройки локального окружения, запуска сервисов и нюансы отладки бота.

## 1. Нужно ли поднимать Docker?

Да, для комфортной локальной разработки **нужен Docker**.
Через Docker Compose (файл `docker-compose.yml`) локально поднимаются **PostgreSQL** (БД) и **Redis** (кэш и сессии).
Сам бот (Node.js) при локальной разработке запускается без докера, прямо на хосте (на вашем компьютере) через команду `npm run dev`.

**Запуск инфраструктуры:**

```bash
docker compose up postgres redis -d
```

_(Эта команда запустит только локальные версии БД и Redis в фоне)_

## 2. Что на каком порту работает (в Docker)?

- **PostgreSQL**: `5432` (проброшен на `localhost:5432`)
- **Redis**: `6379` (проброшен на `localhost:6379`)
- **Node.js (Бот)**: Запускается локально, но внешние порты (HTTP) не слушает, так как использует Long Polling через Telegram API (библиотека GrammY).

## 3. В какую базу данных мы ходим?

При разработке вы можете использовать как локальную БД (в докере), так и удаленную (например, Supabase).

### Вариант А: Локальная БД (Рекомендуемый для разработки и дебага)

Используем PostgreSQL, поднятый локально в контейнере.
Это безопаснее (не затронете реальные данные) и быстрее.

URL для подключения (прописать в `.env`):

```env
DATABASE_URL=postgresql://fitbot:fitbot_dev@localhost:5432/fitbot
DIRECT_URL=postgresql://fitbot:fitbot_dev@localhost:5432/fitbot
```

_(Логин `fitbot`, пароль `fitbot_dev` и база `fitbot` настроены по умолчанию в docker-compose.yml)_

### Вариант Б: Облачная БД Supabase (Синхронизация с Production)

Если необходимо работать с данными на сервере, используется Supabase.
У него есть два URL (прописаны в `.env.example`):

```env
# URL для работы приложения (использует Transaction Pooler на балансировщике, порт 6543)
DATABASE_URL="postgresql://postgres.txzxedvrnovdsltxsafp:[password]@aws-1-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&ipv4=true"

# URL для системных операций (миграции Prisma, порт 5432)
DIRECT_URL="postgresql://postgres.txzxedvrnovdsltxsafp:[password]@aws-1-eu-central-1.pooler.supabase.com:5432/postgres?ipv4=true"

password - пароль от продовой базы
```

## 4. Что прописывать в `.env`?

Для старта скопируйте пример окружения:

```bash
cp .env.example .env
```

Отредактируйте файл. Основные переменные для локальной работы:

- `BOT_TOKEN` — токен вашего **тестового** бота (создать через @BotFather в Telegram).
- `DEEPSEEK_API_KEY` — ключ API DeepSeek (используется для NLU).
- `DEEPGRAM_API_KEY` — ключ API Deepgram (используется для расшифровки голоса).
- `DATABASE_URL` и `DIRECT_URL` — строки БД (берите локальные, из п.3.А).
- `REDIS_PASSWORD` — пароль для локального Redis (совпадает с тем, что в docker-compose.yml у редиса, по умолчанию: `redis_dev`).
- `REDIS_URL` — укажите `redis://:redis_dev@localhost:6379`.
- `PUBLISH_CHAT_ID` — ID вашего личного тестового канала или просто ваш Telegram ID (туда бот будет пытаться публиковать тренировки).

## 5. Полный локальный запуск за 5 шагов

1. Установите все зависимости проекта:
   ```bash
   npm ci
   ```
2. Поднимите БД и Redis в фоне:
   ```bash
   docker compose up postgres redis -d
   ```
3. Примените структуру БД (миграции Prisma) к вашей локальной базе:
   ```bash
   npm run db:migrate
   ```
4. Наполните базу справочниками (в проекте есть файл seed):
   ```bash
   npm run db:seed
   ```
5. Запустите самого бота в режиме авто-перезапуска (Watch Mode):
   ```bash
   npm run dev
   ```
   Отлично, бот работает!

## 6. Как дебажить проект?

### Уровень логов

В проекте настроен логгер `pino`. В файле `.env` выставите:

```env
LOG_LEVEL=debug  # Выведет максимум деталей, включая входящие Telegram-апдейты
NODE_ENV=development # Включает красивый (цветной) формат логов в консоли
```

### Просмотр базы данных (Prisma Studio)

Не обязательно использовать сторонние инструменты (типа DBeaver). Вы можете просмотреть данные через браузер:

```bash
npm run db:studio
```

Студия откроется на порту `5555` (`http://localhost:5555`) — там можно редактировать, добавлять и удалять записи.

### Дебаггер в VSCode

Для использования точек останова (breakpoints) в редакторе VSCode создайте файл `.vscode/launch.json` со следующим содержимым:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Bot",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "console": "integratedTerminal",
      "restart": true
    }
  ]
}
```

После создания можете запускать конфигурацию "Debug Bot" во вкладке _Run and Debug_ и инспектировать любые переменные в реальном времени.

### Тесты

Для дебага отдельной функции или компонента можно написать или запустить написанный тест.

```bash
# Запустить тесты
npm run test

# Запустить тесты, перепрогоняя их только при изменении файлов (watch mode)
npm run test:watch
```
