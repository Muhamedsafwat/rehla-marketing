'use client'
import React, { useState, useRef } from 'react'
import { useParams } from 'next/navigation'

const VerticalHoveredSlider = ({ content, speed = 10000, reversed = false }) => {
  const { locale } = useParams()
  const [isPaused, setIsPaused] = useState(false)
  const sliderRef = useRef(null)

  if (!content || !content.length) return null

  const duplicatedContent = [...content, ...content]
  const animationName = reversed ? 'verticalScrollReversed' : 'verticalScroll'

  return (
    <div
      className="h-full w-full overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={sliderRef}
    >
      <div className="pointer-events-none absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/80 to-transparent z-10 "></div>

      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent z-10 "></div>

      <div
        className="flex flex-col"
        style={{
          animation: `${animationName} ${speed}ms linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
          transition: 'animation-play-state 300ms ease-in-out',
        }}
      >
        {duplicatedContent.map((c, i) => (
          <div
            key={i}
            className={`flex flex-col justify-center ${
              locale === 'en' ? 'items-start' : 'items-center'
            } py-4 h-full flex-shrink-0 px-4`}
          >
            <img
              src={c.image.url}
              alt={c.des}
              className={`w-60 h-50 object-cover rounded-lg mr-6 flex-shrink-0 ${
                locale === 'en' ? 'clibPath' : 'clipPathAr'
              } transition-transform duration-300 hover:scale-105`}
            />
            <p className="text-lg text-white mt-4 font-medium uppercase text-center flex-1">
              {locale === 'en' ? c.des : c.desAr}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VerticalHoveredSlider
