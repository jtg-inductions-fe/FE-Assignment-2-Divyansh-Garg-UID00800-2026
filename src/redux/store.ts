import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth';
import { socialReducer } from './social';
import { sidebarReducer } from './sidebar';
import { suggestionsReducer } from './suggestions';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        social: socialReducer,
        sidebar: sidebarReducer,
        suggestions: suggestionsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
