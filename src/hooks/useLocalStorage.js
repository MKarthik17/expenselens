import { useState, useEffect } from "react";

// Works like useState, but the value is also saved in the browser.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage can be full or blocked; the app still works without it
    }
  }, [key, value]);

  return [value, setValue];
}
