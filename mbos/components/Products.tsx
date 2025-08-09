import React from 'react';
import Image from 'next/image';
import {Button as MovingButton} from '@/components/ui/moving-border';
import Link from 'next/link';
import {SparklesCore} from '@/components/ui/sparkles';
import {getDictionary} from '@/get-dictionary';

const ProjectCard = ({ 
  image, 
  title, 
  isReversed = false, 
  storeLinks = false 
}: { 
  image: string; 
  title: string | React.ReactNode; 
  isReversed?: boolean; 
  storeLinks?: boolean;
}) => {
  const contentSection = (
    <div className='flex flex-col items-center md:items-start justify-center gap-5 w-full md:w-1/2 h-full p-4'>
      <h3 className='font-bricolage text-center md:text-start text-xl md:text-4xl lg:text-5xl font-medium'>
        {title}
      </h3>
      {storeLinks && (
        <div className='flex items-center flex-wrap justify-center md:justify-start gap-3 mt-2'>
          <Link href='###' className='transition-transform hover:scale-105'>
            <Image src='/googlePlay.svg' width={160} height={50} alt='get it on google play' className='w-auto h-auto' />
          </Link>
          <Link href='###' className='transition-transform hover:scale-105'>
            <Image src='/appStore.svg' width={160} height={50} alt='download on the app store' className='w-auto h-auto' />
          </Link>
        </div>
      )}
    </div>
  );

  const imageSection = (
    <MovingButton 
      duration={4000} 
      containerClassName='w-full md:w-1/2 md:h-96 p-1' 
      className='bg-black border border-gray-400 hover:border-gray-300 transition-all flex flex-col items-center justify-center gap-2 p-3 overflow-hidden group'
    >
      <Image 
        src='/backgroundFooter.png' 
        alt='background' 
        width={1400} 
        height={1400} 
        className='absolute size-[1300px] bg-black object-cover blur-lg -z-10' 
      />
      <Image 
        src={image} 
        alt={typeof title === 'string' ? title : 'Project image'} 
        width={500} 
        height={600} 
        className='object-contain max-h-80 w-auto transition-transform duration-300 group-hover:scale-105' 
      />
    </MovingButton>
  );

  return (
    <div className='w-[calc(100vw-4rem)] h-full md:w-[80vw] md:min-h-[50vh] flex flex-col md:flex-row items-center justify-center gap-4 my-4'>
      <div className='md:hidden w-full flex flex-col items-center justify-center gap-4'>
        {imageSection}
        {contentSection}
      </div>
      
      <div className='hidden md:flex md:flex-row w-full items-center justify-center gap-4'>
        {isReversed ? (
          <>
            {contentSection}
            {imageSection}
          </>
        ) : (
          <>
            {imageSection}
            {contentSection}
          </>
        )}
      </div>
    </div>
  );
};

export default function Products({t}: {t: Awaited<ReturnType<typeof getDictionary>>}) {
  const projects = [
    {
      image: '/project1.svg',
      title: (
        <>
          {t.portfolioh11}
          <br className='hidden md:block'/>
          {t.portfolioh12}
        </>
      ),
      isReversed: false,
      storeLinks: true
    },
    {
      image: '/project2.svg',
      title: t.taskie,
      isReversed: true,
      storeLinks: false
    },
    {
      image: '/project3.svg',
      title: 'MBOS - GPS',
      isReversed: false,
      storeLinks: false
    },
    {
      image: '/project4.svg',
      title: 'Urganch shahar mnazorat',
      isReversed: true,
      storeLinks: false
    }
  ];

  return (
    <section id='projects' className='flex flex-col items-center gap-10 pt-20'>
      <div className='mbos-button'>{t.portfolio}</div>
      <h1 className='text-3xl md:text-5xl uppercase font-bold text-center md:leading-18 leading-10'>
        {t.our} <span className='text-mbosLinear'>{t.projects}</span>
      </h1>
      
      <div className='w-screen flex flex-col items-center overflow-x-clip relative'>
        <div className='w-full md:w-[40rem] h-20 relative md:-mt-14 -mt-12'>
          <div className='absolute inset-x-18 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
          <div className='absolute inset-x-18 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
          <div className='absolute inset-x-18 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />
          <div className='absolute inset-x-18 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />
          <SparklesCore background='transparent' minSize={0.4} maxSize={1} particleDensity={1200} className='w-full h-full' particleColor='#FFFFFF' />
          <div className='absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]'></div>
        </div>
      </div>

      <div className='flex flex-col w-full items-center justify-center gap-8 mb-16'>
        {projects.map((project, index) => (
          <ProjectCard 
            key={index}
            image={project.image}
            title={project.title}
            isReversed={project.isReversed}
            storeLinks={project.storeLinks}
          />
        ))}
      </div>
    </section>
  );
}
