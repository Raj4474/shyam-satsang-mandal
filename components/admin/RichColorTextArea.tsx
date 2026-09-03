'use client';

import React, { useRef, useState } from 'react';
import { Palette, Bold, Highlighter, Eye, Edit3, Eraser, Check, Sparkles } from 'lucide-react';
import { PRESET_COLORS } from './ColorPickerPalette';
import { formatHtmlContent } from '@/lib/renderFormattedText';

interface RichColorTextAreaProps {
  label?: string;
  value: string;
  onChange: (newValue: string) => void;
  rows?: number;
  placeholder?: string;
}

export function RichColorTextArea({
  label = 'વિગતવાર લખાણ (Rich Formatted Content)',
  value,
  onChange,
  rows = 8,
  placeholder = 'અહીં સંપૂર્ણ લખાણ લખો...',
}: RichColorTextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedColor, setSelectedColor] = useState('#d97706'); // default saffron gold
  const [activeMode, setActiveMode] = useState<'edit' | 'preview'>('edit');
  const [hintMessage, setHintMessage] = useState<string | null>(null);

  const showHint = (msg: string) => {
    setHintMessage(msg);
    setTimeout(() => setHintMessage(null), 3500);
  };

  // Helper to wrap selected text with HTML tags
  const applyTagToSelection = (openTag: string, closeTag: string) => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;

    if (start === end) {
      showHint('⚠️ કૃપા કરીને માઉસ અથવા કીબોર્ડ વડે લખાણનો શબ્દ અથવા વાક્ય સિલેક્ટ (Select) કરો.');
      return;
    }

    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    const replacement = `${openTag}${selectedText}${closeTag}`;
    const newValue = `${beforeText}${replacement}${afterText}`;

    onChange(newValue);

    // Restore selection focus after edit
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + openTag.length, start + openTag.length + selectedText.length);
    }, 50);
  };

  // Apply color to selected word/phrase
  const applyColor = (colorHex: string) => {
    setSelectedColor(colorHex);
    applyTagToSelection(`<span style="color: ${colorHex}">`, `</span>`);
  };

  // Apply Bold formatting
  const applyBold = () => {
    applyTagToSelection(`<b>`, `</b>`);
  };

  // Apply Highlight formatting
  const applyHighlight = (bgColor = '#fef08a') => {
    applyTagToSelection(`<mark style="background-color: ${bgColor}; padding: 0 4px; border-radius: 4px;">`, `</mark>`);
  };

  // Remove HTML span/formatting from selected text
  const removeFormatting = () => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;

    if (start === end) {
      showHint('⚠️ કૃપા કરીને સિલેક્ટ કરેલું લખાણ પસંદ કરો.');
      return;
    }

    const selectedText = value.substring(start, end);
    const stripped = selectedText.replace(/<[^>]*>/g, '');
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    onChange(`${beforeText}${stripped}${afterText}`);
  };

  return (
    <div className="space-y-2 font-gujarati">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-saffron-500/20 pb-2">
        <label className="font-bold text-maroon-950 text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-saffron-600" />
          <span>{label}</span>
        </label>

        {/* Tab Toggle: Edit vs Live Preview */}
        <div className="flex items-center gap-1 bg-cream-200/80 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveMode('edit')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg transition ${
              activeMode === 'edit' ? 'bg-maroon-950 text-gold-400 shadow' : 'text-maroon-900 hover:bg-cream-300'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>લખાણ બોક્સ (Edit)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('preview')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg transition ${
              activeMode === 'preview' ? 'bg-maroon-950 text-gold-400 shadow' : 'text-maroon-900 hover:bg-cream-300'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>લાઈવ પ્રિવ્યૂ (Preview)</span>
          </button>
        </div>
      </div>

      {hintMessage && (
        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold transition">
          {hintMessage}
        </div>
      )}

      {/* Editor Toolbar */}
      {activeMode === 'edit' && (
        <div className="bg-cream-100 p-3 rounded-2xl border border-saffron-500/20 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-maroon-900 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-saffron-600" />
              <span>૧. શબ્દ પસંદ કરો અને કલર દબાવો (Word Color Toolbar):</span>
            </span>

            {/* Quick Action Tools: Bold, Highlight, Clear */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={applyBold}
                className="p-1.5 rounded-lg bg-white border border-saffron-500/30 hover:bg-saffron-500/20 text-maroon-950 text-xs font-bold flex items-center gap-1"
                title="સિલેક્ટ કરેલા અક્ષરો ઘાટાં કરો (Bold)"
              >
                <Bold className="w-3.5 h-3.5 text-maroon-950" />
                <span>ઘાટાં</span>
              </button>

              <button
                type="button"
                onClick={() => applyHighlight('#fef08a')}
                className="p-1.5 rounded-lg bg-white border border-saffron-500/30 hover:bg-yellow-200 text-maroon-950 text-xs font-bold flex items-center gap-1"
                title="હાઇલાઇટ કરો (Yellow Highlight)"
              >
                <Highlighter className="w-3.5 h-3.5 text-amber-600" />
                <span>હાઇલાઇટ</span>
              </button>

              <button
                type="button"
                onClick={removeFormatting}
                className="p-1.5 rounded-lg bg-white border border-red-300 hover:bg-red-50 text-red-700 text-xs font-bold flex items-center gap-1"
                title="કલર અથવા ફોર્મેટિંગ દુર કરો (Clear Format)"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>ફોર્મેટ દુર કરો</span>
              </button>
            </div>
          </div>

          {/* Preset Color Palette Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {PRESET_COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => applyColor(color.value)}
                title={`સિલેક્ટ કરેલા શબ્દને ${color.gujaratiName} (${color.value}) રંગ આપો`}
                className="w-7 h-7 rounded-xl flex items-center justify-center border-2 border-white shadow-xs hover:scale-110 transition"
                style={{ backgroundColor: color.value }}
              >
                {selectedColor.toLowerCase() === color.value.toLowerCase() && (
                  <Check className="w-3.5 h-3.5 text-white drop-shadow stroke-[3]" />
                )}
              </button>
            ))}

            {/* Custom Hex Color Input */}
            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-xl border border-saffron-500/30">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => applyColor(e.target.value)}
                className="w-5 h-5 rounded cursor-pointer p-0 border-0 bg-transparent"
                title="કસ્ટમ કલર પસંદ કરો"
              />
              <span className="text-[10px] font-mono font-bold text-maroon-950 uppercase">{selectedColor}</span>
            </div>
          </div>

          <p className="text-[11px] text-maroon-800/70 italic">
            * માઉસ વડે કોઈપણ શબ્દ કે વાક્ય પસંદ (Highlight) કરીને ઉપરના કોઈપણ કલર પર ક્લિક કરો.
          </p>
        </div>
      )}

      {/* Main Textarea or Live Preview */}
      {activeMode === 'edit' ? (
        <textarea
          ref={textareaRef}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 rounded-2xl border border-saffron-500/30 bg-white leading-relaxed font-sans text-sm text-maroon-950 focus:outline-none focus:ring-2 focus:ring-saffron-500 shadow-xs"
        />
      ) : (
        <div className="bg-cream-50 p-6 rounded-2xl border border-saffron-500/30 min-h-[160px] space-y-3">
          <span className="text-xs font-bold text-saffron-700 block border-b border-saffron-500/20 pb-2">
            ડિજિટલ પૃષ્ઠ પર દેખાશે તેવું લાઈવ પરિણામ (Live Formatted Output):
          </span>
          <div
            className="text-maroon-950 text-base leading-relaxed whitespace-pre-line font-medium space-y-3"
            dangerouslySetInnerHTML={{ __html: formatHtmlContent(value) }}
          />
        </div>
      )}
    </div>
  );
}
