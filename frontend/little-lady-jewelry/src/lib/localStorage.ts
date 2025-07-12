export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : defaultValue;
    
} catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
}
}