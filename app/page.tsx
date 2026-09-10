import WeatherWidget from '@/components/WeatherWidget';
import MarketWidget from '@/components/MarketWidget';
import AudioPlaylist from '@/components/AudioPlaylist';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-10 max-w-6xl mx-auto space-y-8">
      {/* Encabezado Principal de Marca Personal */}
      <header className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-lg shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <span>Pueblo Arhuaco</span>
            <span>•</span>
            <span>Colombia</span>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-100">
            Seykarim R. Mestre Zalabata
          </h1>
          
          <p className="text-base md:text-lg font-medium text-slate-400 max-w-2xl">
            Ingeniero Electrónico // Innovación tecnológica, monitoreo de datos y desarrollo web de alto rendimiento.
          </p>
        </div>
      </header>

      {/* Secciones de Datos Económicos y Clima */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500">Mercado & Divisas (Colombia)</h2>
        <MarketWidget />
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500">Monitoreo Meteorológico</h2>
        <WeatherWidget />
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500">Atmósfera & Audio Ambient</h2>
        <AudioPlaylist />
      </section>

      <footer className="text-center text-xs font-mono text-slate-600 py-6 border-t border-slate-900">
        © {new Date().getFullYear()} Seykarim R. Mestre Zalabata — Valledupar, Cesar, Colombia.
      </footer>
    </main>
  );
}
