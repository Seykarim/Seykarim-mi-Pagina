import { Github } from 'lucide-react';

// Agrega aquí más canales de contacto (importa Mail o Linkedin desde lucide-react)
const CONTACTS = [
  {
    icon: Github,
    label: 'GitHub',
    detail: '@Seykarim',
    href: 'https://github.com/Seykarim',
  },
  // { icon: Mail, label: 'Correo', detail: 'tu-correo@ejemplo.com', href: 'mailto:tu-correo@ejemplo.com' },
  // { icon: Linkedin, label: 'LinkedIn', detail: '/in/tu-perfil', href: 'https://www.linkedin.com/in/tu-perfil' },
];

export default function ContactSection() {
  return (
    <div className="grid items-center gap-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-violet-500/10 p-7 shadow-2xl backdrop-blur-md md:p-12 lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-3">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-cyan-400">Contacto</span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-100 md:text-4xl">¿Tienes un proyecto en mente?</h2>
        <p className="text-slate-400">
          IoT para fincas, sistemas solares, monitoreo ambiental o una plataforma web: conversemos sobre cómo llevarlo al
          territorio.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {CONTACTS.map((c) => {
          const Icon = c.icon;
          return (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition hover:translate-x-1 hover:border-cyan-500/50"
            >
              <span className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2.5 text-cyan-400">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-semibold text-slate-100">{c.label}</span>
                <span className="text-sm text-slate-400">{c.detail}</span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
