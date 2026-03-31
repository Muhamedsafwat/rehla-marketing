import React from 'react'
import AboutUs from './AboutUs'
export async function generateMetadata({ params }) {
  const { locale } = await params

  const titles = {
    en: 'About us',
    ar: 'من نحن',
  }

  const descriptions = {
    en: 'Rehla Marketing is a full-service marketing agency specializing in strategy, branding, advertising, content creation, analytics, and custom software solutions. We help businesses grow through creative campaigns and data-driven digital experiences that inspire and engage audiences.',
    ar: 'رحلة ماركتنج هي وكالة تسويق متكاملة متخصصة في الاستراتيجية، العلامة التجارية، الإعلانات، إنشاء المحتوى، التحليلات، وأنظمة البرمجيات المخصصة. نساعد الشركات على النمو من خلال حملات إبداعية وتجارب رقمية قائمة على البيانات تلهم الجمهور وتحقق النتائج.',
  }

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
    },
  }
}
const page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000))
  return (
    <div>
      <AboutUs />
    </div>
  )
}

export default page
