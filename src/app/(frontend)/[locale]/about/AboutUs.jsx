'use client'
import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Who from './_components/Who'
import What from './_components/What'
import Dna from './_components/Dna'
import DnaDes from './_components/DnaDes'

const AboutUs = () => {
  const swiperRef = useRef(null)
  const paginationRef = useRef(null)

  useEffect(() => {
    const swiper = swiperRef.current?.swiper
    if (!swiper) return

    const scrollableSlides = document.querySelectorAll('.scrollable-slide')

    scrollableSlides.forEach((slide) => {
      slide.addEventListener('wheel', (e) => {
        const { scrollTop, scrollHeight, clientHeight } = slide
        const atTop = scrollTop === 0
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1

        if (e.deltaY > 0 && !atBottom) {
          swiper.mousewheel.disable()
        } else if (e.deltaY < 0 && !atTop) {
          swiper.mousewheel.disable()
        } else {
          swiper.mousewheel.enable()
        }
      })
    })
  }, [])

  return (
    <div className="relative h-screen w-full cursor-grab">
      <Swiper
        modules={[Mousewheel, Pagination]}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
        direction="horizontal"
        slidesPerView={1}
        speed={800}
        mousewheel={{ forceToAxis: true }}
        className="h-full w-full"
      >
        <SwiperSlide>
          <Who />
        </SwiperSlide>
        <SwiperSlide>
          <What />
        </SwiperSlide>
        <SwiperSlide>
          <Dna />
        </SwiperSlide>
        <SwiperSlide>
          <div className="scrollable-slide h-full overflow-y-auto">
            <DnaDes />
          </div>
        </SwiperSlide>
      </Swiper>
      <div
        ref={paginationRef}
        className="custom-pagination absolute bottom-6 my-5 inset-x-0 flex justify-center z-1"
      ></div>
    </div>
  )
}
export default AboutUs
