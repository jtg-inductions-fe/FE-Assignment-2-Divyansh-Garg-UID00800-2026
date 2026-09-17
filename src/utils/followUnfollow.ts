import type { SocialUser } from '@features/social/socialTypes';

export const fetchFollowers = async (token: string) => {
    if (!token) {
        return;
    }

    const trimmedToken = token.trim();
    if (!trimmedToken) {
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/user/following`, {
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
        return null;
    }
};
