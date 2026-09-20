const get = <T>(key: string): T | null => {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
        return null;
    }

    try {
        return JSON.parse(storedValue) as T;
    } catch {
        localStorage.removeItem(key);
        return null;
    }
};

const set = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Failed to save data to LocalStorage for key "${key}":`, error);
    }
};

const remove = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.warn(`Failed to remove LocalStorage key "${key}":`, error);
    }
};

export const localStorageUtils = {
    get,
    set,
    remove,
};
