import { useState, memo } from 'react';
import { useInViewport } from '@/hooks/useInViewport';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  placeholderClassName?: string;
}

export const LazyImage = memo(({
  src,
  alt,
  className = '',
  containerClassName = '',
  placeholderClassName = ''
}: LazyImageProps) => {
  const [ref, isVisible] = useInViewport<HTMLDivElement>({
    threshold: 0.01,
    rootMargin: '200px',
    triggerOnce: true
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div ref={ref} className={cn('relative overflow-hidden w-full h-full', containerClassName)}>
      {/* Placeholder */}
      {!isLoaded && (
        <div 
          className={cn(
            'absolute inset-0 bg-muted animate-pulse',
            placeholderClassName
          )} 
        />
      )}
      
      {/* Actual image - only load when visible */}
      {isVisible && !hasError && (
        <img
          src={src}
          alt={alt}
          className={cn(
            'transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm">
          Erro ao carregar
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';
