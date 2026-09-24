export interface SocialUser {
    id: number;
    login: string;
}

export interface ErrorMessage {
    id: number;
    message: string;
}

export interface SocialState {
    isFetched: boolean;
    following: Record<number, SocialUser>;
    fetchFollowingsLoading: boolean;
    fetchFollowingsError: string | null;
    followUnfollowLoading: boolean;
    followUnfollowLoadingId: number | null;
    followUnfollowError: ErrorMessage | null;
}
