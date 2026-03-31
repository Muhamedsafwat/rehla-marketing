import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import NavBar from './_components/NavBar/NavBar'
import Footer from './_components/Footer/Footer'
import '../globals.css'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params
  const messages = await getMessages({ locale })

  if (!['en', 'ar'].includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <link rel="icon" href="/Logo/Logo.png" type="image/png" />
      </head>
      <body
        style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <NavBar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = await params

  const siteTitle = locale === 'ar' ? 'رحلة ماركتنج' : 'Rehla Marketing'

  const descriptionByLocale: Record<string, string> = {
    en: 'Rehla Marketing is a full-service digital marketing agency that helps brands grow through creative strategies, data-driven campaigns, and innovative digital solutions. We specialize in marketing, branding, advertising, content, analytics, and custom software development.',
    ar: 'رحلة ماركتنج هي وكالة تسويق رقمي متكاملة تساعد العلامات التجارية على النمو من خلال استراتيجيات إبداعية وحملات قائمة على البيانات وحلول رقمية مبتكرة. نحن متخصصون في التسويق، والعلامة التجارية، والإعلانات، والمحتوى، والتحليلات، وتطوير البرمجيات المخصصة.',
  }

  const keywordsByLocale: Record<string, string> = {
    en: 'Rehla Marketing, digital marketing agency, branding, advertising, content strategy, analytics, CRM, custom software development, SEO, social media marketing, creative marketing, web development',
    ar: 'رحلة ماركتنج, وكالة تسويق رقمي, العلامة التجارية, الإعلانات, استراتيجية المحتوى, التحليلات, إدارة علاقات العملاء, تطوير البرمجيات, التسويق عبر السوشيال ميديا, تحسين محركات البحث, وكالة تسويق إبداعية, تطوير المواقع',
  }

  const ogLocale = locale === 'ar' ? 'ar_EG' : 'en_US'

  return {
    title: {
      default: siteTitle,
      template: `${siteTitle} - %s`,
    },
    description: descriptionByLocale[locale],
    other: {
      keywords: keywordsByLocale[locale],
    },
    alternates: {
      languages: {
        en: '/en',
        ar: '/ar',
      },
      canonical: `/${locale}`,
    },
    openGraph: {
      title: siteTitle,
      description: descriptionByLocale[locale],
      locale: ogLocale,
      type: 'website',
      images: [
        {
          url: '/icon.png',
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: descriptionByLocale[locale],
    },
    icons: {
      icon: [{ url: '/icon.png' }],
    },
  }
}
