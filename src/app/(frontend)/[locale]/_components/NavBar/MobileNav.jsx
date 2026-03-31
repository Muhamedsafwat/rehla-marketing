'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

const MobileNav = ({ locale, navLinks, menuOpen, setMenuOpen, switchPath, otherLocale, t }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeLink, setActiveLink] = useState(null)

  const isRTL = locale === 'ar'

  useEffect(() => {
    if (menuOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [menuOpen])

  const handleClick = (href) => {
    setActiveLink(href)
    setMenuOpen(false)
  }

  return (
    <div className="md:hidden fixed text-white z-10 w-full" dir={isRTL ? 'rtl' : 'ltr'}>
      <div
        className={`flex justify-between items-center p-4 ${isRTL ? 'text-right' : 'text-left'}`}
      >
        <button
          className="focus:outline-none text-gray-700"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <FaBars className="w-6 h-6" />
        </button>
        <Link href={`/${locale}`} className="text-2xl font-medium text-gray-900 tracking-[0.02em]">
          <div className="flex flex-row items-center">
            <img src="/Logo/Logo.png" className="object-contain w-10" />
            <p className="text-white font-medium">{locale === 'en' ? 'Rehla' : 'رحلة'}</p>
          </div>
        </Link>
        <div className="w-6 h-6"></div>
      </div>

      <div
        className={`fixed inset-0 z-[9999] ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            menuOpen ? 'opacity-70' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-full 
        bg-bgSec z-[9999]  flex flex-col items-start gap-8 p-6
        transition-all duration-300 ease-in-out transform
        ${menuOpen ? 'translate-x-0 opacity-100' : isRTL ? 'translate-x-full' : '-translate-x-full'} opacity-0
        shadow-xl ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <button
            className={`self-start  bg-black rounded-full p-2 mb-4 ${isRTL ? 'mr-auto ml-0' : 'mr-0 ml-auto'}`}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FiX className="w-6 h-6" />
          </button>

          <div className="w-full flex justify-center items-center mb-6">
            <Link href={`/${locale}`}>
              <div className="flex items-center">
                <img src="/Logo/Logo.png" alt="Logo" className="h-12 object-contain" />
                <p className="text-3xl font-medium">{locale === 'en' ? 'REHLA' : 'رحلة'}</p>
              </div>
            </Link>
          </div>

          <nav className={`w-full flex flex-col gap-6 ${isRTL ? 'items-end' : 'items-start'}`}>
            <Link
              href={`/${locale}`}
              className={`font-medium text-2xl tracking-[0.02em] leading-none py-2 w-full ${
                activeLink === `/${locale}` ? 'opacity-40' : ''
              } ${isRTL ? 'text-right' : 'text-left'}`}
              onClick={() => handleClick(`/${locale}`)}
            >
              <div
                className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse justify-end' : 'flex-row justify-start'}`}
              >
                {activeLink === `/${locale}` ? '// ' : '/ '} {t('home')}
              </div>
            </Link>

            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={`/${locale}${link.href}`}
                className={`font-medium text-2xl tracking-[0.02em] leading-none py-2 w-full ${
                  activeLink === `/${locale}${link.href}` ? 'opacity-40' : ''
                } ${isRTL ? 'text-right' : 'text-left'}`}
                onClick={() => handleClick(`/${locale}${link.href}`)}
              >
                <div
                  className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse justify-end' : 'flex-row justify-start'}`}
                >
                  {activeLink === `/${locale}${link.href}` ? '// ' : '/ '} {link.label}
                </div>
              </Link>
            ))}
          </nav>

          <button
            onClick={() => {
              switchPath()
              setMenuOpen(false)
            }}
            className={`mt-auto w-full py-3 px-4 bg-black rounded-lg font-medium text-white cursor-pointer hover:bg-[#060606] transition-colors text-base tracking-[0.02em]`}
          >
            {t('switch_language') || 'Switch to'} {otherLocale.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileNav
