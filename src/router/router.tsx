import { createBrowserRouter } from 'react-router';

import AuthGuard from '@components/guard/AuthGuard';
import MainLayout from '@layouts/MainLayout';

import Login from '@pages/Login/Login';
import NotFound from '@pages/NotFound/NotFound';

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                element: <AuthGuard />,
                children: [
                    {
                        path: '/login',
                        element: <Login />,
                    },
                    {
                        path: '*',
                        element: <NotFound />,
                    },
                ],
            },
        ],
    },
]);
