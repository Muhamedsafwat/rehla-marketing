"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HiBolt, HiCursorArrowRays, HiChartBar, HiShieldCheck } from "react-icons/hi2";
import { useMemo } from "react";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface HeroProofProps {
  isRtl: boolean;
}

export const HeroProof = ({ isRtl }: HeroProofProps) => {
  const t = useTranslations("HomePage.Hero");

  const proof = useMemo(
    () => [
      { key: "fast" as const, icon: <HiBolt className="h-3.5 w-3.5 text-primary" /> },
      { key: "direction" as const, icon: <HiCursorArrowRays className="h-3.5 w-3.5 text-primary" /> },
      { key: "growth" as const, icon: <HiChartBar className="h-3.5 w-3.5 text-primary" /> },
      { key: "system" as const, icon: <HiShieldCheck className="h-3.5 w-3.5 text-primary" /> },
    ],
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.9, ease: E }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-2.5"
    >
      {proof.map((p, i) => (
        <motion.div
          key={p.key}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65 + i * 0.055, duration: 0.55, ease: E }}
          className="flex items-center gap-3 rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 backdrop-blur-xl"
        >
          <span className="rounded-full border border-primary/20 bg-primary/10 p-1.5">
            {p.icon}
          </span>
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-300">
            {t(`proof.${p.key}`)}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};
