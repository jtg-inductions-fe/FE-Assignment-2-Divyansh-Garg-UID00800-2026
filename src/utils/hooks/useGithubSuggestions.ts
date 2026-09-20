import { useState } from 'react';

import type { GithubUser } from '@utils/services/githubSearch';
import { fetchGitHubSuggestions } from '@utils/services/githubSuggestions';

export const useGithubSuggestions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState<GithubUser[]>([]);

    const handleSuggestionsSearch = async (token: string, since: number) => {
        const trimmedToken = token.trim();

        if (!trimmedToken) {
            setError('Please Login again to access Suggestions.');
            setResponse([]);
            return null;
        }

        setLoading(true);
        setError('');
        setResponse([]);

        try {
            const data = await fetchGitHubSuggestions(trimmedToken, since);

            setResponse(data);

            return data;
        } catch (error) {
            setResponse([]);

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
        handleSuggestionsSearch,
    };
};
