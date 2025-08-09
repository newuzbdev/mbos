import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {MapPin, Phone} from 'lucide-react';
import { getDictionary } from '@/get-dictionary';

export default function Footer({ t }: { t: Awaited<ReturnType<typeof getDictionary>> }) {
    return (
        <footer className='text-white w-full h-auto md:h-[303px] flex flex-col md:flex-row gap-10 text-wrap justify-around items-start flex-wrap md:px-10 py-44'>
            <Image src='/backgroundFooter.png' alt='background' width={1441} height={300} className='blur-2xl -z-10 absolute h-full md:h-[200px] max-h-full w-full' />
            <section className='md:w-1/4 p-4'>
                <Image src='/logo.svg' alt='Logo' width={100} height={100}/>
                <p className='text-sm mt-7'>
                    {t.footerp}
                </p>
            </section>
            <section className='md:w-1/5 p-4'>
                <h3 className='font-semibold text-2xl mb-3'>{t.sitemap}</h3>
                <ul className='flex flex-col justify-start gap-1.5'>
                    <li>
                        <Link href='#home'>{t.home}</Link>
                    </li>
                    <li>
                        <Link href='#about'>{t.about}</Link>
                    </li>
                    <li>
                        <Link href='#projects'>{t.projects}</Link>
                    </li>
                    <li>
                        <Link href='#team'>{t.team}</Link>
                    </li>
                </ul>
            </section>
            <section className='md:w-1/5 p-4'>
                <h3 className='font-semibold text-2xl mb-3'>{t.projects}</h3>
                <ul className='flex flex-col justify-start gap-1.5'>
                    <li>
                        <Link href='###'>{t.onlineQueue}</Link>
                    </li>
                    <li>
                        <Link href='###'>{t.taskieLink}</Link>
                    </li>
                    <li>
                        <Link href='###'>{t.GPS}</Link>
                    </li>
                    <li>
                        <Link href='###'>{t.queueLink}</Link>
                    </li>
                </ul>
            </section>
            <section className='md:w-1/4 p-4'>
                <h3 className='font-semibold text-2xl mb-3'>{t.contact}</h3>
                <ul className='flex flex-col justify-start gap-1.5'>
                    <li className='flex flex-row gap-2 items-start'>
                        <MapPin size={25}/> {t.address}
                    </li>
                    <li className='flex flex-row gap-2'>
                        <Phone size={20} /> +998(71) 200-11-51
                    </li>
                    <li className='flex flex-row gap-2'>
                        <Phone size={20}/> +998(71) 200-11-51
                    </li>
                </ul>
            </section>
            <section className='w-full py-8 px-4 -mt-4 flex mx-2 h-12 flex-col md:flex-row justify-between items-end md:items-center'>
                <p className='text-xs'>
                    Copyright © 2024 Brain Development. All Rights Reserved.  |  <Link href='###'> Privacy Policy</Link>  |  <Link href='###'>Terms of Service</Link>
                </p>
                <div className='flex gap-2 items-center'>
                    <Link href='###'>
                        <Image alt='facebookLogo' width={20} height={20} src='/facebookLogo.png' />
                    </Link>
                    <Link href='###'>
                        <Image alt='telegramLogo' width={20} height={20} src='/telegramLogo.png' />
                    </Link>
                    <Link href='###'>
                        <Image alt='instagramLogo' width={20} height={20} src='/instagramLogo.png' />
                    </Link>
                </div>
            </section>
        </footer>
    );
}
