import React, { useState, useEffect, useCallback } from 'react';

export const useThrottle = <T>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setThrottledValue(value);
    }, limit);

    return () => {
      clearTimeout(timer);
    };
  }, [value, limit]);

  return throttledValue;
};

// Hook para throttle de função
export const useThrottleCallback = <T extends (...args: any[]) => any>(
  callback: T,
  limit: number
): T => {
  const lastRun = React.useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastRun.current >= limit) {
        callback(...args);
        lastRun.current = now;
      }
    },
    [callback, limit]
  ) as T;
};

// Hook para throttle de scroll
export const useThrottleScroll = (limit: number = 100) => {
  const [scrollPosition, setScrollPosition] = useState({
    x: window.scrollX,
    y: window.scrollY
  });

  useEffect(() => {
    const handleScroll = useThrottleCallback(() => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY
      });
    }, limit);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [limit]);

  return scrollPosition;
}; 