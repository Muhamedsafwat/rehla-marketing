"use client";

import { useTranslations, useLocale } from "next-intl";
import React, { memo } from "react";
import { CTASection } from "@/components/ui/CTASection";

export const ClosingSection = memo(() => {
  const t       = useTranslations("ContactPage.Closing");
  const locale  = useLocale();
  const isRtl   = locale === "ar";

  return (
    <section className={`relative w-full ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      <CTASection 
         badge={t("badge")}
         title={t("title")}
         description={t("description")}
         primaryAction={{
            text: t("primary"),
            href: "tel:+966564107629",
         }}
         secondaryAction={{
            text: t("secondary"),
            href: "https://wa.me/966564107629",
         }}
      />
    </section>
  );
});

