import type { AuthData } from './authTypes';

const AUTH_STORAGE_KEY = 'GitSearch_Auth';
const SOCIAL_STORAGE_KEY = 'AuthUser_Following';

export const saveAuth = (authData: AuthData): void => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
};

export const getAuth = (): AuthData | null => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedAuth) {
        return null;
    }

    try {
        return JSON.parse(storedAuth) as AuthData;
    } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
    }
};

export const clearAuth = (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(SOCIAL_STORAGE_KEY);
};
