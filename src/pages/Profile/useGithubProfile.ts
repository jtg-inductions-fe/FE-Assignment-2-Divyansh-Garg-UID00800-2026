import { useCallback, useRef, useState } from 'react';

import type { AuthUser } from '@redux/auth';

import { fetchGitHubProfile } from '@utils/services';
import { useAppSelector } from '@utils';

export const useGithubProfile = () => {
    // we do not have any redux state for profile, that's why these states are made using useState
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState<AuthUser | null>(null);

    const authProfile = useAppSelector((state) => state.auth.user);
    const myUsername = useAppSelector((state) => state.auth.user?.login);

    const token = useAppSelector((state) => state.auth.token);

    const controllerRef = useRef<AbortController | null>(null);

    const handleProfileSearch = useCallback(
        async (username: string) => {
            const trimmedUsername = username.trim();

            if (trimmedUsername === myUsername?.trim()) {
                setResponse(authProfile);
                return;
            }

            if (!trimmedUsername) {
                setError('Please enter a GitHub username.');
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
                const data = await fetchGitHubProfile(trimmedUsername, token, controller.signal);

                if (!controller.signal.aborted) {
                    setResponse(data);
                    return data;
                }

                return null;
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return null;
                }

                if (error instanceof Error && error.message === 'User Not Found') {
                    throw error;
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
        },
        [token, authProfile, myUsername],
    );

    return {
        loading,
        error,
        response,
        handleProfileSearch,
    };
};
