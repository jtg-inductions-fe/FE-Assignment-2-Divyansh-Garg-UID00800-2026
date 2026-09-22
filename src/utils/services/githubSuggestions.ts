import type { GithubUser } from '@utils/services/githubSearch';
import { getSuggestionsUrl, getHeaders } from '@utils';

export const fetchGitHubSuggestions = async (
    token: string,
    since: number,
): Promise<GithubUser[]> => {
    const response = await fetch(getSuggestionsUrl(since), {
        headers: getHeaders(token),
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
