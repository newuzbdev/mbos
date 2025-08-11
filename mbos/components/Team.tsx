"use client"
import React, { useState } from 'react';
import { getDictionary } from '@/get-dictionary';
import { SparklesCore } from './ui/sparkles';
import Image from 'next/image';
import teamRoles from '@/data/team-roles.json';
import { cn } from '@/lib/utils';

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

export default function Team({ 
  t, 
  lang = 'uz' 
}: { 
  t: Awaited<ReturnType<typeof getDictionary>>;
  lang?: string;
}) {
  const teamMembers = [
    { name: 'Matyaqubov Akrom', role: 'technician', image: '/texnik.jpg' },
    { name: 'Kurbaniyazov Quvandik', role: 'seo', image: '/team1.jpg' },
    { name: 'Yusupov Mansur', role: 'manager', image: '/team1boss.png' },
    { name: 'Ochilov Jaxongirmirzo', role: 'frontend_developer', image: '/team1frme.jpg' },
    { name: 'Madrimov Xudoshukur', role: 'team_lead', image: '/team1fr.jpg' },
    { name: 'Xaitboev Jamoladdin', role: 'ux_ui_designer', image: '/team1designer.jpg' },

    { name: 'Allabergenov Dilmurod', role: 'project_manager', image: '/team1pm.jpg' },
    { name: 'Jalol', role: 'team_lead', image: '/team2fr.jpg' },
    { name: 'Muxtor', role:'backend_developer' ,image:'/team1muxtor'},
    { name: 'Otanazarov Otabek', role: 'backend_developer', image: '/team2back.jpg' },
    { name: 'Jumaniyazov Alibek', role: 'frontend_developer', image: '/team2fr.jpg' },
    { name: 'Sultonov Zerifboy', role: 'backend_developer', image: '/team2bk.jpg' },
    { name: 'Shohida', role: 'finance_head', image: '/team1moliya.jpg' },
    { name: 'Dilshod', role: 'b2g_manager', image: '/team1dilshod.jpg' },
    { name: 'Azizbek', role: 'b2b_manager', image: '/team1aziz.jpg' },
    { name: 'Kamron', role: 'backend_developer', image: '/team2designer4.jpg' },
    { name: "Og'obek", role: 'b2c_manager', image: '/team1ogabek.jpg' },
 
  ];

  // Get translated role
  const getTranslatedRole = (role: string) => {
    const langKey = lang as keyof typeof teamRoles;
    return teamRoles[langKey]?.[role as keyof typeof teamRoles[typeof langKey]] || role;
  };

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
    speed = "normal",
    showControls = true,
    ...props
  }: {
    items: { name: string; role: string; image: string; }[];
    speed?: "fast" | "normal" | "slow";
    showControls?: boolean;
  }) {
    const scrollerRef = React.useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [currentTranslate, setCurrentTranslate] = useState(0);

    const getSpeed = () => {
      if (speed === "fast") return "30s";
      if (speed === "normal") return "60s";
      return "120s";
    };

    // Duplicate items for seamless infinite scroll
    const duplicatedItems = [...items, ...items];
    const itemWidth = 320; // Image width (300px) + gap (20px)

    const scrollLeft = () => {
      setIsPaused(true);
      const newTranslate = currentTranslate + itemWidth;
      setCurrentTranslate(newTranslate);
      
      // Resume animation after delay
      setTimeout(() => {
        setCurrentTranslate(0);
        setIsPaused(false);
      }, 2000);
    };

    const scrollRight = () => {
      setIsPaused(true);
      const newTranslate = currentTranslate - itemWidth;
      setCurrentTranslate(newTranslate);
      
      // Resume animation after delay
      setTimeout(() => {
        setCurrentTranslate(0);
        setIsPaused(false);
      }, 2000);
    };

    return (
      <div
        className="relative max-w-8xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
      >
        {/* {showControls && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all backdrop-blur-sm cursor-pointer"
              aria-label="Scroll left (-1 item)"
            >
              <ChevronLeft size={20} className="text-white stroke-white" />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all backdrop-blur-sm cursor-pointer"
              aria-label="Scroll right (+1 item)"
            >
              <ChevronRight size={20} className="text-white stroke-white" />
            </button>
          </>
        )} */}
        <div
          ref={scrollerRef}
          className={cn(
            "flex w-max gap-5 py-4",
            !isPaused && "animate-infinite-scroll",
            "hover:[animation-play-state:paused]"
          )}
          style={{
            "--animation-duration": getSpeed(),
            "--animation-direction": "normal",
            transform: isPaused ? `translateX(${currentTranslate}px)` : undefined,
            transition: isPaused ? 'transform 0.5s ease-out' : undefined,
          } as React.CSSProperties}
        >
          {duplicatedItems.map((item, idx) => (
            <div
              className="relative shrink-0 flex items-center flex-col rounded-2xl cursor-pointer group"
              key={`${item.name}-${idx}`}
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
                alt={item.name}
                width={300}
                height={400}
                className="rounded-3xl h-[400px] w-[300px] object-cover group-hover:scale-105 transition-transform"
              />
              <h3 className="mt-2 text-lg font-semibold text-white">{item.name}</h3>
              <p className="text-gray-300">{getTranslatedRole(item.role)}</p>
            </div>
          ))}
        </div>
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
        <InfiniteMovingCardsWithDialog items={teamMembers} speed="normal" />
      </div>
      <TeamImageDialog
        open={dialogOpen && !!selectedMember}
        onClose={() => setDialogOpen(false)}
        image={selectedMember?.image || ''}
        name={selectedMember?.name || ''}
        role={getTranslatedRole(selectedMember?.role || '')}
      />
    </section>
  );
}
