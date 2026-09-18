import type { SocialUser } from '@features/social/socialTypes';
import { BASE_URL, FOLLOWING_URL } from './urls';

export const fetchFollowers = async (token: string) => {
    const URL = `${BASE_URL}/${FOLLOWING_URL}`;

    if (!token) {
        return;
    }

    const trimmedToken = token.trim();
    if (!trimmedToken) {
        return;
    }

    try {
        const response = await fetch(URL, {
            headers: {
                Authorization: `Bearer ${trimmedToken}`,
                Accept: 'application/vnd.github+json',
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid GitHub Personal Access Token.');
            }

            throw new Error('Unable to fetch following users.');
        }

        const data = await response.json();

        const socialUsers: SocialUser[] = data;

        return socialUsers;
    } catch {
        throw new Error('Something went wrong while connecting to GitHub.');
    }
};
