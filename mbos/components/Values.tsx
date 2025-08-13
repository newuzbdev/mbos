'use client'
import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { SparklesCore } from '@/components/ui/sparkles'
import { getDictionary } from '@/get-dictionary'

const ITEM_HEIGHT = 64 // px, for text size
const ANIMATION_DURATION = 1.8 // seconds, a bit slower for smoother, more relaxed animation
const SLIDE_PAUSE = 1800 // ms, pause between slides

// Helper to detect if language is English or Uzbek
function isCompanyFirst(t: any) {
  // crude check: if t.company is "Company" or "Kompaniya" (add more if needed)
  const company = (t.company || '').toLowerCase()
  return company === 'company' || company === 'kompaniya'
}

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
    }, ANIMATION_DURATION * 1000 + SLIDE_PAUSE)

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

  // Determine order: company first for English/Uzbek, else values first
  const companyFirst = isCompanyFirst(t)

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
      <div className="relative flex flex-col items-center justify-center">
        <div className="h-[7rem] flex items-center justify-center space-x-4 z-10">
          {companyFirst ? (
            <>
              <p className='md:text-5xl font-bold uppercase text-3xl gap-2'>{t.company}</p>
              <h1 className="uppercase text-3xl md:text-5xl font-bold">
                <span className="text-mbosLinear">{t.values}</span>
              </h1>
            </>
          ) : (
            <>
              <h1 className="uppercase text-3xl md:text-5xl font-bold">
                <span className="text-mbosLinear">{t.values}</span>
              </h1>
              <p className='md:text-5xl font-bold uppercase text-3xl gap-2'>{t.company}</p>
            </>
          )}
        </div>
        <div className="w-full md:w-[40rem] h-20 relative -mt-6">
          <div className="absolute inset-x-18 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-18 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-18 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-18 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
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
            exit={{ opacity: 0, y: -40, transition: { duration: ANIMATION_DURATION * 0.8, ease: [0.4, 0.0, 0.2, 1] } }}
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
        {/* Carousel dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center z-20">
          {words.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to value ${idx + 1}`}
              onClick={() => setCurrentIdx(idx)}
              className={`mx-1 w-2.5 h-2.5 rounded-full transition-all duration-300 border border-white/60
                ${currentIdx === idx
                  ? 'bg-white shadow-lg scale-110'
                  : 'bg-white/30 hover:bg-white/60 scale-100'
                }`}
              style={{
                outline: 'none',
                borderWidth: currentIdx === idx ? 2 : 1,
                borderColor: currentIdx === idx ? '#fff' : 'rgba(255,255,255,0.6)',
                cursor: currentIdx === idx ? 'default' : 'pointer',
              }}
              tabIndex={0}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
