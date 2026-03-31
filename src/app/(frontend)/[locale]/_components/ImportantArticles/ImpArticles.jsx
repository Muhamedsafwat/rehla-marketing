'use client'
import React from 'react'
import ImpArticlesDesktop from './ImpArticlesDesktop'
import ImpArticlesMop from './ImpArticlesMop'
import { useParams } from 'next/navigation'
const ImpArticles = ({ posts }) => {
  const { locale } = useParams()
  const WorkContent = posts?.filter((post) => post.isImportant === true)
  return (
    <div>
      <ImpArticlesDesktop WorkContent={WorkContent} locale={locale} />
      <ImpArticlesMop WorkContent={WorkContent} locale={locale} />
    </div>
  )
}

export default ImpArticles
