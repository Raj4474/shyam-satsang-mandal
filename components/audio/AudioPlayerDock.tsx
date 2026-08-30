'use client';

import React from 'react';
import { useAudio } from './AudioContext';
import { Play, Pause, Volume2, VolumeX, X, Music } from 'lucide-react';

export function AudioPlayerDock() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    seekTo,
    setVolume,
    closePlayer,
  } = useAudio();

  if (!currentTrack) return null;

  const formatTime = (timeInSec: number) => {
    if (isNaN(timeInSec)) return '00:00';
    const minutes = Math.floor(timeInSec / 60);
    const seconds = Math.floor(timeInSec % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-maroon-900/95 backdrop-blur-md text-cream-100 border-t border-gold-500/30 shadow-2xl px-4 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Track Details */}
        <div className="flex items-center gap-3 w-full md:w-1/3">
          <div className="w-12 h-12 rounded-lg bg-saffron-600/30 border border-gold-500/40 flex items-center justify-center overflow-hidden flex-shrink-0">
            {currentTrack.coverImage ? (
              <img src={currentTrack.coverImage} alt={currentTrack.title} className="w-full h-full object-cover" />
            ) : (
              <Music className="w-6 h-6 text-gold-400" />
            )}
          </div>
          <div className="overflow-hidden text-left">
            <h4 className="font-gujarati text-base font-semibold text-gold-400 truncate">{currentTrack.title}</h4>
            <p className="font-gujarati text-xs text-cream-300/80 truncate">
              {currentTrack.authorName || 'શ્યામ સત્સંગ મંડળ'}
            </p>
          </div>
        </div>

        {/* Player Controls & Timeline */}
        <div className="flex flex-col items-center w-full md:w-1/2 gap-1.5">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-saffron-500 hover:bg-saffron-400 text-maroon-950 flex items-center justify-center transition shadow-lg font-bold"
              title={isPlaying ? 'અટકાવો (Pause)' : 'ચાલુ કરો (Play)'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
          </div>

          <div className="flex items-center gap-3 w-full text-xs font-mono text-cream-300">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seekTo(Number(e.target.value))}
              className="w-full accent-saffron-500 h-1.5 bg-maroon-950 rounded-lg cursor-pointer"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Actions */}
        <div className="hidden md:flex items-center justify-end gap-3 w-1/3">
          <div className="flex items-center gap-2">
            <button onClick={() => setVolume(volume === 0 ? 0.8 : 0)} className="text-cream-300 hover:text-gold-400">
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20 accent-saffron-500 h-1 bg-maroon-950 rounded cursor-pointer"
            />
          </div>

          <button
            onClick={closePlayer}
            className="p-1 rounded-full text-cream-300/70 hover:text-cream-100 hover:bg-maroon-800/50 transition"
            title="બંધ કરો"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
