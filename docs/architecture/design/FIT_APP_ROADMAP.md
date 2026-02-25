# 🗺️ FitApp — Дорожная карта мобильного приложения

> **Как читать этот документ:**
>
> - 🧑‍💼 **Для менеджера** — бизнес-ценность, что получит пользователь, метрики успеха
> - 🧑‍💻 **Для разработчика** — технические детали, зависимости, acceptance criteria
> - 🤖 **Промпт для AI-агента** — готовый промпт, копируй и отправляй агенту

**Контекст системного дизайна:** [FIT_APP_SYSTEM_DESIGN.md](./FIT_APP_SYSTEM_DESIGN.md)
**Бизнес-требования:** [FIT_APP_BUSINESS_REQUIREMENTS.md](../../../FIT_APP_BUSINESS_REQUIREMENTS.md)
**Текущий ROADMAP бота:** [ROADMAP.md](../../../ROADMAP.md) (Этапы 1–6 выполнены, Этап 7 — не выполнен)

> [!IMPORTANT]
> **Стартовая точка**: Этап 7 из `ROADMAP.md` (REST API, JWT, Analytics) **не реализован**.
> Фаза 0 данного roadmap = Этап 7 из ROADMAP.md бота. Без неё мобильное приложение невозможно.

---

## Обзор фаз

| Фаза  | Название            | Бизнес-результат               | Продолжительность (оценка) |
| ----- | ------------------- | ------------------------------ | -------------------------- |
| **0** | API-фундамент       | Бэкенд готов для приложения    | 2–3 недели                 |
| **1** | App MVP             | Приложение в App Store         | 6–8 недель                 |
| **2** | Голос + Уведомления | Hands-free тренировки          | 4–6 недель                 |
| **3** | AI-тренер           | Персонализация и соперничество | 8–12 недель                |
| **4** | Анализ техники      | Камера как тренер              | 12+ недель                 |

---

## Фаза 0: API-фундамент (Этап 7 ROADMAP.md)

### 0.1 Монорепозиторий и Fastify REST API

---

#### 🧑‍💼 Для менеджера

**Что происходит**: Мы переструктурируем код так, чтобы и бот, и будущее приложение работали с одной базой данных через общий «бэкенд-сервер». Это фундамент — без него приложение нельзя начинать.

**Что пользователь увидит**: Ничего. Бот продолжает работать как прежде.

**Риск, если пропустить**: Приложение не сможет получить данные тренировок пользователя — они будут изолированы в боте.

**Метрика успеха**: Бот работает без изменений, новый API-сервер отвечает на тестовые запросы.

---

#### 🧑‍💻 Для разработчика

**Зависимости**: Этапы 1–6 ROADMAP.md выполнены.

**Задачи**:

1. Перевести репозиторий в **pnpm workspaces** монорепозиторий:
   - `apps/bot` — текущий код бота (перенести без изменений)
   - `apps/api` — новый Fastify сервис
   - `packages/shared-types` — TypeScript типы из `src/nlu/nlu.types.ts`, `src/services/*.ts`
2. Создать `apps/api` — Fastify v5 сервер:
   - Установить: `fastify`, `@fastify/cors`, `@fastify/helmet`, `@fastify/swagger`, `@fastify/multipart`
   - Настроить pino-логгер (общий с ботом)
   - Подключить к той же PostgreSQL (Supabase) и Redis
3. Перенести сервисы из `apps/bot/src/services/` в `apps/api/src/services/` (или `packages/shared-types` — common code)
4. Реализовать CRUD роуты:
   - `GET/POST /api/v1/workouts`, `GET/PUT/DELETE /api/v1/workouts/:id`
   - `POST /api/v1/workouts/:id/approve`, `/cancel`
   - `GET/POST /api/v1/exercises`
   - `GET /api/v1/exercises/suggestions` (для NLU бота)
5. Адаптировать бот: заменить прямые вызовы `WorkoutService` на HTTP-вызовы к API (через `axios` или `fetch`)
6. Добавить HTTP-роуты для STT и NLU: `POST /api/v1/stt/transcribe`, `POST /api/v1/nlu/parse`, `POST /api/v1/nlu/parse-delta`
7. Тесты: route handlers с мок-сервисами (jest + jest-mock-extended)
8. Обновить `docker-compose.prod.yml`: добавить сервис `api`

**Acceptance criteria**:

- [ ] `pnpm lint && pnpm test` — проходит во всех workspace
- [ ] `GET /api/v1/workouts` возвращает тренировки (с валидным JWT)
- [ ] Бот по-прежнему работает и создаёт тренировки (через HTTP API)
- [ ] Swagger доступен на `/docs`

---

#### 🤖 Промпт для AI-агента

```prompt
Реализуй Этап 7.1 из ROADMAP.md (REST API) и переведи проект в монорепозиторий.

Контекст:
- Проект: /Users/elizavetagolubenko/Projects/fit-tel-bot
- Архитектура: docs/architecture/design/FIT_APP_SYSTEM_DESIGN.md (раздел 2, 3, 5)
- Этапы 1–6 ROADMAP.md выполнены. Сервисы WorkoutService, ExerciseService, UserService, STT, NLU реализованы в src/services/ и src/stt/, src/nlu/
- БД: PostgreSQL (Supabase), Redis (Яндекс Облако) — конфиг в src/config/

Задачи:
1. Настроить pnpm workspaces в корне: apps/bot (текущий код), apps/api (новый), packages/shared-types
2. Перенести TypeScript-типы (ParsedWorkout, Exercise, User, WorkoutService интерфейсы) в packages/shared-types/src/index.ts
3. Создать apps/api:
   - npm init, tsconfig.json (extends ../../packages/shared-config/tsconfig.base.json)
   - Установить: fastify@5, @fastify/cors, @fastify/helmet, @fastify/swagger, @fastify/multipart, pino
   - src/server.ts: Fastify instance с pino-логгером
   - src/routes/workouts.routes.ts: GET /, POST /, GET /:id, PUT /:id, DELETE /:id, POST /:id/approve, POST /:id/cancel
   - src/routes/exercises.routes.ts: GET / (с фильтрами), POST /, GET /suggestions
   - src/routes/stt.routes.ts: POST /transcribe (multipart, аудио → текст)
   - src/routes/nlu.routes.ts: POST /parse, POST /parse-delta, POST /parse-voice-command
   - Переиспользовать WorkoutService, ExerciseService из apps/bot (или вынести в packages/shared-services)
4. Адаптировать apps/bot: заменить прямые вызовы сервисов на HTTP-вызовы к apps/api (http://localhost:3001)
5. docker-compose.prod.yml: добавить сервис api (порт 3001)
6. Тесты к каждому route handler (jest + jest-mock-extended, мокируем сервисы)
7. TSDoc на русском к публичным методам

Ограничения:
- НЕ реализовывать JWT — это следующий шаг (0.2)
- Временно все эндпоинты без авторизации (добавим middleware в 0.2)
- Бот должен продолжать работать идентично

Acceptance criteria:
- [ ] pnpm lint && pnpm test — проходит в apps/bot и apps/api
- [ ] GET /api/v1/workouts — возвращает 200 (без auth пока)
- [ ] POST /api/v1/stt/transcribe — принимает аудио, возвращает текст
- [ ] Swagger на /docs показывает все роуты
- [ ] Бот создаёт тренировки через HTTP API, а не напрямую
```

