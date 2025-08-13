import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SparklesCore } from '@/components/ui/sparkles';
import { getDictionary } from '@/get-dictionary';

type ProjectLink = {
  href: string;
  external?: boolean;
};

const ProjectCard = ({
  image,
  title,
  isReversed = false,
  link,
}: {
  image: string;
  title: string | React.ReactNode;
  isReversed?: boolean;
  link: ProjectLink;
}) => {
  // If link is external, set target/rel
  const linkProps =
    link.external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};

  // Mobile: stack image and text vertically, Desktop: use isReversed
  const MobileContent = (
    <div className="md:hidden w-full flex flex-col items-center justify-center gap-4">
      <div className="w-full flex flex-col items-center justify-center gap-2 relative group">
        <div className="w-full md:w-1/2 md:h-96 p-1 border border-gray-400 hover:border-gray-300 transition-all rounded-2xl overflow-hidden group">
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
      </div>
      <div className="flex flex-col items-center justify-center gap-5 w-full h-full p-4">
        <h3 className="font-bricolage text-center text-xl md:text-4xl lg:text-5xl font-medium">
          {title}
        </h3>
      </div>
    </div>
  );

  const DesktopContent = (
    <div className="hidden md:flex md:flex-row w-full items-center justify-center gap-4">
      {isReversed ? (
        <>
          <div className="flex flex-col items-center md:items-start justify-center gap-5 w-full md:w-1/2 h-full p-4">
            <h3 className="font-bricolage text-center md:text-start text-xl md:text-4xl lg:text-5xl font-medium">
              {title}
            </h3>
          </div>
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
        </>
      ) : (
        <>
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
          <div className="flex flex-col items-center md:items-start justify-center gap-5 w-full md:w-1/2 h-full p-4">
            <h3 className="font-bricolage text-center md:text-start text-xl md:text-4xl lg:text-5xl font-medium">
              {title}
            </h3>
          </div>
        </>
      )}
    </div>
  );

  return (
    <Link
      href={link.href}
      {...linkProps}
      className="w-[calc(100vw-4rem)] h-full md:w-[80vw] md:min-h-[50vh] flex flex-col md:flex-row items-center justify-center gap-4 my-4 group cursor-pointer"
      style={{ textDecoration: 'none' }}
    >
      {MobileContent}
      {DesktopContent}
    </Link>
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
      link: {
        href: 'https://play.google.com/store/apps/details?id=io.mbos&hl=ru',
        external: true,
      },
    },
    {
      image: '/project2.svg',
      title: t.taskie,
      isReversed: true,
      link: {
        href: '#contacts',
      },
    },
    {
      image: '/project3.svg',
      title: 'MBOS - GPS',
      isReversed: false,
      link: {
        href: '#contacts',
      },
    },
    {
      image: '/project4.svg',
      title: t.mnazorat,
      isReversed: true,
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
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
}
