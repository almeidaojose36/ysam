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
    default: 'Grupo YSAM - Construção Civil, Remodelação e Design | Cabinda',
    template: '%s | Grupo YSAM',
  },
  description: 'O Grupo YSAM é líder em construção civil, remodelação de interiores e acabamentos de luxo em Cabinda, Angola. Transformamos o seu espaço com excelência e inovação.',
  keywords: ['Grupo YSAM', 'YSAM', 'construção civil', 'remodelação', 'design de interiores', 'acabamentos de luxo', 'obras', 'Cabinda', 'Angola', 'arquitetura', 'engenharia'],
  authors: [{ name: 'Grupo YSAM' }],
  creator: 'Grupo YSAM',
  publisher: 'Grupo YSAM',
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
    title: 'Grupo YSAM - Excelência em Construção e Remodelação',
    description: 'Líderes em construção civil e design de interiores em Cabinda. O Grupo YSAM transforma espaços em experiências de luxo.',
    siteName: 'Grupo YSAM',
    images: [
      {
        url: '/images/hero-poster.webp',
        width: 1200,
        height: 630,
        alt: 'Grupo YSAM - Portfólio de Luxo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grupo YSAM - Construção e Design',
    description: 'Transforme o seu espaço com o Grupo YSAM. Excelência em construção civil em Cabinda.',
    images: ['/images/hero-poster.webp'],
  },
  alternates: {
    canonical: 'https://www.grupoysam.com',
  },
};

import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Grupo YSAM',
    alternateName: ['YSAM', 'YSAM Organizações'],
    url: 'https://www.grupoysam.com',
    logo: 'https://www.grupoysam.com/images/logo.webp',
    description: 'Líderes em construção civil, remodelação de interiores e acabamentos de luxo em Cabinda, Angola.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cabinda',
      addressCountry: 'AO'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-5.5500', // Coordinates for Cabinda roughly, better if specific
      longitude: '12.2000'
    },
    priceRange: '$$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '08:00',
        closes: '18:00'
      }
    ],
    sameAs: [
      'https://www.instagram.com/grupoysam', // Hypothetical, user can fill
      'https://www.facebook.com/grupoysam',
      'https://www.linkedin.com/company/grupoysam'
    ]
  };

  return (
    <html lang="pt" className={`${inter.variable} ${outfit.variable}`}>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster position="top-right" expand={true} richColors />
      </body>
    </html>
  );
}
