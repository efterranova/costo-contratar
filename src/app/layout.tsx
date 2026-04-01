import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'IDC — Índice de Dificultad de Contratación | erecruit',
  description:
    'Evalúa qué tan difícil será cubrir una posición en LATAM. Herramienta gratuita basada en datos reales del mercado laboral de 6 países.',
  openGraph: {
    title: 'IDC — Índice de Dificultad de Contratación',
    description:
      'Evalúa qué tan difícil será cubrir una posición en LATAM con datos reales del mercado laboral.',
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
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
