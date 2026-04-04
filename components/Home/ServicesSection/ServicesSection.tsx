"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { services } from "../Data/HomeData";
import {
  HiFire,
  HiWindow,
  HiCommandLine,
  HiPresentationChartLine,
} from "react-icons/hi2";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useState } from "react";
import { cn } from "@/lib/utils";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

const icons = {
  branding: <HiFire />,
  content: <HiWindow />,
  performance: <HiCommandLine />,
  strategy: <HiPresentationChartLine />,
};

export const ServicesSection = () => {
  const t = useTranslations("HomePage.Services");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative container mx-auto overflow-hidden bg-transparent py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none select-none">
        <motion.div
          animate={{
            opacity: hoveredId ? 0.04 : 0.02,
            scale: hoveredId ? 1.05 : 1,
            filter: hoveredId ? "blur(20px)" : "blur(40px)"
          }}
          transition={{ duration: 1.5, ease: E }}
          className="flex h-full items-center justify-center"
        >
          <span className={cn(
            "text-[10vw] font-black uppercase tracking-[-0.05em] text-white opacity-60",
            locale === "ar" && "font-sans tracking-normal"
          )}>
            {t("bgKicker")}
          </span>
        </motion.div>
      </div>

      <div className="container relative z-10 px-6">
        <SectionTitle
          title={t("headline")}
          align="left"
          badge={t("badge")}
          className="mb-20 md:mb-28"
        />

        <div className="group/container relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-y border-white/10">

          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-20 pointer-events-none" />

          {services.map((service, index) => {
            const isHovered = hoveredId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  "relative min-h-[560px] flex flex-col p-10 transition-all duration-700",
                  "border-b border-white/10 md:even:border-l lg:border-b-0 lg:border-l lg:first:border-l-0",
                  !isHovered && hoveredId !== null && "opacity-30 grayscale blur-[2px]",
                  isHovered && "z-50 bg-white/[0.025] backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
                )}
              >
                <motion.div
                  initial={false}
                  animate={{
                    height: isHovered ? "100%" : "0%",
                    opacity: isHovered ? 1 : 0
                  }}
                  className="absolute left-0 top-0 w-[4px] bg-primary z-20 shadow-[0_0_30px_#cc0a0a]"
                />

                <div className="relative z-10 flex items-center justify-between">
                  <span className={cn(
                    "text-[10px] font-black italic tracking-[0.4em] text-zinc-800 transition-colors duration-700",
                    isHovered ? "text-primary" : "group-hover:text-zinc-600"
                  )}>
                    {t("refLabel")} 0{index + 1}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-zinc-900 transition-colors group-hover:bg-primary shadow-[0_0_10px_rgba(204,10,10,0.3)]" />
                </div>

                <div className="mt-20 flex-1 space-y-12 relative z-10">
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.2 : 1,
                      y: isHovered ? -10 : 0
                    }}
                    transition={{ duration: 0.8, ease: E }}
                    className={cn(
                      "text-5xl transition-colors duration-700",
                      isHovered ? "text-primary filter drop-shadow-[0_0_20px_rgba(204,10,10,0.8)]" : "text-zinc-700"
                    )}
                  >
                    {icons[service.id as keyof typeof icons]}
                  </motion.div>

                  <h3 className={cn(
                    "text-3xl font-black uppercase tracking-tight transition-all duration-700 leading-tight",
                    isHovered ? "text-white translate-x-2" : "text-zinc-300"
                  )}>
                    {t(`${service.id}.title`)}
                  </h3>

                  <div className={cn(
                    "h-px w-16 bg-white/5 transition-all duration-1000",
                    isHovered && "w-full bg-primary/40"
                  )} />

                  <p className={cn(
                    "text-base md:text-lg font-semibold leading-relaxed transition-all duration-700 max-w-[90%]",
                    isHovered ? "text-zinc-100" : "text-zinc-600 opacity-60"
                  )}>
                    {t(`${service.id}.desc`)}
                  </p>
                </div>

                <div className="relative z-10 mt-auto flex items-end justify-between border-t border-white/5 pt-8 opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="space-y-1">
                    <div className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-300">
                      {t("layerLabel")}
                    </div>
                    <div className="text-[10px] font-black uppercase text-zinc-300">
                      {t(`${service.id}.yield`)}
                    </div>
                  </div>
                  <div className="flex gap-1 text-[10px] font-black italic text-primary/40">
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
