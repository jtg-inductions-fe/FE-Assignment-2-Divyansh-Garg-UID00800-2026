import { configureStore } from '@reduxjs/toolkit';

import demoReducer from './demo/demoSlice';
import authReducer from './auth/authSlice';
import socialReducer from './social/socialSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        demo: demoReducer,
        social: socialReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
