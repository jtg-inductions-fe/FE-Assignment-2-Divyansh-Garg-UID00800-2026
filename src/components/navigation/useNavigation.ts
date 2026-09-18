import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { loginNavigationItem, logoutNavigationItem, navigationItems } from './navigation';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { logoutUser } from '@features/auth/authSlice';

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

    const handleLogoutClick = (event: React.MouseEvent<HTMLElement>) => {
        setLogoutAnchor(event.currentTarget);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
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
