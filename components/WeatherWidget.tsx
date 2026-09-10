'use client';

import { useEffect, useState } from 'react';
import { CloudRain, Thermometer, CloudSun } from 'lucide-react';

interface WeatherData {
  city: string;
  temp: number;
  precipProb: number;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Coordenadas de Valledupar (Lat: 10.4631, Lon: -73.2532)
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=10.4631&longitude=-73.2532&current_weather=true&hourly=precipitation_probability&forecast_days=1',
          { next: { revalidate: 3600 } }
        );
        const data = await res.json();
        
        const currentHour = new Date().getHours();
        const precipProb = data.hourly?.precipitation_probability[currentHour] || 0;

        setWeather({
          city: 'Valledupar',
          temp: Math.round(data.current_weather.temperature),
          precipProb,
        });
      } catch (err) {
        console.error('Error obteniendo clima:', err);
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, 3600000); // Refresco cada 1 hora
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
          <CloudSun className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-100">{weather?.city || 'Valledupar'}</h3>
          <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
            <span className="flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
              {weather ? `${weather.temp}°C` : '--'}
            </span>
            <span className="flex items-center gap-1">
              <CloudRain className="w-3.5 h-3.5 text-blue-400" />
              Prob. Lluvia: {weather ? `${weather.precipProb}%` : '--'}
            </span>
          </div>
        </div>
      </div>
      <span className="text-[10px] font-mono text-slate-500 border border-slate-800 px-2.5 py-1 rounded-full">
        Refresco: 1h
      </span>
    </div>
  );
}
