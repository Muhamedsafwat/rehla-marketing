"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DividerProps {
  label?: string;
  className?: string;
}

export const Divider = ({ label, className }: DividerProps) => {
  return (
    <div className={cn("relative flex items-center justify-center py-10 w-full overflow-hidden", className)}>
      
      <motion.div 
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: "160px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-10%" }}
        className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-500 cursor-crosshair"
      >
        
        {/* Left Fading Line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-primary/40" />
        
        {/* Center Creative Element (Rotating Diamond Core) */}
        <div className="mx-4 flex items-center justify-center flex-none relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border border-white/20 shadow-[0_0_15px_rgba(204,10,10,0.2)]"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_#cc0a0a] animate-pulse" />
        </div>

        {/* Right Fading Line */}
        <div className="h-[1px] w-full bg-gradient-to-l from-transparent via-white/10 to-primary/40" />

      </motion.div>

      {label && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-10 text-[9px] uppercase font-black tracking-[0.6em] text-zinc-600 transition-colors duration-700">
          {label}
        </span>
      )}
      
    </div>
  );
};
