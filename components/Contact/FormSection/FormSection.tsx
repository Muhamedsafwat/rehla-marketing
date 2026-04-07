"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import React, { memo } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { HiSparkles, HiCheckBadge, HiArrowPath } from "react-icons/hi2";

export const FormSection = memo(() => {
  const t       = useTranslations("ContactPage.Form");
  const locale  = useLocale();
  const isRtl   = locale === "ar";
  
  const [state, handleSubmit] = useForm("xvzvlngp");

  const fields = ["name", "company", "email", "phone", "services"] as const;

  if (state.succeeded) {
      return (
         <section className={`relative w-full min-h-[60vh] flex items-center justify-center py-20 overflow-hidden ${isRtl ? 'font-arabic' : 'font-sans'}`}>
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="relative z-10 w-full max-w-2xl px-6"
            >
               <div className="relative p-12 md:p-20 rounded-[3rem] bg-transparent border border-white/5 flex flex-col items-center text-center gap-10">
                  
                  <motion.div 
                     animate={{ 
                        scale: [1, 1.05, 1],
                     }}
                     transition={{ duration: 4, repeat: Infinity }}
                     className="relative flex items-center justify-center"
                  >
                     <HiCheckBadge className="w-24 h-24 text-primary relative z-10 filter drop-shadow-[0_0_15px_rgba(146,11,11,0.6)]" />
                  </motion.div>

                  <div className="space-y-6">
                     <div className="flex items-center justify-center gap-4">
                        <div className="w-8 h-px bg-primary/20" />
                        <span className="text-[10px] font-mono font-black italic tracking-[0.5em] text-primary uppercase">{isRtl ? "تم_الإرسال" : "SIGNAL_RECEIVED"}</span>
                        <div className="w-8 h-px bg-primary/20" />
                     </div>
                     <h2 className="text-4xl md:text-5xl font-black italic text-white leading-none tracking-tighter">
                        {isRtl ? "شـكـراً لـتـواصـلك." : "SUCCESS // DISPATCHED."}
                     </h2>
                     <p className="text-zinc-500 text-lg font-bold italic leading-relaxed max-w-md mx-auto opacity-70">
                        {isRtl ? "تم استقبال رسالتك. سنتواصل معك في أقرب وقت." : "Your strategy signal has been harmonized. Our team will contact you shortly."}
                     </p>
                  </div>

                  <Button 
                     variant="outline" 
                     className="mt-4 rounded-full px-10 border-white/5 text-[9px] font-black italic tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all"
                     onClick={() => window.location.reload()}
                  >
                     {isRtl ? "إرسال رسالة أخرى" : "Send Another Message"}
                  </Button>
               </div>
            </motion.div>
         </section>
      );
  }

  return (
    <section 
      className={`relative w-full min-h-[80vh] flex items-center py-12 md:py-20 overflow-hidden ${isRtl ? 'font-arabic' : 'font-sans'}`}
    >
      <div className="container relative z-10 mx-auto px-6 max-w-6xl w-full">
        
        <div className="relative group p-[1px] rounded-[3rem] overflow-hidden">
           
           <div className="absolute -inset-[150%] pointer-events-none">
              <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#920b0b_180deg,transparent_210deg,transparent_360deg)] opacity-20 group-focus-within:opacity-40 transition-opacity duration-1000"
              />
           </div>

           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 bg-black/20 backdrop-blur-3xl rounded-[3rem] overflow-hidden border border-white/[0.03]">
              
              <div className={`lg:col-span-4 p-8 md:p-12 lg:p-16 flex flex-col justify-center gap-10 border-white/[0.05] ${isRtl ? 'lg:border-l items-end text-right' : 'lg:border-r items-start text-left'}`}>
                 <div className="w-full flex flex-col items-end text-right">
                    <SectionTitle 
                      title={t("intro")} 
                      badge={isRtl ? "تواصل_استراتيجى" : "CORE_STRATEGY"} 
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
                    <span className="text-[8px] font-mono font-black italic tracking-widest uppercase">{isRtl ? "إرسال_الإشارة" : "TRANSMITTING_SIGNAL"}</span>
                 </div>
              </div>

              <div className="lg:col-span-7 p-8 md:p-14 lg:p-16 flex flex-col justify-center">
                 <form className="space-y-10" onSubmit={handleSubmit}>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                       {fields.map((f) => (
                          <div key={f} className={f === 'services' ? 'md:col-span-2' : ''}>
                             <Input
                                id={f}
                                name={f}
                                label={t(`fields.${f}`)}
                                placeholder={t(`fields.${f}_ph`)}
                                type={f === 'email' ? 'email' : f === 'phone' ? 'tel' : 'text'}
                                variant="minimal"
                                className="text-white text-base h-12"
                                required={f === 'name' || f === 'email'}
                             />
                             <ValidationError prefix={t(`fields.${f}`)} field={f} errors={state.errors} className="text-xs text-primary mt-2 font-mono italic" />
                          </div>
                       ))}
                    </div>

                    <div className="relative">
                       <TextArea 
                          id="details"
                          name="details"
                          label={t("fields.details")}
                          placeholder={t("fields.details_ph")}
                          variant="minimal"
                          className="min-h-[120px] text-zinc-300 text-base mt-2"
                          required
                       />
                       <ValidationError prefix="Details" field="details" errors={state.errors} className="text-xs text-primary mt-2 font-mono italic" />
                    </div>

                    <div className={`flex ${isRtl ? 'justify-start' : 'justify-end'} pt-8`}>
                       <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          isMagnetic
                          disabled={state.submitting}
                          className="w-full md:w-max min-w-[240px] rounded-full py-7 text-[10px] font-black italic tracking-[0.4em] uppercase shadow-[0_15px_40px_-10px_rgba(146,11,11,0.4)] relative overflow-hidden group/btn"
                          rightIcon={state.submitting ? <HiArrowPath className="animate-spin" /> : <HiSparkles className="animate-pulse" />}
                       >
                          <AnimatePresence mode="wait">
                             {state.submitting ? (
                                <motion.span 
                                   key="submitting" 
                                   initial={{ opacity: 0, y: 10 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   exit={{ opacity: 0, y: -10 }}
                                >
                                   {isRtl ? "جاري_الإرسال..." : "DISPATCHING..."}
                                </motion.span>
                             ) : (
                                <motion.span 
                                   key="idle"
                                   initial={{ opacity: 0, y: 10 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   exit={{ opacity: 0, y: -10 }}
                                >
                                   {t("fields.submit")}
                                </motion.span>
                             )}
                          </AnimatePresence>
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
