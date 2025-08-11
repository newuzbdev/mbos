'use client'
import { motion } from 'motion/react'
import React from 'react'
import Link from 'next/link'
import { AuroraBackground } from './ui/aurora-background'
import { MoveRight } from 'lucide-react'
import { getDictionary } from '@/get-dictionary'
import { InfiniteMovingCards } from './ui/infinite-moving-cards'
import { Button } from './ui/button'

export default function Home({
  t
}: {
  t: Awaited<ReturnType<typeof getDictionary>>
}) {
  const hamkorlar = [
    {
      src: '/hamkor1.png',
      className: 'size-12 md:size-20',
      width: 75,
      height: 75
    },
    {
      src: '/hamkor2.png',
      className: 'w-[130px] h-[45px] md:h-[74px] md:w-[205px]',
      width: 205,
      height: 74
    },
    {
      src: '/hamkor3.png',
      className: 'size-12 md:size-20',
      width: 75,
      height: 75
    },
    {
      src: '/hamkor4.png',
      className: 'w-[130px] h-[45px] md:h-[70px] md:w-[199px]',
      width: 199,
      height: 70
    },
    {
      src: '/hamkor5.png',
      className: 'size-12 md:size-20',
      width: 75,
      height: 75
    },
     {
      src: '/hamkor6.svg',
      className: 'w-[100px] h-[60px] md:h-[100px] md:w-[175px]',
      width: 175,
      height: 100
    },
     {
      src: '/hamkor7.svg',
      className: 'w-[100px] h-[60px] md:h-[100px] md:w-[175px]',
      width: 175,
      height: 100
    },
      {
      src: '/hikvision.svg',
      className: 'w-[100px] h-[60px] md:h-[100px] md:w-[175px]',
      width: 175,
      height: 100
    },
      {
      src: '/itpark.svg',
      className: 'w-[100px] h-[60px] md:h-[100px] md:w-[175px]',
      width: 175,
      height: 100
    },
       {
      src: '/soliq.svg',
      className: 'w-[100px] h-[60px] md:h-[100px] md:w-[175px]',
      width: 175,
      height: 100
    }
  ]
  return (
    <AuroraBackground
      className='flex flex-col items-center bg-transparent text-white justify-start pt-40 h-auto gap-8'
      id='home'
    >
      <motion.div
        // initial={{ opacity: 0.0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut'
        }}
        className='relative flex flex-col gap-4 items-center justify-center px-4 md:mt-10'
      >
        <h1 className=' text-3xl/[32px]  md:text-[56px]/[64px] font-bold text-center'>
          {t.homeh11} <span className='text-mbosLinear'>{t.homeh1span}</span>{' '}
          <br />
          {t.homeh12}
        </h1>
      </motion.div>
      <p className='text-center text-[18px]/[28px] w-screen md:w-1/2 text-wrap px-2'>
        {t.homep}
      </p>
      <Button
        className='z-10'
        variant='secondary'
        asChild
      >
        <Link href='#projects'>
          {t.homeButton} <MoveRight />
        </Link>
      </Button>
      <h2 className='uppercase font-extralight'>{t.homeh2}</h2>
      <div className='w-screen flex flex-col items-center overflow-clip relative mb-[100px]'>
        <InfiniteMovingCards
          items={hamkorlar}
          direction='right'
          speed='normal'
          className=''
        />
      </div>
    </AuroraBackground>
  )
}
