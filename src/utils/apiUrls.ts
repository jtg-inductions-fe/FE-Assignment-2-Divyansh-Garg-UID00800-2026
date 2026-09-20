export const BASE_URL = 'https://api.github.com';
export const PAT_GENERATION_URL = 'settings/personal-access-tokens';
export const AUTH_URL = 'user';
export const FOLLOWING_URL = 'user/following';

export const getFollowingsUrl = (): string => `${BASE_URL}/${FOLLOWING_URL}`;

export const getLoginUrl = (): string => `${BASE_URL}/${AUTH_URL}`;
