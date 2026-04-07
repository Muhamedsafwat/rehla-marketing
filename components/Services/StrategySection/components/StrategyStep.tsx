"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import React, { memo, useRef } from "react";

interface StrategyStepProps {
  p: string;
  index: number;
  isRtl: boolean;
  t_sync: string;
}

export const StrategyStep = memo(({ p, index, isRtl, t_sync }: StrategyStepProps) => {
   const ref = useRef(null);
   const isInView = useInView(ref, { 
      amount: 0.5,
      margin: "-10% 0px -10% 0px"
   });

   const lineProgress = useSpring(isInView ? 1 : 0, { stiffness: 45, damping: 25 });
   const lineScale    = useTransform(lineProgress, [0, 1], [0, 1]);

   return (
      <motion.div 
         ref={ref}
         initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
         className={`relative w-full py-10 md:py-28`}
      >
         
         <div className={`container mx-auto px-6 max-w-7xl relative`}>
            
            <div className={`absolute top-0 bottom-0 ${isRtl ? 'right-4 md:right-12 lg:right-24' : 'left-4 md:left-12 lg:left-24'} w-px bg-white/5 z-0`}>
               <motion.div 
                 style={{ scaleY: lineScale }}
                 className="absolute inset-0 w-px bg-primary shadow-[0_0_20px_rgba(146,11,11,0.5)] origin-top" 
               />
            </div>

            <div className={`
               absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-1000
               ${isRtl ? 'right-[-12px] md:right-0 lg:right-12' : 'left-[-12px] md:left-0 lg:left-12'}
               w-12 h-12 md:w-24 md:h-24 lg:w-32 lg:h-32 flex items-center justify-center
            `}>
               <div className={`absolute inset-0 border border-white/5 rounded-full transition-all duration-1000 bg-zinc-950/95 shadow-[0_0_50px_rgba(0,0,0,0.8)] ${isInView ? 'border-primary ring-[6px] md:ring-[15px] ring-primary/5' : ''}`} />
               <div className="relative flex flex-col items-center">
                  <motion.span 
                     animate={isInView ? { opacity: 1, scale: 1, color: "rgba(146, 11, 11, 1)" } : { opacity: 0.1, scale: 0.85, color: "rgba(39, 39, 42, 1)" }}
                     className={`text-xl md:text-5xl font-mono font-black italic transition-all duration-700 select-none`}
                  >
                     0{index + 1}
                  </motion.span>
               </div>
               {isInView && (
                  <motion.div 
                     initial={{ scale: 0.8, opacity: 0.4 }}
                     animate={{ scale: 2, opacity: 0 }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="absolute inset-0 w-full h-full rounded-full border border-primary/20"
                  />
               )}
            </div>

            <div className={`
               relative z-10 w-full flex flex-col gap-4 md:gap-10
               ${isRtl 
                  ? 'text-right items-end pr-20 md:pr-32 lg:pr-56' 
                  : 'text-left items-start pl-20 md:pl-32 lg:pl-56'
               }
            `}>
               
               <div className={`flex items-center gap-4 md:gap-6 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span className={`text-[8px] md:text-[11px] font-mono font-black italic transition-colors tracking-[0.3em] md:tracking-[0.6em] uppercase ${isInView ? 'text-primary' : 'text-zinc-700'}`}>
                     {isRtl ? `مـرحـلة_الـتـنـفـيـذ // 0${index + 1}` : `PHASE_EXEC // 0${index + 1}`}
                  </span>
                  <div className={`hidden md:block h-px transition-all duration-1000 ${isInView ? 'w-24 md:w-32 bg-primary/30' : 'w-12 md:w-16 bg-white/5'}`} />
               </div>

               <h4 className={`text-2xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight transition-all duration-1000 leading-[1] md:leading-[0.95] text-balance break-words ${isInView ? 'text-white' : 'text-zinc-800'}`}>
                  {p}
               </h4>

               <div className={`flex items-center gap-6 md:gap-8 pt-2 md:pt-6 ${isRtl ? 'flex-row-reverse' : 'flex-row'} transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-10'}`}>
                  <div className="flex gap-1 md:gap-1.5">
                     {[1,2,3].map(bit => (
                        <div key={bit} className="h-1 md:h-1.5 w-6 md:w-10 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                           <motion.div 
                              animate={isInView ? { x: ["-100%", "100%"] } : {}} 
                              transition={{ duration: 1.5 + bit * 0.4, repeat: Infinity, ease: "linear" }} 
                              className="w-full h-full bg-primary/40 shadow-[0_0_10px_rgba(146,11,11,0.5)]" 
                           />
                        </div>
                     ))}
                  </div>
                  <span className="text-[8px] md:text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em] md:tracking-[0.3em] font-black italic">
                     {t_sync}
                  </span>
               </div>
            </div>

         </div>

         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[100%] bg-primary/5 blur-[120px] rounded-full pointer-events-none transition-opacity duration-1000 ${isInView ? 'opacity-20' : 'opacity-0'}`} />

      </motion.div>
   );
});

