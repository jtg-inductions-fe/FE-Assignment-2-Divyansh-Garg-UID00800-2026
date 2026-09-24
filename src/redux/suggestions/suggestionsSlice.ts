import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SuggestionsState } from './suggestionsTypes';
import type { GithubUser } from '@utils/services';

const initialState: SuggestionsState = {
    isSuggestionsFetched: false,
    suggestions: {},
    fetchSuggestionsLoading: false,
    fetchSuggestionsError: null,
};

const suggestionsSlice = createSlice({
    name: 'suggestions',
    initialState,
    reducers: {
        fetchSuggestionsPending: (state) => {
            state.fetchSuggestionsLoading = true;
            state.fetchSuggestionsError = null;
        },

        fetchSuggestionsSuccess: (state, action: PayloadAction<GithubUser[]>) => {
            const suggestions = action.payload.reduce<Record<number, GithubUser>>(
                (accumulator, user) => {
                    accumulator[user.id] = user;

                    return accumulator;
                },
                {},
            );

            state.isSuggestionsFetched = true;
            state.suggestions = suggestions;
            state.fetchSuggestionsLoading = false;
            state.fetchSuggestionsError = null;
        },

        fetchSuggestionsFailed: (state, action: PayloadAction<string>) => {
            state.fetchSuggestionsLoading = false;
            state.fetchSuggestionsError = action.payload;
        },
    },
});

export const { fetchSuggestionsPending, fetchSuggestionsSuccess, fetchSuggestionsFailed } =
    suggestionsSlice.actions;

export default suggestionsSlice.reducer;
