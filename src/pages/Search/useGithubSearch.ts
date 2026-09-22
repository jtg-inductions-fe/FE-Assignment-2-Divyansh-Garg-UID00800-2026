import { useState } from 'react';

import { searchGitHubUsers, type GithubSearchResponse } from '@utils/services';

export const useGitHubSearch = () => {
    // we do not have any redux state for search, that's why these states are made using useState
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState<GithubSearchResponse | null>(null);

    const handleSearch = async (username: string) => {
        const trimmedUsername = username.trim();

        if (!trimmedUsername) {
            setError('Please enter a GitHub username to search.');
            setResponse(null);

            return null;
        }

        setLoading(true);
        setError('');
        setResponse(null);

        try {
            const data = await searchGitHubUsers(trimmedUsername);
            setResponse(data);

            return data;
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Unable to search GitHub users.');

            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        response,
        handleSearch,
    };
};
