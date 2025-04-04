import React, { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Atualiza o valor debounced após o delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpa o timer se o valor mudar antes do delay
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook para debounce de função
export const useDebounceCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return React.useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;
}; 