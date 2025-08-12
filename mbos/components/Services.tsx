import { Globe, Store, Atom, Smartphone, PenTool, MapPin, ShieldCheck } from 'lucide-react'
import React from 'react'
import { Button as MovingButton } from "@/components/ui/moving-border"
import Image from 'next/image'
import { SparklesCore } from './ui/sparkles'
import { getDictionary } from '@/get-dictionary'

// Make ServiceCard taller and a bit wider for long descriptions
const ServiceCard = ({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => (
  <MovingButton 
    duration={4000} 
    containerClassName='md:w-80 w-full h-auto md:h-80 p-px m-1' // wider and taller
    className='border border-gray-400 flex flex-col items-start p-6 justify-start gap-4 bg-black min-h-[320px] md:min-h-[320px]' // more padding, min height
  >
   <Image
      src='/backgroundFooter.png'
      alt='background'
      width={100}
      height={200}
      className='absolute w-full h-full bg-black object-cover blur-2xl -z-10'
    />
    <h3 className='text-center mb-2 text-2xl font-semibold text-mbosColor2'>{icon} {title}</h3>
    <p className='text-[16px]/[24px] font-light px-2 break-words'>{description}</p>
  </MovingButton>
);

export default function Services({ t }: { t: Awaited<ReturnType<typeof getDictionary>> }) {
  const services = [
    {
      icon: <Globe className='text-white inline-block' size={30} />,
      title: t.webSites,
      description: t.aboutWebSites
    },
    {
      icon: <Store className='text-white inline-block' size={25} />,
      title: t.onlineStore,
      description: t.aboutOnlineStore
    },
    {
      icon: <Atom className='text-white inline-block' size={25} />,
      title: t.crm,
      description: t.aboutCRM
    },
    {
      icon: <Image className='text-white inline-block' alt='CouncelingIcon' src='/councelingIcon.png' width={30} height={30} />,
      title: t.itCounseling,
      description: t.aboutItCounseling
    },
    {
      icon: <Smartphone className='text-white inline-block' size={25} />,
      title: t.mobileApp,
      description: t.aboutMobileApp
    },
    {
      icon: <PenTool className='-rotate-90 inline-block text-white' size={25}/>,
      title: t.UXUI,
      description: t.aboutUXUI
    },
    // GPS Tracking Card
    {
      icon: <MapPin className='text-white inline-block' size={25} />,
      title: t.GPS,
      description: t.aboutGPS
    },
    // Access Control Card
    {
      icon: <ShieldCheck className='text-white inline-block' size={25} />,
      title: t.accessControl,
      description: t.aboutAccessControl
    }
  ];

  return (
    <section id='services' className='flex flex-col items-center gap-10 pt-5 md:pt-20'>
      <div className='mbos-button'>{t.services}</div>
      <h1 className='text-2xl md:text-5xl font-bold text-center md:leading-18 uppercase leading-10'>
        {t.our} <span className='text-mbosLinear'>{t.service}</span>
      </h1>
      <div className='w-screen flex flex-col items-center overflow-x-clip relative'>
        <div className='w-full md:w-[40rem] h-20 relative -mt-12'>
          <div className='absolute inset-x-18 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
          <div className='absolute inset-x-18 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
          <div className='absolute inset-x-18 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />
          <div className='absolute inset-x-18 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />
          <SparklesCore background='transparent' minSize={0.4} maxSize={1} particleDensity={1200} className='w-full h-full' particleColor='#FFFFFF' />
          <div className='absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]'></div>
        </div>
      </div>
      <div className='flex flex-wrap flex-row items-center justify-center gap-4 w-[calc(100vw-5rem)]'>
        {services.map((service, index) => (
          <ServiceCard 
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  )
}
