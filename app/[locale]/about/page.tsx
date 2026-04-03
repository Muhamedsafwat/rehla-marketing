import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { Divider } from '@/components/ui/Divider';

const HeroSection = dynamic(() => import("@/components/About/HeroSection/HeroSection").then(m => m.HeroSection), { ssr: true });
const WhoWeAreSection = dynamic(() => import("@/components/About/WhoWeAreSection/WhoWeAreSection").then(m => m.WhoWeAreSection), { loading: () => <div className="h-96 w-full animate-pulse bg-white/5" /> });
const PhilosophySection = dynamic(() => import("@/components/About/PhilosophySection/PhilosophySection").then(m => m.PhilosophySection), { loading: () => <div className="h-96 w-full animate-pulse bg-white/5" /> });
const BrandPerformanceSection = dynamic(() => import("@/components/About/BrandPerformanceSection/BrandPerformanceSection").then(m => m.BrandPerformanceSection), { loading: () => <div className="h-96 w-full animate-pulse bg-white/5" /> });
const HowWeThinkSection = dynamic(() => import("@/components/About/HowWeThinkSection/HowWeThinkSection").then(m => m.HowWeThinkSection), { loading: () => <div className="h-96 w-full animate-pulse bg-white/5" /> });
const ClosingSection = dynamic(() => import("@/components/About/ClosingSection/ClosingSection").then(m => m.ClosingSection), { loading: () => <div className="h-96 w-full animate-pulse bg-white/5" /> });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutMetadata' });

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
      url: `${baseUrl}/${locale}/about`,
    },

    alternates: {
      canonical: `${baseUrl}/${locale}/about`,
      languages: {
        en: `${baseUrl}/en/about`,
        ar: `${baseUrl}/ar/about`,
        "x-default": `${baseUrl}/en/about`
      },
    },
  };
}

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      <HeroSection />
      <Divider />
      <WhoWeAreSection />
      <Divider />
      <PhilosophySection />
      <Divider />
      <BrandPerformanceSection />
      <Divider />
      <HowWeThinkSection />
      <Divider />
      <ClosingSection />
    </main>
  );
}
