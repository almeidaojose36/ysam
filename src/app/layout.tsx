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
  title: 'YSAM - Construção, Remodelação e Acabamentos | Cabinda, Angola',
  description: 'A YSAM é especializada em construção civil, remodelação residencial e corporativa, e acabamentos de luxo em Angola. Transformamos espaços em experiências de conforto.',
  keywords: 'construção, remodelação, acabamentos, Angola, Cabinda, interiores, tetos falsos, placa 3D, YSAM',
  authors: [{ name: 'YSAM Organizações' }],
  openGraph: {
    title: 'YSAM - Construção, Remodelação e Acabamentos',
    description: 'Transformamos espaços em experiências de conforto e luxo.',
    type: 'website',
    locale: 'pt_AO',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={`${inter.variable} ${outfit.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
