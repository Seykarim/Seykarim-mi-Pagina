'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, SkipForward, SkipBack, Repeat } from 'lucide-react';

interface Track {
  title: string;
  artist: string;
  url: string;
  duration?: string;
}

const PLAYLIST: Track[] = [
  {
    title: 'Sierra Ambient',
    artist: 'Relajación & Armonía Natural',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
  },
  {
    title: 'Flauta & Viento Ancestral',
    artist: 'Música Instrumental de Montaña',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=relaxing-mountains-141198.mp3',
  },
  {
    title: 'Ecos de la Sierra',
    artist: 'Guitarra Acústica & Atmósfera',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=sweet-love-121561.mp3',
  },
  {
    title: 'Amanecer en la Montaña',
    artist: 'Atmósfera Méditativa & Naturaleza',
    url: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_8a3f81e3a2.mp3?filename=ambient-piano-amp-strings-10711.mp3',
  },
  {
    title: 'Río Guatapurí Ambient',
    artist: 'Sonidos de Agua & Viento Calmo',
    url: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939a04a11.mp3?filename=soft-ambient-124434.mp3',
  },
];

export default function AudioPlaylist() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isContinuous, setIsContinuous] = useState(true); // Bucle infinito activado por defecto
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = PLAYLIST[currentIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playTrack = (index: number, shouldPlay: boolean = true) => {
    setCurrentIndex(index);
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[index].url;
      audioRef.current.load();
      if (shouldPlay) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(false);
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % PLAYLIST.length;
    playTrack(nextIdx, isPlaying || isContinuous);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    playTrack(prevIdx, isPlaying || isContinuous);
  };

  const handleEnded = () => {
    if (isContinuous) {
      handleNext(); // Pasa a la siguiente y REPRODUCE automáticamente
    } else {
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col gap-6 shadow-xl">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={handleEnded}
        preload="metadata"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
            <Music className={`w-8 h-8 ${isPlaying ? 'animate-pulse text-purple-400' : 'text-slate-500'}`} />
            {isPlaying && (
              <span className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500" />
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-100 text-base md:text-lg">{currentTrack.title}</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                Pista {currentIndex + 1} de {PLAYLIST.length}
              </span>
            </div>
            <p className="text-slate-400 text-xs md:text-sm">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Controles de Reproducción */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setIsContinuous(!isContinuous)}
            className={`p-2.5 rounded-xl border transition-all ${
              isContinuous
                ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                : 'bg-slate-800/80 border-slate-700/50 text-slate-500 hover:text-slate-300'
            }`}
            title={isContinuous ? 'Modo Bucle Continuo Activado (Infinito)' : 'Modo Continuo Desactivado'}
          >
            <Repeat className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
            aria-label="Anterior"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button
            onClick={togglePlay}
            className="p-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 shrink-0 cursor-pointer"
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
            aria-label="Siguiente"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lista de Pistas en Cuadrícula */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 border-t border-slate-800/80 pt-4">
        {PLAYLIST.map((track, idx) => (
          <button
            key={track.title}
            onClick={() => playTrack(idx, true)}
            className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
              currentIndex === idx
                ? 'bg-purple-500/10 border-purple-500/40 text-purple-300 font-semibold shadow-sm'
                : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="truncate font-medium flex items-center justify-between">
              <span>{track.title}</span>
              {currentIndex === idx && isPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shrink-0 ml-1" />
              )}
            </div>
            <div className="text-[10px] text-slate-500 truncate">{track.artist}</div>
          </button>
        ))}
      </div>

      {/* Control de Volumen e Información del Bucle */}
      <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">Bucle Infinito:</span>
          <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full ${isContinuous ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-slate-500 bg-slate-800'}`}>
            {isContinuous ? 'ACTIVADO ∞' : 'DESACTIVADO'}
          </span>
        </div>

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
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 md:w-24 accent-purple-500 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
