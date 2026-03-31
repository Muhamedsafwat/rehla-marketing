'use client'
import Link from 'next/link'
import Image from 'next/image'

const DesktopNav = ({ locale, navLinks, switchPath, otherLocale, t }) => {
  return (
    <div
      className={`hidden text-TextColor mt-4 md:flex items-center w-full ${
        locale === 'ar' ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <Link href={`/${locale}`}>
        <div className="flex flex-row gap-0 justify-center items-center">
          <img src="/Logo/Logo.png" alt="Logo" className="object-contain w-20 my-1" />
          <p className="text-2xl font-medium">{locale === 'en' ? 'REHLA' : 'رحلة'}</p>
        </div>
      </Link>

      <div className="flex flex-1 justify-center">
        <div className="flex gap-6 rounded-lg">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={`/${locale}${link.href}`}
              className="hover:italic hover:text-hover transition-all duration-150  group font-medium hover:font-bold text-base"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={switchPath}
            className="font-medium hover:italic cursor-pointer hover:text-hover transition-all duration-300"
          >
            {otherLocale.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DesktopNav