---

### 0.2 JWT-авторизация

---

#### 🧑‍💼 Для менеджера

**Что происходит**: Добавляем систему «ключей доступа» для мобильного приложения. Каждый пользователь получает токен при входе — он подтверждает личность при каждом запросе. Без этого любой мог бы получить чужие тренировки.

**Что пользователь увидит в боте**: Ничего — бот работает как прежде.

**Метрика успеха**: Регистрация через email и вход через Telegram работают, токены корректно выдаются и обновляются.

---

#### 🧑‍💻 Для разработчика

**Зависимости**: Шаг 0.1 выполнен.

**Задачи**:

1. Установить: `jsonwebtoken`, `bcrypt`, `@types/jsonwebtoken`, `@types/bcrypt`
2. `src/services/jwt.service.ts`: генерация RS256 access (15 мин) и refresh (30 дней) токенов, верификация
3. `src/routes/auth.routes.ts`:
   - `POST /auth/register` — email + password → hash → create User + AuthProvider
   - `POST /auth/login` — email + password → JWT пара
   - `POST /auth/refresh` — refresh token → новый access token
   - `POST /auth/oauth/telegram` — Telegram Login Widget hash verification → JWT пара
   - `POST /auth/link/generate-code` — генерирует 6-символьный код, сохраняет в Redis (TTL 600 сек)
   - `DELETE /auth/logout` — удалить refresh token из Redis
4. `src/middleware/jwtMiddleware.ts` — Fastify preHandler: проверка `Authorization: Bearer`, `req.userId`
5. Подключить middleware ко всем роутам из 0.1 (кроме `/auth/*`)
6. Добавить в `apps/bot`: команда `/link <code>` — читает код из Redis → привязывает Telegram к userId
7. Тесты: jwt.service (генерация, верификация, истёкший), auth routes (мок UserService)

**Acceptance criteria**:

- [ ] `POST /auth/register` + `POST /auth/login` → получение токенов
- [ ] `GET /api/v1/workouts` без токена → 401
- [ ] `POST /auth/oauth/telegram` валидирует hash по HMAC-SHA256(BOT_TOKEN)
- [ ] `/link ABC-123` в боте привязывает Telegram к аккаунту приложения

---

#### 🤖 Промпт для AI-агента

```prompt
Реализуй Этап 7.2 из ROADMAP.md (JWT-авторизация) для FitApp API.

Контекст:
- Проект: /Users/elizavetagolubenko/Projects/fit-tel-bot (монорепозиторий после шага 0.1)
- Архитектура: docs/architecture/design/FIT_APP_SYSTEM_DESIGN.md (раздел 6 «Авторизация»)
- apps/api уже создан (шаг 0.1), JWT ещё не добавлен

Задачи в apps/api:
1. Установить jsonwebtoken, bcrypt, @types/jsonwebtoken, @types/bcrypt
2. Сгенерировать RS256 ключевую пару (добавить скрипт scripts/generate-keys.ts)
3. JWT_PRIVATE_KEY, JWT_PUBLIC_KEY добавить в Zod-схему конфига (apps/api/src/config/env.ts)
4. src/services/jwt.service.ts:
   - generateTokenPair(userId: string): {accessToken, refreshToken}
   - verifyAccessToken(token: string): {userId: string}
   - Сохранять refresh token в Redis с ключом refresh:{userId}:{tokenId} (TTL 30 дней)
5. src/routes/auth.routes.ts:
   - POST /api/v1/auth/register — email + password → bcrypt hash → UserService.create → JWT пара
   - POST /api/v1/auth/login — проверить hash → JWT пара
   - POST /api/v1/auth/refresh — достать из Redis → ротация (старый удалить, новый сохранить)
   - POST /api/v1/auth/oauth/telegram — HMAC проверка hash → UserService.getOrCreateByTelegram → JWT пара
   - POST /api/v1/auth/link/generate-code — сохранить {code → userId} в Redis (TTL 600s)
   - DELETE /api/v1/auth/logout — удалить refresh token из Redis
6. src/middleware/jwtMiddleware.ts — Fastify preHandler: парсит Bearer, verifyAccessToken → req.userId
7. Подключить jwtMiddleware ко всем роутам (workouts, exercises, stt, nlu, users) через fastify.addHook('preHandler')
8. В apps/bot/src/bot/handlers/commandHandlers.ts добавить /link <code>:
   - Читает Redis: GET linkcode:{code}
   - Через HTTP POST /api/v1/auth/link/confirm {code, telegramId}
   - Ответ пользователю: "✅ Telegram привязан"
9. Тесты (apps/api/src/**/__tests__/):
   - jwt.service.test.ts: generateTokenPair, verifyAccessToken (валидный, истёкший, невалидная подпись)
   - auth.routes.test.ts: register, login, refresh, oauth/telegram (мок UserService, мок Redis)

Ограничения:
- Хранить private/public ключи в .env (base64-encoded PEM), НЕ в файлах
- Проверять auth_date в Telegram OAuth (не старее 86400 секунд)
- Тест НЕ должен обращаться к реальному Redis или БД

Acceptance criteria:
- [ ] pnpm lint && pnpm test — все тесты зелёные
- [ ] POST /auth/register → 201 + {accessToken, refreshToken}
- [ ] GET /workouts без токена → 401 Unauthorized
- [ ] GET /workouts с валидным токеном → 200 + данные
- [ ] /link ABC-123 привязывает Telegram-аккаунт, повторный /link → ошибка «код уже использован»
```

---

### 0.3 Analytics API

---

#### 🧑‍💼 Для менеджера

**Что происходит**: Добавляем «умную статистику» — система начинает считать личные рекорды, прогресс и частоту тренировок. Это основа для экранов аналитики в приложении.

**Что пользователь увидит в боте**: Команды `/stats` и `/progress <упражнение>`.

**Метрика успеха**: Команда `/stats` в боте показывает корректную сводку за месяц.

