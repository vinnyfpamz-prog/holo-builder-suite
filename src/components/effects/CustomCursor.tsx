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
          {/* Main cursor glow - soft and subtle */}
          <motion.div
            className="fixed pointer-events-none z-[9999] mix-blend-screen"
            animate={{
              x: mousePosition.x - 100,
              y: mousePosition.y - 100,
              scale: isHovering ? 1.3 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 0.3,
            }}
            style={{
              width: 200,
              height: 200,
              background: "radial-gradient(circle, hsl(24 95% 53% / 0.12) 0%, hsl(24 95% 53% / 0.04) 50%, transparent 70%)",
              borderRadius: "50%",
            }}
          />

          {/* Subtle inner glow */}
          <motion.div
            className="fixed pointer-events-none z-[9998] mix-blend-screen"
            animate={{
              x: mousePosition.x - 40,
              y: mousePosition.y - 40,
              scale: isHovering ? 1.2 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 0.2,
            }}
            style={{
              width: 80,
              height: 80,
              background: "radial-gradient(circle, hsl(24 95% 53% / 0.2) 0%, hsl(24 95% 53% / 0.08) 40%, transparent 70%)",
              borderRadius: "50%",
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};
