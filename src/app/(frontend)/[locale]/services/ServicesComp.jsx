import React from 'react'
import Services from '../_components/Services/Services'
import GetServices from '@/app/(frontend)/[locale]/_actions/getServices'
const ServicesComp = async () => {
  const backendData = await GetServices()
  return <Services backendData={backendData} />
}

export default ServicesComp