---

#### 🧑‍💻 Для разработчика

**Зависимости**: Шаг 0.2 выполнен.

**Задачи**:

1. Миграция Prisma: новые таблицы `personal_records`, `streaks`
2. `src/services/analytics.service.ts`:
   - `getExerciseProgress(userId, exerciseId, period)` → `[{date, maxWeight, volume}]` (GROUP BY date, MAX/SUM через Prisma `$queryRaw`)
   - `getMuscleGroupVolume(userId, period)` → `[{muscleGroup, totalSets, totalVolume}]`
   - `getTrainingFrequency(userId, period)` → `{totalWorkouts, avgPerWeek}`
   - `findPersonalRecords(userId)` → все PR из `personal_records`
   - `detectAndSavePR(workoutId)` — вызывается после approve, ищет новые рекорды, сохраняет в `personal_records`
3. `src/routes/analytics.routes.ts`: GET `/progress/:exerciseId`, `/volume`, `/frequency`, `/personal-records`
4. В WorkoutService hook: после `approveDraft` → вызвать `analyticsService.detectAndSavePR(workoutId)`
5. В apps/bot: `src/bot/handlers/analyticsHandlers.ts` — `/stats`, `/progress <упражнение>`
6. Тесты: analyticsService с fixture-данными (мок Prisma `$queryRaw`)

**Acceptance criteria**:

- [ ] `GET /api/v1/analytics/personal-records` → список PR
- [ ] После approve тренировки — PR автоматически обнаруживается и сохраняется
- [ ] `/stats` в боте показывает корректные данные

---

#### 🤖 Промпт для AI-агента

```prompt
Реализуй Этап 7.3 из ROADMAP.md (Analytics) для FitApp.

Контекст:
- Проект: /Users/elizavetagolubenko/Projects/fit-tel-bot (монорепозиторий после шагов 0.1–0.2)
- Архитектура: docs/architecture/design/FIT_APP_SYSTEM_DESIGN.md (раздел 4 «personal_records», раздел 5 «/analytics роуты»)
- Призма схема: apps/bot/prisma/schema.prisma (или общая после рефакторинга)
- WorkoutService.approveDraft уже реализован

Задачи:
1. Prisma миграция — добавить модели:
   PersonalRecord (id uuid, user_id FK, exercise_id FK, weight_kg Decimal, reps Int, e1rm Decimal, achieved_in_workout_id FK, achieved_at DateTime)
   Streak (id uuid, user_id FK, current_streak Int, longest_streak Int, last_workout_date Date, shield_count Int, updated_at DateTime)
2. apps/api/src/services/analytics.service.ts:
   - getExerciseProgress(userId, exerciseId, period: '1m'|'3m'|'6m'|'1y'): [{date, maxWeight, totalVolume}]
     Реализовать через Prisma $queryRaw: GROUP BY workout_date, MAX(weight), SUM(reps*weight)
   - getMuscleGroupVolume(userId, period): [{muscleGroup, totalSets, totalVolume}]
     Через exercise.muscle_groups array + JOIN
   - getTrainingFrequency(userId, period): {totalWorkouts, avgPerWeek, streak: StreakInfo}
   - findPersonalRecords(userId): PersonalRecord[] с include exercise
   - detectAndSavePR(workoutId): transactionally найти новые PR в тренировке и INSERT в personal_records
     Формула e1rm: weight * (1 + reps/30) — формула Epley
3. apps/api/src/routes/analytics.routes.ts (все за JWT middleware):
   GET /api/v1/analytics/progress/:exerciseId?period=3m
   GET /api/v1/analytics/volume?period=1m
   GET /api/v1/analytics/frequency?period=3m
   GET /api/v1/analytics/personal-records
4. В WorkoutService.approveDraft() добавить вызов analyticsService.detectAndSavePR(workoutId)
5. apps/bot/src/bot/handlers/analyticsHandlers.ts:
   /stats — сводка за последний месяц (totalWorkouts, topExercise, currentStreak)
   /progress <упражнение> — текстовый график: «Присед: 40кг → 45кг → 50кг»
6. Тесты (src/**/__tests__/):
   analytics.service.test.ts: getExerciseProgress (мок $queryRaw), detectAndSavePR (мок prisma)
   analytics.routes.test.ts: мок analyticsService

Ограничения:
- $queryRaw возвращает unknown — добавить Zod-валидацию результата
- Streak обновлять только при approve, не при draft

Acceptance criteria:
- [ ] pnpm lint && pnpm test — зелёные
- [ ] After approve: если новый вес больше предыдущего max — PR сохраняется
- [ ] GET /analytics/personal-records → корректный JSON
- [ ] /stats в боте показывает данные
```

---

## Фаза 1: App MVP (CF-001 — CF-004)

> Цель: рабочее приложение в App Store с базовыми функциями тренировок.

### 1.1 Expo-проект, навигация, авторизация

---

#### 🧑‍💼 Для менеджера

**Что происходит**: Создаём само мобильное приложение — «скелет» со всеми экранами и входом через Telegram. Пользователь скачивает приложение, входит через Telegram и видит пустой главный экран.

**Что увидит пользователь**: Экран входа → один тап «Войти через Telegram» → главный экран.

**Метрика успеха**: Приложение открывается на реальном iPhone/Android, вход через Telegram работает за 2 секунды.

---

#### 🧑‍💻 Для разработчика

**Зависимости**: Фаза 0 выполнена (API + JWT работают).

**Задачи**:

1. `apps/mobile`: `npx create-expo-app@latest --template blank-typescript`
2. Expo Router: настроить файловую маршрутизацию, группы `(auth)` и `(tabs)`
3. Темизация: dark/light тема, цветовые токены, типографика (Google Fonts: Inter)
4. `services/api.ts` — Axios клиент: `baseURL` из env, `Authorization: Bearer`, интерцептор для автоматического refresh токена
5. `store/auth.store.ts` — Zustand: `{userId, accessToken, refreshToken, login(), logout()}`
6. `(auth)/login.tsx` — экран входа: кнопка «Войти через Telegram» (WebView Telegram Login Widget) + кнопка «Email»
7. Сохранение токенов: `expo-secure-store` (Keychain/Keystore)
8. `(tabs)/_layout.tsx` — tab bar: Главная, Тренировка, История, Каталог, Профиль
9. Тесты: auth.store (jest), api.ts interceptor (axios-mock-adapter)

**Acceptance criteria**:

- [ ] `npx expo start` — запускается на iOS Simulator и Android Emulator
- [ ] Telegram OAuth → JWT сохраняется в SecureStore
- [ ] После перезапуска приложения — пользователь остаётся авторизованным (autoLogin)
- [ ] Tab навигация работает между 5 экранами

