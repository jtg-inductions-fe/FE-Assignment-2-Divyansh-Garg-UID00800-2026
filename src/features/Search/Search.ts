export interface GithubUser {
    login: string;
    id: number;
    avatar_url: string;
    type: string;
    email: string;
    html_url: string;
}

export interface GithubSearchResponse {
    totalCount: number;
    incompleteResults: boolean;
    items: GithubUser[];
}
