import { redirect } from 'react-router';

const hasValidToken = (): boolean => {
    try {
        const authData = localStorage.getItem('GitSearch_Auth');
        if (!authData) return false;

        const authDataParsed = JSON.parse(authData);
        return !!(authData && authDataParsed.token);
    } catch {
        return false;
    }
};

export const authLoader = async () => {
    if (!hasValidToken()) {
        return redirect('/login');
    }
    return null;
};

export const guestLoader = async () => {
    if (hasValidToken()) {
        return redirect('/');
    }
    return null;
};
