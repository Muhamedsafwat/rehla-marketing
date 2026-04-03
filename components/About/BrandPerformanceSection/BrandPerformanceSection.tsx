"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";


export const BrandPerformanceSection = () => {
  const t       = useTranslations("AboutPage.BrandPerformance");
  const locale  = useLocale();
  const isRtl   = locale === "ar";

  return (
    <section 
      className={`relative w-full overflow-hidden bg-transparent py-10 md:py-16 ${isRtl ? 'font-arabic' : 'font-sans'}`}
    >
      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
           
           <div className="flex-1 space-y-8 text-start">
              <motion.h3
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-2xl md:text-3xl font-black text-white italic leading-tight tracking-tight uppercase text-start"
              >
                 {t("body1")}
              </motion.h3>

              <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="space-y-4"
              >
                 <p className="text-lg md:text-xl text-zinc-500 font-bold italic leading-relaxed">
                    {t("body2").split('\n')[0]}
                 </p>
                 
                 <div className="mt-6 inline-block border-s-2 border-primary/40 ps-6">
                    <p className="text-lg md:text-xl text-primary font-black italic tracking-tight">
                       "{t("body3")}"
                    </p>
                 </div>
              </motion.div>

              <div className="pt-6 flex items-center gap-3 opacity-10 justify-start">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                 <span className="text-[9px] font-black font-mono tracking-widest uppercase">
                    {isRtl ? "تحقق_من_العقدة" : "Verified_Node"}
                 </span>
              </div>
           </div>

           <div className="shrink-0 text-start">
              <SectionTitle 
                title={t("headline")} 
                badge={t("preheading")} 
                align="left"
              />
           </div>

        </div>
      </div>

    </section>
  );
};
BrandPerformanceSection.displayName = "BrandPerformanceSection";
