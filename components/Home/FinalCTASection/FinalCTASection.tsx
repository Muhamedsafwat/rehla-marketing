"use client";

import { useTranslations, useLocale } from "next-intl";
import { CTASection } from "@/components/ui/CTASection";

export const FinalCTASection = () => {
  const t = useTranslations("HomePage.FinalCTA");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className="w-full">
      <CTASection
        badge={isRtl ? "نبدأ / نخطط / نتوسع" : "Ready / Scale / Growth"}
        title={t("headline")}
        description={t("body")}
        primaryAction={{
          text: t("cta"),
          href: `/${locale}/contact`,
        }}
        secondaryAction={{
          text: t("ctaAlt"),
          href: "https://wa.me/966564107629",
        }}
        withDecoration={true}
      />
    </div>
  );
};
