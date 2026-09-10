import GithubRepos from '@/components/GithubRepos';
import LiveRadio from '@/components/LiveRadio';
import WeatherWidget from '@/components/WeatherWidget';
import { Linkedin, Github, Terminal, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 px-4 py-12 md:px-8 lg:px-16 max-w-7xl mx-auto space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
          <Terminal className="w-3.5 h-3.5" />
          <span>Linux Mint Dev Environment</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
          Seykarim Mestre
        </h1>

        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Ingeniero Electrónico - Desarrollador - Explorando tecnología desde la Sierra hasta el código.
        </p>

        <div className="flex items-center justify-center gap-4 pt-2">
          <a
            href="https://www.linkedin.com/in/seykarim-mestre"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all font-medium text-sm"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/Seykarim"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 text-slate-200 border border-slate-700 hover:bg-slate-800 transition-all font-medium text-sm"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </section>

      {/* Repositorios GitHub */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xl font-bold text-slate-100">
          <Github className="w-5 h-5 text-cyan-400" />
          <h2>Proyectos Recientes en GitHub</h2>
        </div>
        <GithubRepos />
      </section>

      {/* Radio en Vivo */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xl font-bold text-slate-100">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h2>Emisora en Vivo</h2>
        </div>
        <LiveRadio />
      </section>

      {/* Clima Actual */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-100">Clima Actual</h2>
          <span className="text-xs text-slate-500 font-mono">Open-Meteo API</span>
        </div>
        <WeatherWidget />
      </section>

      {/* Pie de página */}
      <footer className="pt-8 border-t border-slate-800/60 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Seykarim Mestre. Desplegado desde Linux Mint.
      </footer>
    </main>
  );
}
