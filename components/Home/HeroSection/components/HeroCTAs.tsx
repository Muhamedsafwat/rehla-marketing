"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { HiSparkles, HiArrowRight, HiArrowLeft } from "react-icons/hi2";

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface HeroCTAsProps {
  isRtl: boolean;
}

export const HeroCTAs = ({ isRtl }: HeroCTAsProps) => {
  const locale = useLocale();
  const t = useTranslations("HomePage.Hero");
  const Arrow = isRtl ? HiArrowLeft : HiArrowRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.42, duration: 1.0, ease: E }}
      className="flex flex-wrap gap-3"
    >
      <Button
        variant="primary"
        size="md"
        isMagnetic
        className="w-full md:w-64 h-[56px] tracking-[0.15em] text-[10px]"
        rightIcon={
          <Arrow className="shrink-0 transition-transform group-hover:translate-x-1" />
        }
        href="https://wa.me/966564107629"
        target="_blank"
      >
        {t("cta")}
      </Button>

      <Button
        variant="glass"
        size="md"
        isMagnetic
        className="w-full md:w-64 h-[56px] tracking-[0.15em] text-[10px]"
        leftIcon={<HiSparkles className="shrink-0 text-primary" />}
        href={`/${locale}/contact`}
        target="_self"
      >
        {t("ctaAlt")}
      </Button>
    </motion.div>
  );
};
