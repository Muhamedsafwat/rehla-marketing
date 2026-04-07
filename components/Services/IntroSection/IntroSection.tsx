"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { memo, useRef, useMemo } from "react";

export const IntroSection = memo(() => {
   const t = useTranslations("ServicesPage.Intro");
   const locale = useLocale();
   const isRtl = locale === "ar";
   const ref = useRef<HTMLDivElement>(null);

   const part2Words = useMemo(() => t("part2").split(' '), [t]);

   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
   });
   const x1 = useSpring(useTransform(scrollYProgress, [0.1, 0.4], [isRtl ? -50 : 50, 0]), { stiffness: 90, damping: 25 });
   const opacity1 = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

   const scale2 = useSpring(useTransform(scrollYProgress, [0.3, 0.6], [0.94, 1.05]), { stiffness: 70, damping: 20 });
   const opacity2 = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);

   const x3 = useSpring(useTransform(scrollYProgress, [0.55, 0.85], [isRtl ? 50 : -50, 0]), { stiffness: 90, damping: 25 });
   const opacity3 = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);

   const beamTranslateX = useTransform(scrollYProgress, [0.2, 0.8], ["-120%", "200%"]);

   return (
      <section
         ref={ref}
         className={`relative w-full min-h-[90vh] flex items-center bg-transparent py-20 md:py-28 overflow-hidden ${isRtl ? 'font-arabic' : 'font-sans'}`}
      >
         <div className="container relative z-10 mx-auto px-6 max-w-7xl">

            <div className="flex flex-col gap-40 md:gap-64 relative">

               <motion.div
                  style={{ translateX: x1, opacity: opacity1 }}
                  className={`flex ${isRtl ? 'justify-end' : 'justify-start'} w-full will-change-transform`}
               >
                  <div className="max-w-2xl border-l-[1px] border-primary/30 ps-10 md:ps-16 space-y-4">
                     <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary/50 font-mono">{isRtl ? "المعيار" : "CRIT_01"}</span>
                     <h2 className="text-3xl md:text-5xl font-black italic text-zinc-600 leading-none tracking-tighter">
                        {t("part1")}
                     </h2>
                  </div>
               </motion.div>

               <motion.div
                  style={{ scale: scale2, opacity: opacity2 }}
                  className="flex justify-center w-full relative z-30 will-change-transform"
               >
                  <div className="text-center relative">

                     <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 opacity-20 pointer-events-none h-60 overflow-hidden -skew-x-12">
                        <motion.div
                           style={{ translateX: beamTranslateX }}
                           className="w-[100%] h-full bg-[radial-gradient(ellipse_at_center,rgba(146,11,11,0.8)_0%,transparent_70%)]"
                        />
                     </div>

                     <h1 className="relative z-10 text-5xl md:text-8xl lg:text-[10rem] font-black italic text-white leading-none tracking-tighter selection:bg-primary/20">
                        <span className="flex flex-wrap justify-center gap-x-4">
                           {part2Words.map((word, i) => (
                              <span
                                 key={i}
                                 className={word.includes('نظام') || word.includes('connected') ? 'text-primary' : ''}
                              >
                                 {word}
                              </span>
                           ))}
                        </span>
                     </h1>

                     <div className="flex justify-center gap-4 mt-16 opacity-30">
                        {[1, 2].map(v => <div key={v} className="w-1 h-1 rounded-full bg-white" />)}
                     </div>
                  </div>
               </motion.div>

               <motion.div
                  style={{ translateX: x3, opacity: opacity3 }}
                  className={`flex ${isRtl ? 'justify-start' : 'justify-end'} w-full will-change-transform`}
               >
                  <div className={`max-w-3xl ${isRtl ? 'text-left border-r-[1px] pe-10 md:pe-16' : 'text-right border-l-[1px] ps-10 md:ps-16'} border-white/10 space-y-4`}>
                     <span className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-700 font-mono">{isRtl ? "المسار" : "VIS_03"}</span>
                     <p className="text-2xl md:text-5xl font-black italic text-zinc-200 leading-none tracking-tighter">
                        {t("part3")}
                     </p>
                  </div>
               </motion.div>

            </div>

         </div>

         <div className="absolute inset-0 grid grid-cols-2 opacity-5 pointer-events-none">
            <div className="border-r-[0.5px] border-white/5" />
         </div>

      </section>
   );
});

