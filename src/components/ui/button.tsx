import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-display uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-glow hover:shadow-[0_0_20px_hsl(24_95%_53%/0.5),0_0_40px_hsl(24_95%_53%/0.3)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(24_95%_53%/0.3)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neon: "relative bg-primary text-primary-foreground overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary before:via-primary-glow before:to-primary before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 hover:shadow-[0_0_30px_hsl(24_95%_53%/0.6),0_0_60px_hsl(24_95%_53%/0.4)]",
        hero: "bg-gradient-to-r from-primary via-primary-glow to-primary text-primary-foreground shadow-[0_0_20px_hsl(24_95%_53%/0.5)] hover:shadow-[0_0_40px_hsl(24_95%_53%/0.8),0_0_80px_hsl(24_95%_53%/0.4)] hover:scale-105",
        glass: "bg-secondary/50 backdrop-blur-md border border-primary/30 text-foreground hover:border-primary hover:shadow-[0_0_20px_hsl(24_95%_53%/0.3)]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-14 rounded-lg px-10 text-base",
        xl: "h-16 rounded-xl px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
