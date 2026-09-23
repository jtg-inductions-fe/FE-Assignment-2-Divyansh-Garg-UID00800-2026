import { useRef, useState } from 'react';

import type { GithubUser } from '@utils/services';
import { fetchGitHubSuggestions } from '@utils/services';
import { useAppSelector } from '@utils';

export const useGithubSuggestions = () => {
    // we do not have any redux state for search, that's why these states are made using useState
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState<GithubUser[]>([]);

    const token = useAppSelector((state) => state.auth.token);

    const controllerRef = useRef<AbortController | null>(null);

    const handleSuggestionsSearch = async (since: number) => {
        const trimmedToken = token?.trim();

        if (!trimmedToken) {
            setError('Please Login again to access Suggestions.');
            setResponse([]);
            return null;
        }

        if (controllerRef) {
            controllerRef.current?.abort();
        }

        const controller = new AbortController();
        controllerRef.current = controller;

        setLoading(true);
        setError('');
        setResponse([]);

        try {
            const data = await fetchGitHubSuggestions(trimmedToken, since, controller.signal);

            if (!controller.signal.aborted) {
                setResponse(data);
                return data;
            }

            return null;
        } catch (error) {
            setResponse([]);

            if (error instanceof Error && error.name === 'AbortError') {
                return null;
            }

            setError(
                error instanceof Error
                    ? error.message
                    : 'Something went wrong while connecting to GitHub.',
            );
            return null;
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    };

    return {
        loading,
        error,
        response,
        handleSuggestionsSearch,
    };
};
