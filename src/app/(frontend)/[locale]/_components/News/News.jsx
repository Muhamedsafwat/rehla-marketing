'use client'
import React from 'react'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const News = ({ posts }) => {
  const [visibleCount, setVisibleCount] = useState(4)
  const { locale } = useParams()
  const handleToggle = () => {
    if (visibleCount === posts.length) {
      setVisibleCount(4)
    } else {
      setVisibleCount(posts.length)
    }
  }
  return (
    <div className="w-full mx-aut font-medium bg-gradient-to-t from-hover via-hover/20 to-transparent px-6 sm:px-10 lg:px-20 py-12 sm:py-16 lg:py-20 relative">
      <div className="max-w-6xl mt-20 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
        {posts.map((p, i) => (
          <Link
            key={p.id}
            href={`/${locale}/article/${p.id}`}
            className={`group flex flex-col lg:flex-row rounded-lg overflow-hidden transition-all duration-700 ease-in-out
          ${i < visibleCount ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="w-full lg:w-1/2 mt-6 lg:mt-0 flex justify-center transition-all duration-300 ease-in-out group-hover:scale-110 lg:block">
              <div className="w-full max-w-[300px] lg:max-w-none aspect-[4/3] overflow-hidden">
                <img src={p.image.url} alt={p.title} className="w-full h-full object-cover mask " />
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-4 lg:p-6 flex flex-col justify-center">
              <span className="uppercase text-[15px] sm:text-[16px] lg:text-[17.25px] font-medium mb-3 text-TextColor">
                {p.type}
              </span>
              <h3 className="text-lg sm:text-xl lg:text-xl text-TextColor italic">
                {locale === 'en' ? p.title : p.titleAr}
              </h3>
              <p className="text-sm text-white/80 mt-2">{locale === 'en' ? p.des : p.desAr}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8 lg:mt-12">
        <button
          onClick={handleToggle}
          className="px-6 py-3 bg-transparent border cursor-pointer text-white hover:text-black font-medium rounded-lg hover:bg-white transition text-sm sm:text-base"
        >
          {visibleCount === posts.length ? 'Show Less' : 'Show More'}
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-transparent pointer-events-none"></div>
    </div>
  )
}

export default News
