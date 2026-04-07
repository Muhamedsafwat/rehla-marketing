"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import React, { memo } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";


export const WhoWeAreSection = memo(() => {
  const t       = useTranslations("AboutPage.WhoWeAre");
  const locale  = useLocale();
  const isRtl   = locale === "ar";

  return (
    <section 
      className={`relative w-full overflow-hidden bg-transparent py-12 md:py-20 ${isRtl ? 'font-arabic' : 'font-sans'}`}
    >
      <div className="container relative z-10 mx-auto px-6 max-w-6xl">
        
        <div className="mb-16">
          <SectionTitle 
            title={t("title")} 
            badge={isRtl ? "الهوية" : "IDENTITY"} 
            align="center"
          />
        </div>

        <div className="relative p-1 md:p-1.5 rounded-[3.5rem] bg-gradient-to-br from-white/5 via-transparent to-white/5 overflow-hidden group">
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-px bg-zinc-950/60 backdrop-blur-3xl rounded-[3.4rem] border border-white/10 p-8 md:p-14 lg:p-20 overflow-hidden">
              
              <div className={`flex flex-col justify-center gap-8 text-start ${isRtl ? 'lg:order-2' : 'lg:order-1'}`}>
                 <motion.div
                   initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="space-y-6"
                 >
                    <div className={`flex items-center gap-3 opacity-40`}>
                       <div className="w-6 h-px bg-primary" />
                       <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                          {t("beliefLine1")}
                       </span>
                    </div>

                    <h3 className="text-3xl sm:text-5xl md:text-6xl font-black italic text-white leading-tight tracking-tighter text-start">
                       {t("beliefLine2")}
                    </h3>
                 </motion.div>
              </div>

              <div className="hidden lg:block absolute left-1/2 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

              <div className={`flex flex-col justify-center gap-8 text-start ${isRtl ? 'lg:order-1' : 'lg:order-2'}`}>
                 <motion.div
                   initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="space-y-8 lg:ps-16 lg:pe-6"
                 >
                    <div className={`flex items-center gap-3 opacity-40`}>
                       <span className="text-[9px] font-black uppercase tracking-widest text-primary italic">
                          {isRtl ? "مهمتنا" : "CORE_MISSION"}
                       </span>
                       <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>

                    <div className="space-y-6">
                       <h4 className="text-2xl md:text-3xl font-black italic text-zinc-100 leading-snug">
                          {t("missionLine1")}
                       </h4>
                       <p className="text-lg md:text-xl text-zinc-300 font-bold italic leading-relaxed opacity-80">
                          {t("missionLine2")}
                       </p>
                    </div>

                    <div className={`flex justify-start opacity-20`}>
                       <span className="text-[6px] font-black font-mono tracking-widest uppercase">{isRtl ? "تأسيس" : "FOUNDATION"}</span>
                    </div>
                 </motion.div>
              </div>

              {/* Background Accent Gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 blur-[80px] pointer-events-none" />
           </div>

        </div>
      </div>

    </section>
  );
});

