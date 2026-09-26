import type { GithubUser } from '@utils/services';

export interface SuggestionsState {
    isSuggestionsFetched: boolean;
    suggestions: Record<number, GithubUser>;
    removedSuggestions: Record<number, boolean>;
    fetchSuggestionsLoading: boolean;
    fetchSuggestionsError: string | null;
}
