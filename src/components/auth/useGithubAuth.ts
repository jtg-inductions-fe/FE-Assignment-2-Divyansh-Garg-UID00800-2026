import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';

import { useAppDispatch } from '@app/hooks';

import { loginUser } from '@features/auth/authSlice';
import { addFollowers } from '@features/social/socialSlice';

import type { AuthUser } from '@features/auth/authTypes';

import { checkRegexFunction, snakeToCamelCase } from '@utils/helperFunctions';
import { fetchFollowers } from '@utils/followUnfollow';
import { BASE_URL, AUTH_URL } from '@utils/urls';

export const useGitHubAuth = () => {
    const URL = `${BASE_URL}/${AUTH_URL}`;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [token, setToken] = useState('');
    const [showToken, setShowToken] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTokenChange = (event: ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);
        if (error) {
            setError('');
        }
    };

    const toggleShowToken = () => setShowToken((prev) => !prev);

    const handleLogin = async () => {
        const trimmedToken = token.trim();

        if (!trimmedToken) {
            setError('Please enter your GitHub Personal Access Token.');
            return;
        }

        if (!checkRegexFunction(trimmedToken)) {
            setError('Please enter your correct GitHub Personal Access Token.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await fetch(URL, {
                headers: {
                    Authorization: `Bearer ${trimmedToken}`,
                    Accept: 'application/vnd.github+json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid GitHub Personal Access Token.');
                }
                throw new Error('Unable to authenticate with GitHub.');
            }

            const data = await response.json();
            const formattedData = snakeToCamelCase<typeof data, AuthUser>(data);
            const githubUser: AuthUser = formattedData;

            dispatch(
                loginUser({
                    user: githubUser,
                    token: trimmedToken,
                }),
            );

            navigate('/search');

            const socialUsers = await fetchFollowers(trimmedToken);
            if (socialUsers) {
                dispatch(addFollowers(socialUsers));
            }
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Something went wrong while connecting to GitHub.',
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        token,
        showToken,
        loading,
        error,
        handleTokenChange,
        toggleShowToken,
        handleLogin,
    };
};
