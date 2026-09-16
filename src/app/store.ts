import { configureStore } from '@reduxjs/toolkit';

import demoReducer from '@features/demo/demoSlice';
import authReducer from '@features/auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        demo: demoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
