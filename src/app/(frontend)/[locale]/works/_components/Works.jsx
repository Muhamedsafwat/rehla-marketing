'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { IoIosSearch, IoMdGlobe } from 'react-icons/io'
import DropMenue from './DropMenue'
import WorksData from './WorksData'
const Works = ({ works }) => {
  const { locale } = useParams()
  const t = useTranslations('Works')
  const [clicked, setClicked] = useState(true)
  const services = Array.from(
    new Map(
      works
        .filter((work) => work.Name && work.NameAr)
        .map((work) => [work.Name, { title: work.Name, titleAr: work.NameAr }]),
    ).values(),
  )

  const locations = Array.from(
    new Map(
      works.filter((work) => work.locations).map((work) => [work.locations.id, work.locations]),
    ).values(),
  )

  const locationsWithAll = [{ id: 'all', title: 'All', titleAr: 'الكل' }, ...locations]
  const servicesWithAll = [{ id: 'all', title: 'All', titleAr: 'الكل' }, ...services]

  const [selectedLocation, setSelectedLocation] = useState(locationsWithAll[0] || { id: 'all' })
  const [selectedService, setSelectedService] = useState(servicesWithAll[0] || { id: 'all' })
  const [query, setQuery] = useState('')

  const filteredData = works.filter((item) => {
    const searchFields = Object.keys(item)
    const matchesQuery = searchFields.some((field) => {
      const value = item[field]
      if (typeof value !== 'string') return false
      return value.toLowerCase().includes(query.toLowerCase())
    })

    const matchesLocation =
      selectedLocation.id === 'all' || item.locations?.id === selectedLocation.id

    const matchesService = selectedService.id === 'all' || item.Name === selectedService.title

    return matchesQuery && matchesLocation && matchesService
  })

  return (
    <div className="max-w-6xl mx-auto p-4">
      <p className="text-2xl lg:text-4xl my-15 italic text-TextColor">{t('works')}</p>
      <div className="flex flex-col lg:flex-row w-full items-center lg:items-start justify-between  gap-8 lg:gap-0">
        <div className="flex flex-col items-center lg:items-center gap-4 sm:gap-5 lg:gap-5">
          <div className="relative flex items-center w-auto">
            <IoIosSearch className="text-3xl sm:text-4xl lg:text-4xl  text-TextColor cursor-pointer transition-all duration-300" />

            <div
              className={`flex w-40 sm:w-48 lg:w-48 opacity-100'
              } transition-all duration-300 items-center overflow-hidden border-b-2 border-white/60 bg-black/80 backdrop-blur-sm rounded-lg px-2 ml-2`}
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus={clicked}
                placeholder="search"
                className="bg-transparent outline-none text-white w-full placeholder-white/70 py-1"
              />
            </div>
          </div>

          <DropMenue
            title={t('Locations')}
            selected={selectedLocation}
            setSelected={setSelectedLocation}
            data={locationsWithAll}
            Icon={IoMdGlobe}
            locale={locale}
          />
          <DropMenue
            title={t('Services')}
            selected={selectedService}
            setSelected={setSelectedService}
            data={servicesWithAll}
            Icon={IoMdGlobe}
            locale={locale}
          />
        </div>

        <WorksData data={filteredData} locale={locale} />
      </div>
    </div>
  )
}

export default Works
