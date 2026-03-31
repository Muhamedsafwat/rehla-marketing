import React from 'react'
import { useTranslations } from 'next-intl'
import DnaHeader from './DnaHeader'
const Dna = () => {
  const t = useTranslations('About')

  return (
    <div className="max-w-6xl  mx-auto p-4 md:p-6 flex flex-col text-TextColor overflow-hidden gap-6 md:gap-8 lg:gap-10 mt-20 md:mt-30 min-h-screen">
      <DnaHeader title={t('titleDna')} span={t('span')} />
      <div className="flex flex-row  justify-between gap-10 items-start">
        <p className="ld:max-w-[500px] font-medium max-w-1/2 text-[30px] leading-[50px] max-md:text-base max-md:leading-[25px]">
          {t('paraFour')}
        </p>
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-row items-center gap-5">
            <div className="flex flex-col font-medium justify-start items-start">
              <p className="text-xl lg:text-3xl leading-[32px]  max-md:text-sm max-md:leading-[17px]">
                {t('Entertainment')}
              </p>
              <p className="italic text-xl lg:text-3xl leading-[39px] max-md:text-sm max-md:leading-[20px]">
                {t('spantwo')}
              </p>
              <p className="text-xl lg:text-2xl leading-[32px]  font-medium max-md:text-sm max-md:leading-[17px]">
                {t('three')}
              </p>
            </div>
          </div>
          <div className="flex flex-row font-medium items-center gap-5">
            <div className="flex flex-col ">
              <p className="text-xl lg:text-2xl leading-[32px]  max-md:text-sm">{t('four')}</p>
              <p className="text-xl lg:text-2xl leading-[39px] max-md:text-sm max-md:leading-[20px]">
                {t('five')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dna
