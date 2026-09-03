'use client';

import React from 'react';
import { Palette, Check, RefreshCw } from 'lucide-react';

export interface ColorOption {
  name: string;
  gujaratiName: string;
  value: string;
  bgClass: string;
}

export const PRESET_COLORS: ColorOption[] = [
  { name: 'Saffron Gold', gujaratiName: 'કેસરી સવર્ણ', value: '#d97706', bgClass: 'bg-amber-600' },
  { name: 'Crimson Maroon', gujaratiName: 'ગંભીર મરૂન', value: '#7f1d1d', bgClass: 'bg-red-900' },
  { name: 'Deep Emerald', gujaratiName: 'દિવ્ય લીલો', value: '#047857', bgClass: 'bg-emerald-700' },
  { name: 'Royal Indigo', gujaratiName: 'રાજસ્વી વાદળી', value: '#4338ca', bgClass: 'bg-indigo-700' },
  { name: 'Warm Amber', gujaratiName: 'સોનેરી અંબર', value: '#b45309', bgClass: 'bg-amber-700' },
  { name: 'Mystic Purple', gujaratiName: 'ભક્તિ જામ્બલી', value: '#7e22ce', bgClass: 'bg-purple-700' },
  { name: 'Sunset Coral', gujaratiName: 'ભગવો સંધ્યા', value: '#c2410c', bgClass: 'bg-orange-700' },
  { name: 'Dark Charcoal', gujaratiName: 'શ્યામ ડાર્ક', value: '#1f2937', bgClass: 'bg-gray-800' },
  { name: 'Rose Velvet', gujaratiName: 'ગુલાબી રક્ત', value: '#be123c', bgClass: 'bg-rose-700' },
  { name: 'Rich Bronze', gujaratiName: 'કાંસ્ય તાંબુ', value: '#78350f', bgClass: 'bg-amber-900' },
];

interface ColorPickerPaletteProps {
  label?: string;
  value?: string | null;
  onChange: (color: string) => void;
  sampleText?: string;
}

export function ColorPickerPalette({
  label = 'લખાણનો રંગ (Admin Text Color Palette)',
  value,
  onChange,
  sampleText = 'જય સદ્ગુરુ શ્યામ - આ લખાણ પસંદ કરેલા રંગમાં દેખાશે',
}: ColorPickerPaletteProps) {
  const currentColor = value || '';

  return (
    <div className="space-y-3 font-gujarati bg-cream-100/60 p-4 rounded-2xl border border-saffron-500/20">
      <div className="flex items-center justify-between">
        <label className="font-bold text-maroon-950 text-sm flex items-center gap-2">
          <Palette className="w-4 h-4 text-saffron-600" />
          <span>{label}</span>
        </label>
        {currentColor && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 hover:underline"
            title="ડિફોલ્ટ રંગ પર રીસેટ કરો"
          >
            <RefreshCw className="w-3 h-3" />
            <span>રીસેટ કરો</span>
          </button>
        )}
      </div>

      {/* Color Preset Chips Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {PRESET_COLORS.map((color) => {
          const isSelected = currentColor.toLowerCase() === color.value.toLowerCase();
          return (
            <button
              key={color.value}
              type="button"
              onClick={() => onChange(color.value)}
              title={`${color.gujaratiName} (${color.value})`}
              className={`group relative aspect-square rounded-xl flex items-center justify-center transition-all transform hover:scale-105 shadow-xs border-2 ${
                isSelected ? 'border-maroon-950 scale-110 shadow-md ring-2 ring-gold-400' : 'border-white/50'
              }`}
              style={{ backgroundColor: color.value }}
            >
              {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md stroke-[3]" />}
              <span className="absolute -bottom-7 hidden group-hover:block bg-maroon-950 text-white text-[10px] py-0.5 px-1.5 rounded z-20 whitespace-nowrap shadow-lg">
                {color.gujaratiName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom Color Input & Hex Code Input */}
      <div className="flex items-center gap-3 pt-2">
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-saffron-500/30 flex-grow max-w-xs">
          <input
            type="color"
            value={currentColor || '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0 bg-transparent"
          />
          <input
            type="text"
            value={currentColor}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#HEX રંગ કોડ..."
            className="w-full text-xs font-mono font-bold text-maroon-950 focus:outline-none uppercase"
          />
        </div>
        <span className="text-xs text-maroon-800/70 font-medium">
          {currentColor ? `પસંદગી: ${currentColor}` : 'ડિફોલ્ટ રંગ આપમેળે વપરાશે'}
        </span>
      </div>

      {/* Live Text Preview Box */}
      <div className="mt-2 p-3 rounded-xl bg-white border border-saffron-500/20 text-center">
        <span className="text-xs font-semibold text-maroon-800/60 block mb-1">લાઈવ પ્રિવ્યૂ (Live Preview):</span>
        <p
          className="text-base font-bold transition-colors duration-200"
          style={{ color: currentColor || 'inherit' }}
        >
          {sampleText}
        </p>
      </div>
    </div>
  );
}