---

#### 🤖 Промпт для AI-агента

```prompt
Создай мобильное приложение FitApp на React Native + Expo (шаг 1.1).

Контекст:
- Монорепозиторий: /Users/elizavetagolubenko/Projects/fit-tel-bot
- apps/api уже работает (Фаза 0), базовый URL: http://localhost:3001/api/v1
- Архитектура: docs/architecture/design/FIT_APP_SYSTEM_DESIGN.md (раздел 9)
- Авторизация: docs/architecture/design/FIT_APP_SYSTEM_DESIGN.md (раздел 6)

Задачи в apps/mobile/:
1. npx create-expo-app@latest ./ --template blank-typescript
   Установить: expo-router, expo-secure-store, expo-font, axios, zustand, @tanstack/react-query
2. app/_layout.tsx: Stack навигация, QueryClientProvider, ThemeProvider (dark/light)
3. Цветовые токены в constants/Colors.ts: primary #6C63FF, background dark/light, surface, text
4. services/api.ts — axios instance:
   - baseURL из expo-constants конфига
   - Интерцептор request: добавлять Authorization: Bearer {accessToken}
   - Интерцептор response: при 401 → POST /auth/refresh → повторить запрос → при ошибке → logout
5. store/auth.store.ts (Zustand):
   - {userId, accessToken, refreshToken, isLoading}
   - login(tokens): сохранить в SecureStore + store
   - logout(): очистить SecureStore + store + navigate to /login
   - init(): при старте читать SecureStore → проверить exp → если истёк → refresh
6. app/(auth)/login.tsx:
   - WebView для Telegram Login Widget (ловить redirect с hash-параметрами)
   - POST /auth/oauth/telegram → получить токены → auth.store.login()
   - Кнопка «Войти через Email» → app/(auth)/register.tsx
7. app/(auth)/register.tsx: форма email + password → POST /auth/register
8. app/(tabs)/_layout.tsx: Tabs навигация, 5 вкладок с иконками (expo-vector-icons)
9. app/(tabs)/index.tsx: заглушка «Главный экран — скоро здесь появятся тренировки»
10. Тесты (src/__tests__/): auth.store.test.ts (jest, мок SecureStore)

Ограничения:
- НЕ реализовывать бизнес-экраны — только навигация и авторизация
- Стилизация через StyleSheet, НЕ NativeWind/TailwindCSS
- Токены ТОЛЬКО в SecureStore, не в AsyncStorage

Acceptance criteria:
- [ ] npx expo start — компилируется без ошибок
- [ ] Вход через Telegram: токены сохранены в SecureStore
- [ ] Refresh token автоматически работает (interceptor)
- [ ] Перезапуск → autoLogin (если токены не истекли)
```

---

### 1.2 Каталог упражнений

---

#### 🧑‍💼 Для менеджера

**Что происходит**: Добавляем библиотеку упражнений — пользователь может просматривать упражнения, фильтровать по группам мышц и видеть GIF с техникой.

**Что увидит пользователь**: Вкладка «Каталог» → список упражнений → карточка с GIF, описанием, частыми ошибками.

**Данные**: 1300+ упражнений из открытой базы ExerciseDB (с анимациями). Позже добавим свои профессиональные видео.

**Метрика успеха**: Поиск по упражнению работает за < 300ms, GIF загружается при открытии карточки.

---

#### 🧑‍💻 Для разработчика

**Зависимости**: Шаг 1.1 выполнен, `GET /api/v1/exercises` работает.

**Задачи**:

1. Prisma миграция: расширить `exercises` (добавить `description_ru`, `instructions JSONB`, `common_mistakes JSONB`, `equipment VARCHAR[]`, `gif_url`, `external_id`)
2. `apps/api/src/services/exercise-db.service.ts` — ExerciseDB API клиент:
   - Fetch упражнений с GIF URLs
   - Кэшировать в Redis (TTL 24ч)
   - Сохранять GIF на Yandex Object Storage (или вернуть CDN URL)
3. `GET /api/v1/exercises` — поддержка `?search=`, `?muscle_group=`, `?category=`, `?equipment=`, pagination
4. `apps/mobile/app/(tabs)/catalog.tsx` — FlatList с поиском и фильтрами
5. `apps/mobile/components/exercises/ExerciseCard.tsx` — карточка в списке
6. `apps/mobile/app/exercises/[id].tsx` — детальная карточка: GIF (expo-image), описание, шаги техники, частые ошибки

**Acceptance criteria**:

- [ ] Список ~1300 упражнений загружается (с pagination)
- [ ] Поиск и фильтр по muscle_group работают
- [ ] GIF кэшируется — повторное открытие мгновенное
- [ ] Пользователь может создать своё упражнение

---

#### 🤖 Промпт для AI-агента

```prompt
Реализуй каталог упражнений для FitApp (шаг 1.2).

Контекст:
- Монорепозиторий: /Users/elizavetagolubenko/Projects/fit-tel-bot
- System design: docs/architecture/design/FIT_APP_SYSTEM_DESIGN.md (раздел 8)
- Бизнес-требования: FIT_APP_BUSINESS_REQUIREMENTS.md (CF-002)
- Prisma схема: apps/bot/prisma/schema.prisma — модель Exercise уже есть, нужно расширить
- ExerciseDB API: https://exercisedb.p.rapidapi.com (нужен RAPIDAPI_KEY в .env)

Задачи в apps/api:
1. Prisma миграция — ALTER exercises:
   description_ru TEXT, instructions JSONB, common_mistakes JSONB,
   equipment VARCHAR[], bodyweight BOOLEAN DEFAULT false,
   gif_url TEXT, gif_cached_at TIMESTAMP, external_id VARCHAR
2. src/services/exercise-db.service.ts:
   - fetchAllExercises(): GET https://exercisedb.p.rapidapi.com/exercises (limit 1300)
   - Сохранять метаданные в exercises, gif_url оставить как есть (CDN ExerciseDB)
   - Кэшировать список в Redis (TTL 86400s)
   - Запустить sync при старте если exercises < 100
3. GET /api/v1/exercises — Fastify route:
   Query params: search (ILIKE), muscleGroup, category, equipment, page, limit (default 20)
   Response: {data: Exercise[], total, page, totalPages}
4. GET /api/v1/exercises/:id — включая instructions и common_mistakes
5. POST /api/v1/exercises — создать пользовательское (is_global=false, created_by=req.userId)

Задачи в apps/mobile:
6. app/(tabs)/catalog.tsx:
   - FlatList с ExerciseCard (useInfiniteQuery из TanStack Query)
   - SearchBar (debounce 300ms)
   - MuscleGroupFilter — горизонтальный скролл чипов
7. components/exercises/ExerciseCard.tsx — название, мышечная группа, иконка
8. app/exercises/[id].tsx:
   - expo-image для GIF (contentFit='contain', cachePolicy='memory-disk')
   - Список steps из instructions
   - Секция «Частые ошибки»
   - Кнопка «Добавить в тренировку»

Ограничения:
- GIF НЕ скачивать на сервер — использовать URL из ExerciseDB напрямую
- Бесплатный tier ExerciseDB: 10 req/мин — кэш обязателен
- exercises.is_global=true для ExerciseDB, false для пользовательских

Acceptance criteria:
- [ ] pnpm lint && pnpm test — зелёные
- [ ] GET /exercises?search=squat → фильтрует по имени
- [ ] Список на мобильном загружается постранично
- [ ] GIF кэшируется на устройстве (повторное открытие без сети)
```

