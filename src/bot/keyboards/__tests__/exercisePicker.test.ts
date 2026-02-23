import { createExercisePickerKeyboard } from '../exercisePicker.js';
import type { Exercise } from '@prisma/client';

describe('createExercisePickerKeyboard', () => {
  it('should create keyboard with options and new exercise button', () => {
    const options: Array<Pick<Exercise, 'id' | 'canonicalName' | 'displayNameRu'>> = [
      { id: '1', canonicalName: 'Pull up', displayNameRu: 'Подтягивание' },
      { id: '2', canonicalName: 'Push up', displayNameRu: null as unknown as string },
    ];

    const keyboard = createExercisePickerKeyboard(options);

    // grammy InlineKeyboard structure
    const inline_keyboard = keyboard.inline_keyboard;
    expect(inline_keyboard.length).toBeGreaterThanOrEqual(3);

    expect(inline_keyboard[0][0].text).toBe('Подтягивание');
    expect((inline_keyboard[0][0] as { callback_data: string }).callback_data).toBe('map:1');

    expect(inline_keyboard[1][0].text).toBe('Push up'); // fallback to canonicalName
    expect((inline_keyboard[1][0] as { callback_data: string }).callback_data).toBe('map:2');

    expect(inline_keyboard[2][0].text).toBe('➕ Создать новое (сохранить как есть)');
    expect((inline_keyboard[2][0] as { callback_data: string }).callback_data).toBe('new_exercise');
  });

  it('should create keyboard with only new exercise button if options are empty', () => {
    const keyboard = createExercisePickerKeyboard([]);

    const inline_keyboard = keyboard.inline_keyboard;
    expect(inline_keyboard.length).toBeGreaterThanOrEqual(1);
    expect(inline_keyboard[0][0].text).toBe('➕ Создать новое (сохранить как есть)');
    expect((inline_keyboard[0][0] as { callback_data: string }).callback_data).toBe('new_exercise');
  });
});
