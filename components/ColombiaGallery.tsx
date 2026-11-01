'use client';

import { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface LandscapePhoto {
  title: string;
  location: string;
  url: string;
  tag: string;
}

const PHOTOS: LandscapePhoto[] = [
  {
    title: 'Sierra Nevada de Santa Marta',
    location: 'Magdalena / Cesar / La Guajira',
    url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1000&q=80',
    tag: 'Montaña Sagrada',
  },
  {
    title: 'Parque Nacional Natural Tayrona',
    location: 'Santa Marta, Magdalena',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    tag: 'Caribe Colombiano',
  },
  {
    title: 'Valle del Cocora',
    location: 'Salento, Quindío',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    tag: 'Palmas de Cera',
  },
  {
    title: 'Caño Cristales',
    location: 'La Macarena, Meta',
    url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80',
    tag: 'Río de 5 Colores',
  },
  {
    title: 'Desierto de la Tatacoa',
    location: 'Villavieja, Huila',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    tag: 'Bosque Seco Tropical',
  },
  {
    title: 'Serranía del Perijá & Bosques',
    location: 'Cesar, Colombia',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
    tag: 'Biodiversidad',
  },
];

export default function ColombiaGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const touchX = useRef(0);

  const currentPhoto = PHOTOS[currentIndex];

  const changePhoto = (newIndex: number) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFading(false);
    }, 200);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % PHOTOS.length;
    changePhoto(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + PHOTOS.length) % PHOTOS.length;
    changePhoto(prevIndex);
  };

  const handleRandom = () => {
    let randomIndex = Math.floor(Math.random() * PHOTOS.length);
    if (randomIndex === currentIndex) {
      randomIndex = (currentIndex + 1) % PHOTOS.length;
    }
    changePhoto(randomIndex);
  };

  // Avance automático (se reinicia al cambiar de foto) y precarga de la siguiente
  useEffect(() => {
    new Image().src = PHOTOS[(currentIndex + 1) % PHOTOS.length].url;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(handleNext, 7000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div
      className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col justify-between gap-4 shadow-xl h-full"
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <Camera className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold">Paisajes de Colombia</span>
        </div>
        <button
          onClick={handleRandom}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors border border-slate-700/50 cursor-pointer"
          title="Ver foto aleatoria"
        >
          <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
          <span>Aleatoria</span>
        </button>
      </div>

      {/* Marco que ocupa el alto disponible junto al clima; admite deslizar en móvil */}
      <div
        className="relative flex-1 min-h-[300px] w-full rounded-2xl overflow-hidden border border-slate-800 group shadow-2xl"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) (dx < 0 ? handleNext : handlePrev)();
        }}
      >
        <img
          src={currentPhoto.url}
          alt={`${currentPhoto.title}, ${currentPhoto.location}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isFading ? 'opacity-20' : 'opacity-100'
          }`}
        />
        
        {/* Overlay con Gradiente e Información */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-between p-4">
          <div className="flex justify-end">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
              {currentPhoto.tag}
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm md:text-base font-bold text-slate-100 drop-shadow-md">
              {currentPhoto.title}
            </h4>
            <div className="flex items-center gap-1 text-xs text-slate-300 drop-shadow">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{currentPhoto.location}</span>
            </div>
          </div>
        </div>

        {/* Botones de navegación al pasar el mouse */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity hover:bg-slate-900"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity hover:bg-slate-900"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Indicadores de posición */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        {PHOTOS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => changePhoto(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentIndex
                ? 'w-6 bg-emerald-400'
                : 'w-1.5 bg-slate-700 hover:bg-slate-500'
            }`}
            aria-label={`Ver ${PHOTOS[idx].title}`}
            aria-current={idx === currentIndex}
          />
        ))}
      </div>
    </div>
  );
}
