import React from 'react';
import { Button as MovingButton } from '@/components/ui/moving-border';
import Image from 'next/image';
import { SparklesCore } from './ui/sparkles';
import { getDictionary } from '@/get-dictionary';

export default function About({ t }: { t: Awaited<ReturnType<typeof getDictionary>> }) {
    return (
        <section id='about' className='flex flex-col items-center gap-10'>
            <div className='mbos-button capitalize'>{t.homeButton2} {t.abouth1span}</div>
            <h1 className='text-3xl md:text-5xl font-bold text-center md:leading-18 uppercase leading-10'>
                {t.homeButton2} <span className='text-mbosLinear'>{t.abouth1span}</span>
            </h1>
            <div className='w-screen overflow-x-clip flex flex-col items-center relative'>
                <div className='w-full md:w-[40rem] h-20 relative md:-mt-14 -mt-12'>
                    <div className='absolute inset-x-18 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
                    <div className='absolute inset-x-18 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
                    <div className='absolute inset-x-18 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />
                    <div className='absolute inset-x-18 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />
                    <SparklesCore background='transparent' minSize={0.4} maxSize={1} particleDensity={1200} className='w-full h-full' particleColor='#FFFFFF' />
                    <div className='absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]'></div>
                </div>
            </div>
            <MovingButton borderRadius='24px' containerClassName='w-[calc(100vw-10px)] md:w-[calc(100vw-200px)] h-auto md:h-full p-1 mx-1' className='bg-black' borderClassName='size-60 '>
                {/* Responsive grid: lg unchanged, sm/md stack aboutp and images vertically with minimal gap */}
                <div className='relative size-full'>
                    <Image src='/backgroundFooter.png' alt='background' width={100} height={200} className='absolute w-full h-full bg-black object-cover blur-2xl -z-10' />
                    {/* lg:grid, sm/md:flex-col */}
                    <div className='hidden lg:grid grid-cols-4 grid-rows-4 gap-4 size-full'>
                        {/* Main info block */}
                        <div className='col-span-2 row-span-3 rounded-tl-3xl rounded-tr-none border border-gray-100/50 flex flex-col items-center justify-start gap-2 p-5 md:px-20 h-[570px]'>
                            <h2 className='font-bold text-[34px] md:text-5xl'>MBOS</h2>
                            <p className='font-semibold text-[18px]/[30px] text-center md:text-2xl/[32px]'>Multi Branch Online Service</p>
                            <p className='font-semibold text-[18px]/[30px] text-justify md:text-2xl/[32px] mb-16'>{t.aboutp}</p>
                        </div>
                        {/* Images */}
                        <div className='col-span-2 row-span-3 flex flex-col gap-4 rounded-tr-3xl'>
                            <div className='flex items-center gap-4 justify-center'>
                                <div className='relative h-[275px] w-full border border-gray-100/50'>
                                    <Image src='/room1.jpg' alt='building' fill className='object-cover' />
                                </div>
                                <div className='relative h-[275px] w-full border border-gray-100/50'>
                                    <Image src='/room2.jpg' alt='building' fill className='object-cover' />
                                </div>
                            </div>
                            <div className='flex items-center gap-4 justify-center'>
                                <div className='relative h-[275px] w-full border border-gray-100/50'>
                                    <Image src='/room3.jpg' alt='building' fill className='object-cover' />
                                </div>
                                <div className='relative h-[275px] w-full border border-gray-100/50'>
                                    <Image src='/room4.jpg' alt='building' fill className='object-cover' />
                                </div>
                            </div>
                        </div>
                        <div className='sm:rounded-bl-3xl border border-gray-100/50'>
                            <p className='font-bold text-6xl my-8 text-start pl-10 w-full'>15.4K+</p>
                            <p className='text-lg font-bold text-start px-10 w-full pb-4'>{t.aboutp2}</p>
                        </div>
                        <div className='border border-gray-100/50'>
                            <p className='font-bold text-6xl my-8 text-start pl-10 w-full'>300+</p>
                            <p className='text-lg font-bold text-start px-10 w-full pb-4'>{t.aboutp3}</p>
                        </div>
                        <div className='border rounded-bl-3xl md:rounded-bl-none border-gray-100/50'>
                            <p className='font-bold text-6xl my-8 text-start px-10 w-full'>10 +</p>
                            <p className='text-lg font-bold text-start px-10 w-full pb-4'>{t.year}</p>
                        </div>
                        <div className='rounded-br-3xl border border-gray-100/50'>
                            <p className='font-bold text-6xl my-8 text-start pl-10 w-full'>20 +</p>
                            <p className='text-lg font-bold text-start px-10 w-full pb-4'>{t.aboutp5}</p>
                        </div>
                    </div>
                    {/* sm/md: stack aboutp and images vertically, minimal gap */}
                    <div className='lg:hidden flex flex-col gap-2'>
                        {/* Main info block */}
                        <div className='rounded-t-3xl border border-gray-100/50 flex flex-col items-center justify-start gap-1 p-4'>
                            <h2 className='font-bold text-[28px]'>MBOS</h2>
                            <p className='font-semibold text-[16px]/[26px] text-center'>Multi Branch Online Service</p>
                            <p className='font-semibold text-[16px]/[26px] text-justify mb-2'>{t.aboutp}</p>
                        </div>
                        {/* Images: 1 col, minimal gap */}
                        <div className='flex flex-col gap-2 mt-0'>
                            <div className='flex flex-col gap-2'>
                                <div className='relative h-[120px] w-full border border-gray-100/50'>
                                    <Image src='/room1.jpg' alt='building' fill className='object-cover' />
                                </div>
                                <div className='relative h-[120px] w-full border border-gray-100/50'>
                                    <Image src='/room2.jpg' alt='building' fill className='object-cover' />
                                </div>
                                <div className='relative h-[120px] w-full border border-gray-100/50'>
                                    <Image src='/room3.jpg' alt='building' fill className='object-cover' />
                                </div>
                                <div className='relative h-[120px] w-full border border-gray-100/50'>
                                    <Image src='/room4.jpg' alt='building' fill className='object-cover' />
                                </div>
                            </div>
                        </div>
                        {/* Stats blocks */}
                        <div className='grid grid-cols-2 gap-2 mt-2'>
                            <div className='rounded-bl-3xl border border-gray-100/50'>
                                <p className='font-bold text-3xl my-4 text-start pl-4 w-full'>15.4K+</p>
                                <p className='text-base font-bold text-start px-4 w-full pb-2'>{t.aboutp2}</p>
                            </div>
                            <div className='border border-gray-100/50'>
                                <p className='font-bold text-3xl my-4 text-start pl-4 w-full'>300+</p>
                                <p className='text-base font-bold text-start px-4 w-full pb-2'>{t.aboutp3}</p>
                            </div>
                            <div className='border border-gray-100/50'>
                                <p className='font-bold text-3xl my-4 text-start px-4 w-full'>10 +</p>
                                <p className='text-base font-bold text-start px-4 w-full pb-2'>{t.year}</p>
                            </div>
                            <div className='rounded-br-3xl border border-gray-100/50'>
                                <p className='font-bold text-3xl my-4 text-start pl-4 w-full'>20 +</p>
                                <p className='text-base font-bold text-start px-4 w-full pb-2'>{t.aboutp5}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MovingButton>
        </section>
    );
}
