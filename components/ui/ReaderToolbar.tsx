'use client';

import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Copy, Check, Share2, Sun, Moon, Edit, Printer, Languages, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState as useReactState } from 'react';

export type ScriptMode = 'gujarati' | 'gujlish';

interface ReaderToolbarProps {
  title: string;
  author?: string;
  textToCopy: string;
  editHref?: string;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  script: ScriptMode;
  setScript: React.Dispatch<React.SetStateAction<ScriptMode>>;
}

export function ReaderToolbar({
  title,
  author,
  textToCopy,
  editHref,
  fontSize,
  setFontSize,
  script,
  setScript,
}: ReaderToolbarProps) {
  const [copied, setCopied] = useReactState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useReactState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: author ? `${title} (${author})` : title,
        url: window.location.href,
      });
    } else {
      handleCopy();
    }
  };

  const getHeaderBgClasses = () => {
    if (!mounted) return 'border-white/50 bg-white/40 text-ink-900';
    switch (resolvedTheme) {
      case 'dark':
        return 'border-ink-800 bg-ink-800/50 text-white';
      case 'sepia':
        return 'border-sand-300 bg-sand-200/50 text-ink-900';
      case 'light':
      default:
        return 'border-white/50 bg-white/40 text-ink-900';
    }
  };

  return (
    <div className={`no-print px-4 sm:px-6 py-3.5 border-b flex flex-wrap items-center justify-between gap-3 ${getHeaderBgClasses()}`}>
      {/* Action Buttons: PDF/Print & Edit */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handlePrintPdf}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-maroon-950 text-xs font-bold shadow-md transition transform active:scale-95"
          title="સત્સંગ મંડળ માટે સુંદર પ્રિન્ટેબલ PDF તરીકે ડાઉનલોડ અથવા પ્રિન્ટ કરો"
        >
          <Printer className="w-4 h-4" />
          <span>PDF / પ્રિન્ટ શીટ</span>
        </button>

        {/* Script Switcher */}
        <button
          onClick={() => setScript(script === 'gujarati' ? 'gujlish' : 'gujarati')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
            script === 'gujlish'
              ? 'bg-saffron-600 text-cream-50 border-saffron-700 shadow-inner'
              : 'bg-cream-200/80 dark:bg-maroon-800 text-maroon-950 dark:text-cream-100 border-saffron-500/30 hover:bg-saffron-500/20'
          }`}
          title="ગુજરાતી થી English/Gujlish ટેક્સ્ટ સ્ક્રિપ્ટ બદલો"
        >
          <Languages className="w-4 h-4 text-saffron-400" />
          <span>{script === 'gujarati' ? 'Gujlish (English Script)' : 'ગુજરાતી લખાણ'}</span>
        </button>

        {editHref && (
          <Link
            href={editHref}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-maroon-900 hover:bg-maroon-950 text-gold-300 text-xs font-bold border border-gold-500/30 transition"
            title="લખાણ બદલો / એડિટ કરો"
          >
            <Edit className="w-3.5 h-3.5 text-gold-400" />
            <span>એડિટ</span>
          </Link>
        )}
      </div>

      {/* Reader Controls: Theme & Font Size */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Font Size */}
        <div className="flex items-center gap-1 bg-black/5 dark:bg-white/10 p-1 rounded-xl">
          <button
            onClick={() => setFontSize((prev) => Math.max(16, prev - 2))}
            className="p-1.5 rounded-lg hover:bg-gold-500/20 transition"
            title="અક્ષર નાના કરો"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <div className="hidden sm:flex items-center gap-1 px-1">
            {[
              { label: 'S', size: 18 },
              { label: 'M', size: 22 },
              { label: 'L', size: 26 },
              { label: 'XL', size: 32 },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => setFontSize(preset.size)}
                className={`px-2 py-0.5 rounded text-xs font-bold transition ${
                  fontSize === preset.size
                    ? 'bg-saffron-600 text-white shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono font-bold px-1">{fontSize}px</span>

          <button
            onClick={() => setFontSize((prev) => Math.min(42, prev + 2))}
            className="p-1.5 rounded-lg hover:bg-gold-500/20 transition"
            title="અક્ષર મોટા કરો"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-5 bg-saffron-500/20 hidden sm:block" />

        {/* Theme Selector */}
        {mounted && (
          <div className="flex items-center gap-1 bg-black/5 dark:bg-white/10 p-1 rounded-xl">
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-lg transition ${
                resolvedTheme === 'light' ? 'bg-cream-100 text-maroon-950 shadow-sm' : 'opacity-60 hover:opacity-100'
              }`}
              title="લાઇટ મોડ (Light Theme)"
            >
              <Sun className="w-4 h-4 text-saffron-600" />
            </button>

            <button
              onClick={() => setTheme('sepia')}
              className={`p-1.5 rounded-lg transition ${
                resolvedTheme === 'sepia' ? 'bg-[#f4e4c1] text-[#432818] shadow-sm' : 'opacity-60 hover:opacity-100'
              }`}
              title="સેપિયા મોડ (Warm Sepia Mode)"
            >
              <span className="text-sm">⛅</span>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-lg transition ${
                resolvedTheme === 'dark' ? 'bg-maroon-900 text-gold-400 shadow-sm' : 'opacity-60 hover:opacity-100'
              }`}
              title="નાઇટ મોડ (Dark Mode)"
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="w-px h-5 bg-saffron-500/20 hidden sm:block" />

        {/* Copy & Share */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-gold-500/20 transition"
            title="લખાણ કોપી કરો"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-gold-500/20 transition"
            title="શેર કરો"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
