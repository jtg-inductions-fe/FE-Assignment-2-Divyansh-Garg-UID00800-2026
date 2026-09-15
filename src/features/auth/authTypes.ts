export interface AuthUser {
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

export interface AuthData {
    token: string;
    user: AuthUser;
}

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
}
