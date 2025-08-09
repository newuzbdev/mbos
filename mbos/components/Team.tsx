"use client"
import React, { useState } from 'react';
import { getDictionary } from '@/get-dictionary';
import { SparklesCore } from './ui/sparkles';
import { InfiniteMovingCards2 } from './InfiniteMovingCards2';
import Image from 'next/image';

function TeamImageDialog({
  open,
  onClose,
  image,
  name,
  role,
}: {
  open: boolean;
  onClose: () => void;
  image: string;
  name: string;
  role: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative flex flex-col items-center max-w-[98vw] max-h-[98vh]"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-white hover:text-gray-300 text-3xl font-bold z-10"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <Image
          src={image}
          alt={name}
          width={800}
          height={1000}
          className="rounded-2xl object-contain max-h-[90vh] max-w-[95vw] shadow-2xl"
          priority
        />
        <div className="mt-4 text-center text-white drop-shadow-lg">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-200">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Team({ t }: { t: Awaited<ReturnType<typeof getDictionary>> }) {
  const teamMembers = [
    { name: 'Matyaqubov Akrom', role: 'Texnik', image: '/texnik.jpg' },
    { name: 'Kurbaniyazov Quvandik', role: 'SEO', image: '/team1.jpg' },
    { name: 'Yusupov Mansur', role: 'Raxbar', image: '/team1boss.png' },
    { name: 'Ochilov Jaxongirmirzo', role: 'Frontend dasturchi', image: '/team1frme.jpg' },
    { name: 'Madrimov Xudoshukur', role: 'Team Lead', image: '/team1fr.jpg' },
    { name: 'Xaitboev Jamoladdin', role: 'UX UI designer', image: '/team1designer.jpg' },
    { name: 'Allabergenov Dilmurod', role: 'PM', image: '/team1pm.jpg' },
    { name: 'Otanazarov Otabek', role: 'Backend dasturchi', image: '/team2back.jpg' },
    { name: 'Jumaniyazov Alibek', role: 'Frontend dasturchi', image: '/team2fr.jpg' },
    { name: 'Sultonov Zerifboy', role: 'Backend dasturchi', image: '/team2bk.jpg' },
  ];

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<{
    image: string;
    name: string;
    role: string;
  } | null>(null);

  // Custom wrapper to intercept image click
  function handleImageClick(member: { image: string; name: string; role: string }) {
    setSelectedMember(member);
    setDialogOpen(true);
  }

  // Custom InfiniteMovingCards2 with clickable images
  function InfiniteMovingCardsWithDialog({
    items,
    ...props
  }: React.ComponentProps<typeof InfiniteMovingCards2>) {
    // Copy of InfiniteMovingCards2, but intercepts image click
    return (
      <div
        className="scroller relative max-w-8xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
      >
        <ul
          className="flex w-max md:w-500 min-w-full shrink-0 gap-5 flex-nowrap py-4 animate-scroll hover:[animation-play-state:paused]"
        >
          {items.map((item, idx) => (
            <li
              className="relative shrink-0 flex items-center flex-col rounded-2xl cursor-pointer group"
              key={idx}
              onClick={() => handleImageClick(item)}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleImageClick(item);
                }
              }}
              aria-label={`Open image of ${item.name}`}
            >
              <Image
                src={item.image}
                alt={`Image ${idx}`}
                width={300}
                height={400}
                className="rounded-3xl h-[400px] w-[300px] object-cover group-hover:scale-105 transition-transform"
              />
              <h3>{item.name}</h3>
              <p>{item.role}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section id="team" className="flex flex-col items-center gap-10">
      <div className="mbos-button">{t.team}</div>
      <h1 className="uppercase text-3xl md:text-5xl font-bold">
        {t.our} <span className="text-mbosLinear">{t.team2}</span>
      </h1>
      <div className="w-screen flex flex-col items-center  overflow-x-clip relative">
        <div className="w-full md:w-[40rem] h-20 relative -mt-11">
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
      <div className="w-screen overflow-clip -my-4">
        <InfiniteMovingCardsWithDialog items={teamMembers} speed="slow" />
      </div>
      <TeamImageDialog
        open={dialogOpen && !!selectedMember}
        onClose={() => setDialogOpen(false)}
        image={selectedMember?.image || ''}
        name={selectedMember?.name || ''}
        role={selectedMember?.role || ''}
      />
    </section>
  );
}
