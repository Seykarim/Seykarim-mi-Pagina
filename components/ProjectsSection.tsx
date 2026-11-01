'use client';

import { useEffect, useState } from 'react';
import { Radio, Sun, LineChart, Star, GitFork, ExternalLink, Github } from 'lucide-react';

const GITHUB_USERNAME = 'Seykarim';

const FEATURED = [
  {
    icon: Radio,
    tag: 'IoT · LoRaWAN',
    title: 'Nodo Sabana de Crespo',
    desc: 'Estación remota de monitoreo ambiental y energético con panel solar, batería LiFePO4 y enlace LoRa de largo alcance.',
    href: '#telemetria',
    cta: 'Ver demo en vivo',
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Sun,
    tag: 'Energía',
    title: 'Calculadora Fotovoltaica',
    desc: 'Dimensiona paneles, baterías e inversión según el consumo y la radiación de cada región, con retorno estimado.',
    href: '#solar',
    cta: 'Probar calculadora',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: LineChart,
    tag: 'Web · APIs',
    title: 'Dashboard Colombia',
    desc: 'Tablero en tiempo real con TRM, euro, clima de 8 ciudades y pronóstico de 5 días usando APIs públicas abiertas.',
    href: '#datos',
    cta: 'Abrir tablero',
    color: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  },
];

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
};

export default function ProjectsSection() {
  const [repos, setRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: Repo[]) => alive && setRepos(data.filter((r) => !r.fork).slice(0, 6)))
      .catch(() => alive && setRepos([]));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {FEATURED.map((p) => {
          const Icon = p.icon;
          return (
            <a
              key={p.title}
              href={p.href}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:border-slate-700"
            >
              <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 transition group-hover:opacity-100" />
              <div className="flex items-center justify-between">
                <div className={`w-fit rounded-xl border p-2.5 ${p.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-[11px] text-violet-400">{p.tag}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100">{p.title}</h3>
              <p className="flex-1 text-sm text-slate-400">{p.desc}</p>
              <span className="text-sm font-semibold text-cyan-400">{p.cta} →</span>
            </a>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <Github className="h-4 w-4 text-slate-300" /> Repositorios recientes en GitHub
          </h3>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-cyan-400 hover:underline"
          >
            Ver perfil <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {repos === null ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-xl bg-slate-800/50" />
            ))}
          </div>
        ) : repos.length === 0 ? (
          <p className="text-sm text-slate-400">No se pudieron cargar los repositorios en este momento.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-cyan-500/40"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-medium text-slate-100">{repo.name}</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-500 group-hover:text-cyan-400" />
                </div>
                <p className="line-clamp-2 flex-1 text-xs text-slate-400">{repo.description ?? 'Sin descripción.'}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" /> {repo.forks_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
