export interface SocialUser {
    id: number;
    login: string;
}

export interface SocialState {
    isFetched: boolean;
    following: Record<number, SocialUser>;
}
