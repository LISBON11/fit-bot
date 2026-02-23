import { jest } from '@jest/globals';
import { handleTextMessage } from '../textHandler.js';
import { createMockCtx } from '../../__tests__/utils/mockCtx.js';
import type { CustomContext } from '../../types.js';
import type { DeepMockProxy } from 'jest-mock-extended';

describe('textHandler', () => {
  let ctx: DeepMockProxy<CustomContext>;

  beforeEach(() => {
    ctx = createMockCtx();

    Object.assign(ctx, {
      message: { text: '' },
      conversation: { enter: jest.fn() },
    });
  });

  it('should return if no text message', async () => {
    if (ctx.message) ctx.message.text = undefined;
    await handleTextMessage(ctx);
    expect(ctx.conversation?.enter).not.toHaveBeenCalled();
  });

  it('should return if text starts with / (command)', async () => {
    if (ctx.message) ctx.message.text = '/start';
    await handleTextMessage(ctx);
    expect(ctx.conversation?.enter).not.toHaveBeenCalled();
  });

  it('should enter newWorkout conversation for normal text', async () => {
    if (ctx.message) ctx.message.text = 'My workout today';
    await handleTextMessage(ctx);
    expect(ctx.conversation?.enter).toHaveBeenCalledWith('newWorkout');
  });
});
