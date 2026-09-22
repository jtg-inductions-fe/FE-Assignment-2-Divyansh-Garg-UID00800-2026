import { updateGitHubFollow } from './services';
import { useAppDispatch, useAppSelector } from './storeHooks';
import {
    addFollowingSuccess,
    followUnfollowFailure,
    followUnfollowPending,
    removeFollowingSuccess,
} from '@redux/social';

export const useGithubSocial = () => {
    const dispatch = useAppDispatch();

    const { followUnfollowLoading, followUnfollowError } = useAppSelector((state) => state.social);

    const handleFollowUnfollow = async (
        id: number,
        username: string,
        isFollowed: boolean,
        token: string,
    ) => {
        const trimmedUsername = username.trim();
        const trimmedToken = token.trim();

        if (!trimmedUsername) {
            dispatch(followUnfollowFailure('The Following User is not available.'));

            return null;
        }

        if (!trimmedToken) {
            dispatch(followUnfollowFailure('Please Login First to follow.'));

            return null;
        }

        dispatch(followUnfollowPending());

        try {
            await updateGitHubFollow(trimmedUsername, trimmedToken, isFollowed);

            const socialUser = {
                id: id,
                login: username,
            };

            if (isFollowed) {
                dispatch(removeFollowingSuccess(socialUser));
            } else {
                dispatch(addFollowingSuccess(socialUser));
            }
        } catch (error) {
            dispatch(
                followUnfollowFailure(
                    error instanceof Error
                        ? error.message
                        : 'Something went wrong while connecting to GitHub.',
                ),
            );
        }
    };

    return {
        followUnfollowLoading,
        followUnfollowError,
        handleFollowUnfollow,
    };
};
