import React from 'react'
import { MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'

const Work = ({ work, locale }) => {
  const t = useTranslations('WorkDetails')
  const isArabic = locale === 'ar'
  const textAlign = isArabic ? 'text-right' : 'text-left'

  return (
    <div className="bg-project h-full pb-[50px] xl:pb-[100px] relative text-TextColor">
      <div className="max-w-6xl mx-auto px-4 h-full flex justify-center items-center text-center">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row justify-between gap-6 mt-30">
            <div
              className={`flex flex-col justify-center gap-4 border-white/20 p-6 lg:w-1/2 ${isArabic ? 'border-r-4' : 'border-l-4'}`}
            >
              <p className={`${textAlign} text-[#6A6A6A] text-xs md:text-lg font-medium uppercase`}>
                {t('client')}
              </p>
              <p className={`text-xl md:text-3xl ${textAlign} font-semibold`}>
                {locale === 'en' ? work.ClientName : work.ClientNameAr}
              </p>

              <p className={`${textAlign} text-[#6A6A6A] text-xs md:text-lg font-medium uppercase`}>
                {t('title')}
              </p>
              <p
                className={`font-medium text-sm md:text-2xl futura uppercase max-w-[350px] text-balance ${textAlign}`}
              >
                {locale === 'en' ? work.Subtitle : work.SubtitleAr}
              </p>

              <p className={`${textAlign} text-[#6A6A6A] text-xs md:text-lg font-medium uppercase`}>
                {t('service')}
              </p>
              <p
                className={`text-xl md:text-3xl border border-white/20 rounded-full px-4 py-2 font-semibold w-fit ${textAlign}`}
              >
                {locale === 'en' ? work.Name : work.NameAr}
              </p>

              <p className={`${textAlign} text-[#6A6A6A] text-xs md:text-lg font-medium uppercase`}>
                {t('location')}
              </p>
              <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <MapPin className="text-white/70 w-4 h-4 lg:w-5 lg:h-5" />
                <p className="text-TextColor text-sm md:text-lg leading-relaxed">
                  {locale === 'en' ? work.locations.title : work.locations.titleAr}
                </p>
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <img
                src={work.image?.url}
                alt={work.image?.alt || 'Work Image'}
                className="w-full h-full object-cover imagebg rounded-xl max-h-[500px]"
              />
            </div>
          </div>

          <div className={`flex items-center ${textAlign}`}>
            <p className="mt-8 md:my-10 text-sm md:text-base text-center leading-relaxed text-white/80">
              {locale === 'en' ? work.LongDes : work.LongDesAr}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Work
