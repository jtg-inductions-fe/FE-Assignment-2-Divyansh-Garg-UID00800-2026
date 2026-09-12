export interface AuthUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    html_url: string;
    name: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    bio: string | null;
    followers: number;
    following: number;
    created_at: string;
}

export const allowedKeys: (keyof AuthUser)[] = [
    'login',
    'id',
    'node_id',
    'avatar_url',
    'html_url',
    'name',
    'blog',
    'location',
    'email',
    'bio',
    'followers',
    'following',
    'created_at',
];

export interface AuthData {
    token: string;
    user: AuthUser;
}

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
}

export interface AuthData {
    token: string;
    user: AuthUser;
}
