"use client";

import { useEffect, useState } from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Loader2,
  MapPin,
} from "lucide-react";

// Coordenadas por defecto: Bogota, Colombia.
// Cambia estos valores si quieres mostrar el clima de otra ciudad.
const LOCATION_NAME = "Bogota, Colombia";
const LATITUDE = 4.711;
const LONGITUDE = -74.0721;

type WeatherData = {
  temperature: number;
  windspeed: number;
  weathercode: number;
};

function getWeatherInfo(code: number): { label: string; Icon: typeof Sun } {
  if (code === 0) return { label: "Despejado", Icon: Sun };
  if ([1, 2, 3].includes(code)) return { label: "Parcialmente nublado", Icon: Cloud };
  if ([45, 48].includes(code)) return { label: "Neblina", Icon: CloudFog };
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return { label: "Lluvia", Icon: CloudRain };
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return { label: "Nieve", Icon: CloudSnow };
  if ([95, 96, 99].includes(code))
    return { label: "Tormenta electrica", Icon: CloudLightning };
  return { label: "Clima variable", Icon: Cloud };
}

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading"
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchWeather() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,windspeed_10m,weathercode&timezone=auto`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Open-Meteo respondio con estado ${res.status}`);
        }

        const json = await res.json();

        if (isMounted) {
          setData({
            temperature: json.current.temperature_2m,
            windspeed: json.current.windspeed_10m,
            weathercode: json.current.weathercode,
          });
          setStatus("ready");
        }
      } catch (err) {
        console.error("Error cargando el clima:", err);
        if (isMounted) setStatus("error");
      }
    }

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="glass-card p-8 flex items-center justify-center gap-3 h-32 text-zinc-400 text-sm">
        <Loader2 size={18} className="animate-spin" />
        Cargando clima...
      </div>
    );
  }

  if (status === "error" || !data) {
    return (
      <div className="glass-card p-8 flex items-center justify-center h-32 text-zinc-500 text-sm">
        No se pudo cargar el clima en este momento.
      </div>
    );
  }

  const { label, Icon } = getWeatherInfo(data.weathercode);

  return (
    <div className="glass-card p-6 md:p-8 flex items-center gap-6">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-cyan flex items-center justify-center shrink-0">
        <Icon size={28} className="text-white" />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-xs text-zinc-500">
          <MapPin size={12} />
          {LOCATION_NAME}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-display font-bold text-gradient">
            {Math.round(data.temperature)}°C
          </span>
          <span className="text-sm text-zinc-400">{label}</span>
        </div>
        <span className="text-xs text-zinc-500">
          Viento: {Math.round(data.windspeed)} km/h
        </span>
      </div>
    </div>
  );
}
