import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { localStorageUtils } from '@utils/localstorage';
import { STORAGE_KEYS } from '@utils/storageKeys';

import type { SocialState, SocialUser } from './socialTypes';

const storedState = localStorageUtils.get<SocialState>(STORAGE_KEYS.following);

const initialState: SocialState = {
    isFetched: storedState?.isFetched ?? false,
    following: storedState?.following ?? {},
};

const socialSlice = createSlice({
    name: 'social',

    initialState,

    reducers: {
        addFollowers: (state, action: PayloadAction<SocialUser[]>) => {
            const following = action.payload.reduce<Record<number, SocialUser>>(
                (accumulator, user) => {
                    accumulator[user.id] = user;

                    return accumulator;
                },
                {},
            );

            state.isFetched = true;
            state.following = following;

            localStorageUtils.set(STORAGE_KEYS.following, { isFetched: true, following });
        },

        addFollower: (state, action: PayloadAction<SocialUser>) => {
            const user = action.payload;

            state.following[user.id] = user;

            localStorageUtils.set(STORAGE_KEYS.following, {
                isFetched: state.isFetched,
                following: state.following,
            });
        },

        removeFollower: (state, action: PayloadAction<SocialUser>) => {
            const userId = action.payload.id;

            delete state.following[userId];

            localStorageUtils.set(STORAGE_KEYS.following, {
                isFetched: state.isFetched,
                following: state.following,
            });
        },

        removeSocialState: (state) => {
            state.isFetched = false;
            state.following = {};

            localStorageUtils.remove(STORAGE_KEYS.following);
        },
    },
});

export const { addFollowers, addFollower, removeFollower, removeSocialState } = socialSlice.actions;

export default socialSlice.reducer;
