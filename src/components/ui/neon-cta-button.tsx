import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAudio } from "@/contexts/AudioContext";

interface NeonCtaButtonProps {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'default' | 'lg' | 'xl';
  href?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
}

const NeonCtaButton = React.forwardRef<HTMLButtonElement, NeonCtaButtonProps>(
  ({ className, variant = 'primary', size = 'default', href, children, onClick, disabled, type = 'button', ...props }, ref) => {
    const { playClickSound, playHoverSound } = useAudio();

    const handleClick = () => {
      playClickSound();
      onClick?.();
    };

    const sizeClasses = {
      default: "h-12 px-8 text-sm",
      lg: "h-14 px-10 text-base",
      xl: "h-16 px-12 text-lg",
    };

    const variantClasses = {
      primary: "bg-gradient-to-r from-primary via-[hsl(30,100%,55%)] to-primary text-primary-foreground shadow-[0_0_25px_hsl(24_95%_53%/0.5),0_0_50px_hsl(24_95%_53%/0.25)] hover:shadow-[0_0_40px_hsl(24_95%_53%/0.7),0_0_80px_hsl(24_95%_53%/0.4),0_0_120px_hsl(24_95%_53%/0.2)]",
      outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_25px_hsl(24_95%_53%/0.4),0_0_50px_hsl(24_95%_53%/0.2)]",
      ghost: "bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_20px_hsl(24_95%_53%/0.3)]",
    };

    const baseClasses = cn(
      "relative inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-xl font-display font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group cursor-pointer hover:scale-105",
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    const content = (
      <>
        {/* Animated glow background */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: variant === 'primary' 
              ? 'linear-gradient(135deg, hsl(24 95% 60%) 0%, hsl(30 100% 65%) 50%, hsl(24 95% 55%) 100%)'
              : 'linear-gradient(135deg, hsl(24 95% 53% / 0.2) 0%, hsl(30 100% 60% / 0.2) 100%)',
          }}
        />
        
        {/* Shine effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-0 -left-full w-full h-full animate-shine"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            }}
          />
        </div>

        {/* Pulsing glow ring */}
        <div
          className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-pulse-glow pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, hsl(24 95% 53%) 0%, hsl(30 100% 60%) 50%, hsl(24 95% 53%) 100%)',
            filter: 'blur(8px)',
          }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-3">
          {children}
        </span>

        {/* Corner sparkles */}
        <div className="absolute top-1 right-2 w-1 h-1 rounded-full bg-white/60 animate-pulse" />
        <div className="absolute bottom-1 left-2 w-0.5 h-0.5 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </>
    );

    if (href) {
      return (
        <motion.a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={baseClasses}
          onMouseEnter={playHoverSound}
          onClick={playClickSound}
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        type={type}
        className={baseClasses}
        ref={ref}
        onMouseEnter={playHoverSound}
        onClick={handleClick}
        whileTap={{ scale: 0.98 }}
        disabled={disabled}
      >
        {content}
      </motion.button>
    );
  }
);

NeonCtaButton.displayName = "NeonCtaButton";

export { NeonCtaButton };