---

### 1.3 Создание и выполнение тренировки

---

#### 🧑‍💼 Для менеджера

**Что происходит**: Добавляем главную функцию приложения — создать тренировку и выполнять её в реальном времени с таймером и счётчиком.

**Что увидит пользователь**: Кнопка «Начать тренировку» → выбор упражнений → выполнение с таймером отдыха → саджест веса на основе прошлых тренировок → итоговая сводка.

**Метрика успеха**: Максимум 2 тапа от главного экрана до начала тренировки.

---

#### 🧑‍💻 Для разработчика

**Зависимости**: Шаги 1.1, 1.2 выполнены.

**Задачи**:

1. `GET /api/v1/workouts/active-draft` — найти незавершённую тренировку (status=draft)
2. `GET /api/v1/workouts/heatmap` — данные для тепловой карты активности
3. `apps/mobile/store/workoutSession.store.ts` (Zustand):
   - `{workoutId, exercises[], currentExerciseIndex, currentSetIndex, timer}`
   - `startWorkout()`, `logSet(reps, weight)`, `nextExercise()`, `finishWorkout()`
   - Offline queue: pending sets → MMKV, sync при появлении сети
4. `app/(tabs)/workout.tsx` — режим выполнения:
   - ExerciseRow с currentSet, рекомендуемым весом (из analytics.getExerciseProgress)
   - `SetLogger` — ввод reps + weight + кнопка ✓
   - `RestTimer` — обратный отсчёт (60/90/120 сек), сброс и запуск голосом (Фаза 2)
5. `app/workouts/new.tsx` — создать тренировку:
   - Поиск упражнений из каталога, drag & drop порядка (react-native-draggable-flatlist)
   - Установить подходы / повторения / вес
6. `app/(tabs)/index.tsx` (Главный экран):
   - Баннер «Есть незавершённая тренировка» (если active-draft)
   - Кнопка «Быстрая тренировка» (15 мин, шаблон)
   - Тепловая карта `ActivityHeatmap` (SVG)
7. Итоговая сводка после `POST /workouts/:id/approve`: объём, тоннаж, время, PR badge если PR

**Acceptance criteria**:

- [ ] От главного экрана до старта тренировки — 2 тапа
- [ ] Логирование подхода работает offline (pending queue)
- [ ] Таймер отдыха запускается автоматически после логирования
- [ ] Саджест веса показывает данные из последней тренировки

---

#### 🤖 Промпт для AI-агента

```prompt
Реализуй создание и выполнение тренировки для FitApp (шаг 1.3).

Контекст:
- Монорепозиторий: /Users/elizavetagolubenko/Projects/fit-tel-bot
- Бизнес-требования: FIT_APP_BUSINESS_REQUIREMENTS.md (CF-003, CF-004)
- System design: docs/architecture/design/FIT_APP_SYSTEM_DESIGN.md (разделы 5, 10)
- Шаги 1.1 и 1.2 выполнены: навигация, авторизация, каталог работают

Задачи в apps/api:
1. GET /api/v1/workouts/active-draft — найти workout {user_id, status='draft'}, вернуть с exercises
2. GET /api/v1/workouts/heatmap?year=2026 — [{date: 'YYYY-MM-DD', count: N}]
3. GET /api/v1/analytics/weight-suggestion/:exerciseId — последний использованный вес пользователя

Задачи в apps/mobile:
4. store/workoutSession.store.ts (Zustand + MMKV persist):
   workoutId: string | null
   exercises: {exerciseId, name, sets: {reps, weight, logged}[]}[]
   currentExerciseIdx: number
   restTimerSeconds: number
   pendingSets: {workoutId, exerciseId, setData}[] — для offline
   actions: startWorkout, logSet, syncPendingSets, finishWorkout
5. hooks/useWorkoutSync.ts — при появлении сети (@react-native-community/netinfo):
   перебираем pendingSets → PUT /workouts/:id → очищаем
6. app/workouts/new.tsx:
   - Список упражнений с поиском (из каталога)
   - Drag-and-drop (react-native-draggable-flatlist) для порядка
   - Для каждого: ввод defaultSets, defaultReps, defaultWeight
   - POST /workouts → navigate to /workouts/execute/:id
7. app/workouts/execute/[id].tsx:
   - Текущее упражнение + номер сета
   - Саджест веса (из /analytics/weight-suggestion/:exerciseId)
   - SetLogger: NumericInput для reps + weight + кнопка ✓ → logSet()
   - RestTimer: react-native-countdown-circle-timer, 60/90/120 сек
   - Кнопка «Следующее упражнение»
   - FAB «Завершить тренировку» → POST /workouts/:id/approve → SummaryModal
8. components/workout/SummaryModal.tsx:
   - Показать: totalVolume, totalSets, duration, PRs achieved (если есть)
   - Кнопка «Готово»
9. app/(tabs)/index.tsx (Главный экран):
   - useQuery(['active-draft']) → баннер если есть
   - Кнопка «Начать тренировку» → /workouts/new
   - ActivityHeatmap (SVG через react-native-svg, данные из /heatmap)
10. Тесты: workoutSession.store.test.ts (logSet, sync offline)

Ограничения:
- Offline: MMKV для pendingSets, sync при reconnect
- PR badge: проверять после approve через /analytics/personal-records

Acceptance criteria:
- [ ] 2 тапа от главного до начала тренировки
- [ ] Offline логирование → sync при появлении сети
- [ ] RestTimer запускается автоматически после logSet
- [ ] SummaryModal показывает PR если побит рекорд
```

---

### 1.4 История тренировок

---

#### 🧑‍💼 Для менеджера

