'use client'
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import Link from 'next/link'
const ImpArticlesMop = ({ locale, WorkContent }) => {
  const paginationRef = useRef(null)
  const [swiperReady, setSwiperReady] = useState(false)
  if (!WorkContent) return null

  return (
    <>
      <div
        className="lg:hidden mt-20 relative w-full h-screen"
        style={{ backgroundImage: 'url(/HighLight/HighLightOne.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80"></div>

        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: paginationRef.current,
          }}
          onSwiper={() => setSwiperReady(true)}
          className="h-full"
          spaceBetween={16}
          slidesPerView={1}
        >
          {WorkContent.map((w, i) => (
            <SwiperSlide
              key={i}
              className="relative flex flex-col rounded-md overflow-hidden cursor-pointer h-full"
            >
              <Link
                href={`${locale}/article/${w.id}`}
                className="relative z-20 flex flex-col items-center gap-4 p-4 h-full justify-center"
              >
                <img
                  src={w.image.url}
                  alt={`Card image ${i}`}
                  className="imagebg w-full object-contain"
                />
                <h3 className="text-2xl md:text-3xl text-start font-medium uppercase mt-4 mb-4 text-white">
                  {locale === 'ar' ? w.titleAr : w.title}
                </h3>
                <p className="text-lg text-start text-[#ffffff50] font-medium uppercase">
                  {locale === 'ar' ? w.desAr : w.des}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div ref={paginationRef} className="custom-pagination mt-4 flex justify-center"></div>
      </div>
    </>
  )
}

export default ImpArticlesMop
