import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Almarai } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/Layout/Navbar/Navbar";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Footer } from "@/components/Layout/Footer/Footer";
import { Preloader } from "@/components/Layout/Preloader/Preloader";
import "../globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const almarai = Almarai({
  variable: "--font-almarai",
  weight: ["300", "400", "700", "800"],
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0d0d0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isRtl = locale === 'ar';

  const siteName = isRtl ? "رحلة للتسويق | بناء الهوية الرقمية" : "Rehla Marketing | Digital Transformation Architects";
  const siteDescription = isRtl
    ? "تساعد وكالة رحلة الشركات على بناء حضور رقمي قوي وإطلاق حملات تسويقية وتطوير أنظمة متكاملة تقود سوق الشرق الأوسط بامتياز."
    : "Rehla Agency helps businesses cultivate a powerful digital presence, launch sophisticated marketing campaigns, and develop robust technical systems across the Middle East.";

  return {
    title: {
      default: siteName,
      template: `%s | ${isRtl ? 'رحلة للتسويق' : 'Rehla Marketing'}`
    },
    description: siteDescription,
    metadataBase: new URL("https://rehlamarketing.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en"
      }
    },
    openGraph: {
      type: "website",
      locale: isRtl ? "ar_SA" : "en_US",
      url: "https://rehlamarketing.com",
      title: siteName,
      description: siteDescription,
      siteName: siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: siteDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: "/favicon.ico",
    },
    keywords: isRtl
      ? ["وكالة تسويق", "التسويق الرقمي", "رحلة", "تطوير ويب", "تطبيقات جوال", "هوية بصرية", "السعودية", "الرياض"]
      : ["Marketing Agency", "Digital Transformation", "Rehla", "Web Development", "Saudi Arabia", "Riyadh", "Branding"],
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";
  const bodyFontClass = locale === "ar" ? "font-arabic" : "font-sans";

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${plusJakartaSans.variable} ${almarai.variable} h-full antialiased`}
    >
      <body
        className={`min-h-full flex flex-col ${bodyFontClass}`}
        style={{ backgroundColor: "#0d0d0f" }}
      >
        <NextIntlClientProvider messages={messages}>
          <Preloader />
          <BackgroundBeams />
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
