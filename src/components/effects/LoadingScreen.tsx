import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  minDuration?: number;
}

export const LoadingScreen = ({ onLoadingComplete, minDuration = 5000 }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const maxDuration = 7000;
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const naturalProgress = Math.min((elapsed / maxDuration) * 100, 100);
      
      // Add some randomness for realistic feel
      setProgress(prev => {
        const increment = Math.random() * 15 + 5;
        const newProgress = Math.min(prev + increment, naturalProgress + 20, 100);
        return newProgress;
      });
    }, 150);

    // Check if page is ready
    const checkReady = () => {
      const elapsed = Date.now() - startTime;
      if (document.readyState === 'complete' && elapsed >= minDuration) {
        setProgress(100);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onLoadingComplete, 600);
        }, 300);
        return true;
      }
      return false;
    };

    // Force complete after max duration
    const forceComplete = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(onLoadingComplete, 600);
      }, 300);
    }, maxDuration);

    // Check periodically if page is ready
    const readyInterval = setInterval(() => {
      if (checkReady()) {
        clearInterval(readyInterval);
        clearInterval(progressInterval);
        clearTimeout(forceComplete);
      }
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(readyInterval);
      clearTimeout(forceComplete);
    };
  }, [onLoadingComplete, minDuration]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Radial gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(24_95%_53%/0.15)_0%,_transparent_70%)]" />
            
            {/* Animated grid lines */}
            <div className="absolute inset-0 opacity-20">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, hsl(24 95% 53% / 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, hsl(24 95% 53% / 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '60px 60px',
                }}
              />
            </div>

            {/* Floating geometric shapes */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-primary/30"
                style={{
                  width: 60 + i * 20,
                  height: 60 + i * 20,
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  borderRadius: i % 2 === 0 ? '50%' : '8px',
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Scanning line */}
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
              animate={{
                top: ['-10%', '110%'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-4">
            {/* Logo/Brand animation */}
            <motion.div
              className="relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/50"
                style={{ width: 120, height: 120, margin: -20 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner ring with dots */}
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/30"
                style={{ width: 100, height: 100, margin: -10 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 90}deg) translateX(48px) translateY(-50%)`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Center logo */}
              <motion.div
                className="w-20 h-20 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 20px hsl(24 95% 53% / 0.4)',
                    '0 0 40px hsl(24 95% 53% / 0.6)',
                    '0 0 20px hsl(24 95% 53% / 0.4)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.img
                  src={logo}
                  alt="Vinny Artz Logo"
                  className="w-16 h-16 object-contain"
                  animate={{ 
                    filter: [
                      'drop-shadow(0 0 10px hsl(24 95% 53% / 0.5))',
                      'drop-shadow(0 0 30px hsl(24 95% 53% / 0.8))',
                      'drop-shadow(0 0 10px hsl(24 95% 53% / 0.5))',
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              className="flex items-center gap-2 font-display text-sm text-primary/80 tracking-[0.3em] uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span>Carregando</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ...
              </motion.span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-64 sm:w-80 h-1 bg-muted rounded-full overflow-hidden"
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-primary-glow to-primary rounded-full relative"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>

            {/* Progress percentage */}
            <motion.div
              className="font-display text-xs text-muted-foreground tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-primary/40" />
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-primary/40" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-primary/40" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-primary/40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
