"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface HeroHeadlineProps {
  isRtl: boolean;
}

export const HeroHeadline = ({ isRtl }: HeroHeadlineProps) => {
  const t = useTranslations("HomePage.Hero");

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 1.1, ease: E }}
        className="font-black text-white text-4xl leading-[1.2] tracking-tight md:text-5xl xl:text-[3.5rem] xl:leading-[1.1]"
      >
        {t("headline")
          .split("\n")
          .map((line, i) =>
            i === 0 ? (
              <span key={i} className="block">
                {line}
              </span>
            ) : (
              <span
                key={i}
                className="rehla-title-shimmer block bg-clip-text text-transparent"
              >
                {line}
              </span>
            )
          )}
      </motion.h1>

      {/* Accent rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.9, ease: E }}
        className="mt-6 h-px w-24 bg-gradient-to-r from-primary/75 to-transparent shadow-[0_0_14px_rgba(146,11,11,0.5)]"
        style={{ transformOrigin: "start" }}
      />

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26, duration: 1.0, ease: E }}
        className="mt-5 max-w-lg text-pretty text-[0.95rem] font-medium leading-relaxed text-zinc-400 md:text-base"
      >
        {t("subheadline")}
      </motion.p>
    </div>
  );
};
