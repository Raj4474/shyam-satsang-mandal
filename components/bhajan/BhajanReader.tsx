'use client';

import React, { useState } from 'react';
import { Bhajan } from '@/types';
import Link from 'next/link';
import { ZoomIn, ZoomOut, Copy, Check, Share2, Sun, Moon, Edit, Printer, Languages, Sparkles } from 'lucide-react';
import { formatHtmlContent } from '@/lib/renderFormattedText';
import { toGujlish } from '@/lib/transliterate';

type ThemeMode = 'light' | 'dark' | 'sepia';
type ScriptMode = 'gujarati' | 'gujlish';

export function BhajanReader({ bhajan }: { bhajan: Bhajan }) {
  const [fontSize, setFontSize] = useState(24); // default text size in px
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [script, setScript] = useState<ScriptMode>('gujarati');
  const [copied, setCopied] = useState(false);

  const rawTitle = bhajan.title.replace(/^[\d\.\s]+/, '');
  const displayTitle = script === 'gujlish' ? toGujlish(rawTitle) : rawTitle;
  const displayLyrics = script === 'gujlish' ? toGujlish(bhajan.lyrics) : bhajan.lyrics;
  const authorName = bhajan.author?.gujaratiName || 'શ્યામ સત્સંગ મંડળ';
  const displayAuthor = script === 'gujlish' ? toGujlish(authorName) : authorName;

  const handleCopy = () => {
    const textToCopy = `${displayTitle}\n\n${displayLyrics}\n\n― ${displayAuthor}`;
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
        title: displayTitle,
        text: `ભજન: ${displayTitle} (${displayAuthor})`,
        url: window.location.href,
      });
    } else {
      handleCopy();
    }
  };

  // Theme styling definitions
  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-ink-900 text-sand-50 border-ink-800 shadow-soft';
      case 'sepia':
        return 'bg-[#fcf5e5] text-[#432818] border-[#e8dfc7] shadow-soft';
      case 'light':
      default:
        return 'bg-white/60 backdrop-blur-xl text-ink-900 border-white/60 shadow-soft';
    }
  };

  const getHeaderBgClasses = () => {
    switch (theme) {
      case 'dark':
        return 'border-ink-800 bg-ink-800/50 text-sand-50';
      case 'sepia':
        return 'border-[#e8dfc7] bg-[#f8efd8] text-[#432818]';
      case 'light':
      default:
        return 'border-white/50 bg-white/40 text-ink-900';
    }
  };

  return (
    <>
      {/* Printable Bhajan Sheet CSS for high-quality PDF/Print output */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 15mm;
            size: A4 portrait;
          }
          header, footer, nav, button, .no-print {
            display: none !important;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
            font-family: 'Times New Roman', 'Shruti', 'Gujarati', serif !important;
          }
          .print-sheet {
            display: block !important;
            border: 2px solid #7f1d1d !important;
            padding: 24pt !important;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background: #ffffff !important;
          }
          .print-header-banner {
            text-align: center;
            border-bottom: 2px solid #7f1d1d;
            padding-bottom: 12pt;
            margin-bottom: 20pt;
          }
          .print-org-name {
            font-size: 14pt !important;
            font-weight: bold !important;
            color: #7f1d1d !important;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .print-title {
            font-size: 26pt !important;
            font-weight: bold !important;
            color: #7f1d1d !important;
            margin-top: 8pt !important;
            margin-bottom: 6pt !important;
          }
          .print-author {
            font-size: 13pt !important;
            font-style: italic !important;
            color: #444444 !important;
          }
          .print-lyrics {
            font-size: 16pt !important;
            line-height: 2.3 !important;
            color: #000000 !important;
            white-space: pre-line !important;
            text-align: center !important;
            margin-top: 16pt !important;
            margin-bottom: 20pt !important;
          }
          .print-footer-banner {
            border-top: 1px solid #cccccc;
            padding-top: 10pt;
            text-align: center;
            font-size: 10pt !important;
            color: #666666 !important;
          }
        }
      `}</style>

      <div className={`print-sheet rounded-3xl border transition-colors duration-300 overflow-hidden font-gujarati ${getThemeClasses()}`}>
        {/* Printable Header (Visible ONLY during print/PDF generation) */}
        <div className="hidden print:block print-header-banner">
          <p className="print-org-name">॥ શ્યામ સત્સંગ મંડળ સંતવાણી પદ સંગ્રહ ॥</p>
          <h1 className="print-title">{displayTitle}</h1>
          <p className="print-author">રચયિતા: {displayAuthor}</p>
        </div>

        {/* Reader Action Toolbar (Hidden on Print) */}
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

            {/* Script Switcher: Gujarati <-> Gujlish / English Switcher */}
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

            <Link
              href="/admin/bhajans"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-maroon-900 hover:bg-maroon-950 text-gold-300 text-xs font-bold border border-gold-500/30 transition"
              title="લખાણ બદલો / એડિટ કરો"
            >
              <Edit className="w-3.5 h-3.5 text-gold-400" />
              <span>એડિટ</span>
            </Link>
          </div>

          {/* Reader Controls: Theme Mode (Light/Dark/Sepia) & Font Size Resizer */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Font Size Presizer (Small, Medium, Large, XL & Buttons) */}
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

            {/* Theme Selector (Light, Dark Mode, Warm Sepia Mode) */}
            <div className="flex items-center gap-1 bg-black/5 dark:bg-white/10 p-1 rounded-xl">
              <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-lg transition ${
                  theme === 'light' ? 'bg-cream-100 text-maroon-950 shadow-sm' : 'opacity-60 hover:opacity-100'
                }`}
                title="લાઇટ મોડ (Light Theme)"
              >
                <Sun className="w-4 h-4 text-saffron-600" />
              </button>

              <button
                onClick={() => setTheme('sepia')}
                className={`px-2 py-0.5 rounded-lg text-xs font-bold transition ${
                  theme === 'sepia' ? 'bg-[#f4e4c1] text-[#432818] shadow-sm' : 'opacity-60 hover:opacity-100'
                }`}
                title="સેપિયા મોડ (Warm Sepia Mode for Comfortable Reading)"
              >
                સેપિયા
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-lg transition ${
                  theme === 'dark' ? 'bg-maroon-900 text-gold-400 shadow-sm' : 'opacity-60 hover:opacity-100'
                }`}
                title="નાઇટ મોડ (Dark Mode)"
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>

            <div className="w-px h-5 bg-saffron-500/20 hidden sm:block" />

            {/* Utility buttons: Copy & Share */}
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

        {/* Gujlish Active Banner Notice */}
        {script === 'gujlish' && (
          <div className="no-print bg-saffron-600/10 border-b border-saffron-500/20 px-4 py-2 text-center text-xs font-semibold text-saffron-800 dark:text-gold-300 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gujlish (English Script Switcher) મોડ ચાલુ છે. એક ક્લિકમાં ફરી ગુજરાતી જોઈ શકો છો.</span>
          </div>
        )}

        {/* Main Lyrics View */}
        <div className="px-4 sm:px-8 py-8 sm:py-14 text-center max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <div className="space-y-3">
            <span className="no-print inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-saffron-500/15 text-saffron-700 dark:text-gold-400 shadow-sm">
              {bhajan.category || 'સંતવાણી પદ'}
            </span>
            <h1
              style={{ color: bhajan.textColor || undefined }}
              className="text-2xl sm:text-4xl font-extrabold tracking-wide leading-relaxed"
            >
              {displayTitle}
            </h1>
            <p className="text-sm sm:text-base opacity-85 font-medium">
              રચયિતા: <span className="font-bold text-saffron-600 dark:text-gold-400">{displayAuthor}</span>
            </p>
          </div>

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto my-6 opacity-80" />

          {/* Lyrics Content */}
          <div
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: '2.2',
              color: bhajan.textColor || undefined,
            }}
            className="print-lyrics whitespace-pre-line font-medium text-center space-y-4 px-2 leading-relaxed tracking-wide"
            dangerouslySetInnerHTML={{ __html: formatHtmlContent(displayLyrics) }}
          />

          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto pt-6 opacity-80" />
        </div>

        {/* Printable Footer (Visible ONLY during print/PDF generation) */}
        <div className="hidden print:block print-footer-banner">
          <p>© શ્યામ સત્સંગ મંડળ | પવિત્ર આધ્યાત્મિક સંતવાણી વારસો</p>
        </div>
      </div>
    </>
  );
}

