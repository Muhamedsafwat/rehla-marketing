'use client'
import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Grid, Pagination } from 'swiper/modules'
import 'swiper/css/grid'
import 'swiper/css'
import 'swiper/css/pagination'
import Link from 'next/link'

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const imageVariant = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const textRtlVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const textLtrVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const WorkMobile = ({ featured, work, locale }) => {
  const paginationRef = useRef(null)
  const [swiperReady, setSwiperReady] = useState(false)
  useEffect(() => {
    setSwiperReady(true)
  }, [])

  return (
    <div className="lg:hidden relative flex text-white flex-col min-h-screen max-w-6xl mx-auto p-4 overflow-hidden">
      <motion.img
        src="/WorkBg/works_mobile.png"
        alt="mobile bg"
        variants={imageVariant}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 w-full h-[80vh] object-cover -z-10"
      />

      <div className="flex uppercase font-medium text-xl flex-row gap-2 items-center justify-center">
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={textLtrVariant}
          viewport={{ once: false, amount: 0.3 }}
        >
          Work That
        </motion.p>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={textLtrVariant}
          className="italic "
          viewport={{ once: false, amount: 0.3 }}
        >
          Works
        </motion.p>
      </div>

      <motion.p
        initial="hidden"
        whileInView="visible"
        variants={textRtlVariant}
        className="text-center mt-3 italic text-xl"
      >
        {featured}
      </motion.p>

      <motion.div
        className="flex flex-col justify-center mt-16 pb-20"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {swiperReady && (
          <Swiper
            modules={[Grid, Pagination]}
            pagination={{
              clickable: true,
              el: paginationRef.current,
            }}
            spaceBetween={16}
            slidesPerView={2}
            grid={{ rows: 2, fill: 'row' }}
            breakpoints={{
              640: { slidesPerView: 2, grid: { rows: 2 }, spaceBetween: 16 },
              768: { slidesPerView: 4, grid: { rows: 2 }, spaceBetween: 16 },
            }}
            onSwiper={(swiper) => {
              if (paginationRef.current) {
                swiper.params.pagination.el = paginationRef.current
                swiper.pagination.init()
                swiper.pagination.render()
                swiper.pagination.update()
              }
            }}
            className="w-full mb-8"
          >
            {work.map((w, i) => (
              <SwiperSlide key={i}>
                <Link href={`/${locale}/works/${w.id}`} className="block w-full">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={cardVariant}
                    className="flex flex-col justify-center items-center gap-3"
                    viewport={{ once: false }}
                  >
                    <div className="relative w-32 sm:w-36 h-32 sm:h-36 rounded-md overflow-hidden shadow-md">
                      <img
                        alt={w.Name}
                        src={w.image?.url}
                        className={`w-full h-full ${locale === 'en' ? 'clibPath' : 'clipPathAr'} object-cover`}
                      />
                    </div>
                    <p className="text-center mb-4 text-white text-xs sm:text-sm leading-snug font-medium  uppercase line-clamp-2 w-32 sm:w-36">
                      {locale === 'ar' ? w.ClientNameAr : w.ClientName}
                    </p>
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div
          ref={paginationRef}
          className="custom-pagination flex justify-center items-end  gap-1"
        />
      </motion.div>
    </div>
  )
}

export default WorkMobile
