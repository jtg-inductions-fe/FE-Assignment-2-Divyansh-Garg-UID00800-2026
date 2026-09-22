import { useState } from 'react';

import type { AuthUser } from '@redux/auth';

import { fetchGitHubProfile } from '@utils/services/githubProfile';
import { useAppSelector } from '@utils';

export const useGithubProfile = () => {
    // we do not have any redux state for search, that's why these states are made using useState
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState<AuthUser | null>(null);

    const token = useAppSelector((state) => state.auth.token);

    const handleProfileSearch = async (username: string) => {
        const trimmedUsername = username.trim();

        if (!trimmedUsername) {
            setError('Please enter a GitHub username.');
            setResponse(null);

            return null;
        }

        setLoading(true);
        setError('');
        setResponse(null);

        try {
            const data = await fetchGitHubProfile(trimmedUsername, token);

            setResponse(data);

            return data;
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
        handleProfileSearch,
    };
};
