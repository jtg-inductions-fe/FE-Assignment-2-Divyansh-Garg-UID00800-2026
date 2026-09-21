import { useState } from 'react';

import { loginUser } from '@redux/auth/authSlice';
import { addFollowers } from '@redux/social/socialSlice';

import { useAppDispatch } from '@utils/hooks/storeHooks';

import { checkRegexFunction } from '@utils/helperFunctions';
import { authenticateWithGitHub } from '@utils/services/githubAuth';
import { fetchFollowing } from '@utils/services/githubFollowing';
import type { AuthData } from '@redux/auth/authTypes';

export const useGitHubAuth = () => {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState<AuthData | null>(null);

    const handleLogin = async (token: string) => {
        const trimmedToken = token.trim();

        if (!trimmedToken) {
            setError('Please enter your GitHub Personal Access Token.');

            return null;
        }

        if (!checkRegexFunction(trimmedToken)) {
            setError('Please enter your correct GitHub Personal Access Token.');

            return null;
        }

        setError('');
        setLoading(true);
        setResponse(null);

        try {
            const authResponse = await authenticateWithGitHub(trimmedToken);

            dispatch(loginUser(authResponse));

            const following = await fetchFollowing(authResponse.token);

            dispatch(addFollowers(following));

            setResponse(authResponse);

            return authResponse;
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Something went wrong while connecting to GitHub.',
            );

            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        response,
        handleLogin,
    };
};
