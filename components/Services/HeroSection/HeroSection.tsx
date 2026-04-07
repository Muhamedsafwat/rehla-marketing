"use client";

import { useTranslations, useLocale } from "next-intl";
import { PageHero, HeroWord } from "@/components/ui/PageHero/PageHero";
import React, { memo } from "react";

export const HeroSection = memo(() => {
  const t = useTranslations("ServicesPage.Hero");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const words: HeroWord[] = isRtl
    ? [
      {
        text: "ما نفعله",
        variant: "outlined",
        clampSize: "clamp(2rem, 8vw, 5.5rem)",
        indent: 0
      },
      {
        text: "بسيط للغاية.",
        variant: "filled",
        clampSize: "clamp(1.8rem, 7vw, 4rem)",
        indent: 1
      },
      {
        text: "نبني. نحسن. نتوسع.",
        variant: "accent",
        clampSize: "clamp(1.2rem, 5vw, 2.5rem)",
        indent: 2
      }
    ]
    : [
      {
        text: "What We Do",
        variant: "outlined",
        clampSize: "clamp(2rem, 8vw, 5.5rem)",
        indent: 0
      },
      {
        text: "Is Simple.",
        variant: "filled",
        clampSize: "clamp(1.8rem, 7vw, 4rem)",
        indent: 1
      },
      {
        text: "Build. Optimize. Scale.",
        variant: "accent",
        clampSize: "clamp(1.2rem, 5vw, 2.5rem)",
        indent: 2
      }
    ];

  return (
    <section className="relative w-full overflow-hidden">
      <PageHero
        eyebrow={isRtl ? "خدمات رحلة — 2026" : "REHLA_SERVICES_2026"}
        words={words}
        statement={t("subheadline")}
        meta={isRtl ? "أنظمة / أداء / استراتيجية" : "SYSTEMS / PERFORMANCE / STRATEGY"}
        isRtl={isRtl}
      />
    </section>
  );
});

