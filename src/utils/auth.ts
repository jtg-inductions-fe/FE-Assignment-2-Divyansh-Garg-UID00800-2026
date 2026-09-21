import type { AuthData } from '@redux/auth';

import { localStorageUtils, STORAGE_KEYS } from '@utils';

export const hasValidToken = (): boolean => {
    const authData = localStorageUtils.get<AuthData>(STORAGE_KEYS.auth);

    return Boolean(authData?.token);
};
