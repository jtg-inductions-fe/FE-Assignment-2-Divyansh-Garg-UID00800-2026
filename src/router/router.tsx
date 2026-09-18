import { createBrowserRouter } from 'react-router';

import MainLayout from '@layouts/MainLayout';
import NotFound from '@pages/NotFound/NotFound';
import Login from '@pages/Login/Login';

import { guestLoader } from '@utils/loaders';

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
                loader: guestLoader,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);
