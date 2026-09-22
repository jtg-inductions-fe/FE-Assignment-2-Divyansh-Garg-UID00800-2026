export const getHeaders = (token?: string) => {
    if (token) {
        const headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
        };
        return headers;
    } else {
        const headers = {
            Accept: 'application/vnd.github+json',
        };
        return headers;
    }
};
