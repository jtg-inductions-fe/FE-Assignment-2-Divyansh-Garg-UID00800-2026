import { Navigate, Outlet, useLocation } from 'react-router';

import { hasValidToken } from '@utils/auth';

const AuthGuard = () => {
    const { pathname } = useLocation();
    const isLoggedIn = hasValidToken();

    const isLoginPage = pathname === '/login';
    const isHomePage = pathname === '/';

    if (!isLoggedIn && !isLoginPage) {
        return <Navigate to="/login" replace />;
    }

    if (isLoggedIn && isLoginPage) {
        return <Navigate to="/search" replace />;
    }

    if (isLoggedIn && isHomePage) {
        return <Navigate to="/search" replace />;
    }

    return <Outlet />;
};

export default AuthGuard;
