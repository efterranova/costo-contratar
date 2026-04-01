import type { Metadata } from 'next';
import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-inter',
  subsets: ['latin'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  icons: { icon: '/favicon.png' },
  title: 'IDC — Indice de Dificultad de Contratacion | erecruit',
  description:
    'Descubre que tan dificil sera cubrir tu vacante en LATAM. Herramienta gratuita con datos reales del mercado laboral de 6 paises.',
  openGraph: {
    title: 'Que tan dificil sera cubrir tu vacante? | IDC by erecruit',
    description:
      'Calcula el Indice de Dificultad de Contratacion para cualquier posicion en LATAM. Datos reales, fuentes verificables, analisis por IA.',
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
    <html lang="es" className={`${jakarta.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
