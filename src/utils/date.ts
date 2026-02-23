/**
 * Утилиты для работы с датами и часовыми поясами.
 */

/**
 * Получить текущую дату в формате YYYY-MM-DD с учетом заданного часового пояса.
 * По умолчанию используется 'Europe/Moscow', так как сервер может быть в UTC,
 * а пользователи в основном из РФ.
 *
 * @param timeZone Часовой пояс (по умолчанию 'Europe/Moscow')
 * @returns Строка вида '2026-02-28'
 */
export function getCurrentDateString(timeZone: string = 'Europe/Moscow'): string {
  // Используем Intl.DateTimeFormat для точного получения YYYY-MM-DD в нужном поясе
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return formatter.format(new Date());
}
