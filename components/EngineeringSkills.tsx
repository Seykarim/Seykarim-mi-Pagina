'use client';

import { Cpu, Zap, Globe, Layers } from 'lucide-react';

const SKILLS = [
  {
    icon: Cpu,
    title: 'Sistemas Embebidos & IoT',
    tags: ['ESP32', 'Arduino', 'LoRaWAN', 'C/C++'],
    desc: 'Microcontroladores, sensores de campo y adquisición de datos de monitoreo en tiempo real.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Zap,
    title: 'Energía & Monitoreo Solar',
    tags: ['Fotovoltaica', 'BMS', 'LiFePO4'],
    desc: 'Telemetría para sistemas fotovoltaicos y proyectos energéticos sostenibles.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Globe,
    title: 'Desarrollo Web & Software',
    tags: ['TypeScript', 'React / Next.js', 'APIs REST'],
    desc: 'Plataformas interactivas, consumo de APIs REST y dashboards analíticos de alto rendimiento.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: Layers,
    title: 'Ingeniería & Enfoque Territorial',
    tags: ['Comunidad', 'Ambiente', 'Ruralidad'],
    desc: 'Innovación tecnológica aplicada al desarrollo comunitario y la conservación del territorio.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
];

export default function EngineeringSkills() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {SKILLS.map((skill) => {
        const Icon = skill.icon;
        return (
          <div
            key={skill.title}
            className="flex flex-col gap-2 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-xl hover:-translate-y-1 hover:border-slate-700 transition-all group"
          >
            <div className={`p-2.5 w-fit rounded-lg border ${skill.bg} ${skill.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
              {skill.title}
            </h4>
            <p className="flex-1 text-sm text-slate-400 leading-relaxed">
              {skill.desc}
            </p>
            <ul className="flex flex-wrap gap-1.5 pt-1">
              {skill.tags.map((tag) => (
                <li key={tag} className="px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-800 font-mono text-[10px] text-slate-400">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
