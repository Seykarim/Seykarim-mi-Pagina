'use client';

import { Cpu, Zap, Globe, Layers } from 'lucide-react';

const SKILLS = [
  {
    icon: Cpu,
    title: 'Sistemas Embebidos & IoT',
    desc: 'Microcontroladores, sensores de campo y adquisición de datos de monitoreo en tiempo real.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Zap,
    title: 'Energía & Monitoreo Solar',
    desc: 'Telemetría para sistemas fotovoltaicos y proyectos energéticos sostenibles.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Globe,
    title: 'Desarrollo Web & Software',
    desc: 'Plataformas interactivas, consumo de APIs REST y dashboards analíticos de alto rendimiento.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: Layers,
    title: 'Ingeniería & Enfoque Territorial',
    desc: 'Innovación tecnológica aplicada al desarrollo comunitario y la conservación del territorio.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
];

export default function EngineeringSkills() {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Áreas de Especialización & Competencias
        </h3>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full font-semibold">
          Ingeniería Electrónica
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SKILLS.map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.title}
              className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-all space-y-2 group"
            >
              <div className={`p-2.5 w-fit rounded-lg border ${skill.bg} ${skill.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                {skill.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {skill.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
