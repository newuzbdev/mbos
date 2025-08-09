import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { i18n, type Locale } from "../../i18n-config";
import { getDictionary } from "@/get-dictionary";
import localFont from 'next/font/local';
import {Bricolage_Grotesque} from 'next/font/google'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bricolage',
})

const satoshi = localFont({ src: [
  {
    path:'../../fonts/satoshi/Satoshi-Black.woff2',
    weight: '900',
    style: 'normal',
  },
  {
    path:'../../fonts/satoshi/Satoshi-Bold.woff2',
    weight: '700',
    style: 'normal',
  },
  {
    path:'../../fonts/satoshi/Satoshi-Medium.woff2',
    weight: '500',
    style: 'normal',
  },
  {
    path:'../../fonts/satoshi/Satoshi-Regular.woff2',
    weight: '400',
    style: 'normal',
  },
  {
    path:'../../fonts/satoshi/Satoshi-Light.woff2',
    weight: '100',
    style: 'normal',
  },
],
  variable: '--font-satoshi',});
export const metadata: Metadata = {
  title: "MBOS",
  description: "MBOS - Raqamlashtirish orqali qulaylik yaratamiz",
  icons: {
    icon: "/logo.svg",
  }
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  const t=await getDictionary(lang);
  return (
    <html lang={lang}>
      <body className=" text-white font-satoshi bg-black w-screen overflow-x-hidden">
        <Header t={t}/>
        {children}
        <Footer t={t}/>
      </body>
    </html>
  );
}
