'use client';

import { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, SunMedium } from 'lucide-react';

interface CityWeather {
  name: string;
  temp: number;
  code: number;
}

const CITIES = [
  { name: 'Valledupar', lat: 10.4631, lon: -73.2532 },
  { name: 'Bogotá', lat: 4.6097, lon: -74.0817 },
  { name: 'Medellín', lat: 6.2518, lon: -75.5636 },
  { name: 'Santa Marta', lat: 11.2408, lon: -74.1990 }
];

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const results = await Promise.all(
          CITIES.map(async (city) => {
            const res = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code`
            );
            const data = await res.json();
            return {
              name: city.name,
              temp: Math.round(data.current.temperature_2m),
              code: data.current.weather_code
            };
          })
        );
        setWeatherData(results);
      } catch {
        // Fallback silencioso en caso de fallo de red
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="w-6 h-6 text-amber-400" />;
    if (code >= 1 && code <= 3) return <SunMedium className="w-6 h-6 text-yellow-300" />;
    if (code >= 45 && code <= 48) return <Cloud className="w-6 h-6 text-slate-400" />;
    if (code >= 51) return <CloudRain className="w-6 h-6 text-blue-400" />;
    return <Sun className="w-6 h-6 text-amber-400" />;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-slate-800/40 animate-pulse border border-slate-700/50" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {weatherData.map((city) => (
        <div
          key={city.name}
          className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col justify-between hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-200 text-sm">{city.name}</span>
            {getWeatherIcon(city.code)}
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white">{city.temp}</span>
            <span className="text-cyan-400 font-semibold text-lg">°C</span>
          </div>
        </div>
      ))}
    </div>
  );
}
