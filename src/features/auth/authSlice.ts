import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
    login: string;
    id: number;
    avatarUrl: string;
    htmlUrl: string;
}

interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<{ user: AuthUser; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },

        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
