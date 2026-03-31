'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import Form from './Form'
import { useParams } from 'next/navigation'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
const Contact = () => {
  const { locale } = useParams()
  const t = useTranslations('Contact')
  const form = t.raw('form')
  const buttons = t.raw('Buttons')
  const markets = t.raw('markets')
  const m = t('yourMessage')
  const s = t('selectMarket')
  return (
    <div className="relative w-full p-4 overflow-hidden text-white">
      <img
        src="/Contact/bg.png"
        className="absolute inset-0 w-full h-full object-cover "
        alt="background"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-hover via-black/40 to-black/40 backdrop-blur-md"></div>

      <div className="relative  flex flex-col max-w-6xl mx-auto text-center items-center justify-center h-full">
        <div className="flex flex-row mt-10 ">
          <div className={`${locale === 'ar' ? 'scale-x-[-1]' : ''}`}>
            <ChevronsLeft className="w-12 h-12" />
          </div>
          <p className="p-4 font-medium text-2xl lg:text-4xl leading-[40px] text-white max-md:text-base">
            {t('title')}
          </p>
          <div
            className={`flex-shrink-0 self-end ${locale === 'ar' ? 'scale-x-[1]' : 'scale-x-[-1]'}`}
          >
            <ChevronsLeft className="w-12 h-12" />
          </div>
        </div>
        <p className="p-4 font-medium text-xl lg:text-2xl leading-[40px] text-white max-md:text-base">
          {t('description')}
        </p>
        <Form
          form={form}
          locale={locale}
          buttons={buttons}
          market={markets}
          submit={t('submit')}
          m={m}
          s={s}
        />
      </div>
    </div>
  )
}

export default Contact
