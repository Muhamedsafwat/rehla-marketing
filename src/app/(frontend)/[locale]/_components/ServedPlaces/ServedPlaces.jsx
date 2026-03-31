'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import Slider from './Slider'
import Footer from './Footer'
import { MapPin } from 'lucide-react'

const ServedPlaces = ({ sliders }) => {
  const t = useTranslations('ServedPlaces')

  const cities = [
    {
      name: 'cairo',
    },
    {
      name: 'dubai',
    },
    {
      name: 'riyadh',
    },
  ]

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 mt-20 text-TextColor flex flex-col gap-12 lg:gap-20 justify-center">
        <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center gap-6 lg:gap-10 ">
          <p className="text-xl lg:text-2xl font-medium text-center lg:text-left">
            {t('servingEverywhere')}
          </p>

          {cities.map((c) => (
            <div key={c.name} className="flex flex-row gap-2 sm:gap-4 justify-center items-center">
              <MapPin className="w-12 h-12" />

              <p className="text-base sm:text-lg lg:text-4xl transition-all duration-150 hover:italic">
                {t(`cities.${c.name}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        {sliders.map((s) => (
          <Slider key={s.id} reverse={s.reverse} logos={s.logos} />
        ))}
      </div>
      <Footer />
    </>
  )
}

export default ServedPlaces
