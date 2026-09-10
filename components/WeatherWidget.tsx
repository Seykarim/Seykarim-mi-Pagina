'use client';

import { useEffect, useState } from 'react';
import { CloudRain, Thermometer, CloudSun, MapPin, Loader2 } from 'lucide-react';

interface City {
  name: string;
  department: string;
  lat: number;
  lon: number;
}

const CITIES: City[] = [
  { name: 'Valledupar', department: 'Cesar', lat: 10.4631, lon: -73.2532 },
  { name: 'Pueblo Bello', department: 'Cesar', lat: 10.4167, lon: -73.5833 },
  { name: 'Bogotá', department: 'Cundinamarca', lat: 4.7110, lon: -74.0721 },
  { name: 'Medellín', department: 'Antioquia', lat: 6.2442, lon: -75.5812 },
  { name: 'Cali', department: 'Valle del Cauca', lat: 3.4516, lon: -76.5320 },
  { name: 'Barranquilla', department: 'Atlántico', lat: 10.9685, lon: -74.7813 },
  { name: 'Bucaramanga', department: 'Santander', lat: 7.1254, lon: -73.1198 },
];

interface WeatherData {
  city: City;
  temp: number;
  precipProb: number;
}

export default function WeatherWidget() {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lon}&current_weather=true&hourly=precipitation_probability&forecast_days=1`,
          { next: { revalidate: 3600 } }
        );
        const data = await res.json();
        const currentHour = new Date().getHours();
        const precipProb = data.hourly?.precipitation_probability?.[currentHour] ?? 0;

        setWeather({
          city: selectedCity,
          temp: Math.round(data.current_weather.temperature),
          precipProb,
        });
      } catch (err) {
        console.error('Error obteniendo clima:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, 3600000); // Refresco cada 1 hora
    return () => clearInterval(interval);
  }, [selectedCity]);

  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col gap-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-semibold">Ubicación Climatológica</span>
        </div>
        
        {/* Selector de Ciudad */}
        <select
          value={selectedCity.name}
          onChange={(e) => {
            const found = CITIES.find((c) => c.name === e.target.value);
            if (found) setSelectedCity(found);
          }}
          className="bg-slate-800/80 text-slate-200 text-xs md:text-sm font-medium px-3 py-1.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-cyan-500 cursor-pointer"
        >
          {CITIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name} ({c.department})
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <CloudSun className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-slate-100">{weather?.city.name}</h3>
                <span className="text-xs text-slate-400 font-mono">{weather?.city.department}</span>
              </div>
              <div className="flex items-center gap-4 text-xs md:text-sm text-slate-400 mt-1">
                <span className="flex items-center gap-1 font-semibold text-slate-200">
                  <Thermometer className="w-4 h-4 text-cyan-400" />
                  {weather ? `${weather.temp}°C` : '--'}
                </span>
                <span className="flex items-center gap-1">
                  <CloudRain className="w-4 h-4 text-blue-400" />
                  Prob. Lluvia: <strong className="text-slate-200">{weather ? `${weather.precipProb}%` : '--'}</strong>
                </span>
              </div>
            </div>
          </div>
          <span className="hidden md:inline-block text-[10px] font-mono text-slate-500 border border-slate-800 px-2.5 py-1 rounded-full">
            Refresco: 1h
          </span>
        </div>
      )}
    </div>
  );
}
