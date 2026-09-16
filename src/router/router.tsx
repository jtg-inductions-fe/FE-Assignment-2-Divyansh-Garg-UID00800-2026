import { createBrowserRouter } from 'react-router';

import MainLayout from '@layouts/MainLayout';
import NotFound from '@pages/NotFound/NotFound';
import Login from '@pages/Login/Login';
import Search from '@pages/Search/Search';
import Profile from '@pages/Profile/Profile';

import { guestLoader } from '@utils/loaders';

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Search />,
            },
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
                path: 'profile/:username',
                element: <Profile />,
            },
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
