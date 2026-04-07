
import { CTASection as CTASectionUI } from "@/components/ui/CTASection";
import { useTranslations, useLocale } from "next-intl";
export const CTASection = () => {
    const t = useTranslations("ServicesPage.CTA");
    const locale = useLocale();

    return (
    <CTASectionUI
      badge={t("badge")}
      title={t("headline")}
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
    )
}