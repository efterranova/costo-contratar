import type { Metadata } from 'next';
import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google';
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

const siteUrl = 'https://erecruit-1.evolucio.lat';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
  title: {
    default: 'Indice de Dificultad de Contratacion en LATAM | erecruit',
    template: '%s | erecruit',
  },
  description:
    'Descubre que tan dificil sera cubrir tu vacante en Latinoamerica. Herramienta gratuita que analiza 5 variables del mercado laboral con datos reales de ManpowerGroup, ILOSTAT y guias salariales. Cobertura en Mexico, Colombia, Ecuador, Brasil, Argentina, Chile y Peru.',
  keywords: [
    'indice dificultad contratacion',
    'dificultad de contratacion LATAM',
    'costo de contratar',
    'mercado laboral latinoamerica',
    'dificultad para contratar',
    'escasez de talento LATAM',
    'reclutamiento latinoamerica',
    'contratar en Mexico',
    'contratar en Colombia',
    'contratar en Ecuador',
    'contratar en Brasil',
    'contratar en Argentina',
    'contratar en Chile',
    'contratar en Peru',
    'erecruit',
    'hiring difficulty index',
    'talent shortage LATAM',
  ],
  authors: [{ name: 'erecruit', url: 'https://erecruit.ca' }],
  creator: 'erecruit',
  publisher: 'erecruit',
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
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'es_419',
    url: siteUrl,
    siteName: 'erecruit — Indice de Dificultad de Contratacion',
    title: 'Que tan dificil sera cubrir tu vacante en LATAM?',
    description:
      'Calcula gratis el Indice de Dificultad de Contratacion para cualquier posicion en 7 paises de Latinoamerica. Datos reales, analisis por IA, reporte PDF descargable.',
    images: [
      {
        url: '/erecruit-color.png',
        width: 770,
        height: 209,
        alt: 'erecruit — Indice de Dificultad de Contratacion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Que tan dificil sera cubrir tu vacante en LATAM?',
    description:
      'Calcula gratis el Indice de Dificultad de Contratacion. 7 paises, 5 variables, analisis por IA.',
    images: ['/erecruit-color.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${jakarta.variable} ${dmSans.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Indice de Dificultad de Contratacion',
              alternateName: 'IDC',
              url: siteUrl,
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              creator: {
                '@type': 'Organization',
                name: 'erecruit',
                url: 'https://erecruit.ca',
              },
              description:
                'Herramienta gratuita que permite a empleadores en Latinoamerica evaluar que tan dificil sera cubrir una posicion especifica, basandose en datos publicos del mercado laboral de 7 paises.',
              areaServed: [
                { '@type': 'Country', name: 'Mexico' },
                { '@type': 'Country', name: 'Colombia' },
                { '@type': 'Country', name: 'Ecuador' },
                { '@type': 'Country', name: 'Brazil' },
                { '@type': 'Country', name: 'Argentina' },
                { '@type': 'Country', name: 'Chile' },
                { '@type': 'Country', name: 'Peru' },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full font-sans">
        {children}
      </body>
    </html>
  );
}
