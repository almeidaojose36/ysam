import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.grupoysam.com'),
  title: {
    default: 'YSAM - Construção, Remodelação e Acabamentos | Cabinda',
    template: '%s | YSAM',
  },
  description: 'Especialistas em construção civil, remodelação de interiores e acabamentos de luxo em Cabinda, Angola. Transforme o seu espaço com a YSAM.',
  keywords: ['construção civil', 'remodelação', 'interiores', 'acabamentos', 'Angola', 'Cabinda', 'design de interiores', 'obras', 'YSAM'],
  authors: [{ name: 'YSAM Organizações' }],
  creator: 'YSAM Organizações',
  publisher: 'YSAM Organizações',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_AO',
    url: 'https://www.grupoysam.com',
    title: 'YSAM - Construção de Excelência e Remodelações Premium',
    description: 'Transformamos espaços em experiências de conforto e luxo. Líderes em construção e remodelação em Cabinda.',
    siteName: 'YSAM Organizações',
    images: [
      {
        url: '/images/hero-poster.webp',
        width: 1200,
        height: 630,
        alt: 'YSAM Portfolio - Remodelação de Luxo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YSAM - Construção e Remodelação',
    description: 'Transforme o seu espaço com a YSAM. Excelência em construção e design em Cabinda.',
    images: ['/images/hero-poster.webp'],
  },
  alternates: {
    canonical: '/',
  },
};

import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={`${inter.variable} ${outfit.variable}`}>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" expand={true} richColors />
      </body>
    </html>
  );
}
