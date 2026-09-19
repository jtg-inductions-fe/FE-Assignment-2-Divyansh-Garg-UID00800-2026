import { useAppSelector } from '@app/hooks';
import type { AuthUser } from '@features/auth/authTypes';
import { snakeToCamelCase } from '@utils/helperFunctions';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BASE_URL, PROFILE_URL } from '@utils/urls';

export const useGithubProfile = () => {
    const URL = `${BASE_URL}/${PROFILE_URL}`;

    const { username } = useParams<{ username: string }>();

    const [searchUserInfo, setSearchUserInfo] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    const authUser = useAppSelector((state) => state.auth.user);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const following = useAppSelector((state) => state.social.following);

    const isOwnProfile =
        isAuthenticated &&
        !!authUser &&
        !!username &&
        authUser.login.toLowerCase() === username.toLowerCase();

    useEffect(() => {
        const handleUserSearch = async (value: string) => {
            const trimmedUsername = value.trim();

            if (!trimmedUsername) {
                setSearchUserInfo(null);
                return;
            }

            setLoading(true);
            setError('');

            try {
                const response = await fetch(`${URL}/${trimmedUsername}`, {
                    headers: {
                        Accept: 'application/vnd.github+json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('User Not Found');
                    }

                    throw new Error('Unable to get the GitHub user profile.');
                }

                const data = await response.json();

                const formattedData = snakeToCamelCase<typeof data, AuthUser>(data);

                setSearchUserInfo(formattedData);
            } catch (err) {
                setSearchUserInfo(null);

                setError(
                    err instanceof Error
                        ? err.message
                        : 'Something went wrong while connecting to GitHub.',
                );
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            handleUserSearch(username);
        }
    }, [username]);

    const isFollowed = Boolean(searchUserInfo && String(searchUserInfo.id) in following);

    return {
        error,
        loading,
        isFollowed,
        isOwnProfile,
        searchUserInfo,
        isAuthenticated,
    };
};
