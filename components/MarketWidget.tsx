'use client';

import { useEffect, useState } from 'react';
import { DollarSign, Euro, Coffee, Flame, RefreshCw, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

// Valores de referencia (no provienen de una API en vivo)
const COFFEE_USD_LB = 3.05;
const CACAO_COP_KG = 20500;
const CACAO_USD_TON = 9400;
const GASOLINE_COP_GAL = 15860;

interface Rates {
  usd: number;
  eur: number;
  updated: string;
}

const STORAGE_KEY = 'market-last-rates';

const money = (n: number, decimals = 2) =>
  n.toLocaleString('es-CO', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

function readPrevious(): Rates | null {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  } catch {
    return null;
  }
}

function Delta({ now, before }: { now: number; before?: number }) {
  if (!before || before === now) return <span className="text-xs text-slate-500">Fuente: open.er-api.com</span>;
  const pct = ((now - before) / before) * 100;
  const up = pct >= 0;
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <span className={`flex items-center gap-1 text-xs font-medium ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
      <Icon className="h-3.5 w-3.5" />
      {Math.abs(pct).toFixed(2)} % vs. tu última visita
    </span>
  );
}

function Badge({ live }: { live: boolean }) {
  return live ? (
    <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[9px] text-emerald-400">EN VIVO</span>
  ) : (
    <span className="rounded bg-slate-700/50 px-1.5 py-0.5 font-mono text-[9px] text-slate-400">REF.</span>
  );
}

export default function MarketWidget() {
  const [rates, setRates] = useState<Rates | null>(null);
  const [previous, setPrevious] = useState<Rates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchRates = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) throw new Error(String(res.status));
      const json = await res.json();
      const next: Rates = {
        usd: json.rates.COP,
        eur: json.rates.COP / json.rates.EUR,
        updated: json.time_last_update_utc,
      };
      const prev = readPrevious();
      setPrevious(prev);
      setRates(next);
      // Guardamos solo cuando la fuente publicó un dato nuevo
      if (!prev || prev.updated !== next.updated) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
      }
    } catch (err) {
      console.error('Error cargando divisas:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const updatedLabel = rates
    ? new Date(rates.updated).toLocaleString('es-CO', { timeZone: 'America/Bogota', dateStyle: 'long', timeStyle: 'short' })
    : null;

  const cards = [
    {
      label: 'Dólar (USD/COP)',
      icon: DollarSign,
      tint: 'bg-emerald-500/10 text-emerald-400',
      live: true,
      value: rates ? `$${money(rates.usd)}` : '—',
      unit: 'COP',
      foot: rates ? <Delta now={rates.usd} before={previous?.usd} /> : null,
    },
    {
      label: 'Euro (EUR/COP)',
      icon: Euro,
      tint: 'bg-sky-500/10 text-sky-400',
      live: true,
      value: rates ? `$${money(rates.eur)}` : '—',
      unit: 'COP',
      foot: rates ? <Delta now={rates.eur} before={previous?.eur} /> : null,
    },
    {
      label: 'Café suave (ICE)',
      icon: Coffee,
      tint: 'bg-amber-500/10 text-amber-400',
      live: false,
      value: `$${COFFEE_USD_LB.toFixed(2)}`,
      unit: 'USD/lb',
      foot: rates ? (
        <span className="text-xs text-slate-400">
          ≈ <strong className="text-slate-200">${money(COFFEE_USD_LB * rates.usd, 0)} COP</strong> / lb al cambio de hoy
        </span>
      ) : null,
    },
    {
      label: 'Cacao orgánico',
      icon: Sparkles,
      tint: 'bg-amber-600/10 text-amber-300',
      live: false,
      value: `$${money(CACAO_COP_KG, 0)}`,
      unit: 'COP/kg',
      foot: (
        <span className="text-xs text-slate-400">
          Int. US <strong className="text-slate-200">${CACAO_USD_TON.toLocaleString('es-CO')} / ton</strong>
        </span>
      ),
    },
    {
      label: 'Gasolina promedio',
      icon: Flame,
      tint: 'bg-rose-500/10 text-rose-400',
      live: false,
      value: `$${money(GASOLINE_COP_GAL, 0)}`,
      unit: 'COP/gal',
      foot: <span className="text-xs text-slate-400">Referencia Valledupar &amp; Cesar</span>,
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-md">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold tracking-wide text-white">Indicadores económicos</h3>
          <p className="mt-1 text-xs text-slate-400">
            {error
              ? 'No se pudo conectar con la API de divisas. Intenta de nuevo.'
              : updatedLabel
                ? `Última actualización de la fuente: ${updatedLabel}`
                : 'Cargando…'}
          </p>
        </div>

        <button
          onClick={fetchRates}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-slate-700 active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          {loading ? 'Consultando…' : 'Actualizar'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="flex flex-col gap-2 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 transition hover:border-slate-700">
              <div className="flex items-start justify-between gap-2">
                <span className="flex flex-wrap items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                  {c.label} <Badge live={c.live} />
                </span>
                <div className={`rounded-lg p-1.5 ${c.tint}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="font-mono text-2xl font-bold text-white">
                {c.value} <span className="text-xs text-slate-400">{c.unit}</span>
              </div>
              <div className="min-h-[1rem]">{c.foot}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
