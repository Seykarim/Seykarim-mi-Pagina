import GithubRepos from '@/components/GithubRepos';
import LiveRadio from '@/components/LiveRadio';
import WeatherWidget from '@/components/WeatherWidget';
import { Terminal, Sparkles, Code2, CloudSun, Radio } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Barra de navegación superior */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070a12]/70 border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-slate-400 tracking-wider uppercase">Seykarim Mestre // Dev</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>Linux Mint</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero Section */}
        <section className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-900/30 border border-slate-800/80 backdrop-blur-md shadow-2xl space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              Seykarim <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">Mestre</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-normal max-w-2xl leading-relaxed">
              Ingeniero Electrónico & Desarrollador. Construyendo soluciones digitales, hardware automatizado y software desde la Sierra.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://www.linkedin.com/in/seykarim-mestre"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all font-semibold text-sm shadow-lg shadow-cyan-500/5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
              </svg>
              Conectar en LinkedIn
            </a>
            <a
              href="https://github.com/Seykarim"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 text-slate-200 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all font-semibold text-sm"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Perfil de GitHub
            </a>
          </div>
        </section>

        {/* Sección 2: Clima y Radio integrados */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Estado del Clima</h2>
            </div>
            <WeatherWidget />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Audio en Vivo</h2>
            </div>
            <LiveRadio />
          </div>
        </div>

        {/* Sección 3: Repositorios de GitHub */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Proyectos Destacados en GitHub</h2>
            </div>
            <span className="text-xs font-mono text-slate-500">API Sincronizada</span>
          </div>
          <GithubRepos />
        </section>
      </main>

      {/* Pie de página */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} Seykarim Mestre — Desarrollado en Linux Mint
      </footer>
    </div>
  );
}
