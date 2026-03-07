import {
  createMuscleGroupPickerKeyboard,
  MUSCLE_GROUP_CALLBACK_REGEX,
  MUSCLE_GROUPS,
} from '../muscleGroupPicker.js';
import type { MuscleGroupEntry } from '../muscleGroupPicker.js';
import { Muscle } from '../../../generated/prisma/index.js';

describe('createMuscleGroupPickerKeyboard', () => {
  const groups: MuscleGroupEntry[] = [
    { label: 'Грудь', dbValues: [Muscle.CHEST] },
    { label: 'Спина', dbValues: [Muscle.BACK] },
    { label: 'Ноги', dbValues: [Muscle.LEGS] },
  ];

  it('should create a button for each muscle group with mg:{index} callback', () => {
    const keyboard = createMuscleGroupPickerKeyboard({ groups });
    const allButtons = keyboard.inline_keyboard
      .flat()
      .filter((btn) => 'callback_data' in btn) as Array<{ callback_data: string; text: string }>;

    const groupButtons = allButtons.filter((b) => b.callback_data !== 'mg:all');
    expect(groupButtons).toHaveLength(groups.length);
    // callback содержит индекс группы, а не название
    expect(groupButtons[0].callback_data).toBe('mg:0');
    expect(groupButtons[1].callback_data).toBe('mg:1');
    expect(groupButtons[2].callback_data).toBe('mg:2');
    // label отображается в тексте кнопки
    expect(groupButtons[0].text).toContain('Грудь');
    expect(groupButtons[1].text).toContain('Спина');
  });

  it('should always include a "Все упражнения" button with mg:all callback', () => {
    const keyboard = createMuscleGroupPickerKeyboard({ groups });
    const allButtons = keyboard.inline_keyboard
      .flat()
      .filter((btn) => 'callback_data' in btn) as Array<{ callback_data: string; text: string }>;

    const allBtn = allButtons.find((b) => b.callback_data === 'mg:all');
    expect(allBtn).toBeDefined();
    expect(allBtn?.text).toContain('Все');
  });

  it('should work with empty muscle groups list (only "Все" button)', () => {
    const keyboard = createMuscleGroupPickerKeyboard({ groups: [] });
    const allButtons = keyboard.inline_keyboard
      .flat()
      .filter((btn) => 'callback_data' in btn) as Array<{ callback_data: string; text: string }>;

    expect(allButtons).toHaveLength(1);
    expect(allButtons[0].callback_data).toBe('mg:all');
  });

  it('should use MUSCLE_GROUPS constant by default (consistency check)', () => {
    // Проверяем что у всех записей есть label (строка) и dbValues (непустой массив)
    for (const entry of MUSCLE_GROUPS) {
      expect(typeof entry.label).toBe('string');
      expect(entry.dbValues.length).toBeGreaterThan(0);
    }
  });
});

describe('MUSCLE_GROUP_CALLBACK_REGEX', () => {
  it('should match strings starting with mg:', () => {
    expect(MUSCLE_GROUP_CALLBACK_REGEX.test('mg:0')).toBe(true);
    expect(MUSCLE_GROUP_CALLBACK_REGEX.test('mg:all')).toBe(true);
    expect(MUSCLE_GROUP_CALLBACK_REGEX.test('mg:9')).toBe(true);
    expect(MUSCLE_GROUP_CALLBACK_REGEX.test('map:e1')).toBe(false);
    expect(MUSCLE_GROUP_CALLBACK_REGEX.test('new_exercise')).toBe(false);
  });
});
