import { reqRegexClassic, reqRegexFineGrained } from './constants';

function snakeToCamel(str: string): string {
    return str
        .toLowerCase()
        .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
}

export function checkRegexFunction(token: string): boolean {
    return reqRegexClassic.test(token) || reqRegexFineGrained.test(token);
}

export function snakeToCamelCase<T, U>(rawdata: T): U {
    if (rawdata === null || typeof rawdata !== 'object') {
        return rawdata as unknown as U;
    }

    const transformedData: Record<string, unknown> = {};
    for (const key in rawdata) {
        const formattedKey = snakeToCamel(key);
        transformedData[formattedKey] = rawdata[key];
    }

    return transformedData as U;
}
