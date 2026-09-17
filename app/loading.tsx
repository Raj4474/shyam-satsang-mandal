import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-sand-50/80 backdrop-blur-md z-50 flex items-center justify-center font-gujarati">
      <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm w-full mx-4 border border-saffron-100 animate-in fade-in zoom-in duration-300">
        <div className="relative flex items-center justify-center w-20 h-20">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-sand-100"></div>
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-saffron-500 border-t-transparent animate-spin"></div>
          {/* Inner icon */}
          <Sparkles className="w-8 h-8 text-saffron-600 animate-pulse" />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-maroon-950 tracking-tight">શ્યામ સત્સંગ મંડળ</h2>
          <p className="text-sm font-medium text-maroon-800/60 animate-pulse">માહિતી લોડ થઈ રહી છે...</p>
        </div>
      </div>
    </div>
  );
}
