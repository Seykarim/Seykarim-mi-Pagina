'use client';

import { useState } from 'react';
import { Sun, Zap, Leaf, DollarSign, Calculator } from 'lucide-react';

export default function SolarCalculator() {
  const [kwhMonth, setKwhMonth] = useState<number>(250);

  const peakSunHours = 5.2;
  const panelPowerWatts = 550;

  const dailyKwh = kwhMonth / 30;
  const requiredKw = dailyKwh / peakSunHours;
  const numPanels = Math.ceil((requiredKw * 1000) / panelPowerWatts);
  const monthlySavingsCop = kwhMonth * 950;
  const co2OffsetKgYear = kwhMonth * 12 * 0.45;

  return (
    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden my-8">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
        <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Calculadora Solar Fotovoltaica · Caribe &amp; Cesar</h3>
          <p className="text-xs text-slate-400">
            Estima el tamaño del sistema solar ideal para tu hogar o finca según la radiación solar de la región
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-5 bg-slate-950/70 p-5 rounded-xl border border-slate-800">
          <label className="block text-xs text-slate-300 font-semibold uppercase tracking-wider mb-2">
            Consumo Eléctrico Mensual (kWh)
          </label>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="range"
              min="80"
              max="1200"
              step="10"
              value={kwhMonth}
              onChange={(e) => setKwhMonth(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <span className="text-xl font-bold text-emerald-400 font-mono w-24 text-right">
              {kwhMonth} <span className="text-xs text-slate-400">kWh</span>
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex justify-between border-b border-slate-800/80 pb-1">
              <span>Radiación Solar Cesar (HSP):</span>
              <strong className="text-slate-200">5.2 Horas/día</strong>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-1">
              <span>Potencia por Panel:</span>
              <strong className="text-slate-200">550W Tier-1 Monocristalino</strong>
            </div>
            <div className="flex justify-between">
              <span>Tarifa Referencia KWh:</span>
              <strong className="text-slate-200">~$950 COP</strong>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-emerald-500/20 text-center">
            <Sun className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Paneles Necesarios</span>
            <span className="text-2xl font-extrabold text-white font-mono">{numPanels}</span>
            <span className="text-[10px] text-slate-400 block mt-1">de 550W</span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/20 text-center">
            <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Potencia Requerida</span>
            <span className="text-2xl font-extrabold text-cyan-400 font-mono">{requiredKw.toFixed(2)}</span>
            <span className="text-[10px] text-slate-400 block mt-1">kWp instalados</span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-emerald-500/20 text-center">
            <DollarSign className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Ahorro Estimado</span>
            <span className="text-lg font-bold text-emerald-400 font-mono">
              ${(monthlySavingsCop / 1000).toFixed(0)}k
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">COP / mes</span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-purple-500/20 text-center">
            <Leaf className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Reducción CO₂</span>
            <span className="text-lg font-bold text-purple-300 font-mono">
              {co2OffsetKgYear.toFixed(0)}
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">kg / año</span>
          </div>
        </div>
      </div>
    </div>
  );
}
