import type { Metadata } from 'next';
import { DM_Sans, Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  icons: { icon: '/favicon.png' },
  title: 'IDC — Índice de Dificultad de Contratación | erecruit',
  description:
    'Descubre qué tan difícil será cubrir tu vacante en LATAM. Herramienta gratuita con datos reales del mercado laboral de 6 países. Análisis basado en 5 variables y fuentes públicas verificables.',
  openGraph: {
    title: '¿Qué tan difícil será cubrir tu vacante? | IDC by erecruit',
    description:
      'Calcula el Índice de Dificultad de Contratación para cualquier posición en LATAM. Datos reales, fuentes verificables, análisis por IA.',
    type: 'website',
    locale: 'es_LA',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
