import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeScreen: boolean;
  isExtraLargeScreen: boolean;
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 600,
    isTablet: window.innerWidth >= 600 && window.innerWidth < 960,
    isDesktop: window.innerWidth >= 960,
    isLargeScreen: window.innerWidth >= 1280,
    isExtraLargeScreen: window.innerWidth >= 1920
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 600,
        isTablet: window.innerWidth >= 600 && window.innerWidth < 960,
        isDesktop: window.innerWidth >= 960,
        isLargeScreen: window.innerWidth >= 1280,
        isExtraLargeScreen: window.innerWidth >= 1920
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Hook para orientação da tela
export const useOrientation = (): 'portrait' | 'landscape' => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      );
    };

    window.addEventListener('resize', handleOrientationChange);
    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

  return orientation;
};

// Hook para scroll da janela
export const useScroll = () => {
  const [scroll, setScroll] = useState({
    x: window.scrollX,
    y: window.scrollY,
    direction: 'down' as 'up' | 'down'
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScroll({
        x: window.scrollX,
        y: currentScrollY,
        direction: currentScrollY > lastScrollY ? 'down' : 'up'
      });
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scroll;
}; 