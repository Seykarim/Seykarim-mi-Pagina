"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Radio as RadioIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Configura aqui la URL de tu stream, o define NEXT_PUBLIC_RADIO_STREAM_URL
// en tu archivo .env.local para no tocar este archivo.
const DEFAULT_STREAM_URL = "";
const STREAM_URL = process.env.NEXT_PUBLIC_RADIO_STREAM_URL || DEFAULT_STREAM_URL;

export default function RadioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [status, setStatus] = useState<"idle" | "loading" | "playing" | "error">(
    "idle"
  );

  const hasStream = STREAM_URL.trim().length > 0;

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio || !hasStream) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setStatus("idle");
    } else {
      setStatus("loading");
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setStatus("playing");
        })
        .catch(() => {
          setStatus("error");
          setIsPlaying(false);
        });
    }
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
      if (value === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  }

  if (!hasStream) {
    return (
      <div className="glass-card p-8 flex flex-col items-center justify-center h-32 text-zinc-500 text-sm gap-1">
        <RadioIcon size={20} className="text-neon-pink" />
        <span>
          Aun no hay una URL de stream configurada. Define{" "}
          <code className="text-zinc-400">NEXT_PUBLIC_RADIO_STREAM_URL</code>{" "}
          en tu .env.local
        </span>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
      <audio
        ref={audioRef}
        src={STREAM_URL}
        preload="none"
        onWaiting={() => setStatus("loading")}
        onPlaying={() => setStatus("playing")}
        onError={() => {
          setStatus("error");
          setIsPlaying(false);
        }}
      />

      <button
        onClick={togglePlay}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-all",
          "bg-gradient-to-br from-neon-pink to-neon-purple shadow-neon-purple",
          "hover:scale-105 active:scale-95"
        )}
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        {isPlaying ? (
          <Pause size={24} className="text-white" />
        ) : (
          <Play size={24} className="text-white ml-1" />
        )}
      </button>

      <div className="flex-1 flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "w-2 h-2 rounded-full",
              status === "playing" ? "bg-neon-pink animate-pulse" : "bg-zinc-600"
            )}
          />
          <span className="text-sm text-zinc-300">
            {status === "playing" && "En vivo"}
            {status === "loading" && "Conectando..."}
            {status === "error" && "No se pudo conectar al stream"}
            {status === "idle" && "Emisora en pausa"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleMute} aria-label="Silenciar">
            {isMuted || volume === 0 ? (
              <VolumeX size={18} className="text-zinc-400" />
            ) : (
              <Volume2 size={18} className="text-zinc-400" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full accent-neon-pink"
            aria-label="Volumen"
          />
        </div>
      </div>
    </div>
  );
}
