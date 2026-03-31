import React from 'react'
import WorksComp from './WorksComp'
export async function generateMetadata({ params }) {
  const { locale } = await params

  const titles = {
    en: 'Works',
    ar: 'الاعمال',
  }

  const descriptions = {
    en: 'Explore Rehla Marketing’s portfolio of successful projects in marketing, branding, advertising, and digital solutions. See how our creative strategies and data-driven execution help brands grow and achieve measurable results.',
    ar: 'استعرض أعمال رحلة ماركتنج الناجحة في مجالات التسويق، والعلامة التجارية، والإعلانات، والحلول الرقمية. شاهد كيف تساعد استراتيجياتنا الإبداعية وتنفيذنا القائم على البيانات العلامات التجارية على النمو وتحقيق نتائج ملموسة.',
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
      <WorksComp />
    </div>
  )
}

export default page
