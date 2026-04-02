"use client";

import { forwardRef, InputHTMLAttributes, useState, ReactNode, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'outline' | 'glass';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, leftIcon, rightIcon, variant = 'glass', ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="w-full space-y-3 group">
        {label && (
          <div className="flex items-center gap-3 ml-1 mb-1">
             <div className={cn(
               "w-1 h-3 bg-primary transition-all duration-700",
               isFocused ? "scale-y-125 opacity-100" : "scale-y-0 opacity-0"
             )} />
             <label className={cn(
               "block text-[10px] font-black uppercase tracking-[0.5em] transition-all duration-700",
               isFocused ? "text-white translate-x-1" : "text-zinc-600"
             )}>
               {label}
             </label>
          </div>
        )}
        
        <div className={cn(
          "relative transition-all duration-700 rounded-2xl overflow-hidden",
          variant === 'glass' ? "bg-black/40 backdrop-blur-3xl border border-white/[0.05]" : "bg-zinc-950 border border-white/[0.03]",
          isFocused && "border-white/10 ring-1 ring-white/5"
        )}>
          
          <AnimatePresence>
            {isFocused && (
              <motion.div 
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary z-20 origin-top"
              />
            )}
          </AnimatePresence>

          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          <div className={cn(
            "absolute inset-0 transition-opacity duration-700 pointer-events-none",
            isFocused ? "opacity-10" : "opacity-0",
            "bg-gradient-to-tr from-primary to-transparent"
          )} />

          {leftIcon && (
            <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-zinc-600 group-focus-within:text-primary transition-all duration-700">
              {leftIcon}
            </div>
          )}

          <input
            type={type}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "relative z-10 flex h-16 w-full bg-transparent px-8 py-5 text-base font-bold text-white transition-all appearance-none outline-none ring-0 placeholder:text-zinc-700 placeholder:font-medium disabled:cursor-not-allowed disabled:opacity-30",
              leftIcon ? "pl-16" : "pl-8",
              rightIcon ? "pr-14" : "pr-8",
              className
            )}
            ref={ref}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-zinc-600 group-focus-within:text-white transition-all duration-700">
              {rightIcon}
            </div>
          )}
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-[9px] font-black text-primary ml-4 uppercase tracking-[0.3em] italic"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";

const MemoizedInput = memo(Input);
export { MemoizedInput as Input };
