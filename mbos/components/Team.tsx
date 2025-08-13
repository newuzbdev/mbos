"use client"
import React, { useState } from 'react';
import { getDictionary } from '@/get-dictionary';
import { SparklesCore } from './ui/sparkles';
import Image from 'next/image';
import teamRoles from '@/data/team-roles.json';
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        { name: 'Matkarimov Kamron', role: 'backend_developer', image: '/team1kamron.jpg' },
        { name: 'Saxobutdinov Dilshod', role: 'b2g_manager', image: '/team1dilshod.jpg' },

        { name: 'Yusupov Mansur', role: 'manager', image: '/team1boss.png' },
        { name: 'Kurbaniyazov Quvandik', role: 'seo', image: '/team1.jpg' },
        { name: 'Allabergenov Dilmurod', role: 'project_manager', image: '/team1pm.jpg' },
        { name: 'Radjabboyeva Shohida', role: 'finance_head', image: '/team1moliya.jpg' },
        { name: 'Madrimov Xudoshukur', role: 'team_lead', image: '/team1fr.jpg' },
        { name: 'Saparboyev Muxtor', role: 'backend_developer', image: '/team1muxtor.jpg' },
        { name: 'Ochilov Jaxongirmirzo', role: 'frontend_developer', image: '/team1frme.jpg' },
        { name: 'Xaitboev Jamoladdin', role: 'ux_ui_designer', image: '/team1designer.jpg' },
        { name: 'Matyaqubov Akrom', role: 'technician', image: '/texnik.jpg' },

        // { name: 'Jalol', role: 'team_lead', image: '/team2fr.jpg' },
        { name: 'Otanazarov Otabek', role: 'backend_developer', image: '/team2back.jpg' },
        { name: 'Sultonov Zerifboy', role: 'backend_developer', image: '/team2bk.jpg' },

        { name: 'Jumaniyazov Alibek', role: 'frontend_developer', image: '/team2fr.jpg' },
        { name: 'Abudllayev Azizbek', role: 'b2b_manager', image: '/team1aziz.jpg' },
        { name: "Matqurbanov Og'abek", role: 'b2c_manager', image: '/team1-ogabek.jpg' },
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

    // Responsive InfiniteMovingCardsWithDialog
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
        // Responsive: use window width to determine layout
        const [windowWidth, setWindowWidth] = React.useState<number | undefined>(undefined);

        React.useEffect(() => {
            function handleResize() {
                setWindowWidth(window.innerWidth);
            }
            handleResize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        // If small screen, show one image at a time, full width, with left/right controls
        const isMobile = typeof windowWidth === 'number' && windowWidth < 768;

        // Infinite scroll logic (unchanged for md+ screens)
        const scrollerRef = React.useRef<HTMLDivElement>(null);
        const [isManualControl, setIsManualControl] = useState(false);
        const [currentPosition, setCurrentPosition] = useState(0);
        const [isHovered, setIsHovered] = useState(false);
        const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

        const getSpeed = () => {
            if (speed === "fast") return 60000;
            if (speed === "normal") return 120000;
            return 240000;
        };

        // Duplicate items for seamless infinite scroll (triple for better infinite effect)
        const duplicatedItems = [...items, ...items, ...items];
        const itemWidth = 320; // Image width (300px) + gap (20px)
        const totalWidth = items.length * itemWidth;

        // Auto-scroll logic
        React.useEffect(() => {
            if (isMobile) return; // Don't run infinite scroll on mobile
            if (!isManualControl && !isHovered) {
                intervalRef.current = setInterval(() => {
                    setCurrentPosition(prev => {
                        const newPos = prev - 1; // Move left (negative direction)
                        // Reset when we've moved a full cycle to maintain infinite scroll
                        return newPos <= -totalWidth ? 0 : newPos;
                    });
                }, getSpeed() / (totalWidth)); // Smooth movement
            } else {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            }

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            };
        }, [isManualControl, isHovered, totalWidth, getSpeed, isMobile]);

        const scrollLeft = () => {
            setIsManualControl(true);
            setCurrentPosition(prev => {
                const newPos = prev + itemWidth;
                // Wrap around for infinite scroll
                return newPos >= totalWidth ? newPos - totalWidth : newPos;
            });

            // Resume auto-scroll after delay
            setTimeout(() => {
                setIsManualControl(false);
            }, 3000);
        };

        const scrollRight = () => {
            setIsManualControl(true);
            setCurrentPosition(prev => {
                const newPos = prev - itemWidth;
                // Wrap around for infinite scroll
                return newPos < -totalWidth ? newPos + totalWidth : newPos;
            });

            // Resume auto-scroll after delay
            setTimeout(() => {
                setIsManualControl(false);
            }, 3000);
        };

        // Mobile: show one image at a time, full width, with left/right controls
        const [mobileIndex, setMobileIndex] = React.useState(0);

        React.useEffect(() => {
            if (!isMobile) setMobileIndex(0);
        }, [isMobile]);

        const handleMobilePrev = () => {
            setMobileIndex(prev => (prev - 1 + items.length) % items.length);
        };
        const handleMobileNext = () => {
            setMobileIndex(prev => (prev + 1) % items.length);
        };

        if (isMobile) {
            const item = items[mobileIndex];
            return (
                <div className="relative w-full flex flex-col items-center py-4">
                    <div className="flex items-center w-full">
                        <button
                            onClick={handleMobilePrev}
                            className="flex-shrink-0 w-10 h-10 rounded-full bg-black/80 hover:bg-black/95 flex items-center justify-center transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-lg border border-white/30 mx-2"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={24} style={{ color: '#ffffff', stroke: '#ffffff', strokeWidth: 3 }} />
                        </button>
                        <div
                            className="flex-1 flex flex-col items-center cursor-pointer group"
                            onClick={() => handleImageClick(item)}
                            tabIndex={0}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleImageClick(item);
                                }
                            }}
                            aria-label={`Open image of ${item.name}`}
                        >
                            <div className="w-full flex justify-center">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={500}
                                    height={650}
                                    // Make image taller on sm screens
                                    className="rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md h-[75vw] max-h-[500px] object-cover group-hover:scale-105 transition-transform"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <h3 className="mt-2 text-lg font-semibold text-white text-center">{item.name}</h3>
                            <p className="text-gray-300 text-center">{getTranslatedRole(item.role)}</p>
                        </div>
                        <button
                            onClick={handleMobileNext}
                            className="flex-shrink-0 w-10 h-10 rounded-full bg-black/80 hover:bg-black/95 flex items-center justify-center transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-lg border border-white/30 mx-2"
                            aria-label="Next"
                        >
                            <ChevronRight size={24} style={{ color: '#ffffff', stroke: '#ffffff', strokeWidth: 3 }} />
                        </button>
                    </div>
                    <div className="flex justify-center mt-2 gap-1">
                        {items.map((_, idx) => (
                            <span
                                key={idx}
                                className={`inline-block w-2 h-2 rounded-full ${idx === mobileIndex ? 'bg-white' : 'bg-gray-500/50'}`}
                            />
                        ))}
                    </div>
                </div>
            );
        }

        // Desktop/tablet: infinite scroll
        return (
            <div
                className="relative max-w-8xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
            >
                {showControls && (
                    <>
                        <button
                            onClick={scrollLeft}
                            className="absolute left-4 md:left-20 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-14 md:h-14 rounded-full bg-black/80 hover:bg-black/95 hover:scale-110 flex items-center justify-center transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-lg border border-white/30"
                            aria-label="Scroll left"
                            style={{ color: '#ffffff' }}
                        >
                            <ChevronLeft size={24} className="md:size-7" style={{ color: '#ffffff', stroke: '#ffffff', strokeWidth: 3 }} />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-14 md:h-14 rounded-full bg-black/80 hover:bg-black/95 hover:scale-110 flex items-center justify-center transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-lg border border-white/30"
                            aria-label="Scroll right"
                            style={{ color: '#ffffff' }}
                        >
                            <ChevronRight size={24} className="md:size-7" style={{ color: '#ffffff', stroke: '#ffffff', strokeWidth: 3 }} />
                        </button>
                    </>
                )}
                <div
                    ref={scrollerRef}
                    className="flex w-max gap-5 py-4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        transform: `translateX(${currentPosition}px)`,
                        transition: isManualControl ? 'transform 0.5s ease-out' : 'transform 0.1s linear',
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
                <span className="text-mbosLinear">{t.team2}</span>
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
            <div className="w-full sm:w-screen overflow-clip -my-4">
                <InfiniteMovingCardsWithDialog items={teamMembers} speed="slow" showControls={true} />
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
