'use client'
import React, { useState, useEffect } from 'react'
import Slider from 'react-infinite-logo-slider'
import { useParams } from 'next/navigation'
const LogoSlider = ({ reverse = false, logos }) => {
  const [slideWidth, setSlideWidth] = useState(200)
  const [mounted, setMounted] = useState(false)
  const { locale } = useParams()
  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 480) setSlideWidth(150)
      else if (window.innerWidth < 768) setSlideWidth(180)
      else if (window.innerWidth < 1024) setSlideWidth(220)
      else setSlideWidth(250)
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    setMounted(true)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const repeatedLogos = [...logos, ...logos, ...logos, ...logos]
  if (!mounted) return null

  return (
    <div
      className="mt-8 md:mt-10 w-full overflow-hidden relative z-0"
      style={{
        ...(reverse ? { transform: 'scaleX(-1)' } : {}),
        ...(locale === 'ar' ? { direction: 'ltr' } : {}),
      }}
    >
      <Slider
        blurBorders={true}
        blurBorderColor={'#000000'}
        blurBorderSize={50}
        width={`${slideWidth}px`}
        duration={150}
        pauseOnHover
      >
        {repeatedLogos.map((src, idx) => (
          <Slider.Slide
            className="px-6"
            key={idx}
            style={reverse ? { transform: 'scaleX(-1)' } : {}}
          >
            <img src={src.image.url} alt={`Logo ${idx}`} className="h-10 object-contain" />
          </Slider.Slide>
        ))}
      </Slider>
    </div>
  )
}

export default LogoSlider
