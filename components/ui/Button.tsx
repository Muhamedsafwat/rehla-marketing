"use client";

import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ReactNode, useRef, memo, useCallback, useState } from "react";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isMagnetic?: boolean;
  href?: string;
  target?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, isMagnetic = true, children, disabled, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const buttonRef = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 100, damping: 22, mass: 0.15 });
    const springY = useSpring(y, { stiffness: 100, damping: 22, mass: 0.15 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isMagnetic || disabled || isLoading) return;
      
      const { clientX, clientY } = e;
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const pullX = (clientX - centerX) * 0.12; 
      const pullY = (clientY - centerY) * 0.12;
      
      x.set(pullX);
      y.set(pullY);
    }, [disabled, isLoading, isMagnetic, x, y]);

    const handleMouseLeave = useCallback(() => {
      x.set(0);
      y.set(0);
      setIsHovered(false);
    }, [x, y]);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);

    const variants = {
      primary: "bg-primary text-white shadow-[0_20px_50px_rgba(146,11,11,0.25)] hover:shadow-[0_25px_70px_rgba(146,11,11,0.45)]",
      secondary: "bg-white text-black hover:bg-zinc-100 shadow-xl",
      outline: "border border-white/20 text-white hover:bg-white/5 backdrop-blur-md",
      ghost: "text-zinc-500 hover:text-white hover:bg-white/5",
      glass: "bg-white/[0.03] backdrop-blur-3xl border border-white/[0.1] text-white hover:bg-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
    };

    const sizes = {
      sm: "px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-black",
      md: "px-8 py-3 text-xs font-black uppercase tracking-[0.3em]",
      lg: "px-12 py-4 text-base font-black uppercase tracking-[0.4em] italic",
      xl: "px-16 py-5 text-xl font-black tracking-tighter uppercase italic",
    };

    const commonProps = {
      ref: buttonRef as any,
      style: { x: springX, y: springY },
      onMouseMove: handleMouseMove as any,
      onMouseEnter: handleMouseEnter as any,
      onMouseLeave: handleMouseLeave,
      whileTap: !disabled && !isLoading ? { scale: 0.95 } : {},
      className: cn(
        "group relative flex items-center justify-center gap-3 rounded-full transition-all duration-700 overflow-hidden focus:outline-none focus:ring-1 focus:ring-primary/40 disabled:opacity-30 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )
    };

    const innerContent = (
      <>
        <AnimatePresence>
          {isHovered && !disabled && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 z-0 overflow-hidden"
            >
               <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-primary/30 to-transparent blur-[20px]" />
               
               <motion.div 
                 initial={{ x: '-100%' }}
                 animate={{ x: '150%' }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent skew-x-[-35deg]"
               />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={cn(
           "absolute inset-0 border border-white/10 rounded-full transition-opacity duration-700 group-hover:opacity-100",
           !isHovered && "opacity-0"
        )} />

        <div className="relative z-10 flex items-center gap-4 transition-transform duration-700 group-hover:scale-110">
          {!isLoading && leftIcon && (
            <span className="transition-all duration-700 group-hover:-translate-x-1.5">{leftIcon}</span>
          )}
          
          <span className={cn("inline-block", isLoading && "opacity-0")}>
            {children}
          </span>
          
          {!isLoading && rightIcon && (
            <span className="transition-all duration-700 group-hover:translate-x-1.5">{rightIcon}</span>
          )}
        </div>
        
        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20">
             <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          </div>
        )}
      </>
    );

    if (props.href) {
      return (
        <motion.a
          href={props.href}
          target={props.target}
          rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
          {...commonProps}
        >
          {innerContent}
        </motion.a>
      );
    }

    return (
      <motion.button
        disabled={disabled || isLoading}
        {...commonProps}
        {...props}
      >
        {innerContent}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

const MemoizedButton = memo(Button);
export { MemoizedButton as Button };
