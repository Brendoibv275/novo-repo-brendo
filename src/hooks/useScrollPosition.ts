import { useState, useEffect } from 'react';
import { throttle } from '../utils';

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | null;
}

export const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';

      setScrollPosition({
        x: window.scrollX,
        y: currentScrollY,
        direction
      });

      lastScrollY = currentScrollY;
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
}; 