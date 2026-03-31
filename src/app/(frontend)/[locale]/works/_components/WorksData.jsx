import React from 'react'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

const WorksData = ({ data, locale }) => {
  return (
    <div className="relative w-full">
      <div className="fixed mr-10 lg:mr-0 top-0 right-0 w-[80%] h-full pointer-events-none z-0 bg-[url('/WorkBg/projects.png')] bg-cover bg-repeat-y bg-center"></div>

      <div className="relative grid grid-cols-1 gap-2 p-6 md:p-8 sm:p-4">
        {data.map((item, i) => (
          <Link
            href={`/${locale}/works/${item.id}`}
            key={item.id}
            className={`flex w-full flex-row items-center gap-8 mb-4
          ${i % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}
        `}
          >
            <img
              src={item.image?.url}
              alt={item.Name}
              className={`w-[150px] h-[150px] md:w-[400px] md:h-[300px] sm:w-[300px] sm:h-[250px] object-fill rounded-lg flex-shrink-0 ${
                locale === 'en' ? 'clibPath' : 'clipPathAr'
              }`}
            />

            <div
              className={`flex flex-col max-w-lg md:max-w-md sm:max-w-full ${locale === 'en' ? 'text-left ' : 'text-right'} gap-2`}
            >
              <h3 className="text-white text-sm lg:text-lg md:text-lg font-medium">
                {locale === 'ar' ? item.NameAr : item.Name}
              </h3>
              <p className="text-white/70 text-sm md:text-sm sm:text-xs lg:text-lg leading-relaxed">
                {locale === 'ar' ? item.SubtitleAr : item.Subtitle}
              </p>
              <h3 className="text-white text-sm lg:text-lg md:text-lg font-medium">
                {locale === 'en' ? item.ClientName : item.ClientNameAr}
              </h3>
              <div className="flex items-center gap-2">
                <MapPin className="text-white/70 w-4 h-4 lg:w-5 lg:h-5" />
                <p className="text-white/70 text-sm sm:text-xs md:text-sm lg:text-lg leading-relaxed">
                  {locale === 'en' ? item.locations.title : item.locations.titleAr}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default WorksData
