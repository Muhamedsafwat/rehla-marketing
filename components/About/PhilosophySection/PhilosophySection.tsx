"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import React, { memo } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";

const PhilosophyPoint = memo(({ index, title, isRtl }: { index: number, title: string, isRtl: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2, duration: 0.8 }}
    className="group relative flex flex-col items-center"
  >
     {/* The Art Frame */}
     <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
        {/* Animated Outer Ring */}
        <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 15 + index * 5, repeat: Infinity, ease: "linear" }}
           className="absolute inset-0 border border-white/[0.05] rounded-full group-hover:border-primary/40 transition-colors duration-1000"
        />
        {/* Floating Number */}
        <div className="absolute top-0 flex items-center justify-center p-2 bg-zinc-950 border border-white/5 rounded-full -translate-y-1/2">
           <span className="text-[10px] font-black font-mono text-zinc-300">0{index + 1}</span>
        </div>
        {/* Central Content */}
        <div className="p-10 text-center relative z-10 transition-transform duration-700 group-hover:scale-110">
           <h4 className="text-sm md:text-lg font-black uppercase tracking-[0.3em] text-white italic leading-tight">
              {title}
           </h4>
        </div>
        {/* Glow Accent */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
     </div>
  </motion.div>
));

export const PhilosophySection = memo(() => {
  const t       = useTranslations("AboutPage.Philosophy");
  const locale  = useLocale();
  const isRtl   = locale === "ar";
  const points  = ["point1", "point2", "point3"] as const;

  return (
    <section 
      className={`relative w-full overflow-hidden bg-transparent py-12 md:py-20 ${isRtl ? 'font-arabic' : 'font-sans'}`}
    >
      {/* Background Dynamic "Neural" Line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.02] -translate-y-1/2 z-0" />
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/[0.01] -translate-x-1/2 z-0" />

      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        
        {/* Central Branding Header (Tightened) */}
        <div className="mb-12 flex flex-col items-center">
          <SectionTitle 
            title={t("headline")} 
            badge={t("preheading")} 
            align="center"
          />

        </div>

        <div className="flex flex-col gap-12 md:gap-16 items-center">
           
           <div className="max-w-4xl text-center space-y-10">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-4xl text-white font-black italic leading-[1.1] tracking-tighter"
              >
                {t("body")}
              </motion.p>
              
              <div className="flex items-center justify-center gap-6 opacity-30">
                 <div className="h-px flex-1 bg-gradient-to-l from-white to-transparent" />
                 <span className="text-[9px] font-black uppercase tracking-[0.5em] font-mono">{t("focusTitle")}</span>
                 <div className="h-px flex-1 bg-gradient-to-r from-white to-transparent" />
              </div>
           </div>

           {/* The Core Point Triad */}
           <div className="flex flex-wrap justify-center gap-12 lg:gap-20">
              {points.map((point, idx) => (
                <PhilosophyPoint 
                  key={idx} 
                  index={idx} 
                  title={t(`focusPoints.${point}`)} 
                  isRtl={isRtl} 
                />
              ))}
           </div>

           <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.6 }}
             className="mt-12 border-t border-white/5 pt-8 text-center max-w-2xl"
           >
              <p className="text-lg md:text-xl text-zinc-300 font-bold italic opacity-60">
                 {t("footer")}
              </p>
              <div className="mt-8 flex justify-center gap-4 opacity-5">
                 {[1, 2, 3, 4, 5].map((i) => (
                   <div key={i} className="w-1 h-3 bg-white" />
                 ))}
              </div>
           </motion.div>

        </div>
      </div>

    </section>
  );
});

