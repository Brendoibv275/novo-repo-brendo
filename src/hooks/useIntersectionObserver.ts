import React, { useEffect, useRef, useState } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface IntersectionObserverResult {
  ref: React.RefObject<Element>;
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
}

export const useIntersectionObserver = (
  options: IntersectionObserverOptions = {}
): IntersectionObserverResult => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const ref = useRef<Element>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      {
        root: options.root,
        rootMargin: options.rootMargin,
        threshold: options.threshold
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.root, options.rootMargin, options.threshold]);

  return { ref, isIntersecting, entry };
};

// Hook para animação de fade-in ao scroll
export const useFadeIn = (
  options: IntersectionObserverOptions = {}
): React.RefObject<Element> => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    ...options
  });

  useEffect(() => {
    if (isIntersecting && ref.current) {
      ref.current.classList.add('fade-in');
    }
  }, [isIntersecting]);

  return ref;
};

// Hook para lazy loading de imagens
export const useLazyImage = (src: string): { ref: React.RefObject<HTMLImageElement>; src: string } => {
  const ref = useRef<HTMLImageElement>(null);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [src]);

  return { ref, src: imageSrc };
}; 