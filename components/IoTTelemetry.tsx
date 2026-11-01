'use client';

import { useEffect, useRef, useState } from 'react';
import { Cpu, Wifi, Sun, Battery, Thermometer, Droplets, Send, Radio, Pause, Play } from 'lucide-react';

type SensorId = 'pv' | 'bat' | 'rssi' | 'temp' | 'hum' | 'aqi';

interface Sensor {
  id: SensorId;
  label: string;
  unit: string;
  icon: typeof Sun;
  color: string;
  min: number;
  max: number;
  jitter: number;
  decimals: number;
  sub: string;
}

const SENSORS: Sensor[] = [
  { id: 'pv', label: 'Panel Solar', unit: 'V', icon: Sun, color: 'text-amber-400', min: 12.4, max: 14.6, jitter: 0.12, decimals: 1, sub: 'Entrada MPPT' },
  { id: 'bat', label: 'Batería LiFePO4', unit: '%', icon: Battery, color: 'text-emerald-400', min: 70, max: 100, jitter: 0.4, decimals: 0, sub: 'BMS · 12.8 V nom.' },
  { id: 'rssi', label: 'Señal LoRa', unit: 'dBm', icon: Wifi, color: 'text-cyan-400', min: -105, max: -60, jitter: 2, decimals: 0, sub: 'SF7 · 915 MHz' },
  { id: 'temp', label: 'Temperatura', unit: '°C', icon: Thermometer, color: 'text-rose-400', min: 16, max: 32, jitter: 0.15, decimals: 1, sub: 'Sensor BME280' },
  { id: 'hum', label: 'Humedad', unit: '%', icon: Droplets, color: 'text-sky-400', min: 40, max: 95, jitter: 0.6, decimals: 0, sub: 'Relativa' },
  { id: 'aqi', label: 'Calidad Aire', unit: 'AQI', icon: Cpu, color: 'text-purple-400', min: 5, max: 60, jitter: 1, decimals: 0, sub: '' },
];

const INITIAL: Record<SensorId, number> = { pv: 13.8, bat: 94, rssi: -78, temp: 24.5, hum: 68, aqi: 18 };
const HISTORY = 60;
const TICK_MS = 2000;

interface LogLine {
  id: number;
  time: string;
  text: string;
  tone: 'info' | 'ok' | 'warn';
}

const clockCO = () =>
  new Date().toLocaleTimeString('es-CO', { timeZone: 'America/Bogota', hour12: false });

const aqiLabel = (v: number) => (v <= 50 ? 'Excelente' : v <= 100 ? 'Moderada' : 'Dañina');

// Gráfica SVG sencilla de la variable seleccionada
function Sparkline({ data, decimals }: { data: number[]; decimals: number }) {
  const W = 600;
  const H = 160;
  const lo = Math.min(...data);
  const hi = Math.max(...data);
  const pad = (hi - lo) * 0.2 || 1;
  const min = lo - pad;
  const max = hi + pad;
  const x = (i: number) => (i / (data.length - 1)) * W;
  const y = (v: number) => H - ((v - min) / (max - min)) * H;
  const line = data.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const last = data[data.length - 1];

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-40 w-full overflow-visible" role="img" aria-label="Historial de la variable seleccionada">
        <defs>
          <linearGradient id="tele-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="#1e293b" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
        <path d={`${line} L${W},${H} L0,${H} Z`} fill="url(#tele-fill)" />
        <path d={line} fill="none" stroke="#22d3ee" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <circle cx={x(data.length - 1)} cy={y(last)} r="4" fill="#22d3ee" />
      </svg>
      <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-500">
        <span>−2 min</span>
        <span>
          mín {lo.toFixed(decimals)} · máx {hi.toFixed(decimals)}
        </span>
        <span>ahora</span>
      </div>
    </div>
  );
}

