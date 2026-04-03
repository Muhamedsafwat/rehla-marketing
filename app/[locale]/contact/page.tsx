import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { Divider } from '@/components/ui/Divider';

const HeroSection = dynamic(() => import("@/components/Contact/HeroSection/HeroSection").then(m => m.HeroSection), { ssr: true });
const FormSection = dynamic(() => import("@/components/Contact/FormSection/FormSection").then(m => m.FormSection), { loading: () => <div className="h-96 w-full animate-pulse bg-zinc-900/10" /> });
const ClosingSection = dynamic(() => import("@/components/Contact/ClosingSection/ClosingSection").then(m => m.ClosingSection), { loading: () => <div className="h-96 w-full animate-pulse bg-zinc-900/10" /> });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage.Metadata' });

  return {
    metadataBase: new URL('https://rehlamarketing.com'),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      type: "website",
      title: t('title'),
      description: t('description'),
      siteName: "Rehla Marketing",
      url: `/${locale}/contact`,
    },
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: "/en/contact",
        ar: "/ar/contact",
        "x-default": "/en/contact"
      },
    },
  };
}

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      <HeroSection />
      <Divider />
      <FormSection />
      <Divider />
      <ClosingSection />
    </main>
  );
}
