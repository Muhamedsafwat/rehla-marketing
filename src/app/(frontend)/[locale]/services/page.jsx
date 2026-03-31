import React from 'react'
import ServicesComp from './ServicesComp'
export async function generateMetadata({ params }) {
  const { locale } = await params

  const titles = {
    en: 'Services',
    ar: 'خدماتنا',
  }

  const descriptions = {
    en: 'Discover Rehla Marketing’s full range of services, from marketing strategy and branding to advertising, content creation, analytics, CRM, and custom software development. We deliver creative, data-driven solutions designed to grow your business.',
    ar: 'اكتشف مجموعة خدمات رحلة ماركتنج الكاملة، من استراتيجيات التسويق والعلامة التجارية إلى الإعلانات، وإنشاء المحتوى، والتحليلات، وإدارة علاقات العملاء، وتطوير البرمجيات المخصصة. نقدم حلولًا إبداعية قائمة على البيانات لتنمية أعمالك.',
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
    <div className="">
      <ServicesComp />
    </div>
  )
}

export default page
