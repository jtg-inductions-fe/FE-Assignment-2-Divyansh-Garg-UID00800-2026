import { snakeToCamelCase } from '@utils';
import { getSearchUsersUrl } from '@utils';

export interface GithubUser {
    login: string;
    id: number;
    avatar_url: string;
    type: string;
    email: string;
}

export interface GithubSearchResponse {
    totalCount: number;
    incompleteResults: boolean;
    items: GithubUser[];
}

let activeController: AbortController | null = null;

export const searchGitHubUsers = async (
    username: string,
    token: string | null,
): Promise<GithubSearchResponse> => {
    if (activeController) {
        activeController.abort();
    }

    activeController = new AbortController();

    const trimmedToken = token?.trim();

    const response = await fetch(getSearchUsersUrl(username), {
        headers: {
            ...(trimmedToken && { Authorization: `Bearer ${trimmedToken}` }),
            Accept: 'application/vnd.github+json',
        },
        signal: activeController.signal,
    });

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error('GitHub API rate limit exceeded.');
        }

        throw new Error('Unable to search GitHub users.');
    }

    const data = await response.json();

    return snakeToCamelCase<typeof data, GithubSearchResponse>(data);
};
