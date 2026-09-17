import { configureStore } from '@reduxjs/toolkit';

import demoReducer from '@features/demo/demoSlice';
import authReducer from '@features/auth/authSlice';
import socialReducer from '@features/social/socialSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        demo: demoReducer,
        social: socialReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
