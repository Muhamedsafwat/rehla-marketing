'use client'
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

const MobileSwiper = ({ locale, activeData }) => {
  const paginationRef = useRef(null)
  const [swiperReady, setSwiperReady] = useState(false)

  if (!activeData || !activeData.content) return null

  return (
    <div className="lg:hidden mt-10 w-full">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true, el: paginationRef.current }}
        spaceBetween={16}
        slidesPerView={1}
        onSwiper={() => setSwiperReady(true)}
        breakpoints={{ 768: { slidesPerView: 2, spaceBetween: 20 } }}
      >
        {activeData.content.map((w, i) => (
          <SwiperSlide
            key={i}
            className="flex mt-10 flex-col text-TextColor items-center justify-center cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <img
                src={w.image.url}
                alt={`Card ${i}`}
                className={`w-72 ${locale === 'en' ? 'clibPath' : 'clipPathAr'} h-72 object-cover rounded-md`}
              />
              <p className="text-sm md:text-base my-4 text-center">
                {locale === 'ar' ? w.desAr : w.des}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div ref={paginationRef} className="custom-pagination mb-4 flex justify-center"></div>
    </div>
  )
}

export default MobileSwiper
