import type { SvgIconComponent } from '@mui/icons-material';

import { AccountCircle, Login, Logout, Search, TipsAndUpdates } from '@mui/icons-material';

export interface NavigationItem {
    label: string;
    path: string;
    icon: SvgIconComponent;
    requiresAuth: boolean;
}

export const navigationItems: NavigationItem[] = [
    {
        label: 'Search',
        path: '/search',
        icon: Search,
        requiresAuth: false,
    },
    {
        label: 'Suggestions',
        path: '/suggestions',
        icon: TipsAndUpdates,
        requiresAuth: true,
    },
    {
        label: 'Profile',
        path: '/profile',
        icon: AccountCircle,
        requiresAuth: true,
    },
];

export const loginNavigationItem: NavigationItem = {
    label: 'Login',
    path: '/login',
    icon: Login,
    requiresAuth: false,
};

export const logoutNavigationItem: NavigationItem = {
    label: 'Logout',
    path: '',
    icon: Logout,
    requiresAuth: true,
};
