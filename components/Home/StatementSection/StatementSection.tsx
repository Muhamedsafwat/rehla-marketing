"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export const StatementSection = () => {
  const t = useTranslations("HomePage.Statement");
  const locale = useLocale();
  const isRtl = locale === "ar";
  
  const headlineParts = t("headline").split(/[.]/).filter((p) => p.trim() !== "");
  
  const rawBody = t("body");
  const principles = rawBody
    .split(/[\n.،]/)
    .map((p) => p.trim())
    .filter((p) => p.length > 3);

  // Stagger animation for the list items
  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative w-full py-24 md:py-32 lg:py-48 bg-transparent">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="container relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        
        <div className="flex flex-col items-center text-center mb-20 md:mb-32">
          {headlineParts.map((part, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
               viewport={{ once: true, margin: "-10%" }}
             >
                <h2 className={cn(
                  "text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter leading-none mix-blend-plus-lighter",
                  index === 0 ? "text-white" : "italic text-zinc-700"
                )}>
                  {part}.
                </h2>
             </motion.div>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="flex flex-col w-full border-t border-white/5 pt-8 md:pt-12"
        >
          {principles.map((principle, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className={cn(
                "group relative flex flex-col md:flex-row items-start md:items-center py-8 md:py-12 transition-colors duration-500 overflow-hidden cursor-crosshair",
                index !== principles.length - 1 && "border-b border-white/5"
              )}
            >
              
              <div className={cn(
                "absolute top-0 bottom-0 w-0 group-hover:w-full transition-all duration-700 ease-out bg-gradient-to-r from-primary/5 to-transparent pointer-events-none z-0",
                isRtl ? "right-0 bg-gradient-to-l" : "left-0"
              )} />

              <div className={cn(
                "relative z-10 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-12",
                isRtl && "sm:flex-row-reverse"
              )}>
                <div className={cn(
                  "flex items-center gap-4 md:gap-6 w-full sm:w-24 md:w-32 flex-none",
                  isRtl && "flex-row-reverse sm:justify-end"
                )}>
                   <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden flex-none">
                      <span className="absolute text-2xl font-black italic text-zinc-700 group-hover:-translate-y-12 transition-transform duration-500 ease-in-out">
                        0{index + 1}
                      </span>
                      <div className="absolute translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                        <div className="h-4 w-4 bg-primary rounded-sm shadow-[0_0_15px_#cc0a0a] transform rotate-45" />
                      </div>
                   </div>
                   
                   <div className={cn(
                     "h-px bg-white/10 group-hover:bg-primary transition-all duration-700 ease-out blur-[0.5px]",
                     "w-12 group-hover:w-full group-hover:shadow-[0_0_10px_#cc0a0a]"
                   )} />
                </div>

                <h3 className={cn(
                  "flex-1 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-snug transition-all duration-500 ease-out",
                  "text-zinc-500 group-hover:text-white md:group-hover:italic",
                  isRtl ? "text-right md:group-hover:-translate-x-6" : "md:group-hover:translate-x-6"
                )}>
                  {principle}
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 ml-1">
                    .
                  </span>
                </h3>

              </div>
              
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
