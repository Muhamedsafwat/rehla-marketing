"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HiSparkles, HiChatBubbleLeftRight } from "react-icons/hi2";
import { useLocale } from "next-intl";
import { MouseEvent } from "react";

export interface CTASectionProps {
  badge?: string;
  title: string;
  description?: string;
  primaryAction?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryAction?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  withDecoration?: boolean;
}

export const CTASection = ({
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
}: CTASectionProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  
  // Spotlight logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section className="relative w-full py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-10%" }}
          onMouseMove={handleMouseMove}
          className="group relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-[#050505] shadow-[0_0_100px_rgba(204,10,10,0.05)] border border-white/5 p-8 md:p-12 lg:p-16"
        >
          
          {/* Abstract Topographic Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />

          {/* Mouse Hover Spotlight */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 mix-blend-screen"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  500px circle at ${mouseX}px ${mouseY}px,
                  rgba(204, 10, 10, 0.12),
                  transparent 80%
                )
              `,
            }}
          />

          {/* Sweeping Lasers */}
          <div className="absolute top-0 right-full w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent group-hover:animate-sweep-right" />
          <div className="absolute bottom-0 left-full w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent group-hover:animate-sweep-left" />

          {/* Inner Layout */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-16 lg:gap-12 w-full">
            
            {/* ── Text & Buttons ── */}
            <div className="flex flex-col flex-1 gap-8 w-full lg:w-[55%] items-start text-start">
               
               {/* Badge */}
               {badge && (
                 <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md shrink-0">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                   <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-primary whitespace-nowrap">
                     {badge}
                   </span>
                 </div>
               )}

               {/* Headline */}
               <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[1.0] text-balance drop-shadow-lg text-start">
                 {title}
               </h2>

               {/* Description */}
               {description && (
                 <p className="text-base md:text-xl text-zinc-400 font-medium tracking-tight leading-relaxed max-w-xl text-start">
                   {description}
                 </p>
               )}

               {/* Side-by-side Button Cluster */}
               <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto">
                 {primaryAction && (
                   <Button
                     variant="primary"
                     size="md"
                     isMagnetic
                     rightIcon={<HiSparkles className="animate-pulse w-4 h-4 md:w-5 md:h-5" />}
                     className="w-full sm:w-auto min-w-[160px] px-8 py-6 text-sm font-bold tracking-wide shadow-[0_0_30px_rgba(204,10,10,0.3)] hover:shadow-[0_0_50px_rgba(204,10,10,0.6)] transition-shadow duration-500 rounded-full"
                     onClick={primaryAction.onClick}
                     href={primaryAction.href}
                     target={primaryAction.href?.startsWith('http') ? '_blank' : undefined}
                   >
                     {primaryAction.text}
                   </Button>
                 )}

                 {secondaryAction && (
                   <Button
                     variant="glass"
                     size="md"
                     isMagnetic
                     leftIcon={<HiChatBubbleLeftRight className="text-primary w-4 h-4 md:w-5 md:h-5" />}
                     className="w-full sm:w-auto min-w-[160px] px-8 py-6 text-sm font-bold tracking-wide rounded-full border-white/10 hover:border-white/30 backdrop-blur-lg bg-white/5"
                     onClick={secondaryAction.onClick}
                     href={secondaryAction.href}
                   >
                     {secondaryAction.text}
                   </Button>
                 )}
               </div>

            </div>

            <div className="flex flex-col items-center justify-center w-full lg:w-[45%] relative min-h-[300px]">
              
              <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] flex items-center justify-center shrink-0">
                 
                 <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-white/20"
                 />
                 <motion.div 
                    animate={{ rotate: -360 }} 
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[10%] rounded-full border border-white/5 bg-white/[0.01] backdrop-blur-[1px]"
                 />
                 <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[20%] rounded-full border-t-2 border-r-2 border-primary/30"
                 />

                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary rounded-full blur-[30px] opacity-70 animate-pulse mix-blend-screen" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full blur-[10px] opacity-40 mix-blend-screen" />
                 
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-[15%] ltr:left-[5%] rtl:right-[5%] px-4 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md flex items-center gap-2 shadow-xl whitespace-nowrap"
                 >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
                      {isRtl ? "نظام" : "SYS_ACTIVE"}
                    </span>
                 </motion.div>

                 <motion.div 
                   animate={{ y: [0, 10, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute bottom-[18%] ltr:right-[5%] rtl:left-[5%] px-4 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md flex items-center gap-2 shadow-xl whitespace-nowrap"
                 >
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                      {isRtl ? "نمو" : "GROWTH_FWD"}
                    </span>
                 </motion.div>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
};
