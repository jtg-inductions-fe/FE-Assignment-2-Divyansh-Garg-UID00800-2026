import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SocialUser, SocialState } from './socialTypes';
import {
    getAllFollowing,
    removeSingleFollowing,
    saveAllFollowing,
    saveSingleFollowing,
} from './socialStorage';

const storedState = getAllFollowing();

const initialState: SocialState = {
    isFetched: storedState?.isFetched ?? false,
    following: storedState?.following ?? {},
};

const socialSlice = createSlice({
    name: 'social',
    initialState,
    reducers: {
        addFollowers: (state, action: PayloadAction<SocialUser[]>) => {
            const followingArray = action.payload;

            state.isFetched = true;
            const following = followingArray.reduce<Record<number, SocialUser>>((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {});

            state.following = following;

            saveAllFollowing({
                isFetched: true,
                following: following,
            });
        },

        addFollower: (state, action: PayloadAction<SocialUser>) => {
            const user = action.payload;

            state.following[user.id] = user;

            saveSingleFollowing(user);
        },

        removeFollower: (state, action: PayloadAction<SocialUser>) => {
            const userId = action.payload.id;

            delete state.following[userId];

            removeSingleFollowing(userId);
        },
    },
});

export const { addFollowers, addFollower, removeFollower } = socialSlice.actions;
export default socialSlice.reducer;
