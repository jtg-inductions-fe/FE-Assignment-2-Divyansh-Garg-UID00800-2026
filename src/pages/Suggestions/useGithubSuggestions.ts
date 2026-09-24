import { useCallback, useRef } from 'react';

import type { GithubUser } from '@utils/services';
import { fetchGitHubSuggestions } from '@utils/services';
import { useAppDispatch, useAppSelector } from '@utils';
import {
    fetchSuggestionsFailed,
    fetchSuggestionsPending,
    fetchSuggestionsSuccess,
} from '@redux/suggestions';

export const useGithubSuggestions = () => {
    const dispatch = useAppDispatch();

    const { fetchSuggestionsLoading, fetchSuggestionsError, suggestions } = useAppSelector(
        (state) => state.suggestions,
    );
    const token = useAppSelector((state) => state.auth.token);

    const controllerRef = useRef<AbortController | null>(null);

    const handleSuggestionsSearch = useCallback(
        async (since: number) => {
            const trimmedToken = token?.trim();

            if (!trimmedToken) {
                dispatch(fetchSuggestionsFailed('Please Login again to access Suggestions.'));
                return null;
            }

            if (controllerRef) {
                controllerRef.current?.abort();
            }

            const controller = new AbortController();
            controllerRef.current = controller;

            dispatch(fetchSuggestionsPending());

            try {
                const data = await fetchGitHubSuggestions(trimmedToken, since, controller.signal);

                if (!controller.signal.aborted) {
                    dispatch(fetchSuggestionsSuccess(data as GithubUser[]));
                    return data;
                }

                return null;
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return null;
                }

                dispatch(
                    fetchSuggestionsFailed(
                        error instanceof Error
                            ? error.message
                            : 'Something went wrong while connecting to GitHub.',
                    ),
                );

                return null;
            }
        },
        [token],
    );

    return {
        fetchSuggestionsLoading,
        fetchSuggestionsError,
        suggestions,
        handleSuggestionsSearch,
    };
};
