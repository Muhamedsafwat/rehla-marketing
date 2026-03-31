'use client'
import Link from 'next/link'
import React, { useState } from 'react'
const ImpArticlesDesktop = ({ locale, WorkContent }) => {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="hidden lg:flex w-full mt-20  relative p-4">
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {WorkContent.map((w, i) => (
          <img
            key={i}
            src={w.HighlightImage?.url}
            alt="Highlight background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              hovered === i ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/100 via-[#010101]/0 to-[#010101]/100"></div>
      </div>

      <div className="relative w-full gap-8 flex max-w-7xl mx-auto">
        <div className="flex flex-col p-2 gap-4 w-auto flex-shrink-0 h-full">
          {WorkContent.map((w, i) => (
            <Link
              href={`${locale}/article/${w.id}`}
              key={i}
              className={`${locale === 'ar' ? 'images-rtl' : 'images'} relative w-[400px] bg-gray-600 hover:bg-bgHover transition duration-300 cursor-pointer flex flex-col`}
              onMouseEnter={() => setHovered(i)}
            >
              <div className="circle absolute top-2 right-2" />
              <h1 className="text-white text-sm font-medium truncate mt-2 p-2">
                {locale === 'ar' ? w.titleAr : w.title}
              </h1>
              <img
                src={w.image.url}
                alt={locale === 'ar' ? w.titleAr : w.title}
                className="w-full object-contain"
              />
            </Link>
          ))}
        </div>

        <div className="flex-1 flex flex-col justify-start p-8 text-white relative overflow-hidden min-h-[60vh]">
          {WorkContent.map((w, i) => (
            <div
              key={i}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out flex flex-col ${
                hovered === i ? 'opacity-100' : 'opacity-0 z-0'
              }`}
            >
              <h3 className="text-4xl font-medium uppercase mt-4 mb-4">
                {locale === 'ar' ? w.titleAr : w.title}
              </h3>
              <p className="text-lg text-[#ffffff50] font-medium uppercase">
                {locale === 'ar' ? w.desAr : w.des}
              </p>

              <div className="flex-1 flex items-center mt-4">
                <img
                  src={w.image.url}
                  className="w-full object-cover max-h-full imagebg"
                  alt="Right side content"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImpArticlesDesktop
