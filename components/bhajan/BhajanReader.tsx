'use client';

import React, { useState } from 'react';
import { Bhajan } from '@/types';
import Link from 'next/link';
import { ZoomIn, ZoomOut, Copy, Check, Share2, Sun, Moon, Edit, Printer } from 'lucide-react';

export function BhajanReader({ bhajan }: { bhajan: Bhajan }) {
  const [fontSize, setFontSize] = useState(22); // pixels
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `${bhajan.title}\n\n${bhajan.lyrics}\n\n― ${bhajan.author?.gujaratiName || 'શ્યામ સત્સંગ મંડળ'}`;
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
        title: bhajan.title,
        text: `ભજન: ${bhajan.title} (${bhajan.author?.gujaratiName || ''})`,
        url: window.location.href,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <>
      {/* Print Specific CSS to format clean PDF export */}
      <style jsx global>{`
        @media print {
          header, footer, nav, button, .no-print {
            display: none !important;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .print-container {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .print-title {
            font-size: 28pt !important;
            color: #7f1d1d !important;
            margin-bottom: 12pt !important;
          }
          .print-lyrics {
            font-size: 16pt !important;
            line-height: 2.2 !important;
            color: #000000 !important;
          }
        }
      `}</style>

      <div className={`print-container rounded-3xl border transition-colors duration-300 shadow-spiritual overflow-hidden font-gujarati ${
        isDarkMode
          ? 'bg-maroon-950 text-cream-100 border-gold-500/30'
          : 'bg-cream-50 text-maroon-950 border-saffron-500/20'
      }`}>
        {/* Top Controls Bar (Hidden during print) */}
        <div className={`no-print px-4 sm:px-6 py-3 sm:py-4 border-b flex flex-wrap items-center justify-between gap-3 sm:gap-4 ${
          isDarkMode ? 'border-maroon-900 bg-maroon-900/50' : 'border-cream-200 bg-cream-100/60'
        }`}>
          <div className="flex flex-wrap items-center gap-2">
            {/* Print / Export to PDF button */}
            <button
              onClick={handlePrintPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-maroon-950 text-xs font-bold shadow transition"
              title="PDF ડાઉનલોડ / પ્રિન્ટ કરો"
            >
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>PDF / પ્રિન્ટ</span>
            </button>

            {/* Edit Bhajan Text Link */}
            <Link
              href={`/admin/bhajans`}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-maroon-900 hover:bg-maroon-950 text-gold-300 text-xs font-bold border border-gold-500/30 transition"
              title="લખાણ બદલો / એડિટ કરો (Edit Bhajan Text)"
            >
              <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-400" />
              <span>લખાણ બદલો</span>
            </Link>
          </div>

          {/* Reader Controls: Font sizing, Dark Mode, Copy, Share */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setFontSize((prev) => Math.max(16, prev - 2))}
              className="p-1.5 sm:p-2 rounded-lg bg-cream-200 dark:bg-maroon-800 hover:bg-gold-300 dark:hover:bg-maroon-700 transition"
              title="અક્ષર નાના કરો"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-1 font-bold">{fontSize}px</span>
            <button
              onClick={() => setFontSize((prev) => Math.min(36, prev + 2))}
              className="p-1.5 sm:p-2 rounded-lg bg-cream-200 dark:bg-maroon-800 hover:bg-gold-300 dark:hover:bg-maroon-700 transition"
              title="અક્ષર મોટા કરો"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <div className="w-px h-5 bg-saffron-500/20 mx-0.5 sm:mx-1" />

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 sm:p-2 rounded-lg bg-cream-200 dark:bg-maroon-800 hover:bg-gold-300 dark:hover:bg-maroon-700 transition"
              title={isDarkMode ? 'લાઇટ મોડ' : 'ડાર્ક મોડ'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-gold-400" /> : <Moon className="w-4 h-4 text-maroon-900" />}
            </button>

            <button
              onClick={handleCopy}
              className="p-1.5 sm:p-2 rounded-lg bg-cream-200 dark:bg-maroon-800 hover:bg-gold-300 dark:hover:bg-maroon-700 transition"
              title="લખાણ કોપી કરો"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 sm:p-2 rounded-lg bg-cream-200 dark:bg-maroon-800 hover:bg-gold-300 dark:hover:bg-maroon-700 transition"
              title="શેર કરો"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Lyrics Body */}
        <div className="px-4 sm:px-6 py-8 sm:py-12 text-center max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <div className="space-y-2">
            <span className="no-print inline-block px-3 py-1 rounded-full text-xs font-semibold bg-saffron-500/15 text-saffron-700 dark:text-gold-400">
              {bhajan.category || 'સંતવાણી પદ'}
            </span>
            <h1
              style={{ color: bhajan.textColor || undefined }}
              className="print-title text-2xl sm:text-4xl font-extrabold tracking-wide leading-relaxed"
            >
              {bhajan.title}
            </h1>
            <p className="text-sm opacity-80 font-medium">
              રચયિતા: <span className="font-bold text-saffron-600 dark:text-gold-400">{bhajan.author?.gujaratiName || 'સંતવાણી'}</span>
            </p>
          </div>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto my-6" />

          {/* Gujarati Lyrics Text */}
          <div
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: '2.1',
              color: bhajan.textColor || undefined,
            }}
            className="print-lyrics whitespace-pre-line font-gujarati font-medium text-center space-y-4 px-2"
          >
            {bhajan.lyrics}
          </div>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto pt-6" />
        </div>
      </div>
    </>
  );
}
