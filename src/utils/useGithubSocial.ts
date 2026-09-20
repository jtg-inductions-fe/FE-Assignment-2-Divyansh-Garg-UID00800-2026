import { useState } from 'react';

import { updateGitHubFollow } from '@utils/services/githubSocial';

export const useGithubSocial = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState<boolean | null>(null);

    const handleFollowUnfollow = async (username: string, isFollowed: boolean, token: string) => {
        const trimmedUsername = username.trim();
        const trimmedToken = token.trim();

        if (!trimmedUsername) {
            setError('The Following User is not available.');
            setResponse(null);

            return null;
        }

        if (!trimmedToken) {
            setError('Please Login First to follow.');
            setResponse(null);

            return null;
        }

        setLoading(true);
        setError('');
        setResponse(null);

        try {
            await updateGitHubFollow(trimmedUsername, trimmedToken, isFollowed);

            const updatedFollowState = !isFollowed;

            setResponse(updatedFollowState);

            return updatedFollowState;
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
        handleFollowUnfollow,
    };
};
