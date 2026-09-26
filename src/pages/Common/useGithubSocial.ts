import { updateGitHubFollow } from '@utils/services';
import { useAppDispatch, useAppSelector } from '@utils';

import {
    addFollowingSuccess,
    followUnfollowFailure,
    followUnfollowPending,
    removeFollowingSuccess,
} from '@redux/social';
import { decreaseFollowingCount, increaseFollowingCount } from '@redux/auth';

export const useGithubSocial = () => {
    const dispatch = useAppDispatch();

    const { followUnfollowLoadingIds, followUnfollowError } = useAppSelector(
        (state) => state.social,
    );

    const token = useAppSelector((state) => state.auth.token);

    const handleFollowUnfollow = async (id: number, username: string, isFollowed: boolean) => {
        const trimmedUsername = username.trim();
        const trimmedToken = token?.trim();

        if (!trimmedUsername) {
            dispatch(
                followUnfollowFailure({
                    id,
                    message: 'The Following User is not available.',
                }),
            );

            return null;
        }

        if (!trimmedToken) {
            dispatch(
                followUnfollowFailure({
                    id,
                    message: 'Please Login First to follow.',
                }),
            );

            return null;
        }

        dispatch(followUnfollowPending(id));

        try {
            await updateGitHubFollow(trimmedUsername, trimmedToken, isFollowed);

            const socialUser = {
                id,
                login: username,
            };

            if (isFollowed) {
                dispatch(removeFollowingSuccess(socialUser));
                dispatch(decreaseFollowingCount());
            } else {
                dispatch(addFollowingSuccess(socialUser));
                dispatch(increaseFollowingCount());
            }

            return socialUser;
        } catch (error) {
            dispatch(
                followUnfollowFailure({
                    id,
                    message:
                        error instanceof Error
                            ? error.message
                            : 'Something went wrong while connecting to GitHub.',
                }),
            );

            return null;
        }
    };

    return {
        followUnfollowLoadingIds,
        followUnfollowError,
        handleFollowUnfollow,
    };
};
