import { createBrowserRouter } from 'react-router';

import ReduxDemo from '@pages/Demo/Demo';
import NotFound from '@pages/NotFound/NotFound';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: ReduxDemo,
    },
    {
        path: '*',
        Component: NotFound,
    },
]);
