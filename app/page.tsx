import WeatherWidget from '@/components/WeatherWidget';
import MarketWidget from '@/components/MarketWidget';
import AudioPlaylist from '@/components/AudioPlaylist';
import ColombiaGallery from '@/components/ColombiaGallery';
import HeaderStatus from '@/components/HeaderStatus';
import EngineeringSkills from '@/components/EngineeringSkills';
import CircuitBackground from '@/components/CircuitBackground';
import IoTTelemetry from '@/components/IoTTelemetry';
import SolarCalculator from '@/components/SolarCalculator';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden p-4 md:p-8 lg:p-12 max-w-[1440px] mx-auto space-y-8">
      {/* Canvas interactivo de circuitos al fondo */}
      <CircuitBackground />

      {/* Capa principal sobre el lienzo animado */}
      <div className="relative z-10 space-y-8">
        {/* Barra Superior de Estado y Telemetría */}
        <HeaderStatus />

        {/* Encabezado Principal */}
        <header className="p-8 md:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-lg shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <span>Pueblo Arhuaco</span>
              <span>•</span>
              <span>Colombia</span>
            </div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100">
              Seykarim R. Mestre Zalabata
            </h1>
            
            <p className="text-base md:text-lg font-medium text-slate-400 max-w-3xl">
              Ingeniero Electrónico // Innovación tecnológica, monitoreo de datos y desarrollo web de alto rendimiento.
            </p>
          </div>
        </header>

        {/* Módulo de Competencias en Ingeniería */}
        <EngineeringSkills />

        {/* Telemetría IoT Sierra Nevada */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500">Monitoreo IoT en Campo</h2>
          <IoTTelemetry />
        </section>

        {/* Calculadora Fotovoltaica Regional */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500">Dimensionamiento Energético</h2>
          <SolarCalculator />
        </section>

        {/* Sección Mercado & Divisas */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500">Mercado & Divisas (Colombia)</h2>
          <MarketWidget />
        </section>

        {/* Dashboard Multicolumna Panorámico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna Izquierda: Clima y Playlist */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <section className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500">Monitoreo Meteorológico</h2>
              <WeatherWidget />
            </section>

            <section className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500">Atmósfera & Audio Ambient (Bucle Infinito)</h2>
              <AudioPlaylist />
            </section>
          </div>

          {/* Columna Derecha: Galería Fotográfica Natural */}
          <div className="lg:col-span-5 xl:col-span-4 h-full">
            <section className="space-y-3 h-full">
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500">Entorno Natural</h2>
              <ColombiaGallery />
            </section>
          </div>
        </div>

        <footer className="text-center text-xs font-mono text-slate-600 py-8 border-t border-slate-900">
          © {new Date().getFullYear()} Seykarim R. Mestre Zalabata — Valledupar, Cesar, Colombia.
        </footer>
      </div>
    </main>
  );
}
