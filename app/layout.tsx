import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Seykarim Mestre | Portafolio',
  description: 'Ingeniero Electrónico & Desarrollador',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-[#070a12] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
