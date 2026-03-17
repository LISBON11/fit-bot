import { getRedisClient } from '../../config/redis.js';
import type { ActiveStatusMessage } from '../types.js';

const REDIS_PREFIX = 'fitbot:user_context:';
const TTL_SECONDS = 3600; // 1 hour

export interface UserContext {
  activeStatusMessage?: ActiveStatusMessage;
  currentDraftId?: string;
}

/**
 * Сохраняет контекст пользователя в Redis.
 * Мерджит новые данные с существующими.
 */
export async function saveUserContext(userId: number, data: Partial<UserContext>): Promise<void> {
  const redis = getRedisClient();
  const key = `${REDIS_PREFIX}${userId}`;
  const existing = await getUserContext(userId);
  const merged = { ...existing, ...data };
  await redis.set(key, JSON.stringify(merged), 'EX', TTL_SECONDS);
}

/**
 * Получает контекст пользователя из Redis.
 */
export async function getUserContext(userId: number): Promise<UserContext> {
  const redis = getRedisClient();
  const key = `${REDIS_PREFIX}${userId}`;
  const data = await redis.get(key);
  return data ? JSON.parse(data) : {};
}

/**
 * Очищает контекст пользователя в Redis.
 */
export async function clearUserContext(userId: number): Promise<void> {
  const redis = getRedisClient();
  const key = `${REDIS_PREFIX}${userId}`;
  await redis.del(key);
}
