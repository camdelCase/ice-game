/**
 * Set, get, or delete data from local storage 
 */
export const storage = {
  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },
};