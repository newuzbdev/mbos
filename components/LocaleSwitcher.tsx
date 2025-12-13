'use client';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {i18n, type Locale} from '../i18n-config';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {ChevronDown, Globe} from 'lucide-react';

export default function LocaleSwitcher() {
    const pathname = usePathname();
    const redirectedPathname = (locale: Locale) => {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        segments[1] = locale;
        return segments.join('/');
    };

    return (
        <div>
            <DropdownMenu >
                <DropdownMenuTrigger className='pt-2 flex items-center gap-1'>
                    <Globe size={20}/> <ChevronDown size={15}/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='p-0'>
                    {i18n.locales.map(locale => {
                        return (
                            <DropdownMenuItem key={locale} className='p-0 w-full'>
                                <Link className='w-full h-full py-1 text-center uppercase' href={redirectedPathname(locale)}>{locale}</Link>
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
