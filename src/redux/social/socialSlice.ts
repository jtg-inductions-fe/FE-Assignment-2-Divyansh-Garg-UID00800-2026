import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { localStorageUtils, STORAGE_KEYS } from '@utils';

import type { SocialState, SocialUser } from './socialTypes';

const storedState = localStorageUtils.get<SocialState>(STORAGE_KEYS.following);

const initialState: SocialState = {
    isFetched: storedState?.isFetched ?? false,
    following: storedState?.following ?? {},
    fetchFollowingsLoading: false,
    fetchFollowingsError: null,
    followUnfollowLoading: false,
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

        followUnfollowPending: (state) => {
            state.followUnfollowLoading = true;
            state.followUnfollowError = null;
        },

        addFollowingSuccess: (state, action: PayloadAction<SocialUser>) => {
            const user = action.payload;

            state.following[user.id] = user;
            state.followUnfollowLoading = false;
            state.followUnfollowError = null;

            localStorageUtils.set(STORAGE_KEYS.following, {
                isFetched: state.isFetched,
                following: state.following,
            });
        },

        removeFollowingSuccess: (state, action: PayloadAction<SocialUser>) => {
            const userId = action.payload.id;

            delete state.following[userId];
            state.followUnfollowLoading = false;
            state.followUnfollowError = null;

            localStorageUtils.set(STORAGE_KEYS.following, {
                isFetched: state.isFetched,
                following: state.following,
            });
        },

        followUnfollowFailure: (state, action: PayloadAction<string>) => {
            state.followUnfollowLoading = false;
            state.followUnfollowError = action.payload;
        },

        removeSocialState: (state) => {
            state.isFetched = false;
            state.following = {};

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
