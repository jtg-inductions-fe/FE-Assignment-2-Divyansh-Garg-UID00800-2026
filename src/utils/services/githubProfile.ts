import type { AuthUser } from '@redux/auth';

import { snakeToCamelCase, getProfileUrl } from '@utils';

export const fetchGitHubProfile = async (username: string): Promise<AuthUser> => {
    const response = await fetch(getProfileUrl(username), {
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

    return snakeToCamelCase<typeof data, AuthUser>(data);
};
