"use client";

import { useTranslations, useLocale } from "next-intl";
import { PageHero, HeroWord } from "@/components/ui/PageHero/PageHero";

export const HeroSection = () => {
  const t = useTranslations("ContactPage.Hero");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const words: HeroWord[] = isRtl
    ? [
      {
        text: "ابدأ",
        variant: "outlined",
        indent: 0,
        clampSize: "clamp(2rem, 8vw, 5.5rem)",
      },
      {
        text: "الحوار",
        variant: "filled",
        indent: 1,
        clampSize: "clamp(1.8rem, 7vw, 4.5rem)",
      },
      {
        text: "الـصـحيـح.",
        variant: "accent",
        indent: 2,
        clampSize: "clamp(2rem, 8vw, 5rem)",
      },
    ]
    : [
      {
        text: "Start",
        variant: "outlined",
        indent: 0,
        clampSize: "clamp(2rem, 8vw, 5.5rem)",
      },
      {
        text: "The Right",
        variant: "filled",
        indent: 1,
        clampSize: "clamp(1.8rem, 7vw, 4rem)",
      },
      {
        text: "Conversation.",
        variant: "accent",
        indent: 2,
        clampSize: "clamp(2rem, 8vw, 5rem)",
      },
    ];

  return (
    <section className="relative w-full" aria-label={isRtl ? "قسم البداية" : "Contact hero"}>
      <PageHero
        eyebrow={isRtl ? "تواصل — رحلة للتسويق" : "Contact — Rehla Marketing"}
        words={words}
        statement={t("subheadline")}
        meta={isRtl ? "رحلة / اتصال / استراتيجية" : "Rehla / Connect / Strategy"}
        isRtl={isRtl}
      />
    </section>
  );
};
