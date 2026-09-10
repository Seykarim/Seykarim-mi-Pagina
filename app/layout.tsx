import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
    </html>
  );
}
