export interface User {
    login: string;
    id: number;
    nodeId: string;
    avatarUrl: string;
    htmlUrl: string;
    name: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    bio: string | null;
    followers: number;
    following: number;
    createdAt: string;
}

export interface AuthUser extends User {
    gravatarId: string;

    url: string;

    followersUrl: string;
    followingUrl: string;
    gistsUrl: string;
    starredUrl: string;
    subscriptionsUrl: string;
    organizationsUrl: string;
    reposUrl: string;
    eventsUrl: string;
    receivedEventsUrl: string;

    type: string;
    siteAdmin: boolean;

    company: string | null;
    twitterUsername: string | null;
    hireable: boolean | null;

    publicRepos: number;
    publicGists: number;

    updatedAt: string;
}

export interface AuthData {
    token: string;
    user: AuthUser;
}

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}
