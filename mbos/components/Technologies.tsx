'use client'
import React, { useRef } from 'react'
import { getDictionary } from '@/get-dictionary'
import { SparklesCore } from './ui/sparkles'
import { IconCloud } from './magicui/icon-cloud'
import { motion, useInView } from 'framer-motion'

const slugs = [
  'typescript',
  'javascript',
  'dart',
  'java',
  'react',
  'flutter',
  'android',
  'html5',
  'css3',
  'nodedotjs',
  'express',
  'nextdotjs',
  'prisma',
  'amazonaws',
  'postgresql',
  'firebase',
  'nginx',
  'vercel',
  'testinglibrary',
  'jest',
  'cypress',
  'docker',
  'git',
  'jira',
  'github',
  'gitlab',
  'visualstudiocode',
  'androidstudio',
  'sonarqube',
  'figma'
]

const techImages = slugs.map(
  slug => ({
    src: `https://cdn.simpleicons.org/${slug}/${slug}`,
    alt: slug
  })
)

// Vertical carousel for technologies (show at least 4 at a time, not just one)
function VerticalTechCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const itemCount = techImages.length

  React.useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % itemCount)
    }, 1500)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [activeIndex, itemCount])

  // Show 4 at a time, center active (2 above, 2 below)
  const visibleCount = 4
  const getVisible = () => {
    let arr = []
    // For 4, show rel: -1, 0, 1, 2 (centered at 0, 1 below, 2 above)
    // To keep symmetry, let's do -1, 0, 1, 2 (so active is second from top)
    for (let i = -1; i <= 2; i++) {
      let idx = (activeIndex + i + itemCount) % itemCount
      arr.push({ ...techImages[idx], rel: i })
    }
    return arr
  }

  // Adjust vertical spacing for 4 items
  const itemSpacing = 56 // px

  return (
    <div className="relative h-64 w-[320px] md:w-[340px] lg:w-[380px] flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        background: 'linear-gradient(to bottom, #000 0%, transparent 20%, transparent 80%, #000 100%)'
      }} />
      <ul className="relative h-full w-full flex flex-col items-center justify-center">
        {getVisible().map((img, i) => (
          <motion.li
            key={img.alt}
            initial={{ opacity: 0, y: img.rel > 0 ? 40 : -40, scale: 0.8 }}
            animate={{
              opacity: img.rel === 0 ? 1 : 0.7,
              y: img.rel * itemSpacing,
              scale: img.rel === 0 ? 1 : 0.85
            }}
            exit={{ opacity: 0, y: img.rel > 0 ? 40 : -40, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className={`flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2`}
            style={{
              zIndex: 10 - Math.abs(img.rel),
              pointerEvents: img.rel === 0 ? 'auto' : 'none',
              width: 120,
              height: 80,
              top: `calc(50% + ${img.rel * itemSpacing}px)`,
              opacity: img.rel === 0 ? 1 : 0.7,
              filter: img.rel === 0 ? 'none' : 'blur(0.5px)'
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              width={64}
              height={64}
              className={`h-16 w-16 object-contain drop-shadow-lg ${img.rel === 0 ? 'scale-110' : ''}`}
              draggable={false}
              loading="lazy"
            />
            <span className="text-xs text-center mt-1 text-gray-400">{img.alt}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export default function Technologies({
  t
}: {
  t: Awaited<ReturnType<typeof getDictionary>>
}) {
  const images = slugs.map(
    slug => `https://cdn.simpleicons.org/${slug}/${slug}`
  )
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: false, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  }

  return (
    <section
      id='technologies'
      className='flex flex-col items-center min-h-screen mt-6 px-4 md:px-8'
    >
      <motion.div
        className='mbos-button'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t.tech}
      </motion.div>

      <motion.h1
        ref={titleRef}
        className='uppercase my-10 text-3xl text-center md:text-nowrap md:text-5xl font-bold'
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {t.tech2}{' '}
        <span className='text-mbosLinear relative'>
          {t.tech1}
          <motion.span
            className='absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 to-blue-500'
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
        </span>
      </motion.h1>

      <div className='w-screen flex flex-col items-center overflow-x-clip relative'>
        <div className='w-full md:w-[40rem] h-20 relative -mt-11'>
          <div className='absolute inset-x-18 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
          <div className='absolute inset-x-18 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
          <div className='absolute inset-x-18 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />
          <div className='absolute inset-x-18 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />
          <SparklesCore
            background='transparent'
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className='w-full h-full'
            particleColor='#FFFFFF'
          />
          <div className='absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]'></div>
        </div>
      </div>

      <motion.div
        className='flex flex-col md:flex-row justify-around items-center w-full gap-8 md:gap-4 mt-4'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.div
          variants={itemVariants}
          className='w-full md:w-[340px] lg:w-[380px] flex-shrink-0'
        >
          {/* Vertical carousel for technologies */}
          <VerticalTechCarousel />
        </motion.div>
        <motion.div
          variants={itemVariants}
          className='w-full md:w-1/2 lg:w-3/5 scale-75 md:scale-90 lg:scale-100'
          whileHover={{
            scale: [null, 1.05, 1.03],
            transition: { duration: 0.4 }
          }}
        >
          <IconCloud images={images} />
        </motion.div>
      </motion.div>
    </section>
  )
}
