import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only enable on desktop
    const isMobile = window.matchMedia("(max-width: 1024px)").matches || 
                     'ontouchstart' in window || 
                     navigator.maxTouchPoints > 0;
    
    if (isMobile) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements
    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, []);

  // Don't render on mobile
  if (typeof window !== "undefined") {
    const isMobile = window.matchMedia("(max-width: 1024px)").matches || 
                     'ontouchstart' in window;
    if (isMobile) return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor glow */}
          <motion.div
            className="fixed pointer-events-none z-[9999] mix-blend-screen"
            animate={{
              x: mousePosition.x - 150,
              y: mousePosition.y - 150,
              scale: isHovering ? 1.5 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
              mass: 0.5,
            }}
            style={{
              width: 300,
              height: 300,
              background: "radial-gradient(circle, hsl(24 95% 53% / 0.15) 0%, hsl(24 95% 53% / 0.05) 40%, transparent 70%)",
              borderRadius: "50%",
            }}
          />

          {/* Inner cursor dot */}
          <motion.div
            className="fixed pointer-events-none z-[9999]"
            animate={{
              x: mousePosition.x - 6,
              y: mousePosition.y - 6,
              scale: isHovering ? 2 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
            }}
            style={{
              width: 12,
              height: 12,
              background: "hsl(24 95% 53%)",
              borderRadius: "50%",
              boxShadow: "0 0 20px hsl(24 95% 53% / 0.8), 0 0 40px hsl(24 95% 53% / 0.4)",
            }}
          />

          {/* Trailing particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed pointer-events-none z-[9998]"
              animate={{
                x: mousePosition.x - 4,
                y: mousePosition.y - 4,
              }}
              transition={{
                type: "spring",
                stiffness: 100 - i * 20,
                damping: 20 + i * 5,
                mass: 0.5 + i * 0.2,
              }}
              style={{
                width: 8 - i * 2,
                height: 8 - i * 2,
                background: `hsl(24 95% 53% / ${0.6 - i * 0.15})`,
                borderRadius: "50%",
                boxShadow: `0 0 ${10 - i * 2}px hsl(24 95% 53% / ${0.5 - i * 0.1})`,
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );
};
