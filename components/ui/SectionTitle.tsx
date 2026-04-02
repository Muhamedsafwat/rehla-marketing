"use client";

import { memo } from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

type Align = "left" | "center" | "right";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: Align;
  badge?: string;
}

const SectionTitleImpl = ({ title, subtitle, className, align = "center", badge }: SectionTitleProps) => {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  const alignment: Record<Align, string> = {
    left: "text-start items-start",
    center: "text-center items-center",
    right: "text-end items-end",
  };

  const containerVariants: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.12, delayChildren: 0.1 },
        },
      };

  const itemVariants: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { y: 16, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 110, damping: 20 },
        },
      };

  const lines = title.split("\n");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      className={cn("flex flex-col w-full gap-3 relative", alignment[align], className)}
    >
      <motion.div variants={itemVariants} className="w-full">
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full bg-primary", !reduceMotion && "animate-pulse")} />
          <div className="h-px w-10 bg-white/10" />
          {badge && (
            <span className="text-[9px] font-black uppercase tracking-[0.45em] text-zinc-500 whitespace-nowrap">
              {badge}
            </span>
          )}
        </div>

        <h2
          className={cn(
            "mt-4 font-black tracking-tight text-white selection:bg-primary/30",
            locale === "ar" ? "text-2xl md:text-3xl leading-tight" : "text-2xl md:text-3xl uppercase italic leading-tight"
          )}
        >
          {lines.map((line, idx) => (
            <span key={idx} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div
          className={cn(
            "mt-3 h-px w-16 bg-primary/70 shadow-[0_0_14px_rgba(146,11,11,0.5)]",
            align === "center" ? "mx-auto" : align === "right" ? "ms-auto" : "me-auto"
          )}
        />
      </motion.div>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={cn(
            "max-w-3xl text-balance transition-all duration-700",
            locale === "ar"
              ? "text-base md:text-lg font-bold text-zinc-400 leading-relaxed"
              : "text-sm md:text-base text-zinc-500 font-medium tracking-tight"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

SectionTitleImpl.displayName = "SectionTitle";

export const SectionTitle = memo(SectionTitleImpl);

