#!/bin/bash
set -euo pipefail

# ─────────────────────────────────────────────
#  Утилиты логирования
# ─────────────────────────────────────────────
BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
RESET='\033[0m'

log_section() { echo -e "\n${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"; echo -e "${BOLD}  $1${RESET}"; echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"; }
log_info()    { echo -e "  ${GREEN}▶${RESET} $1"; }
log_warn()    { echo -e "  ${YELLOW}⚠${RESET}  $1"; }
log_done()    { echo -e "  ${GREEN}✓${RESET} $1"; }

DEPLOY_START=$(date +%s)
DEPLOY_TIME=$(date '+%Y-%m-%d %H:%M:%S %Z')

# ─────────────────────────────────────────────
#  Старт
# ─────────────────────────────────────────────
log_section "🚀 FitBot Deploy  [$DEPLOY_TIME]"
log_info "Рабочая директория: $(pwd)"
log_info "Пользователь: $(whoami)"

# ─────────────────────────────────────────────
#  Docker: pull новых образов
# ─────────────────────────────────────────────
log_section "🐳 Pull Docker образов"
log_info "Скачиваем актуальные образы из GHCR..."
docker compose -f docker-compose.prod.yml pull
log_done "Образы обновлены"

# ─────────────────────────────────────────────
#  Docker: перезапуск сервисов
# ─────────────────────────────────────────────
log_section "♻️  Перезапуск сервисов"
log_info "Останавливаем старые контейнеры и запускаем новые..."
docker compose -f docker-compose.prod.yml up -d --remove-orphans
log_done "Сервисы запущены"

# ─────────────────────────────────────────────
#  Миграции БД
# ─────────────────────────────────────────────
log_section "🗄️  Миграции базы данных"
log_info "Ожидаем готовности бота..."
sleep 5
log_info "Применяем pending миграции..."
docker compose -f docker-compose.prod.yml exec -T bot npx prisma migrate deploy \
  && log_done "Миграции применены" \
  || log_warn "Миграции: нет изменений или ошибка (проверь логи бота)"

# ─────────────────────────────────────────────
#  Cleanup
# ─────────────────────────────────────────────
log_section "🧹 Очистка"
log_info "Удаляем устаревшие Docker-образы..."
docker image prune -f --filter "until=24h"
log_done "Очистка завершена"

# ─────────────────────────────────────────────
#  Статус
# ─────────────────────────────────────────────
log_section "📊 Статус сервисов"
docker compose -f docker-compose.prod.yml ps

DEPLOY_END=$(date +%s)
DURATION=$(( DEPLOY_END - DEPLOY_START ))

log_section "✅ Деплой завершён за ${DURATION}с"
