import type { GithubUser } from '@utils/services/githubSearch';
import { getSuggestionsUrl, getHeaders } from '@utils';

export const fetchGitHubSuggestions = async (
    token: string,
    perPage: number,
    since: number,
    signal?: AbortSignal,
): Promise<GithubUser[]> => {
    const response = await fetch(getSuggestionsUrl(perPage, since), {
        headers: getHeaders(token),
        signal,
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Please Login again to access Suggestions.');
        }

        if (response.status === 403) {
            throw new Error('GitHub API rate limit exceeded.');
        }

        throw new Error('Unable to get GitHub suggestions.');
    }

    return response.json();
};
