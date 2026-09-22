import { useState } from 'react';

import type { AuthUser } from '@redux/auth';

import { fetchGitHubProfile } from '@utils/services/githubProfile';

export const useGithubProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState<AuthUser | null>(null);

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
            const data = await fetchGitHubProfile(trimmedUsername);

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
