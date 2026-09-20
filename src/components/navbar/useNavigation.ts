import { useAppDispatch, useAppSelector } from '@utils/hooks/storeHooks';

import { loginNavigationItem, logoutNavigationItem, navigationItems } from './navbar';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { logoutUser } from '@redux/auth/authSlice';
import { removeSocialState } from '@redux/social/socialSlice';

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

export const useLogout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [logoutAnchor, setLogoutAnchor] = useState<HTMLElement | null>(null);

    const handleLogoutClick = (event: React.MouseEvent<HTMLElement>): void => {
        setLogoutAnchor(event.currentTarget);
    };

    const handleLogout = (): void => {
        dispatch(logoutUser());
        dispatch(removeSocialState());
        setLogoutAnchor(null);
        navigate('/login');
    };

    return {
        logoutAnchor,
        setLogoutAnchor,
        handleLogoutClick,
        handleLogout,
    };
};
