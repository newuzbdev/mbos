'use client'
import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { TextHoverEffect } from '@/components/ui/text-hover-effect'
import { getDictionary } from '@/get-dictionary'

const ITEM_HEIGHT = 64 // px, for text size
const ANIMATION_DURATION = 1.2 // seconds, a bit faster for smoothness

export default function Values({
  t
}: {
  t: Awaited<ReturnType<typeof getDictionary>>
}) {
  // The original values
  const words = [t.valueAbout4, t.valueAbout1, t.valueAbout2, t.valueAbout3]

  const [currentIdx, setCurrentIdx] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Smooth infinite vertical carousel using AnimatePresence and motion
  useEffect(() => {
    if (!isVisible) return

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % words.length)
    }, ANIMATION_DURATION * 1000 + 1200) // 1.2s pause between slides

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isVisible, words.length])

  // Hide carousel when it reaches the top of the viewport
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setIsVisible(rect.bottom > 0 && rect.top < window.innerHeight)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className='mt-20 w-[calc(100vw-10px)] -mb-20'
      ref={containerRef}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s'
      }}
    >
      <div className="h-[7rem] flex items-center justify-center">
         <h1 className="uppercase text-3xl md:text-5xl font-bold">
                 <span className="text-mbosLinear">{t.values}</span>
            </h1>
      </div>
      <div
        className="relative w-full flex flex-col items-center justify-center min-h-[180px] overflow-hidden"
        style={{
          height: `${ITEM_HEIGHT}px`,
        }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIdx}
            className="w-full flex items-center justify-center absolute"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { duration: ANIMATION_DURATION, ease: [0.4, 0.0, 0.2, 1] } }}
            exit={{ opacity: 0, y: -40, transition: { duration: ANIMATION_DURATION * 0.7, ease: [0.4, 0.0, 0.2, 1] } }}
            style={{
              height: `${ITEM_HEIGHT}px`,
              minHeight: `${ITEM_HEIGHT}px`,
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              willChange: 'transform, opacity'
            }}
          >
            <span
              className="text-white font-bold text-xl md:text-3xl text-center leading-tight tracking-tight drop-shadow-lg px-2"
              style={{
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                textShadow: '0 2px 24px rgba(0,0,0,0.18)'
              }}
            >
              {words[currentIdx]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
