import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface DemoState {
    count: number;
    message: string;
}

const initialState: DemoState = {
    count: 0,
    message: 'Redux working',
};

const demoSlice = createSlice({
    name: 'demo',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },

        decrement: (state) => {
            state.count -= 1;
        },

        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
    },
});

export const { increment, decrement, setMessage } = demoSlice.actions;
export default demoSlice.reducer;
