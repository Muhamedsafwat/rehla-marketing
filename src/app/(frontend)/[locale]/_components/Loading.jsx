'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const textVariants = {
  hiddenRight: { x: '50%', opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitLeft: { x: '-50%', opacity: 0 },
  hiddenLeft: { x: '-50%', opacity: 0 },
  exitRight: { x: '50%', opacity: 0 },
}

export default function Loading() {
  const [step, setStep] = useState(1)

  useEffect(() => {
    let isMounted = true

    const startAnimationCycle = async () => {
      while (isMounted) {
        await new Promise((resolve) => setTimeout(resolve, 3000))

        if (!isMounted) break

        setStep((prev) => (prev === 1 ? 2 : 1))

        await new Promise((resolve) => setTimeout(resolve, 4000))
      }
    }

    startAnimationCycle()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="fixed inset-0 max-w-6xl bg-black z-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full relative">
        <motion.img
          src="/Logo/Logo.png"
          alt="Logo"
          className="object-contain w-40 mb-10 z-10"
          initial={{ opacity: 1, scale: 1.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          loading="eager"
        />

        <div className="w-full flex items-center justify-center z-10">
          <div className="relative max-w-6xl w-full h-20 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.p
                  key="text1"
                  className="italic text-white text-5xl text-center px-4"
                  variants={textVariants}
                  initial="hiddenRight"
                  animate="center"
                  exit="exitLeft"
                  transition={{
                    duration: 3,
                    ease: 'easeInOut',
                  }}
                >
                  Rehla Marketing
                </motion.p>
              ) : (
                <motion.p
                  key="text2"
                  className="italic text-white text-5xl text-center px-4"
                  variants={textVariants}
                  initial="hiddenLeft"
                  animate="center"
                  exit="exitRight"
                  transition={{
                    duration: 3,
                    ease: 'easeInOut',
                  }}
                >
                  From Vision To Voice
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
