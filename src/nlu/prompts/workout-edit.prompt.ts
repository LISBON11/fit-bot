import type { ChatCompletionMessageParam } from 'openai/resources/index.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { ParsedWorkoutSchema } from '../nlu.schema.js';

export function buildEditPrompt({
  currentWorkoutJson,
  rawText,
  currentDate,
}: {
  currentWorkoutJson: string;
  rawText: string;
  currentDate: string;
}): ChatCompletionMessageParam[] {
  const systemMessage = `Вы — профессиональный фитнес-ассистент. Ваша задача — применить изменения к существующей тренировке пользователя на основе его текстового или голосового запроса и вернуть ПОЛНУЮ обновленную тренировку строго в формате JSON, соответствующем заданной схеме.

ГЛАВНЫЕ ПРАВИЛА:
1. Текущая дата: ${currentDate}.
2. Пользователь передал "дельту" (инструкции, что нужно изменить, добавить или удалить).
3. Внимательно прочтите текущую тренировку и примените к ней изменения пользователя:
   - Если нужно обновить вес, повторения или добавить подходы в существующем упражнении — измените данные именно этого упражнения.
   - Если нужно удалить упражнение — просто не включайте его в итоговый массив.
   - Если нужно добавить новое упражнение — добавьте его как новый элемент массива.
4. ВЕРНИТЕ ПОЛНЫЙ ОБНОВЛЕННЫЙ JSON ТРЕНИРОВКИ. Оставьте без изменений те упражнения, подходы и комментарии, о которых пользователь не упоминал, чтобы они не потерялись.
5. Ваша итоговая структура должна полностью описывать тренировку после всех правок.

Текущая тренировка в формате JSON (до правок):
${currentWorkoutJson}

Ожидаемая JSON схема (ВНИМАНИЕ: возвращайте структуру, полностью описывающую финальную тренировку. В случае неопределенности названия упражнения ставьте isAmbiguous: true):
${JSON.stringify(zodToJsonSchema(ParsedWorkoutSchema, 'ParsedWorkout'), null, 2)}
`;

  return [
    { role: 'system', content: systemMessage },
    { role: 'user', content: rawText },
  ];
}
