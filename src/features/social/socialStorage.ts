import type { SocialState, SocialUser } from './socialTypes';

const SOCIAL_STORAGE_KEY = 'AuthUser_Following';

export const saveAllFollowing = (followingData: SocialState): void => {
    localStorage.setItem(SOCIAL_STORAGE_KEY, JSON.stringify(followingData));
};

export const getAllFollowing = (): SocialState | null => {
    const storedFollowing = localStorage.getItem(SOCIAL_STORAGE_KEY);

    if (!storedFollowing) {
        return null;
    }

    try {
        return JSON.parse(storedFollowing) as SocialState;
    } catch {
        localStorage.removeItem(SOCIAL_STORAGE_KEY);
        return null;
    }
};

export const saveSingleFollowing = (user: SocialUser): void => {
    const storedState = getAllFollowing();

    const updatedState: SocialState = storedState
        ? { ...storedState }
        : { isFetched: true, following: {} };

    updatedState.following[user.id] = user;

    saveAllFollowing(updatedState);
};

export const removeSingleFollowing = (userId: number): void => {
    const storedState = getAllFollowing();

    if (!storedState) return;

    const updatedFollowers = { ...storedState.following };
    delete updatedFollowers[userId];

    saveAllFollowing({
        ...storedState,
        following: updatedFollowers,
    });
};
