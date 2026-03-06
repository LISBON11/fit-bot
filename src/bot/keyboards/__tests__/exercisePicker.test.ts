import { createExercisePickerKeyboard } from '../exercisePicker.js';
import type { Exercise } from '../../../generated/prisma/index.js';

describe('createExercisePickerKeyboard', () => {
  const options: Array<Pick<Exercise, 'id' | 'canonicalName' | 'displayNameRu'>> = [
    { id: '1', canonicalName: 'Pull up', displayNameRu: 'Подтягивание' },
    { id: '2', canonicalName: 'Push up', displayNameRu: null as unknown as string },
  ];

  it('should create keyboard with exercise options', () => {
    const keyboard = createExercisePickerKeyboard({ options, originalName: 'какое-то упражнение' });

    const inline_keyboard = keyboard.inline_keyboard;
    expect(inline_keyboard[0][0].text).toBe('Подтягивание');
    expect((inline_keyboard[0][0] as { callback_data: string }).callback_data).toBe('map:1');

    expect(inline_keyboard[1][0].text).toBe('Push up'); // fallback to canonicalName
    expect((inline_keyboard[1][0] as { callback_data: string }).callback_data).toBe('map:2');
  });

  it('should always include new_exercise and voice_list buttons', () => {
    const keyboard = createExercisePickerKeyboard({ options, originalName: 'джим' });
    const inline_keyboard = keyboard.inline_keyboard;

    const allButtons = inline_keyboard.flat().filter((btn) => 'callback_data' in btn) as Array<{
      callback_data: string;
      text: string;
    }>;
    const callbackDatas = allButtons.map((btn) => btn.callback_data);
    expect(callbackDatas).toContain('new_exercise');
    expect(callbackDatas).toContain('voice_list');
  });

  it('should show originalName in create button label', () => {
    const keyboard = createExercisePickerKeyboard({ options: [], originalName: 'джим сидя' });
    const inline_keyboard = keyboard.inline_keyboard;

    const createBtn = inline_keyboard.find(
      (row) => (row[0] as { callback_data: string }).callback_data === 'new_exercise',
    );
    expect(createBtn).toBeDefined();
    if (createBtn) {
      expect(createBtn[0].text).toContain('джим сидя');
    }
  });

  it('should truncate long originalName in create button label', () => {
    const longName = 'очень длинное название упражнения которое не помещается';
    const keyboard = createExercisePickerKeyboard({ options: [], originalName: longName });
    const inline_keyboard = keyboard.inline_keyboard;

    const createBtn = inline_keyboard.find(
      (row) => (row[0] as { callback_data: string }).callback_data === 'new_exercise',
    );
    expect(createBtn).toBeDefined();
    if (createBtn) {
      expect(createBtn[0].text).toContain('…');
    }
  });

  it('should create keyboard with only action buttons if options are empty', () => {
    const keyboard = createExercisePickerKeyboard({ options: [], originalName: 'неизвестное' });
    const inline_keyboard = keyboard.inline_keyboard;

    // grammy добавляет пустую строку после последнего .row()
    // Реальных кнопок должно быть 2: new_exercise и voice_list
    const allButtons = inline_keyboard.flat().filter((btn) => 'callback_data' in btn) as Array<{
      callback_data: string;
      text: string;
    }>;
    expect(allButtons).toHaveLength(2);
    expect(allButtons.map((b) => b.callback_data)).toEqual(['new_exercise', 'voice_list']);
  });
});
