import { useAppSelector } from '@utils';

import { loginNavigationItem, logoutNavigationItem, navigationItems } from './navbar';

export const useNavigation = () => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    const user = useAppSelector((state) => state.auth.user);

    const items = navigationItems
        .filter((item) => !item.requiresAuth || isAuthenticated)
        .map((item) => ({
            ...item,
            path: item.label === 'Profile' && user ? `/profile/${user.login}` : item.path,
        }));

    return {
        items,
        loginItem: loginNavigationItem,
        logoutItem: logoutNavigationItem,
        isAuthenticated,
    };
};
