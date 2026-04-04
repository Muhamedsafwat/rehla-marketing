"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { HiExclamationTriangle, HiLinkSlash, HiShieldCheck } from "react-icons/hi2";
import { cn } from "@/lib/utils";

import { GlowCard } from "@/components/ui/GlowCard";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const PositioningSection = () => {
  const t = useTranslations("HomePage.Positioning");

  const segments = [
    { id: "struggle", icon: <HiExclamationTriangle className="h-6 w-6 text-primary" />, color: "bg-primary/5" },
    { id: "chaos", icon: <HiLinkSlash className="h-6 w-6 text-primary" />, color: "bg-primary/5" },
    { id: "solution", icon: <HiShieldCheck className="h-6 w-6 text-primary" />, color: "bg-primary/5" },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-transparent py-24 md:py-32">
      <div className="container relative z-10">
        
        <div className="mb-16 md:mb-24">
          <SectionTitle
            title={t("headline")}
            align="left"
            badge={t("badge")}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {segments.map((seg, idx) => (
            <GlowCard
              key={seg.id}
              delay={idx * 0.15}
              glowColor="rgba(146, 11, 11, 0.15)"
            >
              <div className={cn("mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20", seg.color)}>
                {seg.icon}
              </div>

              <h3 className="text-xl font-black uppercase tracking-tight text-white md:text-2xl">
                {t(`segments.${seg.id}.title`)}
              </h3>

              <div className="my-6 h-px w-12 bg-primary/40 transition-all duration-700 group-hover:w-20" />

              <p className="text-base font-medium leading-relaxed text-zinc-300 transition-colors duration-700 group-hover:text-zinc-300">
                {t(`segments.${seg.id}.body`)}
              </p>
            </GlowCard>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:mt-24">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-5 rounded-2xl border border-white/5 bg-black/20 p-6 px-8"
            >
              <div className="text-xs font-black italic text-zinc-800">
                0{i + 1}
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                  {t(`stack.${i}.title`)}
                </div>
                <div className="mt-1 text-[11px] font-medium text-zinc-300 uppercase tracking-widest">
                   {t(`stack.${i}.desc`)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
