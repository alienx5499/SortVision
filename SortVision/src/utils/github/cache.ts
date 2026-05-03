const CACHE_DURATION_MS = 5 * 60 * 1000;

export const githubCache = {
  get(key: string): string | null {
    try {
      const data = localStorage.getItem(key);
      const time = localStorage.getItem(`${key}_time`);

      if (data && time) {
        const age = Date.now() - Number.parseInt(time, 10);
        if (age < CACHE_DURATION_MS) {
          return data;
        }
      }
    } catch (error) {
      console.warn('Cache read error:', error);
    }
    return null;
  },

  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
      localStorage.setItem(`${key}_time`, Date.now().toString());
    } catch (error) {
      console.warn('Cache write error:', error);
    }
  },

  clear(keys: string[]): void {
    try {
      keys.forEach(key => {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_time`);
      });
    } catch (error) {
      console.warn('Failed to clear GitHub cache:', error);
    }
  },
};
