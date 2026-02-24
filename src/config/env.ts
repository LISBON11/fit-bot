import { z } from 'zod';

/**
 * Zod-схема для валидации переменных окружения.
 * Проверяет все обязательные и опциональные переменные при старте приложения.
 */
const envSchema = z.object({
  BOT_TOKEN: z.string().min(1, 'BOT_TOKEN обязателен'),
  /** Используется для NLU (парсинг тренировок через DeepSeek V3) */
  DEEPSEEK_API_KEY: z.string().min(1, 'DEEPSEEK_API_KEY обязателен'),
  /** Используется для STT (Deepgram Nova-3) */
  DEEPGRAM_API_KEY: z.string().min(1, 'DEEPGRAM_API_KEY обязателен'),
  DATABASE_URL: z.string().url('DATABASE_URL должен быть валидным URL'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PUBLISH_CHAT_ID: z.string().min(1, 'PUBLISH_CHAT_ID обязателен'),
});

/** Тип конфигурации, выведенный из Zod-схемы */
export type EnvConfig = z.infer<typeof envSchema>;

/** Типизированный объект конфигурации (загружается один раз при старте) */
let _config: EnvConfig | null = null;

/**
 * Валидирует переменные окружения и возвращает типизированный объект конфигурации.
 * При невалидном конфиге — выбрасывает ошибку с указанием проблемных переменных.
 *
 * @returns Типизированный объект конфигурации
 * @throws Error с деталями невалидных переменных
 */
export function validateConfig(): EnvConfig {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errors = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');

    throw new Error(`❌ Невалидная конфигурация:\n${errors}`);
  }

  _config = result.data;
  return _config;
}

/**
 * Возвращает текущую конфигурацию.
 * Должна быть вызвана после `validateConfig()`.
 *
 * @returns Типизированный объект конфигурации
 * @throws Error если конфигурация ещё не загружена
 */
export function getConfig(): EnvConfig {
  if (!_config) {
    throw new Error('Конфигурация не загружена. Вызовите validateConfig() при старте.');
  }
  return _config;
}

/**
 * Сбрасывает конфигурацию для юнит-тестов.
 */
export function _resetConfigForTesting(): void {
  _config = null;
}

export { envSchema };
