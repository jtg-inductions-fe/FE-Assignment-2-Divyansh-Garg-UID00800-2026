import { createBrowserRouter } from 'react-router';

import { AuthGuard } from '@components/AuthGuard';
import { MainLayout } from '@layouts';

import { Login } from '@pages/Login';
import { NotFound } from '@pages/NotFound';

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