export default function IoTTelemetry() {
  const [history, setHistory] = useState<Record<SensorId, number[]>>(() => {
    const h = {} as Record<SensorId, number[]>;
    SENSORS.forEach((s) => (h[s.id] = Array(HISTORY).fill(INITIAL[s.id])));
    return h;
  });
  const [selected, setSelected] = useState<SensorId>('pv');
  const [paused, setPaused] = useState(false);
  const [sending, setSending] = useState(false);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const logId = useRef(0);

  const log = (text: string, tone: LogLine['tone'] = 'info') =>
    setLogs((prev) => [{ id: logId.current++, time: clockCO(), text, tone }, ...prev].slice(0, 8));

  const historyRef = useRef(history);
  historyRef.current = history;
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    // Historial inicial: caminata aleatoria que termina en el valor actual (solo en el cliente)
    const seeded = {} as Record<SensorId, number[]>;
    SENSORS.forEach((s) => {
      const walk = [INITIAL[s.id]];
      for (let i = 1; i < HISTORY; i++) {
        const v = walk[0] - (Math.random() - 0.5) * s.jitter * 2;
        walk.unshift(Math.min(s.max, Math.max(s.min, v)));
      }
      seeded[s.id] = walk;
    });
    setHistory(seeded);
    log('Estación Sabana de Crespo sincronizada con nodo central', 'ok');
    log(`Lectura BMS LiFePO4: ${INITIAL.pv.toFixed(1)} V (carga OK)`);
  }, []);

  // Simulación: cada sensor deriva aleatoriamente dentro de su rango
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      const prev = historyRef.current;
      const next = {} as Record<SensorId, number[]>;
      SENSORS.forEach((s) => {
        const last = prev[s.id][HISTORY - 1];
        const v = Math.min(s.max, Math.max(s.min, last + (Math.random() - 0.5) * s.jitter * 2));
        next[s.id] = [...prev[s.id].slice(1), v];
      });
      setHistory(next);

      if (Math.random() < 0.35) {
        const cur = (k: SensorId) => next[k][HISTORY - 1];
        const messages = [
          `Lectura BMS LiFePO4: ${cur('pv').toFixed(1)} V · SOC ${cur('bat').toFixed(0)} %`,
          `BME280 → T=${cur('temp').toFixed(1)} °C  HR=${cur('hum').toFixed(0)} %`,
          `Enlace LoRa estable · RSSI ${cur('rssi').toFixed(0)} dBm · SNR ${(7 + Math.random() * 3).toFixed(1)} dB`,
        ];
        log(messages[Math.floor(Math.random() * messages.length)]);
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [paused]);

  const togglePause = () => {
    log(paused ? 'Adquisición reanudada' : 'Adquisición en pausa', 'warn');
    setPaused((p) => !p);
  };

  const sendPacket = () => {
    setSending(true);
    log('TX uplink → gateway (SF7 / BW125 / 915 MHz)…', 'warn');
    setTimeout(() => {
      const fcnt = Math.floor(Math.random() * 9000 + 1000);
      log(`Paquete LoRaWAN confirmado · FCnt ${fcnt} · ${(40 + Math.random() * 30).toFixed(0)} ms airtime`, 'ok');
      setSending(false);
    }, 1200);
  };

  const sel = SENSORS.find((s) => s.id === selected)!;
  const value = (s: Sensor) => history[s.id][HISTORY - 1];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-6 shadow-2xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2.5 text-cyan-400">
            <Radio className={`h-6 w-6 ${paused ? '' : 'animate-pulse'}`} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-white">Nodo Sabana de Crespo</h3>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] text-amber-300">
                Simulación
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-400">
              Datos generados en el navegador para demostrar el comportamiento de la estación.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={togglePause}
            aria-pressed={paused}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs text-slate-200 transition hover:border-cyan-500/50"
          >
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {paused ? 'Reanudar' : 'Pausar'}
          </button>
          <button
            onClick={sendPacket}
            disabled={sending}
            className="flex items-center gap-2 rounded-xl bg-cyan-600 px-3.5 py-2 text-xs text-white shadow-lg shadow-cyan-600/20 transition hover:bg-cyan-500 active:scale-95 disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            {sending ? 'Transmitiendo…' : 'Enviar paquete LoRaWAN'}
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {SENSORS.map((s) => {
          const Icon = s.icon;
          const active = s.id === selected;
          return (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              aria-pressed={active}
              className={`rounded-xl border p-3 text-center transition hover:-translate-y-0.5 ${
                active ? 'border-cyan-400 bg-cyan-500/10 ring-1 ring-cyan-400' : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
              }`}
            >
              <Icon className={`mx-auto mb-1 h-5 w-5 ${s.color}`} />
              <span className="block text-[10px] uppercase text-slate-400">{s.label}</span>
              <span className="font-mono text-sm font-bold text-white">
                {value(s).toFixed(s.decimals)} {s.unit}
              </span>
              <span className="block text-[10px] text-slate-500">{s.id === 'aqi' ? aqiLabel(value(s)) : s.sub}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="mb-2 text-xs text-slate-400">
            {sel.label} ({sel.unit}) · clic en un sensor para cambiar
          </div>
          <Sparkline data={history[selected]} decimals={sel.decimals} />
        </div>

        <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-300">
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-500">
            <span>Registro (UART / LoRa Mesh)</span>
            <span className={paused ? 'text-amber-400' : 'text-emerald-400'}>{paused ? 'PAUSED' : 'ACTIVE'}</span>
          </div>
          <ol className="space-y-1" aria-live="polite">
            {logs.map((l, i) => (
              <li key={l.id} className="flex gap-2 truncate">
                <span className="text-cyan-500">&gt;</span>
                <span className="text-slate-500">{l.time}</span>
                <span
                  className={`truncate ${
                    l.tone === 'ok' ? 'text-emerald-300' : l.tone === 'warn' ? 'text-amber-300' : i === 0 ? 'text-cyan-200' : 'text-slate-400'
                  }`}
                >
                  {l.text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
