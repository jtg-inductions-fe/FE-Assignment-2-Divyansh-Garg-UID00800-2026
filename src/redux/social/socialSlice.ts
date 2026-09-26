import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { localStorageUtils, STORAGE_KEYS } from '@utils';

import type { ErrorMessage, SocialState, SocialUser } from './socialTypes';

const storedState = localStorageUtils.get<SocialState>(STORAGE_KEYS.following);

const initialState: SocialState = {
    isFetched: storedState?.isFetched ?? false,
    following: storedState?.following ?? {},
    fetchFollowingsLoading: false,
    fetchFollowingsError: null,
    followUnfollowLoadingIds: {},
    followUnfollowError: null,
};

const socialSlice = createSlice({
    name: 'social',
    initialState,
    reducers: {
        fetchFollowingsPending: (state) => {
            state.fetchFollowingsLoading = true;
            state.fetchFollowingsError = null;
        },

        fetchFollowingsSuccess: (state, action: PayloadAction<SocialUser[]>) => {
            const following = action.payload.reduce<Record<number, SocialUser>>(
                (accumulator, user) => {
                    accumulator[user.id] = user;

                    return accumulator;
                },
                {},
            );

            state.isFetched = true;
            state.following = following;
            state.fetchFollowingsLoading = false;
            state.fetchFollowingsError = null;

            localStorageUtils.set(STORAGE_KEYS.following, { isFetched: true, following });
        },

        fetchFollowingsFailure: (state, action: PayloadAction<string>) => {
            state.fetchFollowingsLoading = false;
            state.fetchFollowingsError = action.payload;
        },

        followUnfollowPending: (state, action: PayloadAction<number>) => {
            state.followUnfollowLoadingIds[action.payload] = true;
            state.followUnfollowError = null;
        },

        addFollowingSuccess: (state, action: PayloadAction<SocialUser>) => {
            const user = action.payload;

            state.following[user.id] = user;
            delete state.followUnfollowLoadingIds[user.id];
            state.followUnfollowError = null;

            localStorageUtils.set(STORAGE_KEYS.following, {
                isFetched: state.isFetched,
                following: state.following,
            });
        },

        removeFollowingSuccess: (state, action: PayloadAction<SocialUser>) => {
            const userId = action.payload.id;

            delete state.following[userId];
            delete state.followUnfollowLoadingIds[userId];
            state.followUnfollowError = null;

            localStorageUtils.set(STORAGE_KEYS.following, {
                isFetched: state.isFetched,
                following: state.following,
            });
        },

        followUnfollowFailure: (state, action: PayloadAction<ErrorMessage>) => {
            delete state.followUnfollowLoadingIds[action.payload.id];
            state.followUnfollowError = {
                id: action.payload.id,
                message: action.payload.message,
            };
        },

        removeSocialState: (state) => {
            state.isFetched = false;
            state.following = {};
            state.fetchFollowingsLoading = false;
            state.fetchFollowingsError = null;
            state.followUnfollowLoadingIds = {};
            state.followUnfollowError = null;

            localStorageUtils.remove(STORAGE_KEYS.following);
        },
    },
});

export const {
    fetchFollowingsPending,
    fetchFollowingsSuccess,
    fetchFollowingsFailure,
    followUnfollowPending,
    addFollowingSuccess,
    removeFollowingSuccess,
    followUnfollowFailure,
    removeSocialState,
} = socialSlice.actions;

export default socialSlice.reducer;
