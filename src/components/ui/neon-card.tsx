import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NeonCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowOnHover?: boolean;
  onClick?: () => void;
}

export const NeonCard = ({
  children,
  className,
  hoverEffect = true,
  glowOnHover = true,
  onClick,
}: NeonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hoverEffect ? { y: -5 } : undefined}
      onClick={onClick}
      className={cn(
        "relative group rounded-xl bg-card border border-border p-6 transition-all duration-300",
        glowOnHover && "hover:border-primary/50 hover:shadow-[0_0_30px_hsl(24_95%_53%/0.15)]",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-xl transition-colors duration-300 group-hover:border-primary" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-xl transition-colors duration-300 group-hover:border-primary" />
      
      {children}
    </motion.div>
  );
};