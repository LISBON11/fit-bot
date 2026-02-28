# Деплой FitBot: Supabase + Яндекс Облако + GitHub Actions

> [!WARNING]
> **Важно:** Яндекс Облако использует российские IP-диапазоны. В редких случаях Telegram
> может блокировать запросы с российских IP. Если бот перестанет получать апдейты —
> временно включи webhook через европейский прокси или смени провайдера.

## Архитектура продакшена

```
GitHub (push → main)
  ├─[CI]──► lint + test + build
  ├─[CI]──► docker build → ghcr.io/lisbon11/fit-bot:latest
  └─[CD]──► SSH → Яндекс Облако VM → docker compose pull + up

Яндекс Облако VM:
  🤖 bot  ──► Supabase PostgreSQL (бесплатно, 500 MB)
  ⚡ redis ──► Docker на VM
```

---

## Шаг 1. База данных в Supabase ✅

База уже настроена:

- Миграции применены (`prisma migrate deploy`)
- Seed залит (`prisma db seed`) — 24 упражнения, 77 синонимов

`DATABASE_URL` — Transaction Pooler (порт 6543)  
`DIRECT_URL` — Session Pooler (порт 5432)

---

## Шаг 2. Создать VM в Яндекс Облаке

1. Зайди на [console.yandex.cloud](https://console.yandex.cloud) → войди через Яндекс ID
2. Создай платёжный аккаунт (карта, дают ~3000₽ на старт бесплатно)
3. Перейди в **Compute Cloud → Виртуальные машины → Создать ВМ**
4. Настройка:
   - Зона доступности: **ru-central1-a** (Москва)
   - Операционная система: **Ubuntu 22.04 LTS** (24.04 в Яндекс Облаке недоступен)
   - Платформа: **Intel Ice Lake**, Гарантированная доля vCPU: **20%**, RAM: **2 GB** (хватит для MVP)
   - Публичный IP: **Автоматически** (можно менять на статический позже)
   - SSH-ключи: вставь содержимое публичного ключа:
     ```bash
     cat ~/.ssh/id_ed25519.pub
     ```
     Яндекс Облако автоматически создаст пользователя `ubuntu` и добавит ключ в `authorized_keys`.
5. Нажми **Создать ВМ** → дождись статуса **Running**
6. Запомни публичный IP адрес VM

> [!NOTE]
> Пользователь по умолчанию для образов Ubuntu в Яндекс Облаке — **`ubuntu`** (не `yc-user`). Ключ **обязательно** добавлять при создании VM — после cloud-init уже не применит его автоматически.

---

## Шаг 3. Первичная настройка VM

### Подключение по SSH

```bash
ssh -l ubuntu <IP-адрес-VM>
# или эквивалентно:
ssh ubuntu@<IP-адрес-VM>
```

> [!NOTE]
>
> - Пользователь: **`ubuntu`** (стандартный для официальных образов Ubuntu в Яндекс Облаке)
> - IP адрес VM динамический — меняется при перезапуске. Актуальный IP смотри в [console.yandex.cloud](https://console.yandex.cloud) → Compute Cloud → Виртуальные машины → колонка **Публичный IPv4**

### Добавление SSH-ключа нового участника

Если нужно предоставить доступ другому разработчику — добавь его публичный ключ на VM:

```bash
# На VM: добавь публичный ключ нового участника
echo "<публичный-ключ-разработчика>" >> ~/.ssh/authorized_keys
```

Либо через серийную консоль Яндекс Облака (VM → **Серийная консоль** → **Подключиться**) — если SSH ещё не настроен.

Установи Docker:

```bash
# Обновление пакетов
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com | sudo sh

# Добавь пользователя в группу docker (без sudo)
sudo usermod -aG docker ubuntu

# Переподключись для применения прав
exit
ssh ubuntu@<IP>

# Проверка
docker --version
docker compose version
```

> [!NOTE]
> Репозиторий клонировать на VM **не нужно** — CI/CD автоматически копирует `docker-compose.prod.yml`, `deploy.sh` и создаёт `.env` при каждом деплое.

---

## Шаг 4. Настроить GitHub Secrets и Variables

GitHub → репозиторий → **Settings → Secrets and variables → Actions**

### Secrets — секретные значения

**New repository secret** — маскируются в логах пайплайна, доступ через `${{ secrets.NAME }}`

| Имя                | Значение                                    |
| ------------------ | ------------------------------------------- |
| `SERVER_HOST`      | IP адрес Яндекс Облако VM                   |
| `SERVER_SSH_KEY`   | Приватный ключ: `cat ~/.ssh/id_ed25519`     |
| `BOT_TOKEN`        | Токен от @BotFather                         |
| `DEEPGRAM_API_KEY` | API-ключ Deepgram                           |
| `DEEPSEEK_API_KEY` | API-ключ DeepSeek                           |
| `DATABASE_URL`     | Supabase Transaction Pooler URL (порт 6543) |
| `DIRECT_URL`       | Supabase Session Pooler URL (порт 5432)     |
| `REDIS_PASSWORD`   | Пароль Redis (придумай надёжный)            |
| `REDIS_URL`        | `redis://:надёжный_пароль@redis:6379`       |
| `PUBLISH_CHAT_ID`  | ID Telegram-канала для публикаций           |

> [!CAUTION]
> `SERVER_SSH_KEY` — содержимое **приватного** ключа (начинается с `-----BEGIN OPENSSH PRIVATE KEY-----`).

### Variables — несекретные значения

**New repository variable** — видны в логах, доступ через `${{ vars.NAME }}`

| Имя           | Значение |
| ------------- | -------- |
| `SERVER_USER` | `ubuntu` |
| `LOG_LEVEL`   | `info`   |

---

## Шаг 5. Разрешить GitHub Actions пушить образы

GitHub → **Settings → Actions → General → Workflow permissions → Read and write permissions** → Save

---

## Шаг 6. Первый деплой

```bash
git push origin main
```

GitHub Actions автоматически:

1. ✅ Lint + tests + build
2. 🐳 Docker build → push `ghcr.io/lisbon11/fit-bot:latest`
3. 🚀 SSH на VM → `./deploy.sh`

На VM `deploy.sh` выполнит:

```bash
git pull origin main
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
npx prisma migrate deploy   # миграции (если есть новые)
docker image prune -f
```

---

## Шаг 7. Проверка

```bash
# На VM — логи бота в реальном времени
docker compose -f docker-compose.prod.yml logs -f bot
```

Ожидаемый вывод:

```json
{ "level": "info", "msg": "Bot started" }
```

**Тест в Telegram:** отправь боту `/start` → должен ответить приветствием.

---

## Обновление в будущем

Любой `git push origin main` → автодеплой. Ручной деплой при необходимости:

```bash
ssh yc-user@<IP>
cd ~/fit-bot
./deploy.sh
```

---

## Диагностика

| Проблема            | Решение                                                       |
| ------------------- | ------------------------------------------------------------- |
| Бот не отвечает     | `docker compose logs bot` — смотри ошибки                     |
| Ошибка БД           | Проверь `DATABASE_URL` в `.env` на VM, порт 6543              |
| Telegram не доходит | Возможна блокировка Яндекс IP — попробуй webhook через прокси |
| CI не пушит образ   | GitHub → Settings → Actions → Read and write permissions      |
| Deploy не работает  | Проверь Variables: `SERVER_USER=ubuntu`                       |
