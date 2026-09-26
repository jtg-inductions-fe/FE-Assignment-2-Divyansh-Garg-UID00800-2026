import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { localStorageUtils, STORAGE_KEYS } from '@utils';

import type { AuthData, AuthState } from './authTypes';

const storedAuth = localStorageUtils.get<AuthData>(STORAGE_KEYS.auth);

const initialState: AuthState = {
    user: storedAuth?.user ?? null,
    token: storedAuth?.token ?? null,
    isAuthenticated: storedAuth !== null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginPending: (state) => {
            state.loading = true;
            state.error = null;
        },

        loginSuccess: (state, action: PayloadAction<AuthData>) => {
            const { user, token } = action.payload;

            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;

            localStorageUtils.set(STORAGE_KEYS.auth, action.payload);
        },

        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        increaseFollowingCount: (state) => {
            if (state.user) {
                const following = state.user.following;
                state.user.following = following + 1;
            }
        },

        decreaseFollowingCount: (state) => {
            if (state.user) {
                const following = state.user.following;
                if (following > 0) state.user.following = following - 1;
            }
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

export const {
    loginPending,
    loginSuccess,
    loginFailure,
    increaseFollowingCount,
    decreaseFollowingCount,
    logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
