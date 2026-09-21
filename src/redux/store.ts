import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth';
import { socialReducer } from './social';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        social: socialReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
