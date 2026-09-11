import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://seykarim.vercel.app"),
  title: {
    default: "Seykarim Mestre | Ingeniería Electrónica",
    template: "%s | Seykarim Mestre",
  },
  description:
    "Portafolio personal de Seykarim Rafael Mestre Zalabata, ingeniero electrónico. Proyectos, radio en vivo y clima en tiempo real.",
  keywords: [
    "Seykarim Mestre",
    "ingeniería electrónica",
    "Universidad Nacional de Colombia",
    "portafolio ingeniero",
    "Arduino",
    "ESP32",
  ],
  authors: [{ name: "Seykarim Rafael Mestre Zalabata" }],
  creator: "Seykarim Rafael Mestre Zalabata",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://seykarim.vercel.app",
    title: "Seykarim Mestre | Ingeniería Electrónica",
    description:
      "Portafolio personal: proyectos, radio en vivo y clima en tiempo real.",
    siteName: "Seykarim Mestre",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Seykarim Mestre - Portafolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seykarim Mestre | Ingeniería Electrónica",
    description: "Portafolio personal de ingeniería electrónica.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Seykarim R. Mestre Zalabata, Ing Electrónico. Indígena Arhuaco. - Colombia.',
  description: 'Portafolio profesional, datos de mercado, clima e innovación tecnológica por Seykarim R. Mestre Zalabata. Ingeniero Electrónico del Pueblo Arhuaco, Colombia.',
  openGraph: {
    title: 'Seykarim R. Mestre Zalabata | Ing. Electrónico - Pueblo Arhuaco',
    description: 'Innovación tecnológica, ingeniería y datos en tiempo real desde Colombia.',
    type: 'website',
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
      </body>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Seykarim Rafael Mestre Zalabata",
      url: "https://seykarim.vercel.app",
      jobTitle: "Ingeniero Electrónico",
      alumniOf: "Universidad Nacional de Colombia",
      sameAs: [
        "https://github.com/Seykarim",
        // agrega aquí tu LinkedIn si quieres que quede vinculado
      ],
    }),
  }}
/>  
  </html>
  );
}
