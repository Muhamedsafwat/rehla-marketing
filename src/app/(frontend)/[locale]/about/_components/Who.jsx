'use client'
import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

const Who = () => {
  const t = useTranslations('About')
  const swaps = [t('SwapOne'), t('SwapTwo'), t('SwapThree')]
  const colors = ['#FFBBBB', '#CC4221', '#7272FD']
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const { locale } = useParams()
  useEffect(() => {
    const showDuration = 3000
    const fadeDuration = 1000
    const totalDuration = showDuration + fadeDuration

    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % swaps.length)
        setVisible(true)
      }, fadeDuration)
    }, totalDuration)

    return () => clearInterval(interval)
  }, [swaps.length])

  return (
    <div className="max-w-6xl  mx-auto p-4 md:p-16 flex flex-col overflow-hidden gap-6 md:gap-8 lg:gap-10 mt-20 md:mt-30 h-screen">
      <div className="flex font-medium flex-col sm:flex-row items-center gap-4 md:gap-6 justify-center sm:justify-start">
        <p className="font-medium text-xl md:text-2xl lg:text-3xl xl:text-4xl italic leading-tight md:leading-[105px] text-TextColor text-center sm:text-left">
          {t('who')}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-8 lg:gap-10 w-full text-TextColor">
        <div className="flex flex-row gap-5 items-center">
          <p className="text-lg md:text-xl font-medium lg:text-2xl xl:text-3xl leading-relaxed max-w-full lg:max-w-[400px] xl:max-w-[420px] lg:text-left flex items-center text-center justify-center lg:justify-between">
            <span
              className={`hidden lg:inline-flex font-medium mb-auto ${locale === 'ar' ? 'mr-20' : ''}`}
            ></span>

            <span className="inline-block px-1 lg:px-2">{t('para')}</span>

            <span
              className={`hidden lg:inline-flex mt-auto ${locale === 'ar' ? 'ml-20' : 'mr-20'}`}
            ></span>
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px] md:min-h-[250px] lg:min-h-[300px]">
          <div className="relative h-[80px] md:h-[100px] lg:h-[110px] w-full flex items-center justify-center mb-4 md:mb-6">
            {swaps.map((text, i) => (
              <p
                key={i}
                className={`absolute leading-tight md:leading-[105px] text-lg md:text-xl lg:text-3xl xl:text-5xl 
                  transition-opacity duration-1000 ease-in-out text-center px-4 w-full whitespace-nowrap`}
                style={{
                  color: colors[i],
                  opacity: i === index && visible ? 1 : 0,
                }}
              >
                {text}
              </p>
            ))}
          </div>

          <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-TextColor lg:uppercase leading-relaxed md:leading-[50px] text-center w-full px-4">
            {t('paraTwo')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Who
