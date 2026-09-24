import type { GithubUser } from '@utils/services';

export interface SuggestionsState {
    isSuggestionsFetched: boolean;
    suggestions: Record<number, GithubUser>;
    fetchSuggestionsLoading: boolean;
    fetchSuggestionsError: string | null;
}
