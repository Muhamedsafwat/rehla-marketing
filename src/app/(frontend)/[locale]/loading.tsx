'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loading() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 overflow-hidden bg-black z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full">
            <motion.img
              src="/Logo/Logo.png"
              alt="Logo"
              className="object-contain w-40 mb-10 z-10"
              initial={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 2 }}
            />

            <motion.p
              className="italic text-white text-5xl text-center px-4 animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
              }}
            >
              Rehla Marketing
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
