'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

import { useParams } from 'next/navigation'
const Footer = () => {
  const t = useTranslations('ServedPlaces')

  const svgVariant = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  const textVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  }
  const { locale } = useParams()
  return (
    <div className="bgRidial w-full py-30 my-10 flex items-center">
      <div className="max-w-6xl mx-auto flex  flex-row items-center justify-center gap-8 md:gap-20 px-4">
        <div className={`${locale === 'ar' ? 'rotate-180' : ''} `}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={svgVariant}
          >
            <ChevronsLeft className="w-12 h-12 text-white" />
          </motion.div>
        </div>
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={textVariant}
            className="text-white text-xl md:text-2xl font-medium mb-2"
          >
            {t('FooterHeaderOne')}
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={textVariant}
            className="text-white text-xl md:text-2xl font-medium flex flex-wrap justify-center"
          >
            {t('FooterHeaderTwo')}
            <span className={locale === 'ar' ? 'mr-2 text-[#841624]' : 'ml-2 text-[#841624]'}>
              {t('Span')}
            </span>
          </motion.p>
        </div>
        <div className={`${locale === 'ar' ? 'rotate-180' : ''} `}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={svgVariant}
          >
            <ChevronsRight className="text-white w-12 h-12 font-medium" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Footer
