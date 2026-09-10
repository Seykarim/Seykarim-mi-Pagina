'use client';

import { useState, useEffect } from 'react';
import { Clock, Cpu, Activity } from 'lucide-react';

export default function HeaderStatus() {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Bogota',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeStr(new Intl.DateTimeFormat('es-CO', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md text-xs font-mono text-slate-400 shadow-md">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-slate-200 font-semibold">SISTEMA EN LÍNEA</span>
        <span className="text-slate-700">|</span>
        <span className="flex items-center gap-1.5 text-slate-400">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Vercel Edge Server
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Hora Colombia: <strong className="text-slate-100 font-bold">{timeStr || '--:--:--'}</strong></span>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
          <Activity className="w-3 h-3" />
          <span>Telemetría OK</span>
        </div>
      </div>
    </div>
  );
}
