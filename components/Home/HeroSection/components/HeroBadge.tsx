"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface HeroBadgeProps {
  isRtl: boolean;
}

export const HeroBadge = ({ isRtl }: HeroBadgeProps) => {
  const t = useTranslations("HomePage.Hero");

  return (
    <motion.div
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: E }}
      className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/[0.09] bg-white/[0.03] px-5 py-2.5 backdrop-blur-xl"
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(146,11,11,0.9)]" />
      </span>
      <span className="text-[9px] font-black uppercase tracking-[0.48em] text-zinc-400">
        {t("badge")}
      </span>
    </motion.div>
  );
};
