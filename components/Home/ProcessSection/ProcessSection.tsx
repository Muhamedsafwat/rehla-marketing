"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useSpring } from "framer-motion";
import { steps } from "../Data/HomeData";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export const ProcessSection = () => {
  const t = useTranslations("HomePage.Process");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.4", "end 0.6"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden bg-transparent">
      {/* Background */}
      <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center opacity-[0.02]">
        <span className="text-[14vw] font-black uppercase tracking-tighter whitespace-nowrap">
          {t("bgKicker")}
        </span>
      </div>

      <div className="container relative z-10">
        <SectionTitle
          title={t("headline")}
          align="center"
          badge={isRtl ? "منهجية العمل" : "Process / Methodology"}
          className="mb-16 md:mb-24"
        />

        <div ref={containerRef} className="relative mx-auto max-w-4xl">

          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/[0.06]" />

          <motion.div
            style={{ scaleY: smoothProgress, transformOrigin: "top" }}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-primary shadow-[0_0_12px_#cc0a0a]"
          />

          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const showLeft = isRtl ? !isEven : isEven;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-10%" }}
                className="group relative pb-20 md:pb-28 last:pb-0"
              >
                <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/10 bg-[#0c0c0c] group-hover:border-primary/60 group-hover:shadow-[0_0_25px_rgba(204,10,10,0.3)] transition-all duration-700"
                  >
                    <span className="text-[11px] font-black text-zinc-500 group-hover:text-white transition-colors duration-500">
                      {step.num}
                    </span>
                  </motion.div>
                </div>

                {/* ── Content — Alternates Left / Right ───── */}
                <div className="grid grid-cols-[1fr_48px_1fr] items-start">

                  {/* Left Column */}
                  <div className={cn("pe-8 md:pe-14", !showLeft && "invisible")}>
                    {showLeft && (
                      <div className="text-end">
                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white/80 group-hover:text-white transition-colors duration-500 leading-tight mb-3">
                          {t(`${step.id}.title`)}
                        </h3>
                        <div className="h-0.5 w-10 bg-white/10 group-hover:w-20 group-hover:bg-primary ms-auto transition-all duration-700 mb-4" />
                        <p className="text-sm md:text-base font-medium leading-relaxed text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500">
                          {t(`${step.id}.desc`)}
                        </p>
                        <div className="mt-4 opacity-0 group-hover:opacity-60 transition-opacity duration-700">
                          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-500">
                            {t("metaLabel")} / {step.num}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div />

                  <div className={cn("ps-8 md:ps-14", showLeft && "invisible")}>
                    {!showLeft && (
                      <div className="text-start">
                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white/80 group-hover:text-white transition-colors duration-500 leading-tight mb-3">
                          {t(`${step.id}.title`)}
                        </h3>
                        <div className="h-0.5 w-10 bg-white/10 group-hover:w-20 group-hover:bg-primary transition-all duration-700 mb-4" />
                        <p className="text-sm md:text-base font-medium leading-relaxed text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500">
                          {t(`${step.id}.desc`)}
                        </p>
                        <div className="mt-4 opacity-0 group-hover:opacity-60 transition-opacity duration-700">
                          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-500">
                            {t("metaLabel")} / {step.num}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