**Что происходит**: Экран истории — список всех тренировок с деталями, личными рекордами и тепловой картой активности. Тепловая карта — как GitHub contributions — мощный мотивационный элемент.

**Метрика успеха**: Пользователь видит всю историю тренировок за год одним скроллом, тепловая карта показана на главном экране.

---

#### 🧑‍💻 Для разработчика

**Задачи**:

1. `app/(tabs)/history.tsx`:
   - `useInfiniteQuery` по `GET /api/v1/workouts?status=approved&page=N`
   - `WorkoutHistoryCard` — дата, фокус (мышечные группы), тоннаж
2. `app/workouts/[id].tsx` (детали):
   - Список упражнений и подходов
   - PR badges рядом с весом если это был рекорд
3. `GET /api/v1/workouts` — добавить `?status=approved&dateFrom=&dateTo=` фильтры + cursor-based pagination

**Acceptance criteria**:

- [ ] История 50+ тренировок загружается через infinite scroll
- [ ] PR отображаются рядом с соответствующим подходом
- [ ] Нажатие на день в тепловой карте → открывает тренировку за этот день

---

#### 🤖 Промпт для AI-агента

```prompt
Реализуй экран истории тренировок для FitApp (шаг 1.4).

Контекст:
- Монорепозиторий: /Users/elizavetagolubenko/Projects/fit-tel-bot
- Бизнес-требования: FIT_APP_BUSINESS_REQUIREMENTS.md (CF-004)
- Шаги 1.1–1.3 выполнены

Задачи в apps/api:
1. GET /api/v1/workouts — расширить: cursor-based pagination (cursor=lastId), фильтры status, dateFrom, dateTo
2. GET /api/v1/workouts/:id — include: workout_exercises → exercise → exercise_sets, include: personal_records (был ли PR в этой тренировке)

Задачи в apps/mobile:
3. app/(tabs)/history.tsx:
   - useInfiniteQuery(['workouts'], fetchWorkouts
   - FlatList WorkoutHistoryCard: дата, фокус (emoji мышц), totalVolume (кг), duration
   - Pull-to-refresh
4. components/workout/WorkoutHistoryCard.tsx: красивая карточка с gradients
5. app/workouts/[id].tsx:
   - Список exercises → sets с PR🏆 badge если achieved_in_workout_id совпадает
   - Кнопка «Повторить тренировку» → создать копию как draft
6. Также на app/(tabs)/index.tsx: ActivityHeatmap кликабельна:
   - Тап на день → router.push('/workouts?date=YYYY-MM-DD')
   - GET /api/v1/workouts?date= → показать тренировку за этот день

Acceptance criteria:
- [ ] История с infinite scroll, 20 записей за раз
- [ ] PR 🏆 виден рядом с рекордным подходом
- [ ] Тепловая карта → нажатие → открывает тренировку за этот день
- [ ] «Повторить тренировку» создаёт черновик с теми же упражнениями
```

---

## Фаза 2: Голос + Уведомления (PH2-005 — PH2-007)

> Цель: hands-free тренировки и система мотивации через push-уведомления.

### 2.1 Голосовой ввод и Hands-free режим

---

#### 🧑‍💼 Для менеджера

**Что происходит**: Добавляем голосовое управление тренировкой. Пользователь во время выполнения упражнения просто говорит «четыре повтора, вес восемьдесят пять» — система записывает. Никакого взаимодействия с экраном, руки свободны.

**Почему это важно**: Ни один крупный конкурент (Strava, MyFitnessPal, Fitbod) не предлагает полноценный hands-free режим. Это ключевое конкурентное преимущество.

**Что услышит пользователь**: Подтверждение голосом «85 кг, 4 повтора — записано» + вибрация телефона.

**Метрика успеха**: 70%+ пользователей используют голосовой ввод хотя бы раз за первую неделю.

---

#### 🧑‍💻 Для разработчика

**Зависимости**: Шаги 1.1–1.4 выполнены, `POST /stt/transcribe` и `POST /nlu/parse-voice-command` реализованы в Фазе 0.

**Задачи**:

1. `apps/mobile/hooks/useVoiceRecorder.ts`:
   - `expo-av` / `expo-audio` для записи
   - iOS: `AVAudioSession.setCategory(.playAndRecord)` через `expo-av`
   - Android: `MediaRecorder` через `expo-av`
   - Методы: `startRecording()`, `stopRecording(): File`, `requestPermission()`
2. `apps/mobile/components/workout/VoiceButton.tsx`:
   - Большая кнопка с анимацией (react-native-reanimated пульс при записи)
   - longPress → запись, release → отправка
3. Flow: остановить запись → `POST /stt/transcribe` → `POST /nlu/parse-voice-command` → `workoutSession.logSet()`
4. `apps/mobile/utils/audio-feedback.ts`:
   - `expo-speech`: TTS подтверждение «85 кг, 4 повтора — записано»
   - `expo-haptics`: `Haptics.impactAsync(ImpactFeedbackStyle.Medium)` при успехе
5. Background Audio (iOS): `app.json` → `infoPlist.UIBackgroundModes: ["audio"]`
6. Тесты: `useVoiceRecorder.test.ts` (мок expo-av), `audio-feedback.test.ts`

**Acceptance criteria**:

- [ ] Голосовая запись работает при заблокированном экране (iOS)
- [ ] STT → NLU → logSet за < 3 секунды
- [ ] Haptic feedback при успешном распознавании
- [ ] TTS произносит подтверждение

---

#### 🤖 Промпт для AI-агента

