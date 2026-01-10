import { useState, useEffect, useRef, RefObject } from 'react';

interface UseInViewportOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInViewport<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewportOptions = {}
): [RefObject<T>, boolean] {
  const { threshold = 0.1, rootMargin = '50px', triggerOnce = false } = options;
  const ref = useRef<T>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already triggered and triggerOnce is true, skip
    if (triggerOnce && hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        
        if (inView) {
          setIsInViewport(true);
          hasTriggered.current = true;
          
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInViewport(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isInViewport];
}
