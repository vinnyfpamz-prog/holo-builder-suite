import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import { useInViewport } from "@/hooks/useInViewport";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const ParticlesBackground = memo(() => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ref, isVisible] = useInViewport<HTMLDivElement>({ 
    threshold: 0, 
    rootMargin: '100px',
    triggerOnce: false 
  });

  useEffect(() => {
    const generateParticles = () => {
      // Reduce particle count on mobile for performance
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 15 : 25;
      
      const newParticles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 10,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  // Don't render heavy animations when not visible
  if (!isVisible && particles.length > 0) {
    return (
      <div ref={ref} className="particles-container">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-primary/5 blur-[80px]" />
      </div>
    );
  }

  return (
    <div ref={ref} className="particles-container">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30 will-change-transform"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
            boxShadow: `0 0 ${particle.size * 2}px hsl(24 95% 53% / 0.4)`,
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          initial={{
            y: window.innerHeight + 50,
          }}
        />
      ))}

      {/* Glow orbs - simplified for better performance */}
      <div 
        className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-primary/5 blur-[80px] md:blur-[100px]" 
        style={{ animation: isVisible ? 'pulse 4s ease-in-out infinite' : 'none' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-primary/5 blur-[60px] md:blur-[80px]" 
        style={{ animation: isVisible ? 'pulse 4s ease-in-out infinite 1s' : 'none' }}
      />
    </div>
  );
});

ParticlesBackground.displayName = 'ParticlesBackground';
