'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#telemetria', label: 'Telemetría' },
  { href: '#solar', label: 'Solar' },
  { href: '#datos', label: 'Datos' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('');
  const [active, setActive] = useState('');

  // Reloj en hora de Colombia
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('es-CO', {
      timeZone: 'America/Bogota',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Resalta la sección visible en el menú
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive('#' + entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 md:px-8 lg:px-12">
        <a href="#inicio" className="flex items-center gap-2.5 font-extrabold text-slate-100">
          <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden="true">
            <path d="M14 44 32 14l18 30z" fill="none" stroke="#22d3ee" strokeWidth="5" strokeLinejoin="round" />
            <circle cx="32" cy="36" r="5" fill="#34d399" />
          </svg>
          <span>
            Seykarim<span className="text-slate-500">.dev</span>
          </span>
        </a>

        <nav
          id="menu"
          aria-label="Secciones"
          className={`${
            open ? 'flex' : 'hidden'
          } absolute inset-x-0 top-16 flex-col gap-1 border-b border-slate-800 bg-slate-950 px-4 pb-5 pt-3 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active === l.href ? 'bg-slate-800/70 text-slate-100' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-center text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 md:ml-2 md:mt-0"
          >
            Contacto
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 font-mono text-xs text-slate-400 lg:flex" title="Hora Colombia (UTC-5)">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {time || '--:--:--'}
          </span>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-800 bg-slate-900/70 text-slate-300 md:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
