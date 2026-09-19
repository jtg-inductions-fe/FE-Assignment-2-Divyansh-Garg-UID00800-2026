import { useAppDispatch, useAppSelector } from '@app/hooks';
import { addFollower, removeFollower } from '@features/social/socialSlice';
import type { SocialUser } from '@features/social/socialTypes';
import { useState } from 'react';
import { BASE_URL, FOLLOWING_URL } from '@utils/urls';

export const useGithubSocial = () => {
    const URL = `${BASE_URL}/${FOLLOWING_URL}`;
    const dispatch = useAppDispatch();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const token = useAppSelector((state) => state.auth.token);
    const isFetched = useAppSelector((state) => state.social.isFetched);

    const handleFollowUnfollow = async (isFollowed: boolean, user: SocialUser | null) => {
        if (!user) {
            setError('The Following User is not available');
            return;
        }

        const trimmedToken = token?.trim();

        if (!trimmedToken) {
            setError('Please Login First to follow.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${URL}/${user.login}`, {
                method: isFollowed ? 'DELETE' : 'PUT',
                headers: {
                    Authorization: `Bearer ${trimmedToken}`,
                    Accept: 'application/vnd.github+json',
                    'Content-Length': '0',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error(
                        `You are not Authorized to ${isFollowed ? 'unfollow' : 'follow'} the user`,
                    );
                }

                throw new Error(`Unable to ${isFollowed ? 'Unfollow' : 'Follow'} the user`);
            }

            if (isFollowed) {
                dispatch(removeFollower(user));
            } else {
                dispatch(addFollower(user));
            }
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Something went wrong while connecting to GitHub.',
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        error,
        loading,
        token,
        isFetched,
        handleFollowUnfollow,
    };
};
