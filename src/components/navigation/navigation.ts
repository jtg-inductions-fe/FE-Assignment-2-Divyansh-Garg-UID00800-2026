import { AccountCircle, Search, TipsAndUpdates } from '@mui/icons-material';

import { useAppSelector } from '@/app/hooks';

export const useNavigationItems = () => {
    const user = useAppSelector((state) => state.auth.user);

    return [
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
            path: user ? `/profile/${user.login}` : '/profile',
            requiresAuth: true,
            icon: AccountCircle,
        },
    ] as const;
};
