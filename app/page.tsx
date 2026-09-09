import { Radio, CloudSun } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen w-full px-6 md:px-12 py-10 max-w-6xl mx-auto flex flex-col gap-16">
      {/* HERO / LINKEDIN */}
      <section
        id="hero"
        className="glass-card p-8 md:p-12 flex flex-col items-center text-center gap-6 animate-fade-in-up"
      >
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-pink p-[2px] animate-float">
          <div className="w-full h-full rounded-full bg-surface flex items-center justify-center text-3xl font-display font-bold">
            SM
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient">
            Seykarim Mestre
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl">
            Ingeniero Electronico - Desarrollador - Explorando tecnologia desde la Sierra hasta el codigo.
          </p>
        </div>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-card shadow-neon-cyan"
        >
          <FaLinkedin size={18} className="text-neon-cyan" />
          <span className="text-sm">Conectar en LinkedIn</span>
        </a>
      </section>

      <section id="proyectos" className="flex flex-col gap-6 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <FaGithub className="text-neon-purple" size={24} />
          <h2 className="text-2xl md:text-3xl font-display font-semibold">
            Proyectos de GitHub
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-card p-6 h-40 flex items-center justify-center text-zinc-500 text-sm"
            >
              Placeholder: Repositorio {i}
            </div>
          ))}
        </div>
      </section>

      <section id="radio" className="flex flex-col gap-6 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <Radio className="text-neon-pink" size={24} />
          <h2 className="text-2xl md:text-3xl font-display font-semibold">
            Emisora en Vivo
          </h2>
        </div>

        <div className="glass-card p-8 flex items-center justify-center h-32 text-zinc-500 text-sm">
          Placeholder: Reproductor de radio
        </div>
      </section>

      <section id="clima" className="flex flex-col gap-6 animate-fade-in-up pb-12">
        <div className="flex items-center gap-3">
          <CloudSun className="text-neon-blue" size={24} />
          <h2 className="text-2xl md:text-3xl font-display font-semibold">
            Clima Actual
          </h2>
        </div>

        <div className="glass-card p-8 flex items-center justify-center h-32 text-zinc-500 text-sm">
          Placeholder: Widget de clima Open-Meteo
        </div>
      </section>
    </div>
  );
}
