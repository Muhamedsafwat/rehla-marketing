"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { memo, useRef } from "react";

export const ClosingStatement = memo(() => {
   const t = useTranslations("ServicesPage.Closing");
   const locale = useLocale();
   const isRtl = locale === "ar";
   const containerRef = useRef<HTMLDivElement>(null);

   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
   });

   const assembly = useSpring(useTransform(scrollYProgress, [0.2, 0.45], [0, 1]), { stiffness: 60, damping: 25 });

   const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.95, 0.99], [0, 1, 1, 0]);
   const scale = useTransform(scrollYProgress, [0.2, 0.45, 0.85], [0.98, 1, 0.98]);

   return (
      <section
         ref={containerRef}
         className={`relative w-full overflow-hidden bg-transparent py-40 md:py-60 ${isRtl ? 'font-arabic' : 'font-sans'}`}
      >
         <div className="container relative z-10 mx-auto px-6 max-w-7xl flex flex-col items-center justify-center">

            <motion.div
               style={{ opacity, scale }}
               className="relative p-14 md:p-28 flex flex-col items-center gap-12 group"
            >

               <div className="absolute inset-0 pointer-events-none z-0">

                  <svg
                     viewBox="0 0 1000 400"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     className="w-full h-full preserve-3d overflow-visible"
                     preserveAspectRatio="none"
                  >

                     <motion.path
                        d="M 500 0 H 50 L 0 50 V 200"
                        style={{ x: useTransform(assembly, [0, 1], [-25, 0]), y: useTransform(assembly, [0, 1], [-25, 0]), pathLength: assembly }}
                        stroke="currentColor" strokeWidth="2.5" className="text-primary shadow-[0_0_20px_rgba(146,11,11,0.4)]"
                     />

                     {/* 2. TOP-RIGHT */}
                     <motion.path
                        d="M 500 0 H 950 L 1000 50 V 200"
                        style={{ x: useTransform(assembly, [0, 1], [25, 0]), y: useTransform(assembly, [0, 1], [-25, 0]), pathLength: assembly }}
                        stroke="currentColor" strokeWidth="2.5" className="text-primary shadow-[0_0_20px_rgba(146,11,11,0.4)]"
                     />

                     {/* 3. BOTTOM-LEFT */}
                     <motion.path
                        d="M 0 200 V 350 L 50 400 H 500"
                        style={{ x: useTransform(assembly, [0, 1], [-25, 0]), y: useTransform(assembly, [0, 1], [25, 0]), pathLength: assembly }}
                        stroke="currentColor" strokeWidth="2.5" className="text-primary shadow-[0_0_20_rgba(146,11,11,0.4)]"
                     />

                     {/* 4. BOTTOM-RIGHT */}
                     <motion.path
                        d="M 1000 200 V 350 L 950 400 H 500"
                        style={{ x: useTransform(assembly, [0, 1], [25, 0]), y: useTransform(assembly, [0, 1], [25, 0]), pathLength: assembly }}
                        stroke="currentColor" strokeWidth="2.5" className="text-primary shadow-[0_0_20px_rgba(146,11,11,0.4)]"
                     />
                  </svg>

                  <motion.div
                     style={{ opacity: useTransform(assembly, [0.45, 0.55], [0, 1]) }}
                     className="absolute inset-0"
                  >
                     {/* Top White Lock */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-white shadow-[0_0_25px_rgba(255,255,255,1)] mt-[-1.5px] rounded-full z-10" />
                     {/* Bottom White Lock */}
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-white shadow-[0_0_25px_rgba(255,255,255,1)] mb-[-1.5px] rounded-full z-10" />
                     {/* Left White Lock */}
                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-16 bg-white shadow-[0_0_25px_rgba(255,255,255,1)] ml-[-1.5px] rounded-full z-10" />
                     {/* Right White Lock */}
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-16 bg-white shadow-[0_0_25px_rgba(255,255,255,1)] mr-[-1.5px] rounded-full z-10" />
                  </motion.div>

               </div>

               <div className="relative flex flex-col items-center gap-10">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                     <div className="absolute inset-0 border border-primary/20 rotate-45 animate-spin-slow" />
                     <div className="w-2.5 h-2.5 bg-primary rotate-45 shadow-[0_0_20px_rgba(146,11,11,1)]" />
                     <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -inset-6 border border-white/5 rounded-full"
                     />
                  </div>

                  <h2 className="text-xl md:text-3xl lg:text-4xl font-black italic text-zinc-100 text-center leading-[1.1] tracking-tighter max-w-2xl text-balance selection:bg-primary/30 px-4">
                     {t("body")}
                  </h2>

                  <div className={`flex items-center gap-6 pt-4 opacity-10 font-mono text-[8px] uppercase tracking-[0.5em] ${isRtl ? 'flex-row-reverse' : ''}`}>
                     <span>{isRtl ? "مُـحـكـم // نـظـام" : "BALANCED // LOCK"}</span>
                     <div className="w-6 h-px bg-white/20" />
                     <span>{isRtl ? "نـظـام // مُـحـكـم" : "SYSTEM // SECURED"}</span>
                  </div>
               </div>

            </motion.div>

         </div>
      </section>
   );
});

