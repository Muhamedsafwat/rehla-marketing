"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Ambient Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-50 z-0" />

          {/* Central Orbit / Radar Ring */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-white/10 z-0"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.5 }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
            className="absolute w-[200px] h-[200px] rounded-full bg-primary/5 blur-3xl z-0"
          />

          {/* The SVG Logo Animation Container */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center filter drop-shadow-[0_0_20px_rgba(204,10,10,0.5)]"
            >
              <div className="relative w-full h-full">
                <div 
                  className="absolute inset-0"
                  style={{
                    WebkitMaskImage: "url('/Logos/White-Logo.png')",
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                  }}
                >
                  {/* 1) Ghost Silhouette Surface */}
                  <div className="absolute inset-0 bg-white/10" />

                  {/* 2) Liquid Energy Fill (Rises from the bottom) */}
                  <motion.div 
                    className="absolute left-0 right-0 top-0 h-[200%] w-full bg-gradient-to-t from-[#cc0a0a] via-[#ff4d4d] to-transparent"
                    initial={{ y: "50%", opacity: 0 }}
                    animate={{ y: ["50%", "-5%", "0%"], opacity: 1 }}
                    transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                  />
                  
                  {/* 3) Laser Scanning Bar */}
                  <motion.div 
                    className="absolute left-[-50%] top-0 w-[200%] h-2 bg-white blur-[2px] shadow-[0_0_20px_10px_#cc0a0a] mix-blend-overlay"
                    initial={{ y: 200, rotate: -15, opacity: 0 }}
                    animate={{ y: -50, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.8, ease: "easeInOut", delay: 0.5 }}
                  />

                  {/* 4) Final Solid White Brand Boot */}
                  <motion.div 
                    className="absolute inset-0 bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2.3 }}
                  />
                </div>

              </div>

              {/* Central ignition spark */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white blur-[8px]"
              />
            </motion.div>

            {/* Typography Logic */}
            <div className="flex flex-col items-center gap-2 overflow-hidden">
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-white font-black tracking-[0.4em] uppercase text-sm md:text-base"
              >
                Rehla Marketing
              </motion.span>
              <div className="h-0.5 w-0 bg-primary mx-auto mt-1 relative overflow-hidden">
                 <motion.div 
                   className="absolute inset-0 bg-primary"
                   initial={{ width: "0%" }}
                   animate={{ width: "100%" }}
                   transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                 />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mt-2"
              >
                System Booting...
              </motion.span>
            </div>

          </div>

          {/* Sweeping Scanline Effect */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "1000%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent z-20 pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
