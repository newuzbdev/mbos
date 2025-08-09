'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Menu, Phone, X} from 'lucide-react';
import {getDictionary} from '@/get-dictionary';
import LocaleSwitcher from './LocaleSwitcher';

export default function Header({t}: {t: Awaited<ReturnType<typeof getDictionary>>}) {
    const [open, setOpen] = React.useState<boolean>(false);
    const navigationRef = React.useRef<HTMLDivElement>(null);
    const handleMenu = () => {
        if (open) {
            navigationRef.current?.classList.remove('in-menu');
            navigationRef.current?.classList.add('out-menu');
        } else {
            navigationRef.current?.classList.add('in-menu');
            navigationRef.current?.classList.remove('out-menu');
        }
        setOpen(!open);
    };
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navigationRef.current && !navigationRef.current.contains(event.target as Node) && open) {
                handleMenu();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    React.useEffect(() => {
        if (open) {
            setTimeout(() => {
                document.body.style.overflowX = 'hidden';
            }, 500);
        } else {
            document.body.style.overflow = '';
        }
    }, [open]);
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setOpen(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className='fixed md:hidden top-0 left-0 w-screen h-16 bg-black/60 z-40 flex justify-between items-center py-5 px-3'>
                <Link onClick={handleMenu} href='#home'>
                    <Image src='/logo.svg' alt='Logo' width={80} height={80}></Image>
                </Link>
                <div className='flex items-center'>
                    <LocaleSwitcher />
                    <button onClick={handleMenu} className='ml-2'>
                        {!open ? <Menu /> : <X />}
                    </button>
                </div>
            </div>
            <header
                ref={navigationRef}
                className={`backdrop-blur-xl transition-all duration-300
                    ${open ? 'right-2 opacity-100' : '-right-4/5 opacity-0'}
                    md:right-0 md:opacity-100 md:bg-black/20 
                    fixed z-30 w-4/5 md:w-full flex flex-col md:flex-row justify-start pt-20 md:pt-0 md:justify-around items-center h-screen md:h-20 overflow-hidden text-white`}>
                <Link onClick={handleMenu} href='#home'>
                    <Image src='/logo.svg' alt='Logo' width={140} height={60} className='hidden md:block'></Image>
                </Link>
                <nav className='flex flex-col text-[18px] font-light  items-center md:items-start md:flex-row gap-4.5'>
                    <Link onClick={handleMenu} href='#home' className='hover:text-gray-400 active:underline'>
                        {t.home}
                    </Link>
                    <Link onClick={handleMenu} href='#about' className='hover:text-gray-400 active:underline'>
                        {t.about}
                    </Link>
                    <Link onClick={handleMenu} href='#projects' className='hover:text-gray-400 active:underline'>
                        {t.projects}
                    </Link>
                    <Link onClick={handleMenu} href='#services' className='hover:text-gray-400 active:underline'>
                        {t.services}
                    </Link>
                    <Link onClick={handleMenu} href='#team' className='hover:text-gray-400 active:underline'>
                        {t.team}
                    </Link>
                </nav>
                <ul className='absolute sm:flex md:hidden flex-col gap-2 bottom-0 left-0 p-5'>
                    <li>
                        <Phone size={20} className='inline-block  mr-2' />
                        +998(71) 200-11-51
                    </li>
                    <li>
                        <Phone size={20} className='inline-block mr-2' />
                        +998(62) 227-76-76
                    </li>
                </ul>
                <div className='flex gap-2 items-center'>
                    <div className='md:flex items-center hidden'>
                        <LocaleSwitcher />
                    </div>
                    <div onClick={handleMenu}>
                        <Link
                            href='#contacts'
                            className='md:flex items-center gap-2 cursor-default hover:bg-black/60 transition-colors duration-75 text-[16px] hidden py-1.5 px-2.5 rounded-sm bg-mbosColor'>
                            {t.contact}
                            <Phone size={17} />
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}
