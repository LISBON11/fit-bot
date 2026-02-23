# Инструкция по деплою и тестированию FitBot в Production

Эта инструкция описывает процесс развертывания бота на VPS сервере и шаги по его тестированию в реальных условиях.

## 1. Подготовка VPS

Для бота подойдет базовый VPS:

- **ОС:** Ubuntu 22.04 / 24.04 LTS
- **CPU:** 1-2 vCPU
- **RAM:** Мин. 1 GB (лучше 2 GB для сборки Prisma и TypeScript)
- **Диск:** 20+ GB SSD

### 1.1 Установка необходимых зависимостей

Подключитесь к серверу по SSH и выполните следующие команды установки Docker, Docker Compose и ffmpeg:

```bash
# Обновление пакетов
sudo apt update && sudo apt upgrade -y

# Установка ffmpeg (необходим для обработки .oga голосовых сообщений)
sudo apt install -y ffmpeg curl git

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавление вашего пользователя в группу docker (чтобы запускать без sudo)
sudo usermod -aG docker $USER
# Для применения прав перезайдите по SSH
# exit
# ssh user@your_server_ip
```

## 2. Развертывание приложения

### 2.1 Клонирование репозитория

```bash
# Склонируйте ваш репозиторий
git clone https://github.com/вашт_аккаунт/fit-tel-bot.git
cd fit-tel-bot
```

### 2.2 Настройка переменных окружения

Создайте `.env` файл на основе примера:

```bash
cp .env.example .env
nano .env
```

Заполните критические переменные для продакшена:

```env
# Обязательно "production"
NODE_ENV=production

# Ваш токен от @BotFather (желательно использовать токен отдельного бота для тестов, либо основной, если готовы)
BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrSTUvwxYZ
OPENAI_API_KEY=sk-proj-вашкин...

# База данных
DATABASE_URL=postgresql://fitbot:твой_надежный_пароль_бл@postgres:5432/fitbot
DB_PASSWORD=твой_надежный_пароль_бл

# Redis
REDIS_URL=redis://:твой_redis_пароль@redis:6379
REDIS_PASSWORD=твой_redis_пароль

# Канал для выкладки тренировок
PUBLISH_CHAT_ID=-100XXXXXXXXXX
```

## 3. Запуск инфраструктуры в Docker

В репозитории должен быть подготовлен `docker-compose.prod.yml` (см. ROADMAP Этап 6.1). Для запуска используйте команду:

```bash
# Запуск контейнеров в фоне
docker compose -f docker-compose.prod.yml up -d --build
```

### 3.1 Применение миграций БД и сидирование

Когда база данных PostgreSQL запустится, нужно накатить миграции Prisma внутри контейнера бота:

```bash
# Накатываем структуру БД
docker compose -f docker-compose.prod.yml exec bot npx prisma migrate deploy

# Данные по-умолчанию (синонимы и канонические упражнения)
docker compose -f docker-compose.prod.yml exec bot npx prisma db seed
```

## 4. Тестирование "в бою"

Дождитесь, пока контейнер бота начнет успешно обрабатывать обновления от Telegram.

### 4.1 Проверка состояния сервисов

```bash
# Убедитесь, что все контейнеры имеют статус "Up"
docker compose -f docker-compose.prod.yml ps

# Проверка логов приложения на предмет ошибок старта (соединение с БД/Redis)
docker compose -f docker-compose.prod.yml logs -f bot
```

Если в логах вы видите `✅ FitBot started`, бот готов к работе!

### 4.2 Тестирование функциональности (Test Plan)

1. **Регистрация пользователя (Auth Middleware):**
   - Откройте бота в Telegram и отправьте `/start`.
   - Проверьте логи: `User registered: telegram_id=...`. Убедитесь, что бот поприветствовал вас.

2. **Обработка STT (Голос в текст):**
   - Отправьте боту голосовое: _"Сегодня делала присед три подхода по десять повторений на сорок килограмм"_.
   - Следите за логами: `Voice received -> STT completed -> текст...`
   - Бот должен написать `"Обрабатываю..."` (статусы тайпинга) и затем выдать превью тренировки.

3. **Обработка NLU + Уточнения (Disambiguation):**
   - В зависимости от того, как GPT распознает упражнения, бот может спросить об уточнении (выкинуть инлайн-кнопки).
   - Выберите вариант в кнопке. Убедитесь, что выбор мапится в вашей базе.
   - Попробуйте придумывать синонимы, отсутствующие в стандартном seed (например: _"поделала бицуху"_).

4. **Проверка Draft State и Кнопок:**
   - После парсинга бот выведет: превью тренировки с кнопками `[✅ Approve] [✏️ Edit] [❌ Cancel]`.
   - Проверьте State Machine в Redis: бот запомнил ваш Draft. Нажмите `❌ Cancel` — черновик должен удалиться. Отправьте голосовуху заново.
   - Нажмите `✏️ Edit` и отправьте текст/голосовое: _"добавь еще жим лежа"_ — бот должен обновить черновик и вернуть новое превью.

5. **Публикация тренировки:**
   - Нажмите `✅ Approve` на валидном черновике.
   - Убедитесь, что сообщение ушло в указанный `PUBLISH_CHAT_ID` (убедитесь, что бот добавлен в канал как админ или этот чат доступен боту на запись).
   - Голосовое исходное сообщение от пользователя в чате с ботом должно автоматически удалиться.

### 4.3 Возможные проблемы и Дебаг

- **Не работает STT?** Проверьте, есть ли ffmpeg в production image. При сборке (см `Dockerfile`) там должен быть `apk add ffmpeg`.
- **Бот падает при запуске?** Проверьте `dotenv` переменные, правильно ли сконфигурирован `DATABASE_URL` под докер-сеть (`postgres:5432/fitbot`, а не `localhost:5432/fitbot`).
- **Pino логи:** в production логи будут в JSON формате. Можете их читать через команду `docker compose logs bot` или подключить `jq` для форматирования: `docker compose logs bot | jq`.

## 5. Обновление проекта (Deployment новой версии)

Когда вы внесли изменения в код и отправили их в `main`:

```bash
cd fit-tel-bot
git pull origin main

# Перестраиваем и перезапускаем только бот
docker compose -f docker-compose.prod.yml build bot
docker compose -f docker-compose.prod.yml up -d --no-deps bot

# Если есть новые миграции БД - накатываем их
docker compose -f docker-compose.prod.yml exec bot npx prisma migrate deploy
```
