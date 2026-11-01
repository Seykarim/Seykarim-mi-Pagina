import WeatherWidget from '@/components/WeatherWidget';
import MarketWidget from '@/components/MarketWidget';
import AudioPlaylist from '@/components/AudioPlaylist';
import ColombiaGallery from '@/components/ColombiaGallery';
import SiteNav from '@/components/SiteNav';
import Hero from '@/components/Hero';
import EngineeringSkills from '@/components/EngineeringSkills';
import CircuitBackground from '@/components/CircuitBackground';
import IoTTelemetry from '@/components/IoTTelemetry';
import SolarCalculator from '@/components/SolarCalculator';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

function SectionHead({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="max-w-3xl space-y-2">
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan-400">{eyebrow}</span>
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-100 md:text-3xl">{title}</h2>
      {desc && <p className="text-slate-400">{desc}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Canvas interactivo de circuitos al fondo */}
      <CircuitBackground />

      {/* Barra de navegación fija con hora de Colombia */}
      <SiteNav />

      <main className="relative z-10 mx-auto min-h-screen max-w-[1440px] space-y-16 overflow-x-hidden p-4 text-slate-100 md:p-8 lg:p-12">
        {/* Encabezado Principal */}
        <Hero />

        {/* Módulo de Competencias en Ingeniería */}
        <section id="sobre-mi" className="scroll-mt-24 space-y-6">
          <SectionHead
            eyebrow="01 · Sobre mí"
            title="Tecnología con raíz territorial"
            desc="Ingeniero electrónico del pueblo Arhuaco. Diseño soluciones de hardware y software pensadas para funcionar donde más se necesitan: zonas rurales, con energía limitada y conectividad intermitente."
          />
          <EngineeringSkills />
        </section>

        {/* Proyectos destacados + repositorios de GitHub */}
        <section id="proyectos" className="scroll-mt-24 space-y-6">
          <SectionHead
            eyebrow="02 · Proyectos"
            title="Lo que construyo"
            desc="Cada proyecto destacado tiene una demo interactiva en esta misma página."
          />
          <ProjectsSection />
        </section>

        {/* Telemetría IoT Sierra Nevada */}
        <section id="telemetria" className="scroll-mt-24 space-y-6">
          <SectionHead eyebrow="03 · Monitoreo IoT en campo" title="Telemetría · Sierra Nevada" />
          <IoTTelemetry />
        </section>

        {/* Calculadora Fotovoltaica Regional */}
        <section id="solar" className="scroll-mt-24 space-y-6">
          <SectionHead
            eyebrow="04 · Dimensionamiento energético"
            title="Calculadora Solar Fotovoltaica"
            desc="Estima el sistema ideal para tu hogar o finca según la radiación solar de tu región."
          />
          <SolarCalculator />
        </section>

        {/* Mercado, clima y paisajes */}
        <section id="datos" className="scroll-mt-24 space-y-6">
          <SectionHead eyebrow="05 · Datos de Colombia" title="Mercado & clima en tiempo real" />
          <MarketWidget />
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            <WeatherWidget />
            <ColombiaGallery />
          </div>
        </section>

        {/* Audio ambiental */}
        <section id="audio" className="scroll-mt-24 space-y-6">
          <SectionHead eyebrow="06 · Atmósfera" title="Música para concentrarse" />
          <AudioPlaylist />
        </section>

        {/* Contacto */}
        <section id="contacto" className="scroll-mt-24">
          <ContactSection />
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-900 py-8 font-mono text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Seykarim R. Mestre Zalabata — Valledupar, Cesar, Colombia.</span>
          <a href="#inicio" className="hover:text-cyan-400">
            Volver arriba ↑
          </a>
        </footer>
      </main>
    </>
  );
}
