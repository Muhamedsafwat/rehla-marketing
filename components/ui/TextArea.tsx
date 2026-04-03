"use client";

import { forwardRef, TextareaHTMLAttributes, useState, ReactNode, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant?: 'outline' | 'glass' | 'minimal';
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, variant = 'glass', ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const isMinimal = variant === 'minimal';

    return (
      <div className="w-full space-y-2 group">
        {label && (
          <div className="flex items-center gap-2 ml-0 mb-1">
             <div className={cn(
               "h-[2px] bg-primary transition-all duration-700",
               isFocused ? "w-4 opacity-100" : "w-0 opacity-0"
             )} />
             <label className={cn(
               "block text-[9px] font-black uppercase tracking-[0.4em] transition-all duration-700 select-none",
               isFocused ? "text-white" : "text-zinc-600"
             )}>
               {label}
             </label>
          </div>
        )}
        
        <div className={cn(
          "relative transition-all duration-700",
          !isMinimal && "rounded-2xl overflow-hidden",
          variant === 'glass' && "bg-black/40 backdrop-blur-3xl border border-white/[0.05]",
          variant === 'outline' && "bg-zinc-950 border border-white/[0.03]",
          isMinimal && "bg-transparent border-b border-white/10 rounded-none",
          isFocused && !isMinimal && "border-white/10 ring-1 ring-white/5"
        )}>
          
          {/* Progress Indictor for Minimal Variant */}
          {isMinimal && (
             <motion.div 
                initial={false}
                animate={{ width: isFocused ? "100%" : "0%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-[-1px] left-0 h-[1.5px] bg-primary z-20 origin-left"
             />
          )}

          <AnimatePresence>
            {isFocused && !isMinimal && (
              <motion.div 
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary z-20 origin-top"
              />
            )}
          </AnimatePresence>

          {!isMinimal && (
             <>
               <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
               <div className={cn(
                 "absolute inset-0 transition-opacity duration-700 pointer-events-none",
                 isFocused ? "opacity-10" : "opacity-0",
                 "bg-gradient-to-tr from-primary to-transparent"
               )} />
             </>
          )}

          <textarea
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "relative z-10 flex min-h-[140px] w-full bg-transparent text-base font-bold text-white transition-all appearance-none outline-none ring-0 placeholder:text-white/20 placeholder:font-medium disabled:cursor-not-allowed disabled:opacity-30 resize-none",
              isMinimal ? "px-0 py-4" : "px-8 py-6",
              className
            )}
            ref={ref}
            {...props}
          />
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

TextArea.displayName = "TextArea";

const MemoizedTextArea = memo(TextArea);
export { MemoizedTextArea as TextArea };
