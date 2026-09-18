import { createBrowserRouter } from 'react-router';

import MainLayout from '@layouts/MainLayout';
import NotFound from '@pages/NotFound/NotFound';
import ReduxDemo from '@pages/Demo/Demo';

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <ReduxDemo />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);
