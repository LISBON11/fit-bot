# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Копируем метаданные пакетов и схему БД
COPY package*.json ./
COPY prisma ./prisma/

# Устанавливаем все зависимости (включая dev)
RUN npm ci

# Генерируем Prisma клиент
RUN npx prisma generate

# Копируем исходный код бота и компилируем
COPY src ./src/
COPY tsconfig.json ./
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app

# Устанавливаем ffmpeg для конвертации голосовых в STT
RUN apk add --no-cache ffmpeg

# Копируем необходимые файлы из build стадии
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma

# Запускаем бота
CMD ["node", "dist/index.js"]
