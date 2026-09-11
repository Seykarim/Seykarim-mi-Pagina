'use client';

import { useEffect, useState } from 'react';
import { DollarSign, Coffee, Flame, RefreshCw, TrendingUp, Sparkles } from 'lucide-react';

interface MarketData {
  trm: number;
  trmChange: string;
  coffeeUSD: number;
  coffeeCOP: number;
  cacaoUSD: number;
  cacaoCOP: number;
  gasolineCOP: number;
  lastUpdated: string;
  isLive: boolean;
}

export default function MarketWidget() {
  const [data, setData] = useState<MarketData>({
    trm: 3104.03,
    trmChange: '+0.15%',
    coffeeUSD: 3.05,
    coffeeCOP: 12850,
    cacaoUSD: 9400,
    cacaoCOP: 20500,
    gasolineCOP: 15860,
    lastUpdated: '10 de Septiembre, 2026',
    isLive: false,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    fetchLiveTRM();
  }, []);

  const fetchLiveTRM = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (res.ok) {
        const json = await res.json();
        if (json && json.rates && json.rates.COP) {
          const liveTrm = json.rates.COP;
          const now = new Date();
          const dateFormatted = now.toLocaleDateString('es-CO', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });

          setData((prev) => ({
            ...prev,
            trm: Math.round(liveTrm * 100) / 100,
            lastUpdated: `${dateFormatted} (En vivo)`,
            isLive: true,
          }));
        }
      }
    } catch (err) {
      console.error('Error cargando TRM en vivo:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden my-8">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <h3 className="text-lg font-bold text-white tracking-wide">Indicadores Económicos Colombia</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <span>Última actualización: <strong className="text-slate-200">{data.lastUpdated}</strong></span>
            {data.isLive && (
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-mono">
                API Live
              </span>
            )}
          </p>
        </div>

        <button
          onClick={fetchLiveTRM}
          disabled={loading}
          className="flex items-center gap-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition disabled:opacity-50 active:scale-95"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          {loading ? 'Consultando...' : 'Sincronizar Mercado'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 hover:border-emerald-500/40 transition">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Dólar TRM (USD/COP)</span>
            <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            ${data.trm.toLocaleString('es-CO', { minimumFractionDigits: 2 })} <span className="text-xs text-slate-400">COP</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{data.trmChange} hoy</span>
          </div>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 hover:border-amber-500/40 transition">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Café Suave (ICE)</span>
            <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg">
              <Coffee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            ${data.coffeeUSD.toFixed(2)} <span className="text-xs text-slate-400">USD/lb</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Aprox. <strong className="text-slate-200">${data.coffeeCOP.toLocaleString('es-CO')} COP</strong> / lb interna
          </p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 hover:border-amber-600/40 transition">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Cacao Orgánico</span>
            <div className="p-1.5 bg-amber-600/10 text-amber-300 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            ${data.cacaoCOP.toLocaleString('es-CO')} <span className="text-xs text-slate-400">COP/kg</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Int. US <strong className="text-slate-200">${data.cacaoUSD.toLocaleString()} / Ton</strong>
          </p>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 hover:border-sky-500/40 transition">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Gasolina Promedio</span>
            <div className="p-1.5 bg-sky-500/10 text-sky-400 rounded-lg">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            ${data.gasolineCOP.toLocaleString('es-CO')} <span className="text-xs text-slate-400">COP/Gal</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Referencia Valledupar &amp; Cesar</p>
        </div>
      </div>
    </div>
  );
}
