import { getFollowingUserUrl } from '@utils';

export const updateGitHubFollow = async (
    username: string,
    token: string,
    isFollowed: boolean,
): Promise<void> => {
    const response = await fetch(getFollowingUserUrl(username), {
        method: isFollowed ? 'DELETE' : 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error(
                `You are not Authorized to ${isFollowed ? 'unfollow' : 'follow'} the user`,
            );
        }

        throw new Error(`Unable to ${isFollowed ? 'unfollow' : 'follow'} the user`);
    }
};
