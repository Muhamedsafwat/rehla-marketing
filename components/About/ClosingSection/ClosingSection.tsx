"use client";

import { useTranslations, useLocale } from "next-intl";
import { CTASection } from "@/components/ui/CTASection";

export const ClosingSection = () => {
  const t = useTranslations("AboutPage.Closing");
  const locale = useLocale();

  return (
    <CTASection
      badge={t("badge")}
      title={t("title")}
      description={t("description")}
      primaryAction={{
        text: t("primaryAction"),
        href: `/${locale}/contact`,
      }}
      secondaryAction={{
        text: t("secondaryAction"),
        href: "https://wa.me/966564107629",
      }}
    />
  );
};
