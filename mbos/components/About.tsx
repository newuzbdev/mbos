import React from 'react';
import { Button as MovingButton } from '@/components/ui/moving-border';
import Image from 'next/image';
import { SparklesCore } from './ui/sparkles';
import { getDictionary } from '@/get-dictionary';

export default function About({ t }: { t: Awaited<ReturnType<typeof getDictionary>> }) {
    return (
        <section id='about' className='flex flex-col items-center gap-8 sm:gap-10 px-2 sm:px-0'>
            <div className='mbos-button capitalize'>{t.homeButton2} {t.abouth1span}</div>
            <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold text-center md:leading-18 uppercase leading-8 sm:leading-10'>
                {t.homeButton2} <span className='text-mbosLinear'>{t.abouth1span}</span>
            </h1>
            <div className='w-full overflow-x-clip flex flex-col items-center relative'>
                <div className='w-full max-w-2xl md:w-[40rem] h-16 sm:h-20 relative md:-mt-14 -mt-10 sm:-mt-12'>
                    <div className='absolute inset-x-8 sm:inset-x-18 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
                    <div className='absolute inset-x-8 sm:inset-x-18 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
                    <div className='absolute inset-x-8 sm:inset-x-18 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />
                    <div className='absolute inset-x-8 sm:inset-x-18 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />
                    <SparklesCore background='transparent' minSize={0.4} maxSize={1} particleDensity={1200} className='w-full h-full' particleColor='#FFFFFF' />
                    <div className='absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]'></div>
                </div>
            </div>
            <MovingButton
                borderRadius='24px'
                containerClassName='w-full max-w-[1400px] md:w-[calc(100vw-200px)] h-auto md:h-full p-1 mx-1'
                className='bg-black'
                borderClassName='size-60 '
            >
                <div className='relative w-full h-full'>
                    <Image
                        src='/backgroundFooter.png'
                        alt='background'
                        width={100}
                        height={200}
                        className='absolute w-full h-full bg-black object-cover blur-2xl -z-10'
                    />
                    {/* Desktop grid */}
                    <div className='hidden lg:grid grid-cols-4 grid-rows-4 gap-4 w-full h-full'>
                        {/* Main info block */}
                        <div
                            className='col-span-2 row-span-3 rounded-tl-3xl rounded-tr-none border border-gray-100/50 flex flex-col items-center justify-start gap-2 p-5 md:px-12 xl:px-20 h-full'
                            style={{
                                minHeight: '420px',
                                maxHeight: '565px',
                                height: '565px', // Match images block height
                            }}
                        >
                            <h2 className='font-bold text-[32px] md:text-5xl'>MBOS</h2>
                            <p className='font-semibold text-[18px]/[30px] text-center md:text-2xl/[32px]'>Multi Branch Online Service</p>
                            <p
                                className='font-semibold text-[18px]/[30px] text-justify md:text-2xl/[32px] mb-6 md:mb-10 w-full max-w-full'
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    margin: 0,
                                    overflow: 'hidden',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {t.aboutp}
                            </p>
                        </div>
                        {/* Images */}
                        <div
                            className='col-span-2 row-span-3 flex flex-col gap-4 rounded-tr-3xl'
                            style={{
                                minHeight: '420px',
                                maxHeight: '565px',
                                height: '565px', // Match about text block height
                            }}
                        >
                            <div className='flex items-center gap-4 justify-center h-1/2'>
                                <div className='relative h-[130px] xl:h-[270px] w-full border border-gray-100/50'>
                                    <Image src='/room1.jpg' alt='building' fill className='object-cover' />
                                </div>
                                <div className='relative h-[130px] xl:h-[270px] w-full border border-gray-100/50'>
                                    <Image src='/room2.jpg' alt='building' fill className='object-cover' />
                                </div>
                            </div>
                            <div className='flex items-center gap-4 justify-center h-1/2'>
                                <div className='relative h-[130px] xl:h-[270px] w-full border border-gray-100/50'>
                                    <Image src='/room3.jpg' alt='building' fill className='object-cover' />
                                </div>
                                <div className='relative h-[130px] xl:h-[270px] w-full border border-gray-100/50'>
                                    <Image src='/room4.jpg' alt='building' fill className='object-cover' />
                                </div>
                            </div>
                        </div>
                        {/* Stats blocks */}
                        <div className='sm:rounded-bl-3xl border border-gray-100/50 flex flex-col justify-center'>
                            <p className='font-bold text-4xl xl:text-6xl my-4 xl:my-8 text-start pl-6 xl:pl-10 w-full'>15.4K+</p>
                            <p className='text-base xl:text-lg font-bold text-start px-6 xl:px-10 w-full pb-2 xl:pb-4'>{t.aboutp2}</p>
                        </div>
                        <div className='border border-gray-100/50 flex flex-col justify-center'>
                            <p className='font-bold text-4xl xl:text-6xl my-4 xl:my-8 text-start pl-6 xl:pl-10 w-full'>300+</p>
                            <p className='text-base xl:text-lg font-bold text-start px-6 xl:px-10 w-full pb-2 xl:pb-4'>{t.aboutp3}</p>
                        </div>
                        <div className='border rounded-bl-3xl md:rounded-bl-none border-gray-100/50 flex flex-col justify-center'>
                            <p className='font-bold text-4xl xl:text-6xl my-4 xl:my-8 text-start px-6 xl:px-10 w-full'>
                                10 <span className="align-baseline text-2xl xl:text-4xl">{t.year}</span> +
                            </p>
                            <p className='text-base xl:text-lg font-bold text-start px-6 xl:px-10 w-full pb-2 xl:pb-4'>{t.experience}</p>
                        </div>
                        <div className='rounded-br-3xl border border-gray-100/50 flex flex-col justify-center'>
                            <p className='font-bold text-4xl xl:text-6xl my-4 xl:my-8 text-start pl-6 xl:pl-10 w-full'>20+</p>
                            <p className='text-base xl:text-lg font-bold text-start px-6 xl:px-10 w-full pb-2 xl:pb-4'>{t.aboutp5}</p>
                        </div>
                    </div>
                    {/* Mobile/tablet: improved layout for images and text */}
                    <div className='lg:hidden flex flex-col gap-4 w-full max-w-md mx-auto'>
                        {/* Main info block */}
                        <div
                            className='rounded-t-3xl border border-gray-100/50 flex flex-col items-center justify-start gap-2 p-4 bg-black/60'
                        >
                            <h2 className='font-bold text-lg xs:text-xl sm:text-2xl md:text-3xl'>MBOS</h2>
                            <p className='font-semibold text-sm xs:text-base sm:text-lg text-center'>Multi Branch Online Service</p>
                            <p
                                className='font-medium text-xs xs:text-sm sm:text-base text-justify mb-2 w-full break-words'
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    margin: 0,
                                    overflow: 'hidden',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {t.aboutp}
                            </p>
                        </div>
                        {/* Images: responsive grid, better aspect ratio */}
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='relative aspect-[4/3] w-full border border-gray-100/50 rounded-lg overflow-hidden'>
                                <Image src='/room1.jpg' alt='building' fill className='object-cover' sizes="(max-width: 640px) 50vw, 25vw" />
                            </div>
                            <div className='relative aspect-[4/3] w-full border border-gray-100/50 rounded-lg overflow-hidden'>
                                <Image src='/room2.jpg' alt='building' fill className='object-cover' sizes="(max-width: 640px) 50vw, 25vw" />
                            </div>
                            <div className='relative aspect-[4/3] w-full border border-gray-100/50 rounded-lg overflow-hidden'>
                                <Image src='/room3.jpg' alt='building' fill className='object-cover' sizes="(max-width: 640px) 50vw, 25vw" />
                            </div>
                            <div className='relative aspect-[4/3] w-full border border-gray-100/50 rounded-lg overflow-hidden'>
                                <Image src='/room4.jpg' alt='building' fill className='object-cover' sizes="(max-width: 640px) 50vw, 25vw" />
                            </div>
                        </div>
                        {/* Stats blocks */}
                        <div className='grid grid-cols-2 gap-2 mt-2'>
                            <div className='rounded-bl-3xl border border-gray-100/50 flex flex-col justify-center bg-black/60'>
                                <p className='font-bold text-lg xs:text-xl sm:text-2xl my-2 sm:my-4 text-start pl-2 sm:pl-4 w-full'>15.4K+</p>
                                <p className='text-xs xs:text-sm sm:text-base font-bold text-start px-2 sm:px-4 w-full pb-1 sm:pb-2'>{t.aboutp2}</p>
                            </div>
                            <div className='border border-gray-100/50 flex flex-col justify-center bg-black/60'>
                                <p className='font-bold text-lg xs:text-xl sm:text-2xl my-2 sm:my-4 text-start pl-2 sm:pl-4 w-full'>300+</p>
                                <p className='text-xs xs:text-sm sm:text-base font-bold text-start px-2 sm:px-4 w-full pb-1 sm:pb-2'>{t.aboutp3}</p>
                            </div>
                            <div className='border border-gray-100/50 flex flex-col justify-center bg-black/60'>
                                <p className='font-bold text-lg xs:text-xl sm:text-2xl my-2 sm:my-4 text-start px-2 sm:px-4 w-full'>10+</p>
                                <p className='text-xs xs:text-sm sm:text-base font-bold text-start px-2 sm:px-4 w-full pb-1 sm:pb-2'>{t.year}</p>
                            </div>
                            <div className='rounded-br-3xl border border-gray-100/50 flex flex-col justify-center bg-black/60'>
                                <p className='font-bold text-lg xs:text-xl sm:text-2xl my-2 sm:my-4 text-start pl-2 sm:pl-4 w-full'>20+</p>
                                <p className='text-xs xs:text-sm sm:text-base font-bold text-start px-2 sm:px-4 w-full pb-1 sm:pb-2'>{t.aboutp5}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MovingButton>
        </section>
    );
}
