import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const breakpoints = {
  xs: '(max-width: 600px)',
  sm: '(min-width: 600px) and (max-width: 960px)',
  md: '(min-width: 960px) and (max-width: 1280px)',
  lg: '(min-width: 1280px) and (max-width: 1920px)',
  xl: '(min-width: 1920px)'
};

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  return useMediaQuery(breakpoints[breakpoint]);
};

// Utility hooks
export const useIsMobile = () => useBreakpoint('xs');
export const useIsTablet = () => useBreakpoint('sm');
export const useIsDesktop = () => useBreakpoint('md');
export const useIsLargeScreen = () => useBreakpoint('lg');
export const useIsExtraLargeScreen = () => useBreakpoint('xl');

// User preferences
export const usePrefersDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)');
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
export const usePrefersHighContrast = () => useMediaQuery('(prefers-contrast: high)');
export const usePrefersReducedTransparency = () => useMediaQuery('(prefers-reduced-transparency: reduce)'); 