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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-sand-50/90 backdrop-blur-xl text-ink-900 border-t border-sand-200 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] px-4 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Track Details */}
        <div className="flex items-center gap-3 w-full md:w-1/3">
          <div className="w-12 h-12 rounded-lg bg-sand-100 border border-sand-200 flex items-center justify-center overflow-hidden flex-shrink-0">
            {currentTrack.coverImage ? (
              <img src={currentTrack.coverImage} alt={currentTrack.title} className="w-full h-full object-cover" />
            ) : (
              <Music className="w-6 h-6 text-saffron-600" />
            )}
          </div>
          <div className="overflow-hidden text-left">
            <h4 className="font-gujarati text-base font-bold text-ink-900 truncate">{currentTrack.title}</h4>
            <p className="font-gujarati text-xs text-ink-500 truncate">
              {currentTrack.authorName || 'શ્યામ સત્સંગ મંડળ'}
            </p>
          </div>
        </div>

        {/* Player Controls & Timeline */}
        <div className="flex flex-col items-center w-full md:w-1/2 gap-1.5">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-saffron-600 hover:bg-saffron-700 text-sand-50 flex items-center justify-center transition shadow-md font-bold"
              title={isPlaying ? 'અટકાવો (Pause)' : 'ચાલુ કરો (Play)'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
          </div>

          <div className="flex items-center gap-3 w-full text-xs font-mono text-ink-600 font-medium">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seekTo(Number(e.target.value))}
              className="w-full accent-saffron-500 h-1.5 bg-sand-200 rounded-lg cursor-pointer"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Actions */}
        <div className="hidden md:flex items-center justify-end gap-3 w-1/3">
          <div className="flex items-center gap-2">
            <button onClick={() => setVolume(volume === 0 ? 0.8 : 0)} className="text-ink-500 hover:text-ink-900 transition">
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20 accent-saffron-500 h-1 bg-sand-200 rounded cursor-pointer"
            />
          </div>

          <button
            onClick={closePlayer}
            className="p-1 rounded-full text-ink-500 hover:text-ink-900 hover:bg-sand-200 transition"
            title="બંધ કરો"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
