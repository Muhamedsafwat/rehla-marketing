import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { Divider } from '@/components/ui/Divider';

const HeroSection = dynamic(() => import("@/components/Home/HeroSection/HeroSection").then(m => m.HeroSection), {
  ssr: true,
});

const PositioningSection = dynamic(() => import("@/components/Home/PositioningSection/PositioningSection").then(m => m.PositioningSection), {
  loading: () => <div className="h-96 w-full animate-pulse bg-white/5" />,
});

const ServicesSection = dynamic(() => import("@/components/Home/ServicesSection/ServicesSection").then(m => m.ServicesSection), {
  loading: () => <div className="h-96 w-full animate-pulse bg-white/5" />,
});

const InsightsSection = dynamic(() => import("@/components/Home/InsightsSection/InsightsSection").then(m => m.InsightsSection), {
  loading: () => <div className="h-96 w-full animate-pulse bg-white/5" />,
});

const ProcessSection = dynamic(() => import("@/components/Home/ProcessSection/ProcessSection").then(m => m.ProcessSection), {
  loading: () => <div className="h-96 w-full animate-pulse bg-white/5" />,
});

const WhyUsSection = dynamic(() => import("@/components/Home/WhyUsSection/WhyUsSection").then(m => m.WhyUsSection), {
  loading: () => <div className="h-96 w-full animate-pulse bg-white/5" />,
});

const StatementSection = dynamic(() => import("@/components/Home/StatementSection/StatementSection").then(m => m.StatementSection), {
  loading: () => <div className="h-96 w-full animate-pulse bg-white/5" />,
});

const FinalCTASection = dynamic(() => import("@/components/Home/FinalCTASection/FinalCTASection").then(m => m.FinalCTASection), {
  loading: () => <div className="h-96 w-full animate-pulse bg-white/5" />,
});

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      type: "website",
      title: t('title'),
      description: t('description'),
      siteName: "Rehla Marketing",
      url: `https://rehlamarketing.com/${locale}`,
    },
    alternates: {
      canonical: `https://rehlamarketing.com/${locale}`,
      languages: {
        en: "https://rehlamarketing.com/en",
        ar: "https://rehlamarketing.com/ar",
      },
    },
  };
}

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      <HeroSection />
      <Divider />
      <PositioningSection />
      <Divider />
      <ServicesSection />
      <Divider />
      <InsightsSection />
      <Divider />
      <ProcessSection />
      <Divider />
      <WhyUsSection />
      <Divider />
      <StatementSection />
      <Divider />
      <FinalCTASection />
    </main>
  );
}
