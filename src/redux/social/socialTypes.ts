export interface SocialUser {
    id: number;
    login: string;
}

export interface SocialState {
    isFetched: boolean;
    following: Record<number, SocialUser>;
    fetchFollowingsLoading: boolean;
    fetchFollowingsError: string | null;
    followUnfollowLoading: boolean;
    followUnfollowError: string | null;
}
