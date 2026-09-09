import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Seykarim Mestre | Portafolio Personal",
  description:
    "Sitio personal — Ingeniería Electrónica, proyectos, desarrollo y más.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-white font-sans relative">
        {/* Fondo decorativo global: grilla + glow */}
        <div className="fixed inset-0 -z-10 bg-grid opacity-40" />
        <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-cyan/20 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[120px] -z-10 animate-pulse-slow" />

        <main className="relative z-10 flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
