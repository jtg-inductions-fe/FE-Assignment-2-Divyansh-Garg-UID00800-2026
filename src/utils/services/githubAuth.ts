import type { AuthUser } from '@redux/auth/authTypes';

import { snakeToCamelCase } from '@utils/helperFunctions';
import { getLoginUrl } from '@utils/apiUrls';

export interface GitHubAuthResponse {
    user: AuthUser;
    token: string;
}

export const authenticateWithGitHub = async (token: string): Promise<GitHubAuthResponse> => {
    const trimmedToken = token.trim();

    const response = await fetch(getLoginUrl(), {
        headers: {
            Authorization: `Bearer ${trimmedToken}`,
            Accept: 'application/vnd.github+json',
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Invalid GitHub Personal Access Token.');
        }

        throw new Error('Unable to authenticate with GitHub.');
    }

    const data = await response.json();

    const user = snakeToCamelCase<typeof data, AuthUser>(data);

    return {
        user,
        token: trimmedToken,
    };
};
