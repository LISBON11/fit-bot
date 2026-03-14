import type { ChatCompletionMessageParam } from 'openai/resources/index.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { ParsedWorkoutSchema } from '../nlu.schema.js';
import { SELF_CORRECTION_RULES, STRUCTURAL_OPERATION_RULES } from './workout-prompt.shared.js';

/**
 * Формирует массив сообщений (промпт) для DeepSeek для первичного парсинга тренировки.
 *
 * Промпт поддерживает:
 * - Извлечение упражнений, подходов, веса, повторений, дистанции, времени
 * - Маппинг по базе упражнений пользователя (`knownExercises`)
 * - Самокоррекции и отмены в рамках одного сообщения
 * - Структурные изменения прямо в тексте диктовки (перестановка, удаление, вставка)
 *
 * @param params Параметры промпта
 * @param params.rawText Текст пользователя с описанием тренировки
 * @param params.currentDate Текущая дата в формате YYYY-MM-DD
 * @param params.knownExercises Список упражнений из базы для маппинга
 * @returns Массив сообщений для OpenAI API
 */
export function buildParsePrompt({
  rawText,
  currentDate,
  knownExercises = [],
}: {
  rawText: string;
  currentDate: string;
  knownExercises: { id: string; name: string; aliases: string[] }[];
}): ChatCompletionMessageParam[] {
  const knownExercisesText =
    knownExercises.length > 0
      ? `Доступные упражнения в базе:\n${knownExercises.map((e) => `- ID: ${e.id}, Название: ${e.name} (Алиасы: ${e.aliases.join(', ')})`).join('\n')}`
      : `У вас пока нет доступа к базе упражнений пользователя. Заполняйте поля originalName и оставляйте mappedExerciseId пустым.`;

  const systemMessage = `Вы — профессиональный фитнес-ассистент. Ваша задача — извлечь данные о тренировке из свободного текста (или транскрибированного голосового сообщения) пользователя и вернуть их строго в формате JSON, соответствующем заданной схеме.

ГЛАВНЫЕ ПРАВИЛА:
1. Вы всегда возвращаете ТОЛЬКО валидный JSON, без markdown оберток или дополнительного текста.
2. Текущая дата (для подстановки, если пользователь говорит "сегодня", "вчера" и т.д.): ${currentDate}. Все даты должны быть в формате YYYY-MM-DD.
3. Анализируй контекст, чтобы выявить: подходы (sets), повторения (reps), вес отягощения в кг (weight), дистанцию (distance) и время (duration).
4. Если упражнение названо очень обще (например "тяга", "жим"), и в базе нет точного совпадения, устанавливай "isAmbiguous": true.
5. Любые жалобы на боль, самочувствие, оценку тяжести, которые не ложатся в параметры RPE — помещай в "comments".
6. Если комментарий относится к конкретному подходу/упражнению, добавляй его в "comments" внутри "exercises". Если к тренировке в целом — в "generalComments".
7. Обрати внимание на место проведения тренировки. Это может быть любой город, название тренажерного зала (например, "Триумф"), "дома", "улица" или их комбинация. Записывай это в поле location в удобном читаемом формате (например, "Алушта, дома", "зал Триумф", "дома", "Севастополь"). Если локация не указана, возвращай null.

${SELF_CORRECTION_RULES}

${STRUCTURAL_OPERATION_RULES}

ПРИМЕР СЛОЖНОГО ВВОДА (диктовка + попутное структурное редактирование):
Пользователь: "(надиктовал тренировку...) хотя знаешь, поменяй местами второе и пятое упражнение, первое вообще удали, и в четвёртом убери первый подход, а после «Жим штанги лёжа» добавь приседания со штангой 20 кг на 30 раз 2 подхода"
→ Применяй все структурные правки к уже разобранной тренировке прямо в рамках этого же сообщения. Итоговый JSON должен отражать тренировку ПОСЛЕ всех исправлений.

${knownExercisesText}

Ожидаемая JSON схема:
${JSON.stringify(zodToJsonSchema(ParsedWorkoutSchema, 'ParsedWorkout'), null, 2)}
`;

  return [
    { role: 'system', content: systemMessage },
    { role: 'user', content: rawText },
  ];
}
