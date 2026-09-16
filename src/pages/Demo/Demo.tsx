import { useAppDispatch, useAppSelector } from '@app/hooks';

import { increment, decrement, setMessage } from '@features/demo/demoSlice';
import { loginUser, logoutUser } from '@features/auth/authSlice';

import Button from '@mui/material/Button';

function ReduxDemo() {
    const dispatch = useAppDispatch();

    const count = useAppSelector((state) => state.demo.count);
    const message = useAppSelector((state) => state.demo.message);

    const user = useAppSelector((state) => state.auth.user);
    const token = useAppSelector((state) => state.auth.token);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    function handleLogin() {
        dispatch(
            loginUser({
                user: {
                    login: 'divyanshgargJTG',
                    id: 315348310,
                    avatarUrl: 'https://avatars.githubusercontent.com/u/315348310?v=4',
                    htmlUrl: 'https://github.com/divyanshgargJTG',
                },
                token: 'Token Demo',
            }),
        );
    }

    function handleLogout() {
        dispatch(logoutUser());
    }

    return (
        <main>
            <h1>Redux Demo</h1>
            <section>
                <h2>Checking Demo Reducer</h2>
                <p>{message}</p>
                <p>Count: {count}</p>
                <Button variant="text" onClick={() => dispatch(increment())}>
                    Increment
                </Button>
                <Button variant="contained" onClick={() => dispatch(decrement())}>
                    Decrement
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => dispatch(setMessage('Checking redux working!!'))}
                >
                    Change Message
                </Button>
            </section>
            <section>
                <h2>Checking Auth Reducer</h2>
                <p>{isAuthenticated ? 'User Authenticated' : 'User not Authenticated'}</p>
                {user && (
                    <div>
                        <p>Logged in as: {user.login}</p>
                        <p>Demo id: {user.id}</p>
                        <a href="https://github.com/divyanshgargJTG">GitHub Profile</a>
                        <p>Demo Token: {token}</p>
                    </div>
                )}
                {!isAuthenticated ? (
                    <Button variant="contained" onClick={handleLogin}>
                        Demo Login
                    </Button>
                ) : (
                    <Button variant="text" onClick={handleLogout}>
                        Demo Logout
                    </Button>
                )}
            </section>
        </main>
    );
}

export default ReduxDemo;
