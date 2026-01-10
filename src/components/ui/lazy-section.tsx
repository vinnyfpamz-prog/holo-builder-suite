import { ReactNode, memo } from 'react';
import { motion } from 'framer-motion';
import { useInViewport } from '@/hooks/useInViewport';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade' | 'slide-up' | 'slide-right' | 'scale' | 'none';
  delay?: number;
}

export const LazySection = memo(({ 
  children, 
  className = '',
  animation = 'fade',
  delay = 0
}: LazySectionProps) => {
  const [ref, isVisible] = useInViewport<HTMLDivElement>({ 
    threshold: 0.05,
    rootMargin: '100px',
    triggerOnce: true 
  });

  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    'slide-up': {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
    },
    'slide-right': {
      initial: { opacity: 0, x: -40 },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
    },
    none: {
      initial: {},
      animate: {},
    }
  };

  const selectedAnimation = animations[animation];

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={selectedAnimation.initial}
        animate={isVisible ? selectedAnimation.animate : selectedAnimation.initial}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
});

LazySection.displayName = 'LazySection';
