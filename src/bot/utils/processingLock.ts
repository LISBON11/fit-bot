import { getRedisClient } from '../../config/redis.js';

const LOCK_PREFIX = 'processing_lock:';
const LOCK_TTL_SECONDS = 60; // 1 minute max processing time

/**
 * Устанавливает блокировку для пользователя через Redis SETNX.
 * @param userId ID пользователя Telegram
 * @returns true если блокировка установлена успешно, false если уже заблокирован
 */
export async function lockUser(userId: number): Promise<boolean> {
  const client = getRedisClient();
  const key = `${LOCK_PREFIX}${userId}`;

  // SET key value NX EX seconds
  // NX = set only if not exists
  // EX = set expire time in seconds
  const result = await client.set(key, '1', 'EX', LOCK_TTL_SECONDS, 'NX');

  return result === 'OK';
}

/**
 * Снимает блокировку для пользователя.
 * @param userId ID пользователя Telegram
 */
export async function unlockUser(userId: number): Promise<void> {
  const client = getRedisClient();
  const key = `${LOCK_PREFIX}${userId}`;

  await client.del(key);
}
