import type { GithubSearchResponse, GithubUser } from '@features/Search/Search';
import { snakeToCamelCase } from '@utils/helperFunctions';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { BASE_URL, SEARCH_URL } from '@utils/urls';

export const useGitHubSearch = () => {
    const URL = `${BASE_URL}/${SEARCH_URL}`;
    const navigate = useNavigate();

    const { username } = useParams<string>();

    const [searchUsername, setSearchUsername] = useState(username ?? '');
    const [options, setOptions] = useState<GithubUser[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (value: string) => {
        const trimmedUsername = value.trim();

        if (!trimmedUsername) {
            setOptions([]);
            setError('');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${URL}?q=${trimmedUsername}`, {
                headers: {
                    Accept: 'application/vnd.github+json',
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('GitHub API rate limit exceeded.');
                }

                throw new Error('Unable to search GitHub users.');
            }

            const data = await response.json();

            const formatted = snakeToCamelCase<typeof data, GithubSearchResponse>(data);

            setOptions(formatted.items);
        } catch (error) {
            setOptions([]);

            setError(error instanceof Error ? error.message : 'Unable to search GitHub users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const trimmedUsername = searchUsername.trim();

        if (!trimmedUsername) {
            return;
        }

        const timer = window.setTimeout(() => {
            void handleSearch(trimmedUsername);
        }, 400);

        return () => {
            window.clearTimeout(timer);
        };
    }, [searchUsername]);

    useEffect(() => {
        const trimmedUsername = searchUsername.trim();

        if (trimmedUsername) {
            navigate(`/search/${trimmedUsername}`);
        } else {
            navigate('/search');
        }
    }, [searchUsername, navigate]);

    const handleClear = () => {
        setSearchUsername('');
        setOptions([]);
        setError('');
        setOpen(false);
    };

    const handleNavigation = (login: string) => {
        setOpen(false);

        navigate(`/profile/${login}`);
    };

    const handleSubmitSearch = () => {
        const trimmedUsername = searchUsername.trim();

        if (!trimmedUsername) {
            setError('Please enter a GitHub username to search.');

            return;
        }

        handleNavigation(trimmedUsername);
    };

    return {
        open,
        error,
        options,
        loading,
        searchUsername,
        setOpen,
        handleClear,
        handleNavigation,
        setSearchUsername,
        handleSubmitSearch,
    };
};
