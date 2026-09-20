import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { localStorageUtils } from '@utils/localstorage';
import { STORAGE_KEYS } from '@utils/storageKeys';

import type { AuthData, AuthState } from './authTypes';

const storedAuth = localStorageUtils.get<AuthData>(STORAGE_KEYS.auth);

const initialState: AuthState = {
    user: storedAuth?.user ?? null,
    token: storedAuth?.token ?? null,
    isAuthenticated: storedAuth !== null,
};

const authSlice = createSlice({
    name: 'auth',

    initialState,

    reducers: {
        loginUser: (state, action: PayloadAction<AuthData>) => {
            const { user, token } = action.payload;

            state.user = user;
            state.token = token;
            state.isAuthenticated = true;

            localStorageUtils.set(STORAGE_KEYS.auth, { user, token });
        },

        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            localStorageUtils.remove(STORAGE_KEYS.auth);
            localStorageUtils.remove(STORAGE_KEYS.following);
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
