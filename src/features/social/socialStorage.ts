import type { SocialState, SocialUser } from './socialTypes';

const SOCIAL_STORAGE_KEY = 'AuthUser_Following';

export const saveAllFollowing = (followingData: SocialState): void => {
    try {
        localStorage.setItem(SOCIAL_STORAGE_KEY, JSON.stringify(followingData));
    } catch (error) {
        console.warn('Failed to save Following Users data to LocalStorage:', error);
    }
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

    if (!storedState) return;

    const updatedFollowers = { ...storedState.following };
    updatedFollowers[user.id] = user;

    saveAllFollowing({
        ...storedState,
        following: updatedFollowers,
    });
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
