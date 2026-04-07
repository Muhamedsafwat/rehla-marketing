"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { memo, useRef, useMemo } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StrategyStep } from "./components/StrategyStep";

export const StrategySection = memo(() => {
   const t = useTranslations("ServicesPage.Strategy");
   const locale = useLocale();
   const isRtl = locale === "ar";
   const sectionRef = useRef<HTMLDivElement>(null);

   const points: string[] = useMemo(() => {
      try {
         const p = t.raw("points");
         return Array.isArray(p) ? p : [];
      } catch { return []; }
   }, [t]);

   const bodyText = useMemo(() => {
      try { return t("body"); } catch { return ""; }
   }, [t]);

   const t_sync = isRtl ? "جـاري_المزامـنة" : "SYNC_IN_PROGRESS";

   const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"]
   });

   const spineHeight = useSpring(useTransform(scrollYProgress, [0.2, 0.9], ["0%", "100%"]), { stiffness: 40, damping: 25 });
   const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.85, 0.98], [0, 1, 1, 0]);
   const driftScroll = useTransform(scrollYProgress, [0, 1], [0, -150]);

   if (points.length === 0) return null;

   return (
      <section
         ref={sectionRef}
         className={`relative w-full min-h-[110vh] flex flex-col items-center justify-center bg-transparent py-40 overflow-hidden ${isRtl ? 'font-arabic' : 'font-sans'}`}
      >

         <div className="container relative z-10 mx-auto px-6 max-w-7xl">
            <div className="flex flex-col items-center gap-32">

               <motion.div
                  style={{ opacity }}
                  className="w-full max-w-4xl text-center space-y-12"
               >
                  <SectionTitle
                     title={t("headline")}
                     badge={isRtl ? "مـسار_الاسم" : "STRATEGIC_SPINE"}
                     align="center"
                  />
                  <h3 className="text-3xl md:text-5xl font-black italic text-zinc-100/95 leading-[1.05] tracking-tighter">
                     {bodyText}
                  </h3>
               </motion.div>

               <div className="relative w-full max-w-5xl py-20 px-6 md:px-10">
                  <div className={`absolute top-0 bottom-0 ${isRtl ? 'right-6 md:right-16' : 'left-6 md:left-16'} w-[2px] bg-white/5 z-0`}>
                     <motion.div
                        style={{ height: spineHeight }}
                        className="absolute top-0 left-0 right-0 bg-primary shadow-[0_0_20px_rgba(146,11,11,1)]"
                     />
                  </div>

                  <div className="relative z-10 space-y-32">
                     {points.map((p, i) => (
                        <StrategyStep key={`auto-step-${i}`} p={p} index={i} isRtl={isRtl} t_sync={t_sync} />
                     ))}
                  </div>
               </div>

            </div>
         </div>

         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 blur-[250px] rounded-full pointer-events-none opacity-20" />

         <div className={`absolute bottom-10 ${isRtl ? 'right-10' : 'left-10'} opacity-10 font-mono text-[9px] font-black tracking-[0.5em] text-white uppercase`}>
            {isRtl ? "نظام_التزامن: تـلقائي" : "Autonomous_Sync: ACTIVE"}<br />
            {isRtl ? "تتبع_المرحلة: جاري" : "Phase_Tracking: ONLINE"}
         </div>

      </section>
   );
});
