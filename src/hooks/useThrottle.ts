'use client';

import { useState, useEffect, useRef } from 'react';

export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  // Initialise to 0 so first call always passes immediately
  const lastRan = useRef(0);

  useEffect(() => {
    const now = Date.now();
    const remaining = limit - (now - lastRan.current);

    if (remaining <= 0) {
      setThrottledValue(value);
      lastRan.current = now;
    } else {
      const handler = setTimeout(() => {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }, remaining);
      return () => clearTimeout(handler);
    }
  }, [value, limit]);

  return throttledValue;
}

export default useThrottle;

