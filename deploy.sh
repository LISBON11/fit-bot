#!/bin/bash
set -e

echo "🚀 Starting deployment..."

echo "📥 Pulling latest changes from main branch..."
git pull origin main

echo "🐳 Pulling latest Docker images from GHCR..."
docker compose -f docker-compose.prod.yml pull

echo "🚀 Starting services in detached mode..."
docker compose -f docker-compose.prod.yml up -d

echo "🔄 Applying pending database migrations..."
docker compose -f docker-compose.prod.yml exec -T bot npx prisma migrate deploy

echo "🧹 Cleaning up old Docker images..."
docker image prune -f

echo "✅ Deployment completed successfully!"
