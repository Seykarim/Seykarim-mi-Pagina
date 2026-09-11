import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://seykarim.vercel.app'),
  title: {
    default: 'Seykarim R. Mestre Zalabata | Ing. Electrónico - Pueblo Arhuaco',
    template: '%s | Seykarim Mestre',
  },
  description:
    'Portafolio profesional de Seykarim R. Mestre Zalabata, ingeniero electrónico indígena Arhuaco. Proyectos, datos de mercado, clima e innovación tecnológica en tiempo real desde Colombia.',
  keywords: [
    'Seykarim Mestre',
    'ingeniería electrónica',
    'Universidad Nacional de Colombia',
    'portafolio ingeniero',
    'pueblo Arhuaco',
    'Sierra Nevada de Santa Marta',
    'Arduino',
    'ESP32',
  ],
  authors: [{ name: 'Seykarim Rafael Mestre Zalabata' }],
  creator: 'Seykarim Rafael Mestre Zalabata',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://seykarim.vercel.app',
    title: 'Seykarim R. Mestre Zalabata | Ing. Electrónico - Pueblo Arhuaco',
    description:
      'Innovación tecnológica, ingeniería y datos en tiempo real desde Colombia. Proyectos, radio en vivo y clima.',
    siteName: 'Seykarim Mestre',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Seykarim Mestre - Portafolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seykarim R. Mestre Zalabata | Ing. Electrónico',
    description: 'Portafolio profesional, datos de mercado, clima e innovación tecnológica.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Seykarim Rafael Mestre Zalabata',
              url: 'https://seykarim.vercel.app',
              jobTitle: 'Ingeniero Electrónico',
              alumniOf: 'Universidad Nacional de Colombia',
              sameAs: [
                'https://github.com/Seykarim',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
