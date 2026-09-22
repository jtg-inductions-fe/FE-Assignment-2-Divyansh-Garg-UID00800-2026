import { useRef, useState } from 'react';
import { searchGitHubUsers, type GithubSearchResponse } from '@utils/services';
import { useAppSelector } from '@utils';

export const useGitHubSearch = () => {
    // we do not have any redux state for search, that's why these states are made using useState
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState<GithubSearchResponse | null>(null);

    const token = useAppSelector((state) => state.auth.token);

    const controllerRef = useRef<AbortController | null>(null);

    const handleSearch = async (username: string) => {
        const trimmedUsername = username.trim();

        if (!trimmedUsername) {
            setError('Please enter a GitHub username to search.');
            setResponse(null);
            return null;
        }

        if (controllerRef.current) {
            controllerRef.current.abort();
        }

        const controller = new AbortController();
        controllerRef.current = controller;

        setLoading(true);
        setError('');
        setResponse(null);

        try {
            const data = await searchGitHubUsers(trimmedUsername, token, controller.signal);

            if (!controller.signal.aborted) {
                setResponse(data);
                return data;
            }
            return null;
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                return null;
            }

            setError(error instanceof Error ? error.message : 'Unable to search GitHub users.');
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
        handleSearch,
    };
};
