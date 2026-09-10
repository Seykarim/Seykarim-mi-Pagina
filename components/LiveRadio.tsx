'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, AlertCircle } from 'lucide-react';

const STATIONS = [
  {
    name: 'Radiónica',
    desc: 'Rock, Indie & Cultura Joven (RTVC)',
    url: 'https://rtvc-radionica.streamguys1.com/radionica-mp3',
  },
  {
    name: 'Radio Nacional',
    desc: 'Música Colombiana & Noticias (RTVC)',
    url: 'https://rtvc-radionacional.streamguys1.com/radionacional-mp3',
  },
  {
    name: 'La X 103.9 FM',
    desc: 'Pop, Rock & Música Electrónica',
    url: 'https://stream.zeno.fm/wv8p3z46gceuv',
  },
];

export default function LiveRadio() {
  const [selectedStation, setSelectedStation] = useState(STATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStationChange = (station: typeof STATIONS[0]) => {
    setSelectedStation(station);
    setIsPlaying(false);
    setHasError(false);
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setHasError(false);
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        setIsPlaying(false);
        setHasError(true);
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col gap-6 shadow-xl">
      <audio
        ref={audioRef}
        src={selectedStation.url}
        preload="none"
        onError={() => {
          setIsPlaying(false);
          setHasError(true);
        }}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Radio className={`w-8 h-8 ${isPlaying ? 'animate-pulse text-purple-400' : 'text-slate-500'}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-100 text-base md:text-lg">{selectedStation.name}</h3>
              <span
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border ${
                  hasError
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    : isPlaying
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    hasError
                      ? 'bg-rose-500'
                      : isPlaying
                      ? 'bg-emerald-400 animate-ping'
                      : 'bg-slate-500'
                  }`}
                />
                {hasError ? 'SIN SEÑAL' : isPlaying ? 'EN VIVO' : 'PAUSADO'}
              </span>
            </div>
            <p className="text-slate-400 text-xs md:text-sm">{selectedStation.desc}</p>
          </div>
        </div>

        <button
          onClick={togglePlay}
          className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 shrink-0"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
        </button>
      </div>

      {hasError && (
        <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>La emisora no está transmitiendo en este momento. Selecciona otra.</span>
        </div>
      )}

      {/* Selector de Canales */}
      <div className="grid grid-cols-3 gap-2 border-t border-slate-800/80 pt-4">
        {STATIONS.map((station) => (
          <button
            key={station.name}
            onClick={() => handleStationChange(station)}
            className={`p-2 rounded-xl border text-left text-xs transition-all ${
              selectedStation.name === station.name
                ? 'bg-purple-500/10 border-purple-500/40 text-purple-300 font-semibold'
                : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="truncate font-medium">{station.name}</div>
          </button>
        ))}
      </div>

      {/* Control de Volumen */}
      <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
        <span className="text-xs text-slate-500 font-mono">Stream Directo MP3 // Colombia</span>
        <div className="flex items-center gap-3">
          <button onClick={toggleMute} className="text-slate-400 hover:text-slate-200 transition-colors">
            {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 md:w-24 accent-purple-500 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
