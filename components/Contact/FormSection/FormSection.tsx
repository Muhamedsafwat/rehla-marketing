"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import React, { memo } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { HiSparkles } from "react-icons/hi2";

export const FormSection = memo(() => {
  const t       = useTranslations("ContactPage.Form");
  const locale  = useLocale();
  const isRtl   = locale === "ar";
  
  const fields = ["name", "company", "email", "phone", "services"] as const;

  return (
    <section 
      className={`relative w-full min-h-[80vh] flex items-center py-12 md:py-20 overflow-hidden ${isRtl ? 'font-arabic' : 'font-sans'}`}
    >
      <div className="container relative z-10 mx-auto px-6 max-w-6xl w-full">
        
        <div className="relative group p-[1px] rounded-[3rem] overflow-hidden">
           
           <div className="absolute -inset-[150%] pointer-events-none">
              <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#920b0b_180deg,transparent_210deg,transparent_360deg)] opacity-30 group-hover:opacity-70 transition-opacity duration-1000"
              />
           </div>

           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 bg-black/30 backdrop-blur-3xl rounded-[3rem] overflow-hidden border border-white/[0.03]">
              
              <div className={`lg:col-span-4 p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-10 border-white/[0.05] ${isRtl ? 'lg:border-l items-end text-right' : 'lg:border-r items-start text-left'}`}>
                 <div className="w-full flex flex-col items-end text-right">
                    <SectionTitle 
                      title={t("intro")} 
                      badge={isRtl ? "تواصل_استراتيجي" : "CORE_STRATEGY"} 
                      align={isRtl ? "right" : "left"}
                      className="w-full"
                    />
                    <div className="w-full flex justify-end">
                       <p className={`mt-10 text-zinc-300 font-bold ${isRtl ? 'text-right' : 'italic text-left'} text-lg leading-relaxed opacity-70 max-w-sm`}>
                          {t("support")}
                       </p>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-3 opacity-10">
                    <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                    <span className="text-[8px] font-mono font-black italic tracking-widest uppercase">{isRtl ? "نظام_متصل" : "REHLA_CONNECT_v2"}</span>
                 </div>
              </div>

              <div className="lg:col-span-7 p-8 md:p-14 lg:p-16 flex flex-col justify-center">
                 <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                       {fields.map((f) => (
                          <div key={f} className={f === 'services' ? 'md:col-span-2' : ''}>
                             <Input
                                label={t(`fields.${f}`)}
                                placeholder={t(`fields.${f}_ph`)}
                                type={f === 'email' ? 'email' : f === 'phone' ? 'tel' : 'text'}
                                variant="minimal"
                                className="text-white text-base h-12"
                             />
                          </div>
                       ))}
                    </div>

                    <TextArea 
                       label={t("fields.details")}
                       placeholder={t("fields.details_ph")}
                       variant="minimal"
                       className="min-h-[120px] text-zinc-300 text-base mt-2"
                    />

                    <div className={`flex ${isRtl ? 'justify-start' : 'justify-end'} pt-8`}>
                       <Button
                          variant="primary"
                          size="lg"
                          isMagnetic
                          className="w-full md:w-max min-w-[240px] rounded-full py-7 text-[10px] font-black italic tracking-[0.4em] uppercase shadow-[0_15px_40px_-10px_rgba(146,11,11,0.4)]"
                          rightIcon={<HiSparkles className="animate-pulse" />}
                       >
                          {t("fields.submit")}
                       </Button>
                    </div>
                 </form>
              </div>

           </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] bg-primary/5 blur-[180px] pointer-events-none opacity-20" />
    </section>
  );
});

