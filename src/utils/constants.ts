/**
 * It validates a classic GitHub Personal Access Token(PAT).
 *
 * Format:
 * ghp_ + 36 alphanumeric characters
 *
 * Example:
 * ghp_abcdefghijklmnopqrstuvwxyz1234567890
 */
export const reqRegexClassic = /^ghp_[a-zA-Z0-9]{36}$/;

/**
 * It validates a fine-grained GitHub Personal Access Token(PAT).
 *
 * Format:
 * github_pat_ + 22 alphanumeric characters + "_" + 59 alphanumeric characters
 *
 * Example:
 * github_pat_abcdefghijklmnopqrstuv_abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrst123
 */
export const reqRegexFineGrained = /^github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59}$/;

/**
 * This is used to dynamically toggle React Strict Mode based on an environment variable.
 */
export const isStrictModeDisabled = import.meta.env.VITE_DISABLE_STRICT_MODE === 'true';
