'use client';

import { useEffect, useState } from 'react';
import { MapPin, Droplets, Wind, CloudRain, RefreshCw } from 'lucide-react';

interface City {
  name: string;
  department: string;
  lat: number;
  lon: number;
}

const CITIES: City[] = [
  { name: 'Valledupar', department: 'Cesar', lat: 10.4631, lon: -73.2532 },
  { name: 'Pueblo Bello', department: 'Cesar', lat: 10.4167, lon: -73.5833 },
  { name: 'Santa Marta', department: 'Magdalena', lat: 11.2408, lon: -74.199 },
  { name: 'Barranquilla', department: 'Atlántico', lat: 10.9685, lon: -74.7813 },
  { name: 'Bucaramanga', department: 'Santander', lat: 7.1254, lon: -73.1198 },
  { name: 'Medellín', department: 'Antioquia', lat: 6.2442, lon: -75.5812 },
  { name: 'Cali', department: 'Valle del Cauca', lat: 3.4516, lon: -76.532 },
  { name: 'Bogotá', department: 'Cundinamarca', lat: 4.711, lon: -74.0721 },
];

// Códigos WMO de Open-Meteo → icono y descripción
const WMO: Record<number, [string, string]> = {
  0: ['☀️', 'Despejado'],
  1: ['🌤️', 'Mayormente despejado'],
  2: ['⛅', 'Parcialmente nublado'],
  3: ['☁️', 'Nublado'],
  45: ['🌫️', 'Niebla'],
  48: ['🌫️', 'Niebla con escarcha'],
  51: ['🌦️', 'Llovizna ligera'],
  53: ['🌦️', 'Llovizna'],
  55: ['🌧️', 'Llovizna intensa'],
  61: ['🌦️', 'Lluvia ligera'],
  63: ['🌧️', 'Lluvia'],
  65: ['🌧️', 'Lluvia fuerte'],
  80: ['🌦️', 'Chubascos'],
  81: ['🌧️', 'Chubascos'],
  82: ['⛈️', 'Chubascos fuertes'],
  95: ['⛈️', 'Tormenta'],
  96: ['⛈️', 'Tormenta con granizo'],
  99: ['⛈️', 'Tormenta con granizo'],
};
const wmo = (code: number) => WMO[code] ?? ['🌡️', '—'];

const REFRESH_MS = 10 * 60 * 1000;
const STORAGE_KEY = 'weather-city';

interface Forecast {
  date: string;
  code: number;
  max: number;
  min: number;
  rain: number;
}

interface WeatherData {
  temp: number;
  humidity: number;
  wind: number;
  rain: number;
  code: number;
  daily: Forecast[];
}

export default function WeatherWidget() {
  const [cityIdx, setCityIdx] = useState(0);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Recordar la última ciudad elegida
  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(STORAGE_KEY));
      if (saved > 0 && saved < CITIES.length) setCityIdx(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const city = CITIES[cityIdx];
    let alive = true;

    async function fetchWeather() {
      setLoading(true);
      setError(false);
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}` +
          '&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation_probability' +
          '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
          '&timezone=America%2FBogota&forecast_days=5';
        const res = await fetch(url);
        if (!res.ok) throw new Error(String(res.status));
        const d = await res.json();
        if (!alive) return;
        setWeather({
          temp: Math.round(d.current.temperature_2m),
          humidity: d.current.relative_humidity_2m,
          wind: Math.round(d.current.wind_speed_10m),
          rain: d.current.precipitation_probability ?? d.daily.precipitation_probability_max[0],
          code: d.current.weather_code,
          daily: d.daily.time.map((date: string, i: number) => ({
            date,
            code: d.daily.weather_code[i],
            max: Math.round(d.daily.temperature_2m_max[i]),
            min: Math.round(d.daily.temperature_2m_min[i]),
            rain: d.daily.precipitation_probability_max[i],
          })),
        });
      } catch (err) {
        console.error('Error obteniendo clima:', err);
        if (alive) setError(true);
      } finally {
        if (alive) setLoading(false);
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, REFRESH_MS);
    return () => {
      alive = false;
      clearInterval(interval);
    };
  }, [cityIdx]);

  const city = CITIES[cityIdx];
  const [icon, desc] = weather ? wmo(weather.code) : ['', ''];

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-800/80 pb-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 font-medium text-slate-300">
          <MapPin className="h-4 w-4 text-cyan-400" />
          <span className="text-sm font-semibold">Clima en Colombia</span>
        </div>
        <select
          value={cityIdx}
          aria-label="Ciudad"
          onChange={(e) => {
            const idx = Number(e.target.value);
            setCityIdx(idx);
            try {
              localStorage.setItem(STORAGE_KEY, String(idx));
            } catch {}
          }}
          className="cursor-pointer rounded-xl border border-slate-700/80 bg-slate-800/80 px-3 py-1.5 text-sm font-medium text-slate-200 focus:border-cyan-500 focus:outline-none"
        >
          {CITIES.map((c, i) => (
            <option key={c.name} value={i}>
              {c.name} ({c.department})
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <p className="py-6 text-center text-sm text-slate-400">No se pudo cargar el clima. Se reintentará en unos minutos.</p>
      ) : !weather ? (
        <div className="space-y-3">
          <div className="h-20 animate-pulse rounded-xl bg-slate-800/50" />
          <div className="h-24 animate-pulse rounded-xl bg-slate-800/50" />
        </div>
      ) : (
        <>
          <div className={`flex items-center gap-5 transition-opacity ${loading ? 'opacity-50' : ''}`}>
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-4xl">
              {icon}
            </div>
            <div className="min-w-0">
              <div className="font-mono text-4xl font-bold text-slate-100">{weather.temp}°C</div>
              <div className="truncate text-sm text-slate-400">
                {city.name}, {city.department} · {desc}
              </div>
            </div>
            {loading && <RefreshCw className="ml-auto h-4 w-4 animate-spin text-cyan-400" />}
          </div>

          <dl className="grid grid-cols-3 gap-3">
            {[
              { icon: Droplets, label: 'Humedad', value: `${weather.humidity} %` },
              { icon: Wind, label: 'Viento', value: `${weather.wind} km/h` },
              { icon: CloudRain, label: 'Lluvia', value: `${weather.rain} %` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                <dt className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-slate-500">
                  <Icon className="h-3 w-3" /> {label}
                </dt>
                <dd className="font-mono font-bold text-slate-100">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="grid grid-cols-5 gap-2">
            {weather.daily.map((f, i) => (
              <div
                key={f.date}
                title={`${wmo(f.code)[1]} · lluvia ${f.rain} %`}
                className="rounded-xl border border-slate-800 px-1 py-2.5 text-center text-xs"
              >
                <span className="block capitalize text-slate-500">
                  {i === 0 ? 'Hoy' : new Date(f.date + 'T12:00').toLocaleDateString('es-CO', { weekday: 'short' })}
                </span>
                <span className="my-1 block text-xl">{wmo(f.code)[0]}</span>
                <span className="font-mono font-semibold text-slate-200">
                  {f.max}° <span className="font-normal text-slate-500">{f.min}°</span>
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="mt-auto text-[10px] text-slate-500">Fuente: Open-Meteo · se actualiza cada 10 min.</p>
    </div>
  );
}
