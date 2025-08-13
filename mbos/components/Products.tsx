'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SparklesCore } from '@/components/ui/sparkles';
import { getDictionary } from '@/get-dictionary';

const ProjectCard = ({
  image,
  title,
  isReversed = false,
  storeLinks = false,
  link,
  storeLinksData = [],
}: {
  image: string;
  title: string | React.ReactNode;
  isReversed?: boolean;
  storeLinks?: boolean;
  link: { href: string; external?: boolean };
  storeLinksData?: { href: string; img: string; alt: string }[];
}) => {
  // For navigation on click
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if a store button was clicked
    // (store buttons will stopPropagation)
    if (link.external) {
      window.open(link.href, '_blank', 'noopener,noreferrer');
    } else {
      if (link.href.startsWith('#')) {
        // In-page anchor
        const el = document.querySelector(link.href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = link.href;
        }
      } else {
        window.location.href = link.href;
      }
    }
  };

  const contentSection = (
    <div className="flex flex-col items-center md:items-start justify-center gap-5 w-full md:w-1/2 h-full p-4 z-10">
      <h3 className="font-bricolage text-center md:text-start text-xl md:text-4xl lg:text-5xl font-medium">
        {title}
      </h3>
      {storeLinks && (
        <div className="flex items-center flex-wrap justify-center md:justify-start gap-3 mt-2 z-20">
          {storeLinksData.map((btn, idx) => (
            <a
              key={btn.img + idx}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
              tabIndex={0}
              onClick={e => e.stopPropagation()}
              onMouseDown={e => e.stopPropagation()}
            >
              <Image
                src={btn.img}
                width={160}
                height={50}
                alt={btn.alt}
                className="w-auto h-auto"
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );

  const imageSection = (
    <div className="w-full md:w-1/2 md:h-96 p-1 border border-gray-400 hover:border-gray-300 transition-all rounded-2xl overflow-hidden group flex flex-col items-center justify-center gap-2 relative">
      <Image
        src="/backgroundFooter.png"
        alt="background"
        width={100}
        height={200}
        className="absolute w-full h-full bg-black object-cover blur-2xl -z-10"
      />
      <Image
        src={image}
        alt={typeof title === 'string' ? title : 'Project image'}
        width={500}
        height={600}
        className="object-contain max-h-80 w-auto transition-transform duration-300 group-hover:scale-105 relative z-10"
      />
    </div>
  );

  return (
    <div
      className="w-[calc(100vw-4rem)] h-full md:w-[80vw] md:min-h-[50vh] flex flex-col md:flex-row items-center justify-center gap-4 my-4 group cursor-pointer"
      tabIndex={0}
      role="button"
      style={{ outline: 'none' }}
      onClick={handleCardClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick(e as any);
        }
      }}
    >
      <div className="md:hidden w-full flex flex-col items-center justify-center gap-4">
        {imageSection}
        {contentSection}
      </div>
      <div className="hidden md:flex md:flex-row w-full items-center justify-center gap-4">
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

export default function Products({ t }: { t: Awaited<ReturnType<typeof getDictionary>> }) {
  const projects = [
    {
      image: '/project1.svg',
      title: (
        <>
          {t.portfolioh11}
          <br className="hidden md:block" />
          {t.portfolioh12}
        </>
      ),
      isReversed: false,
      storeLinks: true,
      link: {
        href: 'https://play.google.com/store/apps/details?id=io.mbos&hl=ru',
        external: true,
      },
      storeLinksData: [
        {
          href: 'https://play.google.com/store/apps/details?id=io.mbos&hl=ru',
          img: '/googlePlay.svg',
          alt: 'get it on google play',
        },
        {
          href: 'https://apps.apple.com/uz/app/mbos/id6448788562',
          img: '/appStore.svg',
          alt: 'download on the app store',
        },
      ],
    },
    {
      image: '/project2.svg',
      title: t.taskie,
      isReversed: true,
      storeLinks: false,
      link: {
        href: '#contacts',
      },
    },
    {
      image: '/project3.svg',
      title: 'MBOS - GPS',
      isReversed: false,
      storeLinks: false,
      link: {
        href: '#contacts',
      },
    },
    {
      image: '/project4.svg',
      title: t.mnazorat,
      isReversed: true,
      storeLinks: false,
      link: {
        href: 'https://online.mbos.uz',
        external: true,
      },
    },
  ];

  return (
    <section id="projects" className="flex flex-col items-center gap-10 pt-20">
      <div className="mbos-button">{t.portfolio}</div>
      <h1 className="text-3xl md:text-5xl uppercase font-bold text-center md:leading-18 leading-10">
        {t.our} <span className="text-mbosLinear">{t.projects}</span>
      </h1>

      <div className="w-screen flex flex-col items-center overflow-x-clip relative">
        <div className="w-full md:w-[40rem] h-20 relative md:-mt-14 -mt-12">
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

      <div className="flex flex-col w-full items-center justify-center gap-8 mb-16">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            image={project.image}
            title={project.title}
            isReversed={project.isReversed}
            storeLinks={project.storeLinks}
            link={project.link}
            storeLinksData={project.storeLinksData}
          />
        ))}
      </div>
    </section>
  );
}
