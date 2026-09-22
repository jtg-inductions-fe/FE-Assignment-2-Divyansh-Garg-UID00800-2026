import { loginFailure, loginPending, loginSuccess } from '@redux/auth';
import {
    fetchFollowingsFailure,
    fetchFollowingsPending,
    fetchFollowingsSuccess,
} from '@redux/social';

import { useAppDispatch, useAppSelector, checkRegexFunction } from '@utils';
import { authenticateWithGitHub, fetchFollowing } from '@utils/services';

export const useGitHubAuth = () => {
    const dispatch = useAppDispatch();

    const { loading, error, user } = useAppSelector((state) => state.auth);

    const handleLogin = async (pat: string) => {
        const trimmedToken = pat.trim();

        if (!trimmedToken) {
            dispatch(loginFailure('Please enter your GitHub Personal Access Token.'));
            return null;
        }

        if (!checkRegexFunction(trimmedToken)) {
            dispatch(loginFailure('Please enter your correct GitHub Personal Access Token.'));
            return null;
        }

        dispatch(loginPending());
        dispatch(fetchFollowingsPending());

        try {
            const authResponse = await authenticateWithGitHub(trimmedToken);
            const following = await fetchFollowing(authResponse.token);

            dispatch(loginSuccess(authResponse));
            dispatch(fetchFollowingsSuccess(following));

            return authResponse;
        } catch (error) {
            dispatch(
                loginFailure(
                    error instanceof Error
                        ? error.message
                        : 'Something went wrong while connecting to GitHub.',
                ),
            );

            dispatch(
                fetchFollowingsFailure(
                    error instanceof Error
                        ? error.message
                        : 'Something went wrong while connecting to GitHub.',
                ),
            );

            return null;
        }
    };

    return {
        loading,
        error,
        user,
        handleLogin,
    };
};
