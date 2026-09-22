import type { AuthUser } from '@redux/auth';

import { snakeToCamelCase, getProfileUrl } from '@utils';

let activeController: AbortController | null = null;

export const fetchGitHubProfile = async (
    username: string,
    token: string | null,
): Promise<AuthUser> => {
    if (activeController) {
        activeController.abort();
    }

    activeController = new AbortController();

    const trimmedToken = token?.trim();

    const response = await fetch(getProfileUrl(username), {
        headers: {
            ...(trimmedToken && { Authorization: `Bearer ${trimmedToken}` }),
            Accept: 'application/vnd.github+json',
        },
        signal: activeController.signal,
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
