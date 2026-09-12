import { AccountCircle, Search, TipsAndUpdates } from '@mui/icons-material';

export const navigationItems = [
    {
        label: 'Search',
        path: '/search',
        requiresAuth: false,
        icon: Search,
    },
    {
        label: 'Suggestions',
        path: '/suggestions',
        requiresAuth: true,
        icon: TipsAndUpdates,
    },
    {
        label: 'Profile',
        path: '/profile',
        requiresAuth: true,
        icon: AccountCircle,
    },
] as const;
