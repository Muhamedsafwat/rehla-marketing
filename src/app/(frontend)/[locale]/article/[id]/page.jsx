import React, { cache } from 'react'
import Article from '../_components/Article'
import GetArticlesById from '../../_actions/GetArticlesById'

const getCachedArticle = cache(async (id) => {
  return await GetArticlesById(id)
})

export async function generateMetadata({ params }) {
  const { locale, id } = await params

  const data = await getCachedArticle(id)

  const title = locale === 'ar' ? data?.titleAr : data?.title
  const description = locale === 'ar' ? data?.PostDesAr : data?.PostDes

  const keywords = data?.keyword
    ? Array.isArray(data.keyword)
      ? data.keyword.map((k) => k.value).join(', ')
      : data.keyword
    : locale === 'ar'
      ? 'رحلة ماركتنج, تسويق رقمي, إعلانات, محتوى, تطوير مواقع'
      : 'Rehla Marketing, digital marketing, advertising, content, web development'
  return {
    title,
    description,
    other: {
      keywords,
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: data?.image?.url || '/icon.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [data?.image?.url],
    },
  }
}

const Page = async ({ params }) => {
  await new Promise((resolve) => setTimeout(resolve, 4000))

  const { id } = await params
  const data = await getCachedArticle(id)

  return (
    <div>
      <Article data={data} />
    </div>
  )
}

export default Page
