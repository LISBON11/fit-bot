# 🗺️ FitBot — Пошаговая дорожная карта

> **Как использовать:** каждый блок `prompt` — самостоятельная задача для AI-агента.
> Копируй блок целиком и отправляй в агент. Каждый промпт содержит: контекст, зависимости, задачи, ограничения, acceptance criteria.

**Контекст проекта:** [docs/architecture/design/SYSTEM_DESIGN.md](file:///Users/elizavetagolubenko/Projects/fit-tel-bot/docs/architecture/design/SYSTEM_DESIGN.md)

---

## Этап 1: Инициализация проекта

### 1.1 Node.js + TypeScript проект

```prompt
Инициализируй Node.js + TypeScript проект в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: нет (первый шаг).
Контекст: docs/architecture/design/SYSTEM_DESIGN.md — раздел 11 «Технологический стек» (таблица стека) и «Структура проекта» (дерево директорий).

Задачи:
1. npm init, установить typescript, tsx, @types/node.
2. tsconfig.json: strict: true, target: ES2022, module: NodeNext, outDir: dist, rootDir: src.
3. Создать структуру директорий ТОЧНО по docs/architecture/design/SYSTEM_DESIGN.md раздел 11 «Структура проекта»:
   src/bot/{conversations, handlers, keyboards, formatters, middleware},
   src/services, src/stt, src/nlu/prompts, src/repositories,
   src/config, src/errors, src/logger, tests/{unit, integration, fixtures}.
   В каждой директории — .gitkeep для сохранения в git.
4. Entry point src/index.ts: async main() с try/catch, graceful shutdown (SIGINT, SIGTERM → process.exit(0)), логирование старта и остановки через console.log (pino добавим позже).
5. npm-скрипты: dev (tsx watch src/index.ts), build (tsc), start (node dist/index.js).
6. .gitignore: node_modules, dist, .env, *.js в корне.
7. .env.example с ВСЕМИ переменными: BOT_TOKEN, OPENAI_API_KEY, DATABASE_URL, REDIS_URL, LOG_LEVEL, NODE_ENV, PUBLISH_CHAT_ID.

Ограничения:
- НЕ устанавливать ESLint/Prettier/Jest — это шаги 1.2, 1.3.
- НЕ писать бизнес-логику — только скелет.
- Runtime: Node.js 20 LTS.

Acceptance criteria:
- [ ] `npm run build` компилируется без ошибок
- [ ] `npm run dev` запускается и выводит сообщение о старте
- [ ] Все директории из docs/architecture/design/SYSTEM_DESIGN.md существуют
- [ ] .env.example содержит 7 переменных
```

---

### 1.2 ESLint + Prettier

```prompt
Настрой ESLint (flat config) и Prettier для TypeScript в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаг 1.1 выполнен.
Контекст: docs/architecture/design/SYSTEM_DESIGN.md — раздел 11 (ESLint + Prettier в таблице стека).

Задачи:
1. Установить eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin, eslint-config-prettier, eslint-plugin-prettier, prettier.
2. eslint.config.mjs (flat config): strict TypeScript rules — explicit-function-return-type (warn), no-unused-vars (error), no-explicit-any (warn), consistent-type-imports (error).
3. .prettierrc: singleQuote: true, trailingComma: 'all', printWidth: 100, semi: true.
4. npm-скрипты: lint (eslint src), lint:fix (eslint src --fix), format (prettier --write src).
5. Прогнать lint:fix на существующих файлах (src/index.ts).

Ограничения:
- Использовать flat config (eslint.config.mjs), НЕ .eslintrc.
- НЕ устанавливать Jest-плагины — это шаг 1.3.

Acceptance criteria:
- [ ] `npm run lint` проходит без ошибок
- [ ] `npm run format` работает
- [ ] eslint.config.mjs использует flat config формат
```

---

### 1.3 Jest

```prompt
Настрой Jest + ts-jest для проекта в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаги 1.1, 1.2 выполнены.

Задачи:
1. Установить jest, ts-jest, @types/jest, eslint-plugin-jest.
2. jest.config.ts: preset ts-jest, testEnvironment node, roots: ['src/', 'tests/'], testMatch: ['<rootDir>/src/**/__tests__/**/*.test.ts', '<rootDir>/tests/integration/**/*.test.ts'], moduleNameMapper для src/ алиасов (если есть paths в tsconfig), coverageThreshold: branches/functions/lines ≥ 70%.
3. Добавить jest-плагин в eslint.config.mjs для файлов tests/.
4. Создать smoke-тест src/__tests__/smoke.test.ts (проверяет что 1+1=2).
5. npm-скрипты: test (jest), test:watch (jest --watch), test:coverage (jest --coverage).

Ограничения:
- Unit-тесты должны лежать в папках __tests__ рядом с исходниками в src/. Integration-тесты — в tests/integration/.
- НЕ писать бизнес-тесты — только инфраструктура тестирования.

Acceptance criteria:
- [ ] `npm test` проходит (smoke-тест зелёный)
- [ ] `npm run test:coverage` генерирует отчёт
- [ ] `npm run lint` по-прежнему проходит
```

---

### 1.4 Docker Compose для инфраструктуры

```prompt
Создай Docker Compose для локальной разработки в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаг 1.1 выполнен.
Контекст: docs/architecture/design/SYSTEM_DESIGN.md — раздел 11 «Docker Compose (dev)» — там есть пример конфигурации.

Задачи:
1. docker-compose.yml с сервисами:
   - postgres: image postgres:16-alpine, env POSTGRES_DB=fitbot, POSTGRES_USER=fitbot, POSTGRES_PASSWORD из .env, порт 5432, volume pgdata, healthcheck (pg_isready).
   - redis: image redis:7-alpine, requirepass из .env, порт 6379, healthcheck (redis-cli ping).
2. Добавить в .env.example: DB_PASSWORD, REDIS_PASSWORD, DATABASE_URL=postgresql://fitbot:${DB_PASSWORD}@localhost:5432/fitbot.
3. .dockerignore: node_modules, dist, .git, .env.
4. НЕ добавлять сервис bot — это шаг 5.2.

Acceptance criteria:
- [ ] `docker compose up -d` — оба сервиса в статусе healthy
- [ ] `docker compose ps` показывает 2 healthy сервиса
- [ ] PostgreSQL доступен на localhost:5432
- [ ] Redis доступен на localhost:6379
```

---

### 1.5 Prisma + схема БД + seed

```prompt
Настрой Prisma ORM и создай полную схему БД для FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаги 1.1, 1.4 выполнены (проект + PostgreSQL запущен).
Контекст: docs/architecture/design/SYSTEM_DESIGN.md — раздел 4 «Модель данных и схема БД» (ER-диаграмма, описания таблиц, индексы).

Задачи:
1. Установить prisma, @prisma/client. Инициализировать: npx prisma init.
2. schema.prisma — создать ВСЕ модели из ER-диаграммы docs/architecture/design/SYSTEM_DESIGN.md раздел 4:
   - User (id uuid, telegram_id, telegram_username, email, password_hash, display_name, timestamps)
   - AuthProvider (id, user_id FK, provider enum, provider_user_id, metadata Json, timestamps)
   - Workout (id, user_id FK, workout_date, status enum DRAFT/APPROVED/CANCELLED, focus String[], location, raw_transcript, source_message_id, preview_message_id, published_message_id, timestamps)
   - Exercise (id, canonical_name unique, display_name_ru, display_name_en, muscle_groups String[], category, is_global, created_by FK nullable, timestamps)
   - ExerciseSynonym (id, exercise_id FK, synonym, language, is_global, user_id FK nullable, timestamps)
   - UserExerciseMapping (id, user_id FK, input_text, exercise_id FK, use_count, timestamps)
   - WorkoutExercise (id, workout_id FK, exercise_id FK, sort_order, raw_name, timestamps)
   - ExerciseSet (id, workout_exercise_id FK, set_number, reps, weight Decimal nullable, unit, timestamps)
   - WorkoutComment (id, workout_id FK, workout_exercise_id FK nullable, comment_type, body_part, side, sensation_type, raw_text, timestamps)
3. Связи: каскадное удаление (workout → exercises → sets, workout → comments).
4. Индексы — ТОЧНО по docs/architecture/design/SYSTEM_DESIGN.md раздел 4 «Индексы» (5 индексов: workouts_user_date, synonyms_text, synonyms_user, mappings_user_text, sets_workout_exercise, auth_providers_provider).
5. Seed-скрипт prisma/seed.ts: 20–30 упражнений (back_squat, front_squat, deadlift, romanian_deadlift, bench_press, overhead_press, hip_thrust, leg_press, lat_pulldown, barbell_row и т.д.) + по 2–4 синонима на русском и английском для каждого. Все is_global=true.
6. npm-скрипты: db:migrate (prisma migrate dev), db:generate (prisma generate), db:seed (prisma db seed), db:studio (prisma studio).

Ограничения:
- Использовать uuid для PK (по SYSTEM_DESIGN).
- НЕ создавать repositories/services — только схема и seed.
- DATABASE_URL берётся из .env.

Acceptance criteria:
- [ ] `npx prisma migrate dev` — миграция создана и применена без ошибок
- [ ] `npx prisma db seed` — seed выполнен, в exercises ≥ 20 записей
- [ ] `npx prisma studio` — показывает все 9 таблиц с данными в exercises/exercise_synonyms
- [ ] `npm run lint` проходит
```

---

### 1.6 Конфигурация, логирование, ошибки

```prompt
Создай модули инфраструктурного слоя для FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаги 1.1–1.5 выполнены.
Контекст: docs/architecture/design/SYSTEM_DESIGN.md — раздел 9 «Безопасность» (хранение секретов), раздел 10 «Логирование, мониторинг, обработка ошибок» (таблица событий, код логгера, стратегия ошибок).

Задачи:
1. **Конфигурация** (src/config/env.ts):
   - Установить zod.
   - Zod-схема для ВСЕХ переменных: BOT_TOKEN (string), OPENAI_API_KEY (string), DATABASE_URL (string url), REDIS_URL (string, default redis://localhost:6379), LOG_LEVEL (enum: debug/info/warn/error, default info), NODE_ENV (enum: development/production/test, default development), PUBLISH_CHAT_ID (string).
   - Экспортировать типизированный объект config. При невалидном конфиге — понятная ошибка с указанием какие переменные не прошли валидацию.

2. **Логирование** (src/logger/logger.ts):
   - Установить pino, pino-pretty.
   - Конфигурация по docs/architecture/design/SYSTEM_DESIGN.md раздел 10 «Логгер»: pino-pretty с colorize в dev, JSON в production.
   - Экспортировать createLogger(name: string) — фабрика child-логгеров с контекстом {module: name}.

3. **Подключение БД** (src/config/database.ts):
   - PrismaClient singleton с логированием query/error событий через pino.
   - Функции connectDatabase() и disconnectDatabase() с retry (3 попытки, exponential backoff).

4. **Подключение Redis** (src/config/redis.ts):
   - Установить ioredis.
   - Redis singleton с reconnect strategy (exponential backoff, max 10 попыток).
   - Логирование connect/disconnect/error.
   - Функции connectRedis() и disconnectRedis().

5. **Кастомные ошибки** (src/errors/app-errors.ts):
   - Базовый AppError (message, statusCode, isOperational).
   - Наследники: NotFoundError (404), ValidationError (400), SttError (502), NluParseError (422), ExternalServiceError (503).
   - Каждая ошибка — export class.

6. **Обнови src/index.ts**: порядок инициализации: validateConfig → createLogger → connectDatabase → connectRedis → «✅ FitBot started». Graceful shutdown: disconnectRedis → disconnectDatabase → exit.

7. **Тесты** (src/**/__tests__/):
   - config/env.test.ts: валидный конфиг, недостающие переменные, невалидный LOG_LEVEL.
   - errors/app-errors.test.ts: проверка statusCode, isOperational, instanceof для каждого класса ошибки.

TSDoc-комментарии на русском ко всем экспортируемым функциям и классам.

Ограничения:
- НЕ создавать бот или сервисы — только инфраструктурный слой.
- Конфиг загружается ОДИН раз при старте, НЕ на каждый вызов.

Acceptance criteria:
- [ ] `npm run lint` без ошибок
- [ ] `npm test` — все тесты проходят (config + errors)
- [ ] При отсутствии BOT_TOKEN в .env — понятная ошибка при запуске
- [ ] Логер выводит pretty-formatted логи в dev
```

---

## Этап 2: Telegram-бот (каркас)

### 2.1 grammY бот + middleware

```prompt
Создай каркас Telegram-бота на grammY для FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаги 1.1–1.6 выполнены (проект, линтер, тесты, БД, инфраструктурный слой).
Контекст: docs/architecture/design/SYSTEM_DESIGN.md — раздел 6 «Telegram-бот: паттерны, состояния, UX» (FSM, middleware, структура handlers), раздел 5 «Авторизация» (паттерн auto-register по telegram_id).

Задачи:
1. Установить grammy, @grammyjs/conversations, @grammyjs/session.
2. **Типы** (src/bot/types.ts): CustomContext extends Context с полями session: SessionData и user: User (Prisma model). SessionData: { conversationState?, currentDraftId?, disambiguation? }.
3. **Бот** (src/bot/bot.ts): создание Bot<CustomContext>, подключение session plugin (storage: Redis через @grammyjs/storage-free или memory на MVP), conversations plugin.
4. **Auth middleware** (src/bot/middleware/authMiddleware.ts): при каждом update — найти пользователя по ctx.from.id в auth_providers (provider='telegram') → если нет, создать User + AuthProvider в транзакции → записать в ctx.user. Использовать Prisma напрямую (UserService создадим в 3.3).
5. **Error middleware** (src/bot/middleware/errorMiddleware.ts): bot.catch() — логировать ошибку через pino, отправить пользователю «⚠️ Произошла ошибка, попробуй ещё раз». Различать AppError (isOperational → user-friendly msg) и unknown (generic msg).
6. **Logging middleware** (src/bot/middleware/loggingMiddleware.ts): логировать тип update, userId, время обработки в мс.
7. **Команды** (src/bot/handlers/commandHandlers.ts): /start (приветственное сообщение), /help (список команд и инструкция), /cancel (сброс conversation state).
8. **Подключение в index.ts**: после инициализации инфраструктуры → создать бот → подключить middleware (logging → auth → session → conversations → error) → bot.start() → graceful shutdown bot.stop().
9. **Тесты** (src/**/__tests__/bot/): authMiddleware.test.ts — мок Prisma, проверить: новый пользователь создаётся, существующий находится, ctx.user заполнен.

Ограничения:
- НЕ реализовывать STT/NLU/Workout flow — только каркас.
- НЕ запускать бота реально (нет BOT_TOKEN в CI).
- Сессии на MVP хранить в памяти (Redis-storage — при необходимости позже).

Acceptance criteria:
- [ ] `npm run lint` без ошибок
- [ ] `npm test` — тесты authMiddleware проходят
- [ ] Все файлы из раздела 6 docs/architecture/design/SYSTEM_DESIGN.md созданы (bot.ts, middleware/*, handlers/commandHandlers.ts)
- [ ] TSDoc на русском к middleware и handler функциям
```

---

### 2.2 Speech-to-Text (STT)

```prompt
Реализуй модуль распознавания речи (STT) для FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаг 2.1 выполнен.
Контекст: docs/architecture/design/SYSTEM_DESIGN.md — раздел 3.1 «Speech-to-Text» (интерфейс SttService, реализация OpenAI Whisper), раздел 9 «Обработка голосовых» (безопасность: обработка в памяти, НЕ на диск).

Задачи:
1. Установить openai, fluent-ffmpeg, @types/fluent-ffmpeg. На машине должен быть ffmpeg (добавить проверку при старте).
2. **Интерфейс** (src/stt/stt.interface.ts): interface SttService { transcribe(audioBuffer: Buffer, language?: string): Promise<string> } — точно по docs/architecture/design/SYSTEM_DESIGN.md раздел 3.1.
3. **Реализация** (src/stt/openai-whisper.stt.ts): class OpenAiWhisperService implements SttService.
   - Принимает Buffer (.oga от Telegram).
   - Конвертирует .oga → .wav через ffmpeg (pipe-based, БЕЗ temp-файлов — по SYSTEM_DESIGN раздел 9 «Обработка голосовых»).
   - Отправляет в OpenAI Whisper API (openai.audio.transcriptions.create), model: 'whisper-1', language: 'ru'.
   - Логирует: время конвертации, время транскрипции, длину текста.
   - При ошибке — бросает SttError.
4. **Voice handler** (src/bot/handlers/voiceHandler.ts):
   - Скачать .oga файл из Telegram через ctx.api.getFile() + fetch в Buffer.
   - Отправить ctx.api.sendChatAction('typing') и повторять каждые 5 секунд во время обработки.
   - Передать buffer в SttService.transcribe().
   - ПОКА просто отправить текст транскрипции обратно пользователю (NLU подключим в следующем шаге).
5. Зарегистрировать voiceHandler в bot.ts (bot.on('message:voice', ...)).
6. **Тесты** (src/**/__tests__/stt/): мок openai клиента, проверить: успешная транскрипция, SttError при ошибке API, пустой текст.

Ограничения:
- НЕ сохранять аудио на диск и НЕ хранить — только Buffer в памяти.
- НЕ подключать NLU — пока просто эхо транскрипции.
- Typing indicator — sendChatAction каждые 5 секунд (по SYSTEM_DESIGN раздел 2).

Acceptance criteria:
- [ ] `npm run lint` без ошибок
- [ ] `npm test` — тесты STT проходят
- [ ] SttService реализует интерфейс из SYSTEM_DESIGN
- [ ] Аудио обрабатывается ТОЛЬКО в памяти (Buffer), без temp-файлов
```

---

### 2.3 NLU-парсер тренировки

```prompt
Реализуй NLU-парсер (извлечение структурированных данных из текста тренировки) для FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаг 2.2 выполнен.
Контекст: docs/architecture/design/SYSTEM_DESIGN.md — раздел 3.2 «NLU / Парсинг тренировки» (подход LLM + structured output, типы ParsedWorkout/ParsedExercise/ParsedSet/ParsedComment, промпт, механика уточнений, JSON-схема).

Задачи:
1. **Типы** (src/nlu/nlu.types.ts) — ТОЧНО по docs/architecture/design/SYSTEM_DESIGN.md раздел 3.2:
   - ParsedWorkout { date, focus: WorkoutFocus[], location: WorkoutLocation, exercises: ParsedExercise[], comments: ParsedComment[] }
   - ParsedExercise { name, canonical_name?, sets: ParsedSet[], is_ambiguous, possible_matches? }
   - ParsedSet { reps, weight?, unit?: 'kg'|'lb' }
   - ParsedComment { type: 'technique'|'sensation'|'asymmetry'|'other', exercise_ref?, body_part?, side?: 'left'|'right'|'both', sensation_type?: 'pain'|'tension'|'burn', raw_text }
2. **Zod-схема** (src/nlu/nlu.schema.ts): валидация JSON-ответа от GPT по этим типам. Строгая валидация: unknown fields strip, required fields check.
3. **Промпт** (src/nlu/prompts/workout-parse.prompt.ts):
   - Системный промпт: формат JSON, допустимые значения focus (legs, glutes, back, chest, shoulders, arms, core, cardio), location, comment types.
   - Функция buildParsePrompt(rawText, knownExercises) — принимает текст и список известных упражнений, возвращает messages[] для OpenAI.
   - Инструкция: помечать is_ambiguous=true и possible_matches при неоднозначных упражнениях.
4. **Парсер** (src/nlu/workout-parser.ts): class WorkoutParser.
   - Метод parse(rawText, knownExercises): вызов OpenAI GPT (gpt-4o-mini), response_format: { type: 'json_object' }, temperature: 0.
   - Валидация через Zod-схему.
   - При невалидном ответе — NluParseError.
   - Логирование: время парсинга, количество упражнений, есть ли неоднозначности.
5. **Тесты** (src/**/__tests__/nlu/): мок OpenAI, 3 fixture-ответа: валидный (все упражнения распознаны), с неоднозначностями (is_ambiguous=true), невалидный JSON.

Ограничения:
- НЕ реализовывать disambiguation flow (inline-кнопки) — это шаг 4.1.
- НЕ обращаться к БД — парсер принимает список упражнений как аргумент.

Acceptance criteria:
- [ ] `npm run lint` без ошибок
- [ ] `npm test` — все 3 тест-кейса проходят
- [ ] Типы ParsedWorkout/ParsedExercise/ParsedSet/ParsedComment соответствуют SYSTEM_DESIGN
- [ ] Zod-схема валидирует корректный и отклоняет некорректный ответ
- [ ] TSDoc на русском
```

---

## Этап 3: Бизнес-логика

### 3.1 Сервис упражнений (Exercise Registry)

```prompt
Реализуй сервис управления упражнениями, синонимами и уточнениями для FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаги 1.5 (Prisma-схема с моделями Exercise, ExerciseSynonym, UserExerciseMapping), 1.6 (инфраструктурный слой).
Контекст: docs/architecture/design/SYSTEM_DESIGN.md — раздел 7 «Управление упражнениями и синонимами» (блок-схема алгоритма резолвинга, двухуровневый справочник, механика disambiguation).

Задачи:
1. **Repository** (src/repositories/exercise.repository.ts):
   - findSynonyms(text, userId?) — поиск в exercise_synonyms по LOWER(synonym), сначала user-specific, потом глобальные.
   - findUserMapping(userId, inputText) — поиск в user_exercise_mappings по LOWER(input_text).
   - upsertUserMapping(userId, inputText, exerciseId) — create или increment use_count.
   - getAll() — полный список exercises с display_name_ru для NLU-промпта.
   - findById(id), create(data).
2. **Service** (src/services/exercise.service.ts):
   - resolveExercise(inputText, userId) → { status: 'resolved', exercise } | { status: 'ambiguous', options[] } | { status: 'not_found' }. Алгоритм ТОЧНО по блок-схеме SYSTEM_DESIGN раздел 7: user_mapping → synonym(user) → synonym(global) → NOT FOUND.
   - confirmMapping(userId, inputText, exerciseId) — сохраняет выбор пользователя.
   - getExerciseListForNlu() — список для NLU-промпта { canonical_name, display_name_ru }.
3. **Типы** (src/services/exercise.types.ts): ResolveResult с discriminated union.
4. **Тесты** (src/**/__tests__/services/exercise.service.test.ts): все 3 ветки resolveExercise + confirmMapping + getExerciseListForNlu. Мок repository.

Ограничения:
- НЕ реализовывать fuzzy/Levenshtein поиск на MVP — только exact match LOWER.
- НЕ реализовывать inline-кнопки — это шаг 4.1.

Acceptance criteria:
- [ ] `npm run lint && npm test` — без ошибок
- [ ] resolveExercise покрывает все 3 ветки (resolved/ambiguous/not_found)
- [ ] TSDoc на русском
```

---

### 3.2 Сервис тренировок (Workout Service)

```prompt
Реализуй сервис тренировок (CRUD, draft-flow) для FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаг 3.1 (ExerciseService для резолвинга упражнений).
Контекст: docs/business/general.md — Сценарий 1. docs/architecture/design/SYSTEM_DESIGN.md — раздел 2 «Data Flow» (sequence diagram), раздел 6 «Workflow Draft -> Approve» (хранение черновика, message IDs).

Задачи:
1. **Repository** (src/repositories/workout.repository.ts):
   - create(data) — Prisma nested create: workout + workout_exercises + exercise_sets + workout_comments в одной транзакции.
   - findById(id) — с include: workout_exercises → exercise → sets, comments.
   - findByUserAndDate(userId, date) — поиск тренировки пользователя за указанную дату.
   - updateStatus(id, status) — DRAFT → APPROVED / CANCELLED.
   - updateMessageIds(id, { sourceMessageId, previewMessageId, publishedMessageId }).
   - deleteById(id).
   - replaceExercises(workoutId, exercises) — транзакция: удалить старые → вставить новые.
2. **Service** (src/services/workout.service.ts):
   - createDraft(userId, parsedWorkout: ParsedWorkout) → { status: 'created', workout } | { status: 'needs_disambiguation', ambiguousExercises[] }. Использует ExerciseService.resolveExercise для каждого упражнения.
   - approveDraft(workoutId) → обновить статус на APPROVED.
   - cancelDraft(workoutId) → удалить из БД.
   - getDraftForUser(userId) → текущий draft (если есть).
   - findByDate(userId, date) → для /edit.
   - applyEdits(workoutId, parsedDelta) → обновить тренировку.
3. **Тесты** (src/**/__tests__/services/workout.service.test.ts): createDraft (оба сценария), approveDraft, cancelDraft, findByDate. Мок repository + exerciseService.

Ограничения:
- НЕ реализовывать conversation/inline-кнопки — только бизнес-логику.
- У пользователя может быть ТОЛЬКО ОДИН активный draft одновременно.

Acceptance criteria:
- [ ] `npm run lint && npm test` — без ошибок
- [ ] createDraft корректно резолвит упражнения и создаёт вложенные записи
- [ ] TSDoc на русском
```

---

### 3.3 Сервис пользователей

```prompt
Реализуй сервис пользователей для FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаги 1.5 (Prisma-схема), 2.1 (auth middleware использует Prisma напрямую — нужен рефакторинг).
Контекст: docs/architecture/design/SYSTEM_DESIGN.md — раздел 5 «Авторизация и модель пользователей» (паттерн auto-register, таблицы users + auth_providers).

Задачи:
1. **Repository** (src/repositories/user.repository.ts):
   - findById(id).
   - findByTelegramId(telegramId) — через JOIN auth_providers WHERE provider='telegram' AND provider_user_id=telegramId.
   - createWithTelegram(telegramId, username?, firstName?) — транзакция: INSERT users + INSERT auth_providers.
2. **Service** (src/services/user.service.ts):
   - getOrCreateByTelegram(telegramId, username?, firstName?) — findByTelegramId → если нет, createWithTelegram. Логирование создания нового пользователя (info).
3. **Рефакторинг** src/bot/middleware/authMiddleware.ts: заменить прямые Prisma-запросы на вызов UserService.getOrCreateByTelegram.
4. **Тесты** (src/**/__tests__/services/user.service.test.ts): новый пользователь создаётся, существующий находится.

Acceptance criteria:
- [ ] `npm run lint && npm test` — без ошибок
- [ ] auth middleware использует UserService
- [ ] При первом сообщении боту создаётся User + AuthProvider
- [ ] TSDoc на русском
```

---

## Этап 4: Интеграция — полный flow

### 4.1 Полный flow новой тренировки

```prompt
Реализуй полный conversation flow «Новая тренировка» для FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаги 2.1–2.3 (бот, STT, NLU), 3.1–3.3 (сервисы).
Контекст: docs/business/general.md — Сценарий 1 (превью, workflow). docs/architecture/design/SYSTEM_DESIGN.md — раздел 2 (sequence diagram), раздел 6 (FSM stateDiagram, inline-кнопки).

Это главный и самый сложный модуль бота — он связывает ВСЕ предыдущие сервисы в единый flow.

Задачи:
1. **Conversation** (src/bot/conversations/newWorkout.ts): @grammyjs/conversations. Flow по sequence diagram из SYSTEM_DESIGN:
   - Получить текст: если voice → STT → текст, если text → напрямую.
   - NLU: WorkoutParser.parse(text, exerciseListForNlu).
   - Disambiguation: если есть is_ambiguous упражнения → показать inline-кнопки (по SYSTEM_DESIGN раздел 3.2 «Механика уточнений») → ExerciseService.confirmMapping → повторить парсинг.
   - Создать draft через WorkoutService.createDraft.
   - Показать превью (через Formatter) + клавиатура [✅ Approve] [✏️ Edit] [❌ Cancel].
   - Обработка кнопок:
     * ✅ Approve → WorkoutService.approveDraft → Publisher.publish → bot.api.deleteMessage(sourceVoiceMsg) → «✅ Тренировка опубликована!»
     * ✏️ Edit → запросить правки (текст/голос) → STT/NLU → WorkoutService.applyEdits → показать обновлённое превью → повтор
     * ❌ Cancel → WorkoutService.cancelDraft → bot.api.deleteMessage(sourceVoiceMsg) → «Тренировка отменена»
2. **Formatter** (src/bot/formatters/workoutFormatter.ts):
   - formatPreview(workout) → HTML-строка для превью (формат ТОЧНО из SYSTEM_DESIGN раздел 6: «📅 21.02.2026 | 🏠 Alushta Home / 🎯 Legs, Glutes / 1️⃣ Back Squat • 4 × 12 @ 40 кг»).
   - formatPublish(workout) → HTML-строка для публикации в канал.
3. **Клавиатуры** (src/bot/keyboards/):
   - workoutPreview.ts: approve/edit/cancel с callback_data = `approve:{id}`, `edit:{id}`, `cancel:{id}`.
   - exercisePicker.ts: варианты при disambiguation + «➕ Создать новое».
4. **Publisher** (src/services/publisher.service.ts): bot.api.sendMessage(PUBLISH_CHAT_ID, formattedText, { parse_mode: 'HTML' }), вернуть message_id → сохранить в workout.published_message_id.
5. **Подключение**: voice handler и text handler запускают conversation newWorkout.
6. **Тесты** (src/**/__tests__/bot/): formatter (snapshot-тесты превью), publisher (мок bot.api.sendMessage).

Ограничения:
- НЕ реализовывать /edit (редактирование по дате) — это шаг 4.2.
- При ошибках STT/NLU — показывать user-friendly сообщения по SYSTEM_DESIGN раздел 2 «Обработка ошибок в потоке».

Acceptance criteria:
- [ ] `npm run lint && npm test` — без ошибок
- [ ] Formatter генерирует HTML-превью в формате из SYSTEM_DESIGN
- [ ] Publisher отправляет в PUBLISH_CHAT_ID
- [ ] TSDoc на русском
```

---

### 4.2 Редактирование тренировки по дате

```prompt
Реализуй редактирование существующей тренировки по дате для FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаг 4.1 (основной flow, formatter, клавиатуры).
Контекст: docs/business/general.md — Сценарий 3 «Редактирование тренировки по дате». docs/architecture/design/SYSTEM_DESIGN.md — раздел 6 (FSM stateDiagram, состояние EditingByDate).

Задачи:
1. **Conversation** (src/bot/conversations/editWorkout.ts): flow:
   - Получить дату (из /edit <дата>, текста «отредактируй за 19 февраля», или голосового).
   - WorkoutService.findByDate(userId, parsedDate) → если не найдено, сообщить пользователю.
   - Показать текущее превью через Formatter.
   - Получить правки (текст/голос → STT → NLU).
   - NLU парсит как ДЕЛЬТУ (добавить/удалить/изменить упражнения), НЕ как полную тренировку.
   - WorkoutService.applyEdits → обновлённое превью + [✅ Approve] [❌ Cancel].
2. **Промпт для дельты** (src/nlu/prompts/workout-edit.prompt.ts): отдельный промпт для GPT — принимает текущую тренировку + текст правок, возвращает дельту { add?, remove?, update? }.
3. **Команда /edit** (src/bot/handlers/commandHandlers.ts): зарегистрировать /edit → запуск editWorkout conversation.
4. **Text handler**: распознавание паттерна «отредактируй/измени тренировку за...» → запуск editWorkout.
5. **Тесты**: парсинг дат из текста, formatter.

Ограничения:
- Дельта-промпт ОБЯЗАТЕЛЬНО получает текущее состояние тренировки как контекст.

Acceptance criteria:
- [ ] `npm run lint && npm test` — без ошибок
- [ ] /edit <дата> находит тренировку и показывает превью
- [ ] Дельта-промпт корректно обрабатывает «замени вес в приседе на 45 кг»
- [ ] TSDoc на русском
```

---

## Этап 5: Финализация MVP

### 5.1 Edge cases и UX

```prompt
Обработай все edge cases и отшлифуй UX для FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаги 4.1, 4.2 (полный flow).
Контекст: docs/architecture/design/SYSTEM_DESIGN.md — раздел 2 «Обработка ошибок в потоке» (mermaid-диаграмма: ошибки скачивания → STT → NLU → частичный результат), раздел 10 «Обработка ошибок» (стратегии: sttError, nluError, dbError).

Задачи:
1. **Edge cases** (по mermaid из SYSTEM_DESIGN раздел 2):
   - Ошибка скачивания файла → «⚠️ Не смог скачать файл, попробуй ещё раз».
   - Пустой результат STT → «⚠️ Не удалось распознать слова, попробуй снова».
   - Ошибка NLU → показать raw text и предложить текстовый ввод.
   - Частичный результат NLU → показать что распознано + попросить уточнить.
2. **Параллельные голосовые**: если пользователь шлёт новое голосовое, пока обрабатывается предыдущее → поставить в очередь или отклонить с сообщением.
3. **Устаревшие кнопки**: при нажатии на кнопку уже обработанного/удалённого draft → answerCallbackQuery с «Тренировка уже обработана».
4. **Ошибки удаления сообщений**: try/catch на bot.api.deleteMessage (бот может не иметь прав).
5. **Typing indicator**: sendChatAction('typing') каждые 5 секунд во время STT и NLU.
6. **Graceful shutdown**: bot.stop() → дождаться текущих handlers → disconnectRedis → disconnectDatabase.

Ограничения:
- НЕ добавлять новые фичи — только hardening существующего кода.

Acceptance criteria:
- [ ] `npm run lint && npm test` — без ошибок
- [ ] Все ошибки из mermaid-диаграммы SYSTEM_DESIGN обрабатываются
- [ ] Устаревшие кнопки не вызывают crash
```

---

### 5.2 Docker + CI/CD + README

```prompt
Подготовь Docker-образ, CI/CD и документацию для FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаг 5.1 выполнен.
Контекст: docs/architecture/design/SYSTEM_DESIGN.md — раздел 11 «Docker Compose (dev)», «CI/CD (базовый)», «Структура проекта».

Задачи:
1. **Dockerfile** (multi-stage):
   - Stage build: node:20-alpine, npm ci, npx prisma generate, tsc.
   - Stage production: node:20-alpine, установить ffmpeg (apk add ffmpeg), копировать dist + node_modules + prisma, CMD node dist/index.js.
2. **docker-compose.yml**: добавить сервис bot (build: ., env_file: .env, depends_on: postgres (healthy) + redis (healthy), restart: unless-stopped, volumes: ./src:/app/src для dev).
3. **GitHub Actions CI** (.github/workflows/ci.yml): на push main и PR → lint → test → build (tsc) → docker build.
4. Документация: перенести/структурировать всю проектную документацию в папку docs/ (включая ADR в docs/architecture/decisions/ и BDR в docs/business/decisions/).
5. **README.md**: описание проекта, prerequisites (Node 20, Docker, ffmpeg), установка (npm ci, docker compose up, prisma migrate, prisma seed), запуск (npm run dev), переменные окружения (таблица), команды бота (/start, /help, /cancel, /edit), стек.

Acceptance criteria:
- [ ] `docker build -t fitbot .` — собирается без ошибок
- [ ] `docker compose up -d` — все 3 сервиса healthy
- [ ] CI pipeline проходит на GitHub Actions
- [ ] README содержит все разделы
```

---

### 5.3 Интеграционные тесты

```prompt
Создай интеграционные тесты для ключевых flow FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаги 5.1–5.2 выполнены.

Задачи:
1. **Тестовое окружение**:
   - jest.integration.config.ts: отдельный конфиг, testMatch: tests/integration.
   - globalSetup: применить миграции на тестовую БД (DATABASE_URL из .env.test).
   - globalTeardown: очистить тестовую БД.
   - beforeEach: очистить таблицы (TRUNCATE CASCADE).
2. **Тесты workout flow** (tests/integration/workout.flow.test.ts):
   - Создать user → createDraft → approve → проверить status=APPROVED в БД, проверить вложенные exercises/sets записаны.
   - Создать user → createDraft → cancel → проверить что workout удалён из БД.
3. **Тесты exercise resolve** (tests/integration/exercise.resolve.test.ts):
   - Точное совпадение синонима → resolved.
   - 2+ совпадения → ambiguous.
   - confirmMapping → повторный resolve → resolved (использует user_mapping).
4. **Тесты user auth** (tests/integration/user.auth.test.ts):
   - getOrCreateByTelegram (новый) → User + AuthProvider созданы.
   - getOrCreateByTelegram (повторный) → тот же user.id.
5. npm-скрипт: test:integration (jest --config jest.integration.config.ts).

Acceptance criteria:
- [ ] `npm run test:integration` — все тесты проходят
- [ ] Тесты используют реальную БД (PostgreSQL в Docker)
- [ ] Каждый тест изолирован (TRUNCATE перед каждым)
```

---

## Этап 6: Развертывание и тестирование в бою

### 6.1 Настройка VPS и Docker Production

```prompt
Подготовь Docker Compose для production-окружения FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: этап 5 выполнен.
Контекст: docs/infrastructure/DEPLOYMENT.md.

Задачи:
1. Создай файл `docker-compose.prod.yml` на основе `docker-compose.yml`, но оптимизированный для production (например, restart: always для сервисов, проброс портов только по необходимости, healthchecks).
2. Создай базовый `deploy.sh` скрипт, который пуллит изменения, собирает образы и делает `docker compose up -d`.
3. Убедись, что .env.example отражает все production переменные.

Acceptance criteria:
- [ ] `docker-compose.prod.yml` существует и содержит 3 сервиса: bot, postgres, redis.
- [ ] `deploy.sh` существует и имеет права на выполнение.
```

---

## Этап 7: Подготовка к будущему (опционально)

### 7.1 REST API для мобильного приложения

```prompt
Создай REST API на Fastify для FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: этапы 1–5 выполнены (MVP бот работает).
Контекст: docs/architecture/design/SYSTEM_DESIGN.md — раздел 8 «Масштабирование» (как бот и приложение делят базу — вариант 1: общие сервисы).

Задачи:
1. Установить fastify, @fastify/cors, @fastify/helmet, @fastify/swagger.
2. Fastify-сервер (src/api/server.ts): pino-логгер (общий с ботом), cors, helmet.
3. CRUD-роуты:
   - /api/workouts: GET list (userId, date range), GET :id, POST create, PUT :id, DELETE :id, POST :id/approve.
   - /api/exercises: GET list (search?), POST create.
4. Переиспользовать WorkoutService и ExerciseService (общие сервисы с ботом).
5. Zod-валидация request body и query params.
6. Запуск по флагу ENABLE_API=true в env.ts (добавить в Zod-схему).
7. Тесты: route handlers с мок сервисами.

Acceptance criteria:
- [ ] `npm run lint && npm test` — без ошибок
- [ ] API запускается при ENABLE_API=true
- [ ] Swagger документация доступна на /docs
```

---

### 7.2 JWT-авторизация

```prompt
Добавь JWT-авторизацию для REST API в FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаг 6.1 (REST API).
Контекст: docs/business/general.md — Сценарий 4 (Привязка Telegram). docs/architecture/design/SYSTEM_DESIGN.md — раздел 5 «JWT для приложения» (access/refresh tokens).

Задачи:
1. Установить jsonwebtoken, bcrypt, @types/jsonwebtoken, @types/bcrypt.
2. **JWT Service** (src/services/jwt.service.ts): generateAccessToken(userId) — 15 мин, generateRefreshToken(userId) — 7 дней, verifyToken(token). Секрет из env (JWT_SECRET — добавить в Zod-схему).
3. **Auth routes** (src/api/routes/auth.routes.ts): POST /auth/register (email+password → hash → create user + auth_provider), POST /auth/login, POST /auth/refresh.
4. **Link Telegram** (src/api/routes/auth.routes.ts): POST /auth/link-telegram → генерирует одноразовый 6-символьный код, сохраняет в Redis (TTL 10 мин). Команда бота /link <code> — находит код в Redis → привязывает telegram auth_provider к user_id.
5. **Auth middleware для Fastify** (src/api/middleware/jwtMiddleware.ts): проверка Authorization: Bearer, декодирование → req.userId.
6. Тесты: JWT service, auth routes (мок), /link flow.

Acceptance criteria:
- [ ] `npm run lint && npm test` — без ошибок
- [ ] Регистрация → логин → получение токена → доступ к /api/workouts
- [ ] /link связывает Telegram с аккаунтом приложения
```

---

### 7.3 Аналитика

```prompt
Создай базовый модуль аналитики для FitBot в /Users/elizavetagolubenko/Projects/fit-tel-bot.

Зависимости: шаги 6.1–6.2 (REST API с авторизацией).
Контекст: docs/architecture/design/SYSTEM_DESIGN.md — раздел «Итого: дорожная карта» (v3: аналитика).

Задачи:
1. **Analytics Service** (src/services/analytics.service.ts):
   - getExerciseProgress(userId, exerciseId, period) → [{date, maxWeight, totalVolume}] — SQL: GROUP BY workout_date, MAX(weight), SUM(reps * weight).
   - getMuscleGroupVolume(userId, period) → [{muscleGroup, totalSets, totalVolume}].
   - getTrainingFrequency(userId, period) → {totalWorkouts, avgPerWeek}.
   - getAsymmetryReport(userId) → комментарии с side='left'|'right', сгруппированные по body_part.
2. SQL через Prisma $queryRaw (GROUP BY, оконные функции, агрегаты).
3. **Команды бота** (src/bot/handlers/analyticsHandlers.ts): /stats (сводка за месяц), /progress <упражнение> (график текстом: «Присед: 40кг → 45кг → 50кг»).
4. **API routes** (src/api/routes/analytics.routes.ts): GET /api/analytics/progress?exerciseId=&period=, GET /api/analytics/volume?period=.
5. Тесты: analyticsService с fixture-данными.

Acceptance criteria:
- [ ] `npm run lint && npm test` — без ошибок
- [ ] /stats показывает корректную сводку
- [ ] API-роуты возвращают данные в формате JSON
```
