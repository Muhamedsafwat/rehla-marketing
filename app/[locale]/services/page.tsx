import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { Divider } from '@/components/ui/Divider';

const HeroSection = dynamic(() => import("@/components/Services/HeroSection/HeroSection").then(m => m.HeroSection), { ssr: true });
const IntroSection = dynamic(() => import("@/components/Services/IntroSection/IntroSection").then(m => m.IntroSection), { loading: () => <div className="h-96 w-full animate-pulse bg-white/5" /> });
const BrandingSection = dynamic(() => import("@/components/Services/BrandingSection/BrandingSection").then(m => m.BrandingSection), { loading: () => <div className="h-96 w-full animate-pulse bg-white/5" /> });
const ContentSection = dynamic(() => import("@/components/Services/ContentSection/ContentSection").then(m => m.ContentSection), { loading: () => <div className="h-96 w-full animate-pulse bg-white/5" /> });
const PerformanceSection = dynamic(() => import("@/components/Services/PerformanceSection/PerformanceSection").then(m => m.PerformanceSection), { loading: () => <div className="h-96 w-full animate-pulse bg-white/5" /> });
const StrategySection = dynamic(() => import("@/components/Services/StrategySection/StrategySection").then(m => m.StrategySection), { loading: () => <div className="h-96 w-full animate-pulse bg-white/5" /> });
const CTASection = dynamic(() => import("@/components/Services/CTASection/CTASection").then(m => m.CTASection), { loading: () => <div className="h-96 w-full animate-pulse bg-white/5" /> });
const ClosingStatement = dynamic(() => import("@/components/Services/ClosingStatement/ClosingStatement").then(m => m.ClosingStatement), { loading: () => <div className="h-96 w-full animate-pulse bg-white/5" /> });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicesPage.Metadata' });

  const baseUrl = new URL('https://rehlamarketing.com');

  return {
    metadataBase: baseUrl,
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),

    openGraph: {
      type: "website",
      title: t('title'),
      description: t('description'),
      siteName: "Rehla Marketing",
      url: `${baseUrl}/${locale}/services`,
    },

    alternates: {
      canonical: `${baseUrl}/${locale}/services`,
      languages: {
        en: `${baseUrl}/en/services`,
        ar: `${baseUrl}/ar/services`,
        "x-default": `${baseUrl}/en/services`
      },
    },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicesPage' });

  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">

      <HeroSection />
      <Divider />
      <IntroSection />
      <Divider />
      <BrandingSection />
      <Divider />
      <ContentSection />
      <Divider />
      <PerformanceSection />
      <Divider />
      <StrategySection />
      <Divider />
      <ClosingStatement />
      <Divider />
      <CTASection />

    </main>
  );
}
