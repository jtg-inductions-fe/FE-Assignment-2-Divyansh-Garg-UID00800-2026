const reqRegexClassic = /^ghp_[a-zA-Z0-9]{36}$/;
const reqRegexFineGrained = /^github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59}$/;

export function checkRegexFunction(token: string): boolean {
    return reqRegexClassic.test(token) || reqRegexFineGrained.test(token);
}
