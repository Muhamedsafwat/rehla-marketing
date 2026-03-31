'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

const NavBar = () => {
  const { locale } = useParams()
  const t = useTranslations('nav')
  const otherLocale = locale === 'en' ? 'ar' : 'en'
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { id: 4, href: '/services', label: t('services') },
    { id: 5, href: '/about', label: t('about') },
    { id: 3, href: '/works', label: t('works') },
  ]

  const switchPath = () => {
    const newPath = window.location.pathname.replace(`/${locale}`, `/${otherLocale}`)
    window.location.href = newPath
  }

  return (
    <nav className="max-w-7xl mx-auto uppercase relative sm:px-6 text-white z-10">
      <DesktopNav
        locale={locale}
        navLinks={navLinks}
        switchPath={switchPath}
        otherLocale={otherLocale}
        t={t}
      />
      <MobileNav
        locale={locale}
        navLinks={navLinks}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        switchPath={switchPath}
        otherLocale={otherLocale}
        t={t}
      />
    </nav>
  )
}

export default NavBar
