import { describe, expect, test } from 'vitest';

import demoReducer, { increment, decrement, setMessage } from './demoSlice';
import type { DemoState } from './demoSlice';

function createDemo(count: number, message: string): DemoState {
    return { count, message };
}

describe('demoSlice', () => {
    test('it should make correct demo', () => {
        const demo = createDemo(1, 'Demo created');

        expect(demo).toEqual({ count: 1, message: 'Demo created' });
        expect(demo.message).toBe('Demo created');
    });

    test('it should return the initial state', () => {
        const state = demoReducer(undefined, { type: 'unknown' });

        expect(state).toEqual({ count: 0, message: 'Redux working' });
    });

    test('it should increment the count', () => {
        const state = demoReducer({ count: 0, message: 'Redux working' }, increment());

        expect(state.count).toBe(1);
    });

    test('it should decrement the count', () => {
        const state = demoReducer(
            { count: 4, message: 'Testing with different state.' },
            decrement(),
        );

        expect(state.count).toBe(3);
    });

    test('should update the message', () => {
        const state = demoReducer(
            { count: 0, message: 'Redux working' },
            setMessage('Test message'),
        );

        expect(state.message).toBe('Test message');
    });
});
