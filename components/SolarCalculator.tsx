'use client';

import { useState } from 'react';
import { Sun, Zap, Leaf, DollarSign, Calculator, BatteryCharging, Wallet } from 'lucide-react';

// Horas sol pico (HSP) aproximadas por región
const REGIONS = [
  { name: 'Valledupar (Cesar)', hsp: 5.2 },
  { name: 'Pueblo Bello (Cesar)', hsp: 4.8 },
  { name: 'La Guajira', hsp: 5.8 },
  { name: 'Barranquilla (Atlántico)', hsp: 5.5 },
  { name: 'Santa Marta (Magdalena)', hsp: 5.4 },
  { name: 'Bucaramanga (Santander)', hsp: 4.6 },
  { name: 'Medellín (Antioquia)', hsp: 4.5 },
  { name: 'Cali (Valle del Cauca)', hsp: 4.5 },
  { name: 'Bogotá (Cundinamarca)', hsp: 4.0 },
];

const PANEL_OPTIONS = [400, 450, 550, 600];
const PERFORMANCE_RATIO = 0.8; // pérdidas por temperatura, cableado, inversor
const DEPTH_OF_DISCHARGE = 0.9; // LiFePO4
const CO2_KG_PER_KWH = 0.45;
const COST_PER_KWP = 4.2e6; // COP, instalado
const COST_PER_KWH_BATTERY = 2.8e6; // COP

const fmt = (n: number) => n.toLocaleString('es-CO', { maximumFractionDigits: 0 });
const compact = (n: number) =>
  n >= 1e6
    ? `${(n / 1e6).toLocaleString('es-CO', { maximumFractionDigits: 1 })} M`
    : n >= 1e3
      ? `${Math.round(n / 1e3)}k`
      : fmt(n);

export default function SolarCalculator() {
  const [kwhMonth, setKwhMonth] = useState(250);
  const [region, setRegion] = useState(0);
  const [panelW, setPanelW] = useState(550);
  const [tariff, setTariff] = useState(950);
  const [autonomy, setAutonomy] = useState(0);

  const hsp = REGIONS[region].hsp;
  const dailyKwh = kwhMonth / 30;
  const requiredKw = dailyKwh / (hsp * PERFORMANCE_RATIO);
  const numPanels = Math.max(1, Math.ceil((requiredKw * 1000) / panelW));
  const installedKw = (numPanels * panelW) / 1000;
  const productionMonth = installedKw * hsp * PERFORMANCE_RATIO * 30;
  const coveredKwh = Math.min(productionMonth, kwhMonth);
  const monthlySavings = coveredKwh * tariff;
  const co2Year = coveredKwh * 12 * CO2_KG_PER_KWH;
  const batteryKwh = (dailyKwh * autonomy) / DEPTH_OF_DISCHARGE;
  const investment = installedKw * COST_PER_KWP + batteryKwh * COST_PER_KWH_BATTERY;
  const paybackYears = monthlySavings > 0 ? investment / (monthlySavings * 12) : Infinity;
  const coverage = Math.round((productionMonth / kwhMonth) * 100);

  const results = [
    { icon: Sun, label: 'Paneles', value: String(numPanels), sub: `de ${panelW} W`, color: 'text-amber-400', border: 'border-amber-500/20' },
    { icon: Zap, label: 'Potencia instalada', value: installedKw.toFixed(2), sub: 'kWp', color: 'text-cyan-400', border: 'border-cyan-500/20' },
    { icon: DollarSign, label: 'Ahorro estimado', value: `$${compact(monthlySavings)}`, sub: 'COP / mes', color: 'text-emerald-400', border: 'border-emerald-500/20' },
    { icon: Leaf, label: 'CO₂ evitado', value: fmt(co2Year), sub: 'kg / año', color: 'text-purple-300', border: 'border-purple-500/20' },
    { icon: BatteryCharging, label: 'Baterías', value: batteryKwh ? batteryKwh.toFixed(1) : '—', sub: 'kWh útiles', color: 'text-sky-400', border: 'border-sky-500/20' },
    {
      icon: Wallet,
      label: 'Inversión aprox.',
      value: `$${compact(investment)}`,
      sub: isFinite(paybackYears) ? `retorno ≈ ${paybackYears.toFixed(1)} años` : 'COP',
      color: 'text-rose-300',
      border: 'border-rose-500/20',
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-slate-900/90 p-6 shadow-2xl">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-emerald-400">
          <Calculator className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Dimensiona tu sistema solar</h3>
          <p className="text-xs text-slate-400">Ajusta los valores y los resultados se recalculan al instante.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-5 rounded-xl border border-slate-800 bg-slate-950/70 p-5 lg:col-span-5">
          <label className="block">
            <span className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-300">
              Consumo mensual
              <span className="font-mono text-lg normal-case text-emerald-400">{kwhMonth} kWh</span>
            </span>
            <input
              type="range"
              min="30"
              max="1500"
              step="10"
              value={kwhMonth}
              onChange={(e) => setKwhMonth(Number(e.target.value))}
              className="w-full cursor-pointer accent-emerald-500"
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Región (horas sol pico)
            <select
              value={region}
              onChange={(e) => setRegion(Number(e.target.value))}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm normal-case tracking-normal text-slate-200 focus:border-emerald-500 focus:outline-none"
            >
              {REGIONS.map((r, i) => (
                <option key={r.name} value={i}>
                  {r.name} · {r.hsp} HSP
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Panel
              <select
                value={panelW}
                onChange={(e) => setPanelW(Number(e.target.value))}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm normal-case tracking-normal text-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                {PANEL_OPTIONS.map((w) => (
                  <option key={w} value={w}>
                    {w} W
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Tarifa COP/kWh
              <input
                type="number"
                min="100"
                max="3000"
                step="10"
                value={tariff}
                onChange={(e) => setTariff(Math.max(0, Number(e.target.value) || 0))}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-300">
              Autonomía con baterías
              <span className="font-mono text-sm normal-case text-emerald-400">
                {autonomy ? `${autonomy} día${autonomy > 1 ? 's' : ''}` : 'Sin baterías'}
              </span>
            </span>
            <input
              type="range"
              min="0"
              max="3"
              step="0.5"
              value={autonomy}
              onChange={(e) => setAutonomy(Number(e.target.value))}
              className="w-full cursor-pointer accent-emerald-500"
            />
          </label>

          <p className="text-[11px] leading-relaxed text-slate-500">
            Supuestos: 80 % de rendimiento global, descarga del 90 % (LiFePO4), ≈ $4,2 M COP por kWp instalado y $2,8 M COP por
            kWh de batería. Valores orientativos; no reemplazan un estudio técnico.
          </p>
        </div>

        <div className="grid grid-cols-2 content-start gap-3 sm:grid-cols-3 lg:col-span-7">
          {results.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.label} className={`rounded-xl border bg-slate-950/80 p-4 text-center ${r.border}`}>
                <Icon className={`mx-auto mb-2 h-6 w-6 ${r.color}`} />
                <span className="block text-[10px] font-semibold uppercase text-slate-400">{r.label}</span>
                <span className={`font-mono text-xl font-extrabold ${r.color}`}>{r.value}</span>
                <span className="mt-1 block text-[10px] text-slate-400">{r.sub}</span>
              </div>
            );
          })}

          <div className="col-span-2 rounded-xl border border-slate-800 bg-slate-950/80 p-4 sm:col-span-3">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Producción solar vs. consumo</span>
              <span className="font-mono">
                {fmt(productionMonth)} kWh/mes · {coverage} %
              </span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${Math.min(coverage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
