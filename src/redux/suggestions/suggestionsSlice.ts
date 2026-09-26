import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SuggestionsState } from './suggestionsTypes';
import type { GithubUser } from '@utils/services';
import { localStorageUtils, STORAGE_KEYS } from '@utils';

const storedState = localStorageUtils.get<Record<number, boolean>>(STORAGE_KEYS.removedSuggestions);

const initialState: SuggestionsState = {
    isSuggestionsFetched: false,
    suggestions: {},
    removedSuggestions: storedState ?? {},
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

        removeSuggestionsItem: (state, action: PayloadAction<number>) => {
            if (!(action.payload in state.suggestions)) return;

            state.removedSuggestions[action.payload] = true;
            delete state.suggestions[action.payload];

            localStorageUtils.set(STORAGE_KEYS.removedSuggestions, state.removedSuggestions);
        },

        removeSuggestionsState: (state) => {
            state.isSuggestionsFetched = false;
            state.suggestions = {};
            state.removedSuggestions = {};
            state.fetchSuggestionsLoading = false;
            state.fetchSuggestionsError = null;

            localStorageUtils.remove(STORAGE_KEYS.removedSuggestions);
        },
    },
});

export const {
    fetchSuggestionsPending,
    fetchSuggestionsSuccess,
    fetchSuggestionsFailed,
    removeSuggestionsItem,
    removeSuggestionsState,
} = suggestionsSlice.actions;

export default suggestionsSlice.reducer;