```prompt
Реализуй голосовой ввод и hands-free режим для FitApp (шаг 2.1).

Контекст:
- Монорепозиторий: /Users/elizavetagolubenko/Projects/fit-tel-bot
- Бизнес-требования: FIT_APP_BUSINESS_REQUIREMENTS.md (PH2-007 «Голосовое управление»)
- System design: docs/architecture/design/FIT_APP_SYSTEM_DESIGN.md (раздел 7)
- POST /stt/transcribe и POST /nlu/parse-voice-command уже реализованы в apps/api (Фаза 0)
- Режим выполнения тренировки: app/workouts/execute/[id].tsx (шаг 1.3)

Задачи в apps/mobile:
1. Установить: expo-av, expo-speech, expo-haptics, react-native-reanimated@3
2. hooks/useVoiceRecorder.ts:
   - requestMicPermission(): Promise<boolean>
   - startRecording(): Promise<void> — Audio.Recording с настройками AAC
   - stopAndTranscribe(): Promise<VoiceCommand | null>
     Внутри: stopRecording → getURI → fetch file → FormData → POST /stt/transcribe → POST /nlu/parse-voice-command
   - state: {isRecording, isProcessing, lastCommand}
3. components/workout/VoiceButton.tsx:
   - Большая круглая кнопка (80px) с иконкой микрофона
   - При isRecording: Animated пульсирующий красный круг (useAnimatedStyle)
   - При isProcessing: ActivityIndicator
   - Обработка: onLongPress → startRecording(), onPressOut → stopAndTranscribe()
4. utils/audio-feedback.ts:
   - speakConfirmation(reps, weight, unit): Speech.speak(`${weight} ${unit}, ${reps} повтора — записано`)
   - hapticSuccess(): Haptics.impactAsync(ImpactFeedbackStyle.Medium)
   - hapticError(): Haptics.notificationAsync(NotificationFeedbackType.Error)
5. Интегрировать VoiceButton в app/workouts/execute/[id].tsx:
   - При VoiceCommand.command === 'log_set': workoutSession.logSet(reps, weight) + speakConfirmation + hapticSuccess
   - При 'next_exercise': workoutSession.nextExercise() + Speech.speak('Следующее упражнение')
   - При 'finish_workout': показать подтверждение → finishWorkout()
6. app.json (iOS): expo.ios.infoPlist.UIBackgroundModes: ['audio']
   expo.ios.infoPlist.NSMicrophoneUsageDescription: 'Для голосового управления тренировкой'
7. Тесты:
   useVoiceRecorder.test.ts: мок expo-av (Audio.Recording), успешная транскрипция, ошибка API
   audio-feedback.test.ts: speakConfirmation вызывает Speech.speak с корректным текстом

Ограничения:
- При ошибке STT/NLU — hapticError() + показать текст «Не распознал, попробуй ещё»
- НЕ сохранять аудио файл после транскрипции

Acceptance criteria:
- [ ] pnpm lint && pnpm test — зелёные
- [ ] Голосовой ввод «четыре повтора вес восемьдесят пять» → logSet(4, 85)
- [ ] TTS говорит «85 кг, 4 повтора — записано»
- [ ] Haptic при успехе, другой haptic при ошибке
- [ ] iOS Background Audio mode включён в app.json
```

---

### 2.2 Push-уведомления и Streak-система

---

#### 🧑‍💼 Для менеджера

**Что происходит**: Добавляем систему мотивации — серии тренировок (streaks), достижения и умные напоминания. Приложение напомнит «Не забудь сегодня потренироваться» за 2 часа до конца дня, а при личном рекорде — поздравит.

**Данные по рынку**: Приложения с push-уведомлениями имеют на 45% выше Day-7 retention.

**Метрика успеха**: 60%+ пользователей разрешают push-уведомления при первом запросе.

---

#### 🧑‍💻 Для разработчика

**Зависимости**: Шаги 1.1–1.4, Фаза 0 выполнены.

**Задачи**:

1. `apps/api`: установить `bullmq`, `firebase-admin` (FCM), `node-apn` (APNs)
2. `apps/api/src/workers/notification.worker.ts` — BullMQ воркер:
   - `streak_reminder`: найти пользователей без тренировки сегодня, час = 22:00 по TZ → push
   - `pr_achieved`: пуш при обнаружении PR в `detectAndSavePR()`
   - `scheduled_workout`: планировщик по `workout_schedule`
3. `apps/api/src/services/push.service.ts`:
   - `sendPush(userId, title, body, data)` — читает `push_tokens`, определяет platform, APNs или FCM
4. `apps/api/src/routes/users.routes.ts`: `POST /users/me/push-token`, `DELETE /users/me/push-token/:token`
5. Prisma миграция: таблицы `push_tokens`, `achievements`, `user_achievements`, `streaks`
6. `apps/mobile`: установить `expo-notifications`
7. `apps/mobile/hooks/usePushNotifications.ts`:
   - `registerForPushNotifications()`: запросить разрешение → получить token → POST `/users/me/push-token`
   - Вызвать при первом входе
8. Тесты: push.service (мок firebase-admin, node-apn), notification.worker (мок bullmq job)

**Acceptance criteria**:

- [ ] После approve тренировки с PR → push приходит на устройство
- [ ] Streak обновляется при approve тренировки
- [ ] При пропуске дня streak уменьшается (но Shield защищает)
- [ ] Push в правильное время по timezone пользователя

---

#### 🤖 Промпт для AI-агента

```prompt
Реализуй push-уведомления и streak-систему для FitApp (шаг 2.2).

Контекст:
- Монорепозиторий: /Users/elizavetagolubenko/Projects/fit-tel-bot
- Бизнес-требования: FIT_APP_BUSINESS_REQUIREMENTS.md (PH2-005 «Система мотивации», KF-006 «Streak Shield»)
- System design: docs/architecture/design/FIT_APP_SYSTEM_DESIGN.md (раздел 11)
- Фаза 0 и шаги 1.1–1.4 выполнены
- detectAndSavePR() в analytics.service.ts уже вызывается после approve (шаг 0.3)

Задачи в apps/api:
1. Установить: bullmq, firebase-admin, node-apn
2. Добавить в .env: FCM_SERVICE_ACCOUNT_JSON (base64), APNS_KEY_P8 (base64), APNS_KEY_ID, APNS_TEAM_ID
3. Prisma миграция:
   - PushToken (id, user_id FK, platform 'ios'|'android', token, app_version, created_at, updated_at)
   - Achievement (id, slug UK, title_ru, icon_emoji)
   - UserAchievement (id, user_id FK, achievement_id FK, achieved_at)
   - Streak (id, user_id FK, current_streak, longest_streak, last_workout_date, shield_count, updated_at)
   - Seed 10 achievements: first_workout, ten_workouts, hundred_workouts, first_pr, streak_7, streak_30...
4. src/services/push.service.ts:
   - sendToUser(userId, {title, body, data}): достать push_tokens по userId, отправить APNs или FCM
   - APNs через node-apn: provider + token
   - FCM через firebase-admin: messaging().send()
5. src/services/streak.service.ts:
   - updateStreak(userId, workoutDate): обновить current_streak, longest_streak, last_workout_date
   - checkStreakBreak(): ежедневный cron — если last_workout_date < yesterday → current_streak = 0 (если нет shield)
   - useShield(userId): shield_count-- если > 0
6. src/workers/notification.worker.ts (BullMQ):
   - Queue: 'notifications'
   - Worker обрабатывает jobs: pr_achieved, streak_reminder, achievement_unlocked
7. В WorkoutService.approveDraft() добавить:
   - streakService.updateStreak(userId, workout.workout_date)
   - Добавить job в queue: notificationQueue.add('pr_achieved', {userId, prData}) если PR найден
   - Проверить achievements: если first_workout → unlock + notificationQueue.add('achievement_unlocked')
8. Cron job (BullMQ repeatable): каждый час → проверить пользователей у которых < 2 часов до полуночи по TZ и нет тренировки сегодня → добавить job 'streak_reminder'
9. POST /api/v1/users/me/push-token — сохранить токен (upsert по token)
   DELETE /api/v1/users/me/push-token/:token — удалить

Задачи в apps/mobile:
10. Установить: expo-notifications
11. hooks/usePushNotifications.ts:
    - registerForPushNotifications(): запросить Permission → getExpoPushToken() → POST /users/me/push-token
    - Вызвать в app/_layout.tsx после авторизации
12. app/(tabs)/profile.tsx: показать currentStreak, longestStreak, список achievements с иконками

Ограничения:
- BullMQ использует тот же Redis что и сессии
- Cron jobs: только 1 инстанс воркера (distributed lock через Redis)
- Не отправлять push если пользователь отключил уведомления

Acceptance criteria:
- [ ] pnpm lint && pnpm test — зелёные
- [ ] После approve тренировки → streak обновляется в БД
- [ ] PR → push через < 10 секунд на реальное устройство
- [ ] Shield: если текущий streak > 0 и это первый пропуск за месяц → shield используется автоматически
- [ ] Экран профиля: streak и achievements видны
```

