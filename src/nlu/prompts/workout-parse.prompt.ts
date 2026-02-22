import type { ChatCompletionMessageParam } from 'openai/resources/index.js';

// Используем нативный формат JSON Schema для OpenAI (Structured Outputs API)
// В последних версиях OpenAI API можно использовать response_format: { type: "json_schema", json_schema: { name: "...", schema: ... } }

export function buildParsePrompt(
  rawText: string,
  currentDate: string,
  knownExercises: { id: string; name: string; aliases: string[] }[] = [],
): ChatCompletionMessageParam[] {
  const knownExercisesText =
    knownExercises.length > 0
      ? `Доступные упражнения в базе:\n${knownExercises.map((e) => `- ID: ${e.id}, Название: ${e.name} (Алиасы: ${e.aliases.join(', ')})`).join('\n')}`
      : `У вас пока нет доступа к базе упражнений пользователя. Заполняйте поля originalName и оставляйте mappedExerciseId пустым.`;

  const systemMessage = `Вы — профессиональный фитнес-ассистент. Ваша задача — извлечь данные о тренировке из свободного текста (или транскрибированного голосового сообщения) пользователя и вернуть их строго в формате JSON, соответствующем заданной схеме.

ГЛАВНЫЕ ПРАВИЛА:
1. Вы всегда возвращаете ТОЛЬКО валидный JSON, без markdown оберток или дополнительного текста.
2. Текущая дата (для подстановки, если пользователь говорит "сегодня", "вчера" и т.д.): ${currentDate}. Все даты должны быть в формате YYYY-MM-DD.
3. Анализируй контекст, чтобы выявить: подходы (sets), повторения (reps), вес отягощения в кг (weight), дистанцию (distance) и время (duration).
4. Если упражнение названо очень обще (مثلاً "тяга", "жим"), и в базе нет точного совпадения, устанавливай "isAmbiguous": true.
5. Любые жалобы на боль, самочувствие, оценку тяжести, которые не ложатся в параметры RPE — помещай в "comments".
6. Если комментарий относится к конкретному подходу/упражнению, добавляй его в "comments" внутри "exercises". Если к тренировке в целом — в "generalComments".

${knownExercisesText}

Ожидаемая JSON схема: (вас вызовут с Structured Output форматом, верните данные строго по нему).`;

  return [
    { role: 'system', content: systemMessage },
    { role: 'user', content: rawText },
  ];
}
