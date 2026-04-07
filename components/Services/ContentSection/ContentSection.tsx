"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { memo, useRef, useMemo } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const ContentSection = memo(() => {
  const t       = useTranslations("ServicesPage.Content");
  const locale  = useLocale();
  const isRtl   = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);
  
  const points: string[] = useMemo(() => t.raw("points"), [t]);
  const bodyText = useMemo(() => t("body"), [t]);
  const bodyWords = useMemo(() => bodyText.split(' '), [bodyText]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const timelineX = useSpring(useTransform(scrollYProgress, [0.3, 0.9], [isRtl ? "100%" : "-100%", "0%"]), { stiffness: 40, damping: 20 });
  const timelineY = useSpring(useTransform(scrollYProgress, [0.1, 0.9], ["-110%", "0%"]), { stiffness: 40, damping: 25 });
  
  return (
    <section 
      ref={containerRef}
      className={`relative w-full min-h-[110vh] flex flex-col items-center justify-center bg-transparent py-32 md:py-48 overflow-hidden ${isRtl ? 'font-arabic' : 'font-sans'}`}
    >
      
      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
         
         <div className="flex flex-col items-center gap-24 md:gap-40">
            
            <div className="w-full max-w-5xl relative z-20">
               <div className="flex flex-col items-center text-center space-y-12 md:space-y-20">
                  <SectionTitle title={t("headline")} badge={isRtl ? "مخطط_سردي" : "STRATEGIC_TIMELINE"} align="center" />
                  <div className="relative group perspective-1000">
                     <h3 className="flex flex-wrap justify-center gap-x-4 gap-y-3 text-3xl md:text-6xl lg:text-7xl font-black italic leading-[1.1] md:leading-[0.95] tracking-tighter">
                        {bodyWords.map((word, i) => (
                           <motion.span 
                              key={i}
                              initial={{ opacity: 0, y: 40, rotateX: 45 }}
                              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 + (i * 0.05), duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                              className={`block will-change-transform ${word.includes('اتجاه') || word.includes('direction') || word.includes('impact') || word.includes('تأثير') ? 'text-primary' : 'text-white/95'}`}
                           >
                              {word}
                           </motion.span>
                        ))}
                     </h3>
                     <motion.div 
                        style={{ scaleX: useTransform(scrollYProgress, [0.1, 0.45], [0, 1]) }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] md:h-[3px] bg-primary z-10 w-full shadow-[0_0_20px_rgba(146,11,11,1)]"
                     />
                  </div>
               </div>
            </div>

            <div className="relative w-full py-24 md:py-56 px-4 md:px-0">
               
               <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1.5px] bg-white/10 -translate-y-1/2 overflow-hidden z-0">
                  <motion.div 
                     style={{ translateX: timelineX }}
                     className="absolute inset-0 bg-primary shadow-[0_0_20px_rgba(146,11,11,1)] w-full h-full" 
                  />
               </div>

               <div className={`md:hidden absolute top-0 bottom-0 ${isRtl ? 'right-6' : 'left-6'} w-[2px] bg-white/5 overflow-hidden z-0`}>
                  <motion.div 
                     style={{ height: "100%", translateY: timelineY }}
                     className="absolute inset-0 bg-primary shadow-[0_0_15px_rgba(146,11,11,1)] origin-top" 
                  />
               </div>

               <div className="relative grid grid-cols-1 md:grid-cols-4 gap-32 md:gap-0 z-20">
                  {points.map((p, i) => (
                     <motion.div 
                        key={p}
                        initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + (i * 0.1), duration: 0.8 }}
                        className={`relative flex flex-col group min-h-[140px] md:min-h-0 ${
                           isRtl 
                              ? 'items-end text-right pr-20 md:pr-0 md:items-center md:text-center' 
                              : 'items-start text-left pl-20 md:pl-0 md:items-center md:text-center'
                        }`}
                     >
                        
                        <div 
                           className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 z-40 flex items-center justify-center ${
                              'md:left-1/2 md:-translate-x-1/2'
                           } ${
                              isRtl ? 'right-[-12px]' : 'left-[-12px]'
                           } md:right-auto md:left-1/2`}
                           style={{ direction: 'ltr' }}  
                        >
                           <div className={`hidden md:block absolute ${i % 2 === 0 ? 'bottom-3' : 'top-3'} left-1/2 -translate-x-1/2 w-[1.5px] h-28 bg-gradient-to-b ${i % 2 === 0 ? 'from-transparent to-primary/60' : 'from-primary/60 to-transparent'}`} />
                           <div className={`md:hidden absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} w-14 h-[1.5px] bg-gradient-to-r from-primary/60 to-transparent`} />

                           <div className="relative w-5 h-5 rounded-full bg-zinc-950 border-2 border-white/20 group-hover:border-primary shadow-[0_0_20px_rgba(146,11,11,0)] group-hover:shadow-[0_0_25px_rgba(146,11,11,1)] transition-all z-50 overflow-hidden ring-4 ring-zinc-950">
                              <div className="w-full h-full bg-primary opacity-0 group-hover:opacity-100 animate-pulse" />
                           </div>
                        </div>

                        <div className={`flex flex-col gap-4 md:gap-5 transition-all duration-700 ${
                           isRtl ? 'items-end' : 'items-start'
                        } md:items-center ${
                           i % 2 === 0 
                              ? 'md:-translate-y-32' 
                              : 'md:translate-y-32'  
                        }`}>
                           <span className={`text-[10px] md:text-[9px] font-mono font-black italic transition-colors tracking-[0.4em] uppercase group-hover:text-primary text-zinc-600`}>
                             {isRtl ? "المرحلة_0" + (i + 1) : "STAGE_0" + (i + 1)}
                           </span>
                           <h4 className="text-xl md:text-lg lg:text-xl font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-all duration-500 leading-tight text-balance">
                              {p}
                           </h4>
                        </div>

                     </motion.div>
                  ))}
               </div>

            </div>

         </div>

         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-primary/5 blur-[300px] rounded-full pointer-events-none opacity-25" />

         <div className={`hidden md:block absolute bottom-10 ${isRtl ? 'right-10' : 'left-10'} opacity-10 font-mono text-[9px] font-black tracking-[0.8em] text-white uppercase leading-relaxed`}>
            {isRtl ? "الجدول_الزمني // مـصـدّق" : "TIMELINE_INIT // VERIFIED"}<br/>
            {isRtl ? "مـسـار_مـتـقـارب // عـال" : "TRAJECTORY_CONVERGENT // HIGH"}
         </div>
      
      </div>
    </section>
  );
});

