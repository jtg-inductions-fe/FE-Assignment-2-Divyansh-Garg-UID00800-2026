import type { AuthUser } from '@redux/auth';

import { snakeToCamelCase, getProfileUrl, getHeaders } from '@utils';

export const fetchGitHubProfile = async (
    username: string,
    token: string | null,
    signal?: AbortSignal,
): Promise<AuthUser> => {
    const trimmedToken = token?.trim();

    const response = await fetch(getProfileUrl(username), {
        headers: {
            ...(trimmedToken && { Authorization: `Bearer ${trimmedToken}` }),
            Accept: 'application/vnd.github+json',
        },
        signal,
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
