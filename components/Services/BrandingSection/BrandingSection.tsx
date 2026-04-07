"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { memo, useRef, useMemo } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const BrandingSection = memo(() => {
   const t = useTranslations("ServicesPage.Branding");
   const locale = useLocale();
   const isRtl = locale === "ar";
   const ref = useRef<HTMLDivElement>(null);

   const points: string[] = useMemo(() => t.raw("points"), [t]);
   const bodyLines = useMemo(() => t("body").split('\n').filter(Boolean), [t]);

   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
   });

   const opacity = useTransform(scrollYProgress, [0.15, 0.35, 0.8, 0.95], [0, 1, 1, 0]);
   const yReveal = useSpring(useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [40, 0, 0, 0]), { stiffness: 100, damping: 30 });

   return (
      <section
         ref={ref}
         className="relative w-full min-h-[85vh] flex items-center bg-transparent py-24 md:py-32 overflow-hidden"
      >

         <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6">
               {Array.from({ length: 72 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-white/40 h-full" />
               ))}
            </div>
         </div>

         <div className="container relative z-10 mx-auto px-6 max-w-7xl">

            <motion.div
               style={{ opacity, y: yReveal }}
               className={`flex flex-col lg:flex-row items-center gap-20 lg:gap-32 ${isRtl ? 'lg:flex-row' : ''} will-change-transform`}
            >

               <div className={`w-full lg:w-[45%] space-y-12 ${isRtl ? 'order-1 text-right' : 'text-left'}`}>
                  <SectionTitle
                     title={t("headline")}
                     badge={isRtl ? "الهوية_الاستراتيجية" : "STRATEGIC_ID"}
                     align="left"
                  />

                  <div className="space-y-8">
                     {bodyLines.map((line, i) => (
                        <h2
                           key={i}
                           className="text-3xl md:text-5xl lg:text-5xl font-black italic text-white/90 leading-[1.05] tracking-tighter"
                        >
                           {line.split(' ').map((word, idx) => (
                              <span key={idx} className={word.includes('أصولك') || word.includes('asset') || word.includes('اختيار') || word.includes('chosen') ? 'text-primary' : ''}>
                                 {word}{' '}
                              </span>
                           ))}
                        </h2>
                     ))}
                  </div>

                  <div className="flex items-center justify-start gap-6 pt-10 ">
                     <div className="w-1.5 h-6 bg-primary" />
                     <span className="text-[10px] font-mono font-black italic text-zinc-700 tracking-[0.4em] uppercase">{isRtl ? "الهوية_الاستراتيجية" : "STRATEGIC_ID"}</span>
                  </div>
               </div>

               <div className={`w-full lg:w-[55%] ${isRtl ? 'order-2' : ''}`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                     {points.map((p, i) => (
                        <motion.div
                           key={p}
                           initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: 0.1 + i * 0.1 }}
                           className={`group relative h-40 md:h-52 p-8 border border-white/5 bg-white/[0.01] hover:border-primary/40 transition-all duration-700 overflow-hidden rounded-lg flex flex-col justify-between`}
                        >
                           <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                              <motion.div
                                 animate={{ y: ["-100%", "200%"] }}
                                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                 className="w-full h-1/2 bg-gradient-to-b from-transparent via-primary/5 to-transparent blur-xl"
                              />
                           </div>

                           <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} w-4 h-4 border-t border-l border-white/10 group-hover:border-primary/40 transition-colors`} />
                           <div className={`absolute bottom-0 ${isRtl ? 'left-0' : 'right-0'} w-4 h-4 border-b border-r border-white/5 group-hover:border-white/20 transition-colors`} />

                           <div className={`flex flex-col gap-4 relative z-10 ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}>
                              <span className="text-[9px] font-mono font-black italic text-primary/30 group-hover:text-primary transition-all tracking-[0.2em]">0X{i + 1}_REF</span>
                              <h4 className="text-xl md:text-2xl font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-all duration-500 leading-tight">
                                 {p}
                              </h4>
                           </div>

                           <div className={`flex items-center gap-2 relative z-10 opacity-20 group-hover:opacity-100 transition-opacity ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              <span className="text-[8px] font-mono font-black text-zinc-700">{isRtl ? "مفعل" : "ACTIVE"}</span>
                           </div>

                           <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                     ))}
                  </div>
               </div>

            </motion.div>

         </div>

      </section>
   );
});

