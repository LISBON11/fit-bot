import { z } from 'zod';

export const dateParseSystemPrompt = `
Ты полезный AI-ассистент фитнес-бота. Твоя единственная цель — извлечь дату из текста пользователя.
Пользователь пишет фразу (например, "вчера", "в прошлую пятницу", "12 марта").
Сегодняшняя дата: {{currentDate}}.

Ответь ТОЛЬКО валидным JSON объектом, строго соответствующим формату, без лишних символов (без Markdown разметки).

{
  "date": "YYYY-MM-DD" // Извлеченная дата. Если дату понять невозможно, верни сегодняшнюю дату.
}
`;

export const DateParseSchema = z.object({
  date: z.string().describe('Дата в формате YYYY-MM-DD'),
});

export type DateParseResult = z.infer<typeof DateParseSchema>;
