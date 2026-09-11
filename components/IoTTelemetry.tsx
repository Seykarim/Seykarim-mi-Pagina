'use client';

import { useState } from 'react';
import { Cpu, Wifi, Sun, Battery, Thermometer, Wind, Send, Radio } from 'lucide-react';

export default function IoTTelemetry() {
  const [logs, setLogs] = useState<string[]>([
    '10:42:01 UTC - Paquete LoRaWAN enviado exitosamente (SF7 / 915 MHz)',
    '10:40:00 UTC - Lectura BMS LiFePO4: 13.8V Nominal (Carga OK)',
    '10:35:12 UTC - Estación Sabana de Crespo sincronizada con nodo central',
  ]);
  const [sending, setSending] = useState<boolean>(false);

  const simulatePing = () => {
    setSending(true);
    setTimeout(() => {
      const now = new Date().toLocaleTimeString();
      setLogs((prev) => [
        `${now} UTC - Handshake LoRa manual completado. Sensores 100% operativos.`,
        ...prev.slice(0, 4),
      ]);
      setSending(false);
    }, 800);
  };

  return (
    <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden my-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">Telemetría IoT · Sierra Nevada</h3>
              <span className="bg-cyan-500/20 text-cyan-300 text-xs px-2.5 py-0.5 rounded-full font-mono border border-cyan-500/30">
                Nodo Sabana de Crespo
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Estación remota de monitoreo ambiental y energético diseñada por Ing. Electrónica
            </p>
          </div>
        </div>

        <button
          onClick={simulatePing}
          disabled={sending}
          className="flex items-center gap-2 text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-3.5 py-2 rounded-xl transition shadow-lg shadow-cyan-600/20 active:scale-95 disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
          {sending ? 'Transmitiendo...' : 'Probar Paquete LoRaWAN'}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-center">
          <Sun className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 block uppercase">Panel Solar</span>
          <span className="text-sm font-bold text-white font-mono">13.8 V</span>
        </div>

        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-center">
          <Battery className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 block uppercase">Batería LiFePO4</span>
          <span className="text-sm font-bold text-emerald-400 font-mono">94 %</span>
        </div>

        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-center">
          <Wifi className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 block uppercase">Señal LoRa</span>
          <span className="text-sm font-bold text-white font-mono">-78 dBm</span>
        </div>

        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-center">
          <Thermometer className="w-5 h-5 text-rose-400 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 block uppercase">Temperatura</span>
          <span className="text-sm font-bold text-white font-mono">24.5 °C</span>
        </div>

        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-center">
          <Wind className="w-5 h-5 text-sky-400 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 block uppercase">Humedad</span>
          <span className="text-sm font-bold text-white font-mono">68 %</span>
        </div>

        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-center">
          <Cpu className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 block uppercase">Calidad Aire</span>
          <span className="text-sm font-bold text-emerald-400 font-mono">AQI 18 (Excelente)</span>
        </div>
      </div>

      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-xs text-slate-300">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Registro en tiempo real (UART / LoRa Mesh)</span>
          <span className="text-emerald-400">STATUS: ACTIVE</span>
        </div>
        <div className="space-y-1">
          {logs.map((log, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-cyan-500">&gt;</span>
              <span className={index === 0 ? 'text-cyan-200 font-semibold' : 'text-slate-400'}>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
