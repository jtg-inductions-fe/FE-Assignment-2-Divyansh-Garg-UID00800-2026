import { useRef, useState } from 'react';

import type { AuthUser } from '@redux/auth';

import { fetchGitHubProfile } from '@utils/services/githubProfile';
import { useAppSelector } from './storeHooks';

export const useGithubProfile = () => {
    // we do not have any redux state for profile, that's why these states are made using useState
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState<AuthUser | null>(null);

    const token = useAppSelector((state) => state.auth.token);

    const controllerRef = useRef<AbortController | null>(null);

    const handleProfileSearch = async (username: string) => {
        const trimmedUsername = username.trim();

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

            setResponse(data);

            return data;
        } catch (error) {
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
