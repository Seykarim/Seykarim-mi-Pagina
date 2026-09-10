'use client';

import { useEffect, useState } from 'react';
import { DollarSign, Coffee, Fuel, TrendingUp, Loader2 } from 'lucide-react';

interface MarketData {
  trm: number;
  coffeeCopLb: number;
  cocoaUsdTon: number;
  gasolinePrice: number;
  updatedAt: string;
}

export default function MarketWidget() {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMarketData() {
      try {
        // 1. Obtener TRM Oficial de Datos Abiertos Colombia
        const trmRes = await fetch(
          'https://www.datos.gov.co/resource/32sa-24dr.json?$limit=1&$order=vigenciadesde%20DESC'
        );
        const trmData = await trmRes.json();
        const trmVal = parseFloat(trmData[0]?.valor || '4000');

        // 2. Estimación / Cálculo del café (USD/lb internacional * TRM)
        // Precio referencia bolsa NY aprox $2.45 USD/lb
        const coffeeUsdLb = 2.45; 
        const coffeeCopLb = Math.round(coffeeUsdLb * trmVal);

        // 3. Precio Cacao (USD / Tonelada métrica)
        const cocoaUsdTon = 7800;

        // 4. Precio promedio regulado de Gasolina en Colombia (COP / Galón)
        const gasolinePrice = 15860;

        setData({
          trm: trmVal,
          coffeeCopLb,
          cocoaUsdTon,
          gasolinePrice,
          updatedAt: new Date().toLocaleDateString('es-CO'),
        });
      } catch (err) {
        console.error('Error al cargar datos económicos:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMarketData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-center min-h-[140px]">
        <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* TRM Dólar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-mono">Dólar TRM</span>
          <DollarSign className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-xl md:text-2xl font-bold text-slate-100">
          ${data?.trm.toLocaleString('es-CO')}
        </div>
        <span className="text-[10px] text-slate-500 font-mono">COP / USD</span>
      </div>

      {/* Café Colombia */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-mono">Café (Libra)</span>
          <Coffee className="w-4 h-4 text-amber-500" />
        </div>
        <div className="text-xl md:text-2xl font-bold text-slate-100">
          ${data?.coffeeCopLb.toLocaleString('es-CO')}
        </div>
        <span className="text-[10px] text-slate-500 font-mono">COP / lb ref.</span>
      </div>

      {/* Cacao */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-mono">Cacao</span>
          <TrendingUp className="w-4 h-4 text-purple-400" />
        </div>
        <div className="text-xl md:text-2xl font-bold text-slate-100">
          ${data?.cocoaUsdTon.toLocaleString('en-US')}
        </div>
        <span className="text-[10px] text-slate-500 font-mono">USD / Tonelada</span>
      </div>

      {/* Gasolina Regulación */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-mono">Gasolina Prom.</span>
          <Fuel className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="text-xl md:text-2xl font-bold text-slate-100">
          ${data?.gasolinePrice.toLocaleString('es-CO')}
        </div>
        <span className="text-[10px] text-slate-500 font-mono">COP / Galón Ref.</span>
      </div>
    </div>
  );
}
