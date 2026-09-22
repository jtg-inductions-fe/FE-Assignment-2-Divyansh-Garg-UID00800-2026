import { createBrowserRouter } from 'react-router';

import { AuthGuard } from '@components/AuthGuard';
import { MainLayout } from '@layouts';

import { Login } from '@pages/Login';
import { NotFound } from '@pages/NotFound';
import { Search } from '@pages/Search';
import { Profile } from '@pages/Profile';

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/search',
                element: <Search />,
            },
            {
                path: '/search/:username',
                element: <Search />,
            },
            {
                path: '/profile',
                element: <Search />,
            },
            {
                path: '/profile/:username',
                element: <Profile />,
            },
            {
                element: <AuthGuard />,
                children: [
                    {
                        path: '/',
                        element: <Search />,
                    },
                    {
                        path: '/login',
                        element: <Login />,
                    },
                ],
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);
