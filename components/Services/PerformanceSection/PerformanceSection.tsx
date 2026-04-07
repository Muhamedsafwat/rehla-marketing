"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { memo, useRef, useMemo } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";


export const PerformanceSection = memo(() => {
   const t = useTranslations("ServicesPage.Performance");
   const locale = useLocale();
   const isRtl = locale === "ar";
   const sectionRef = useRef<HTMLDivElement>(null);

   const points = useMemo(() => {
      try {
         const p = t.raw("points");
         return Array.isArray(p) ? p : [];
      } catch { return []; }
   }, [t]);

   const bodyText = useMemo(() => {
      try { return t("body"); } catch { return ""; }
   }, [t]);

   const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"]
   });

   const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.9], [0, 1, 1]);
   const yReveal = useSpring(useTransform(scrollYProgress, [0.1, 0.3], [20, 0]), { stiffness: 100, damping: 30 });

   if (points.length === 0) return null;

   return (
      <section
         ref={sectionRef}
         className={`relative w-full bg-transparent py-24 md:py-32 overflow-hidden ${isRtl ? 'font-arabic' : 'font-sans'}`}
      >

         <div className="absolute inset-0 pointer-events-none opacity-[0.02] will-change-transform">
            <div className={`absolute top-0 bottom-0 ${isRtl ? 'right-[20%]' : 'left-[20%]'} w-px bg-white/40`} />
            <div className={`absolute top-0 bottom-0 ${isRtl ? 'right-[80%]' : 'left-[80%]'} w-px bg-white/40`} />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20 -translate-y-1/2" />
         </div>

         <div className="container relative z-10 mx-auto px-6 max-w-7xl">

            <motion.div
               style={{ opacity, y: yReveal }}
               className="flex flex-col gap-16 md:gap-20"
            >

               <div className="flex flex-col lg:flex-row items-baseline justify-between gap-10 text-left ">
                  <div className="space-y-6 max-w-2xl">
                     <SectionTitle
                        title={t("headline")}
                        badge={isRtl ? "هندسة_الأداء" : "PERFORMANCE_ENGINEERING"}
                        align="left"
                     />
                     <h3 className="text-2xl md:text-3xl font-black italic text-zinc-100/90 leading-tight tracking-tighter">
                        {bodyText}
                     </h3>
                  </div>

                  <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'} opacity-10 font-mono text-[9px] uppercase tracking-[0.6em]`}>
                     <span>{isRtl ? "تـزامـن_مـفـعـل_2.8x" : "SYNC_ACTIVE_2.8X"}</span>
                     <div className="w-8 h-px bg-white" />
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden will-change-contents shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  {points.map((p, i) => (
                     <motion.div
                        key={`node-${p}-${i}`}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: i * 0.05, duration: 0.6 }}
                        className="group relative h-52 bg-zinc-950 p-12 flex flex-col justify-between transition-all duration-500 cursor-default isolate overflow-hidden"
                     >
                        <span className="absolute inset-x-0 bottom-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center z-20" />
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.03] transition-colors duration-500 z-0" />

                        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/5 group-hover:border-primary/40 group-hover:w-6 group-hover:h-6 transition-all duration-500 rounded-tl-lg" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/5 group-hover:border-primary/40 group-hover:w-6 group-hover:h-6 transition-all duration-500 rounded-br-lg" />

                        <div className={`flex items-center justify-between relative z-10 ${isRtl ? 'flex-row-reverse' : ''}`}>
                           <span className="text-[11px] font-mono font-black italic text-zinc-900 group-hover:text-primary transition-all duration-500 scale-110">
                              0{i + 1}
                           </span>
                           <div className="relative">
                              <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0)] group-hover:shadow-[0_0_15px_rgba(146,11,11,1)]" />
                              <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-primary/40 animate-ping opacity-0 group-hover:opacity-100" />
                           </div>
                        </div>

                        <div className="space-y-2 relative z-10">
                           <span className={`text-[8px] font-mono font-black italic text-zinc-700 group-hover:text-primary transition-colors uppercase tracking-[0.2em] flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                              {isRtl ? "[ بـروتـوكـول_مـفـعـل ]" : "[ PROTOCOL_ACTIVE ]"}
                           </span>
                           <h4 className="text-xl md:text-2xl font-black uppercase tracking-widest text-zinc-500 group-hover:text-white group-hover:scale-105 transition-all duration-500 leading-tight origin-left">
                              {p}
                           </h4>
                        </div>

                        <div className={`absolute bottom-6 ${isRtl ? 'left-10' : 'right-10'} flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}>
                           {Array.from({ length: 4 }).map((_, bit) => (
                              <motion.div
                                 key={`bit-${bit}`}
                                 animate={{ height: [4, 12, 4] }}
                                 transition={{ duration: 1, repeat: Infinity, delay: bit * 0.1 }}
                                 className="w-1 bg-primary/40 rounded-full"
                              />
                           ))}
                        </div>
                     </motion.div>
                  ))}
               </div>

            </motion.div>

         </div>

         <div className={`absolute -bottom-20 ${isRtl ? 'left-0' : 'right-0'} w-[40vw] h-[40vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none opacity-20 will-change-contents`} />

      </section>
   );
});

