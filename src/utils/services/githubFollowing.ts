import type { SocialUser } from '@redux/social';
import { getFollowingsUrl, getHeaders } from '@utils';

export const fetchFollowing = async (token: string): Promise<SocialUser[]> => {
    const trimmedToken = token.trim();

    if (!trimmedToken) {
        throw new Error('GitHub Personal Access Token is required.');
    }

    const response = await fetch(getFollowingsUrl(), {
        headers: getHeaders(trimmedToken),
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Invalid GitHub Personal Access Token.');
        }

        throw new Error('Unable to fetch following users.');
    }

    const data = await response.json();

    return data as SocialUser[];
};
