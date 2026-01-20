import { useState, useRef, useEffect, memo } from 'react';
import { useInViewport } from '@/hooks/useInViewport';
import { Play } from 'lucide-react';

interface LazyVideoProps {
  src: string;
  className?: string;
  poster?: string;
  onPlay?: () => void;
  onPause?: () => void;
  showPlayButton?: boolean;
  autoPlayOnHover?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export const LazyVideo = memo(({ 
  src, 
  className = '',
  poster,
  onPlay,
  onPause,
  showPlayButton = false,
  autoPlayOnHover = true,
  muted = true,
  loop = true
}: LazyVideoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [containerRef, isInViewport] = useInViewport<HTMLDivElement>({ 
    threshold: 0.1,
    rootMargin: '200px', // Start loading 200px before entering viewport
    triggerOnce: false 
  });

  // Pause video when out of viewport to save resources
  useEffect(() => {
    if (!isInViewport && videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      onPause?.();
    }
  }, [isInViewport, isPlaying, onPause]);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  const handleMouseEnter = () => {
    if (autoPlayOnHover && videoRef.current && isLoaded) {
      setShowPoster(false);
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        onPlay?.();
      }).catch(() => {
        // Autoplay blocked, ignore
      });
    }
  };

  const handleMouseLeave = () => {
    if (autoPlayOnHover && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setShowPoster(true);
      onPause?.();
    }
  };

  const handleClick = () => {
    if (!autoPlayOnHover && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        onPause?.();
      } else {
        setShowPoster(false);
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          onPlay?.();
        }).catch(() => {});
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Placeholder while loading */}
      {(!isLoaded || showPoster) && (
        <div className="absolute inset-0 bg-secondary/50 flex items-center justify-center">
          {showPlayButton && (
            <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center">
              <Play className="w-5 h-5 text-primary ml-0.5" />
            </div>
          )}
        </div>
      )}
      
      {/* Only load video when near viewport */}
      {isInViewport && (
        <video
          ref={videoRef}
          src={src}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded && !showPoster ? 'opacity-100' : 'opacity-0'}`}
          muted={muted}
          loop={loop}
          playsInline
          preload="metadata"
          onLoadedData={handleLoadedData}
        />
      )}
    </div>
  );
});

LazyVideo.displayName = 'LazyVideo';
