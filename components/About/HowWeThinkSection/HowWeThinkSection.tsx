"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import React, { memo } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";

const ThinkingPhase = memo(({ index, text, isRtl }: { index: number, text: string, isRtl: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    className="flex-1 flex flex-col items-center gap-4 text-center px-4 md:px-8 border-b border-white/5 last:border-b-0 lg:border-b-0 lg:border-r last:lg:border-r-0 border-white/5 py-8 lg:py-12 relative group"
  >
     <div className="absolute top-2 left-2 text-4xl font-black italic opacity-[0.03] select-none pointer-events-none transition-opacity group-hover:opacity-10">
        0{index + 1}
     </div>
     
     <div className="relative z-10 space-y-4">
        <div className="mx-auto w-6 h-px bg-primary opacity-30" />
        <h4 className="text-lg md:text-xl font-bold italic text-white tracking-tight leading-tight uppercase selection:bg-primary/30">
           {text}
        </h4>
     </div>
  </motion.div>
));

export const HowWeThinkSection = memo(() => {
  const t       = useTranslations("AboutPage.HowWeThink");
  const locale  = useLocale();
  const isRtl   = locale === "ar";
  const points  = ["point1", "point2", "point3"] as const;

  return (
    <section 
      className={`relative w-full overflow-hidden bg-transparent py-12 md:py-20 ${isRtl ? 'font-arabic' : 'font-sans'}`}
    >
      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        
        <div className="relative p-px rounded-[3rem] bg-gradient-to-tr from-white/10 via-transparent to-white/10 overflow-hidden shadow-2xl">
           
           <div className="relative z-10 bg-zinc-950/80 backdrop-blur-3xl rounded-[2.95rem] overflow-hidden">
              
              <div className="pt-14 pb-10 border-b border-white/5 text-center">
                 <SectionTitle 
                   title={t("headline")} 
                   badge={t("preheading")} 
                   align="center"
                 />
              </div>

              <div className="flex flex-col lg:flex-row w-full bg-zinc-950/20">
                 {points.map((point, idx) => (
                   <ThinkingPhase 
                      key={idx} 
                      index={idx} 
                      text={t(`points.${point}`)} 
                      isRtl={isRtl} 
                   />
                 ))}
              </div>

              <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.3 }}
                 className="p-10 md:p-14 bg-gradient-to-t from-primary/10 to-transparent border-t border-white/5 text-center"
              >
                 <div className="inline-flex items-center gap-2 mb-6 opacity-40">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-primary font-mono italic">
                       {isRtl ? "بيان_ختامي" : "FINAL_STATEMENT"}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-primary" />
                 </div>

                 <h3 className="max-w-4xl mx-auto text-xl md:text-2xl lg:text-3xl font-black italic text-zinc-100 leading-snug tracking-tight">
                    {t("conclusion")}
                 </h3>
              </motion.div>

           </div>

           {/* Subtle background glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 blur-[100px] pointer-events-none" />
        </div>

      </div>

    </section>
  );
});

