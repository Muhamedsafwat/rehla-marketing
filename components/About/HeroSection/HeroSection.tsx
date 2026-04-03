"use client";

import { useTranslations, useLocale } from "next-intl";
import { PageHero, HeroWord } from "@/components/ui/PageHero/PageHero";

export const HeroSection = () => {
  const t       = useTranslations("AboutPage.Hero");
  const locale  = useLocale();
  const isRtl   = locale === "ar";

  const words: HeroWord[] = isRtl
    ? [
        {
          text: "نحن",
          variant: "outlined",
          indent: 0,
          clampSize: "clamp(2rem, 8vw, 5.5rem)",
        },
        {
          text: "لا نسوّق",
          variant: "filled",
          indent: 1,
          clampSize: "clamp(1.8rem, 7vw, 4rem)",
        },
        {
          text: "فحسب —",
          variant: "muted",
          indent: 2,
          clampSize: "clamp(1.2rem, 5vw, 2.5rem)",
        },
        {
          text: "نبنيها.",
          variant: "accent",
          indent: 3,
          clampSize: "clamp(2rem, 8vw, 5rem)",
        },
      ]
    : [
        {
          text: "We Don't",
          variant: "outlined",
          indent: 0,
          clampSize: "clamp(2rem, 8vw, 5.5rem)",
        },
        {
          text: "Just Market",
          variant: "filled",
          indent: 1,
          clampSize: "clamp(1.8rem, 7vw, 4rem)",
        },
        {
          text: "Brands —",
          variant: "muted",
          indent: 2,
          clampSize: "clamp(1.2rem, 5vw, 2.5rem)",
        },
        {
          text: "We Build.",
          variant: "accent",
          indent: 3,
          clampSize: "clamp(2rem, 8vw, 5rem)",
        },
      ];

  return (
    <section className="relative w-full" aria-label={isRtl ? "قسم التعريف" : "About hero"}>
      <PageHero
        eyebrow={isRtl ? "هويتنا — رحلة للتسويق" : "About — Rehla Marketing"}
        words={words}
        statement={t("subheadline")}
        meta={isRtl ? "رحلة / تسويق / استراتيجية" : "Rehla / Marketing / Strategy"}
        isRtl={isRtl}
      />
    </section>
  );
};
