import { createWorkoutPreviewKeyboard } from '../workoutPreview.js';

describe('createWorkoutPreviewKeyboard', () => {
  it('should create keyboard with approve, edit, and cancel buttons', () => {
    const keyboard = createWorkoutPreviewKeyboard('w1');
    const inline_keyboard = keyboard.inline_keyboard;

    expect(inline_keyboard.length).toBe(3);

    expect(inline_keyboard[0][0].text).toBe('✅ Approve');
    expect((inline_keyboard[0][0] as { callback_data: string }).callback_data).toBe('appr:w1');

    expect(inline_keyboard[1][0].text).toBe('✏️ Edit');
    expect((inline_keyboard[1][0] as { callback_data: string }).callback_data).toBe('edit:w1');

    expect(inline_keyboard[2][0].text).toBe('❌ Cancel');
    expect((inline_keyboard[2][0] as { callback_data: string }).callback_data).toBe('canc:w1');
  });
});
