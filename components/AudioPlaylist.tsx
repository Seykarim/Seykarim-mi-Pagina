'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, SkipForward, SkipBack } from 'lucide-react';

interface Track {
  title: string;
  artist: string;
  url: string;
}

const PLAYLIST: Track[] = [
  {
    title: 'Sierra Ambient',
    artist: 'Relajación & Armonía Natural',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
  },
  {
    title: 'Flauta & Instrumentos de Viento',
    artist: 'Música Instrumental Ancestral',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=relaxing-mountains-141198.mp3',
  },
  {
    title: 'Acoustic Peace',
    artist: 'Guitarra Instrumental',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=sweet-love-121561.mp3',
  },
];

export default function AudioPlaylist() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = PLAYLIST[currentIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTrackChange = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[index].url;
      audioRef.current.load();
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % PLAYLIST.length;
    handleTrackChange(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    handleTrackChange(prevIdx);
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
        onEnded={handleNext}
        preload="metadata"
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Music className={`w-8 h-8 ${isPlaying ? 'animate-bounce text-purple-400' : 'text-slate-500'}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-100 text-base md:text-lg">{currentTrack.title}</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                PLAYLIST
              </span>
            </div>
            <p className="text-slate-400 text-xs md:text-sm">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Controles de Reproducción */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
            aria-label="Anterior"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button
            onClick={togglePlay}
            className="p-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 shrink-0"
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
            aria-label="Siguiente"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lista de Pistas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-t border-slate-800/80 pt-4">
        {PLAYLIST.map((track, idx) => (
          <button
            key={track.title}
            onClick={() => handleTrackChange(idx)}
            className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
              currentIndex === idx
                ? 'bg-purple-500/10 border-purple-500/40 text-purple-300 font-semibold'
                : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="truncate font-medium">{track.title}</div>
            <div className="text-[10px] text-slate-500 truncate">{track.artist}</div>
          </button>
        ))}
      </div>

      {/* Control de Volumen */}
      <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
        <span className="text-xs text-slate-500 font-mono">Audio Digital Ambient</span>
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
