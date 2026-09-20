import type { AuthData } from '@redux/auth/authTypes';

import { localStorageUtils } from '@utils/localstorage';
import { STORAGE_KEYS } from '@utils/storageKeys';

export const hasValidToken = (): boolean => {
    const authData = localStorageUtils.get<AuthData>(STORAGE_KEYS.auth);

    return Boolean(authData?.token);
};
