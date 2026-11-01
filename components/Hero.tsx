'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const ROLES = [
  'Sistemas embebidos & IoT',
  'Energía solar fotovoltaica',
  'Monitoreo de datos en tiempo real',
  'Desarrollo web de alto rendimiento',
];

const STATS = [
  { value: '4', label: 'Áreas de especialización' },
  { value: '6', label: 'Sensores por nodo IoT' },
  { value: '915', label: 'MHz · banda LoRa' },
  { value: '7', label: 'Ciudades con clima en vivo' },
];

// Efecto de texto que se escribe y se borra
function useTyped(words: string[]) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0]);
      return;
    }
    let word = 0;
    let i = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const loop = () => {
      const current = words[word];
      setText(current.slice(0, i));
      if (!deleting && i === current.length) {
        deleting = true;
        timer = setTimeout(loop, 1800);
        return;
      }
      if (deleting && i === 0) {
        deleting = false;
        word = (word + 1) % words.length;
      }
      i += deleting ? -1 : 1;
      timer = setTimeout(loop, deleting ? 28 : 55);
    };
    loop();
    return () => clearTimeout(timer);
  }, [words]);

  return text;
}

export default function Hero() {
  const typed = useTyped(ROLES);

  return (
    <header
      id="inicio"
      className="relative grid scroll-mt-24 items-center gap-8 overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/80 p-7 shadow-2xl backdrop-blur-lg md:p-12 lg:grid-cols-[1.6fr_1fr]"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Pueblo Arhuaco · Sierra Nevada · Colombia
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-100 md:text-5xl lg:text-6xl">
          Seykarim R.{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Mestre Zalabata
          </span>
        </h1>

        <p className="min-h-[3.5rem] text-lg font-semibold text-slate-200 md:min-h-[2rem] md:text-xl">
          Ingeniero Electrónico —{' '}
          <span className="font-mono text-cyan-400">{typed}</span>
          <span className="ml-0.5 animate-pulse text-cyan-400" aria-hidden="true">
            ▍
          </span>
        </p>

        <p className="max-w-2xl text-slate-400">
          Conecto la ingeniería con el territorio: sensores en campo, energía solar y plataformas web que convierten datos en
          decisiones.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="#proyectos"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:-translate-y-0.5"
          >
            Ver proyectos <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-500/50"
          >
            Hablemos
          </a>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-3">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
            <span className="block font-mono text-3xl font-bold text-cyan-400">{s.value}</span>
            <span className="text-xs leading-snug text-slate-400">{s.label}</span>
          </div>
        ))}
      </div>
    </header>
  );
}