---

## Фаза 3: AI-тренер (KF-002, KF-004)

> Бизнес-ценность: персонализированное обучение и соперничество с друзьями.

### Обзор Фазы 3

#### 🧑‍💼 Для менеджера

**Что происходит**: Добавляем «умного тренера» — AI анализирует историю тренировок, данные о сне и адаптирует программу. Если пользователь плохо спал, тренировка становится легче. Если по несколько недель стагнирует — AI автоматически меняет программу.

**Почему это выделяет нас**: Конкуренты записывают тренировки. Мы — думаем за пользователя.

**Монетизация**: AI-тренер — Premium функция (~$9.99/мес).

**Метрика успеха**: 8%+ конверсия Free → Premium.

---

#### 🤖 Промпт для AI-агента (3.1 AI Trainer Service)

```prompt
Реализуй AI Trainer Service для FitApp (Фаза 3).

Контекст:
- Монорепозиторий: /Users/elizavetagolubenko/Projects/fit-tel-bot
- Бизнес-требования: FIT_APP_BUSINESS_REQUIREMENTS.md (KF-002)
- System design: docs/architecture/design/FIT_APP_SYSTEM_DESIGN.md (раздел 2, 5)
- Фазы 0–2 выполнены; analytics.service.ts работает

Задачи в apps/api:
1. src/services/ai-trainer.service.ts:
   - generateWeeklyPlan(userId): анализ последних 30 тренировок → DeepSeek V3 → структурированный план на неделю
   - adaptPlan(userId, signals: {sleepHours?, rpe?, missedWorkouts?}): скорректировать нагрузку
   - detectOvertraining(userId): если объём вырос > 10% за неделю или нет дней отдыха → return warning
   - detectMuscleImbalance(userId): из analytics.getMuscleGroupVolume → сравнить push/pull ratio
   - generateWeeklyReport(userId): markdown отчёт для пользователя
2. src/routes/ai-trainer.routes.ts:
   GET /ai-trainer/recommendations — текущие рекомендации
   GET /ai-trainer/weekly-report — отчёт за прошедшую неделю
   POST /ai-trainer/adapt-plan {signals} — явная адаптация
3. BullMQ repeatable job: каждое воскресенье 20:00 по TZ → generateWeeklyReport → push уведомление
4. Если detectOvertraining → добавить предупреждение в recommendations
5. Интеграция Apple Health / Google Fit (опционально, если есть OAuth):
   - Принимать sleepHours через POST /users/me/health-data {sleepHours, heartRateVariability}

Задачи в apps/mobile:
6. app/ai-trainer/index.tsx: экран с рекомендациями, карточки с иконками и текстом
7. app/ai-trainer/weekly-report.tsx: отчёт в Markdown (react-native-markdown-display)
8. Пуш в воскресенье → deep link → открывает weekly-report

Ограничения:
- DeepSeek V3 промпт включает последние 10 тренировок как JSON (не весь массив)
- Temperature: 0.3 (ближе к deterministic для планов)
- Все вызовы AI логировать с latency через pino

Acceptance criteria:
- [ ] GET /ai-trainer/recommendations возвращает ≥ 1 рекомендацию
- [ ] Предупреждение об overtraining при росте объёма > 10% за неделю
- [ ] Weekly report генерируется и приходит как push в воскресенье
```

---

## Фаза 4: Анализ техники (KF-005)

> [!NOTE]
> Только после стабильного App MVP+ (Фазы 0–2). Крайне сложная фича.

#### 🧑‍💼 Для менеджера

**Что происходит**: Камера телефона анализирует технику упражнения в реальном времени. «Колено уходит внутрь» — приложение подскажет прямо во время подхода.

**Сложность**: Pose estimation — AI задача, работающая полностью на устройстве (без сети). Требует отдельного ресёрча для каждого упражнения.

---

#### 🤖 Промпт для AI-агента (4.1 Pose Estimation MVP)

```prompt
Реализуй базовый pose estimation для анализа техники приседаний (шаг 4.1 MVP).

Контекст:
- apps/mobile (React Native + Expo, Фазы 0–2 выполнены)
- Бизнес-требования: FIT_APP_BUSINESS_REQUIREMENTS.md (KF-005)
- ТОЛЬКО для iOS в первой итерации (Apple Vision Framework)

Задачи:
1. Создать нативный модуль apps/mobile/modules/PoseDetection/:
   - iOS: PoseDetectionModule.swift используя VNDetectHumanBodyPoseRequest (Vision Framework)
   - Expo Module API (не старый bridge) для bridge в React Native
2. hooks/usePoseDetection.ts: обёртка над нативным модулем
3. app/technique-analysis/[exerciseId].tsx:
   - Камера (expo-camera)
   - Overlay с skeleton (react-native-svg линии между landmarks)
   - Анализ: проверить угол колена (< 170° в нижней точке приседа → предупреждение «колено уходит внутрь»)
4. Поддерживать: приседания, отжимания (для старта)
5. Итоговый отчёт: временные метки ошибок + preview кадра

Ограничения:
- Android: ML Kit Pose Detection (отдельная задача после iOS MVP)
- Только on-device, никаких API вызовов для визуальных данных

Acceptance criteria:
- [ ] Камера показывает skeleton overlay в реальном времени
- [ ] Ошибка «колено внутрь» детектируется > 80% случаев
```
