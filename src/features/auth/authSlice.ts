import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { clearAuth, getAuth, saveAuth } from './authStorage';
import type { AuthData, AuthState } from './authTypes';

const storedAuth = getAuth();

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

            saveAuth({
                user,
                token,
            });
        },

        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            clearAuth();
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
