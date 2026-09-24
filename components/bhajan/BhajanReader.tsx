'use client';

import React, { useState } from 'react';
import { Bhajan } from '@/types';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { formatHtmlContent } from '@/lib/renderFormattedText';
import { toGujlish } from '@/lib/transliterate';
import { ReaderToolbar, ScriptMode } from '@/components/ui/ReaderToolbar';
export function BhajanReader({ bhajan }: { bhajan: Bhajan }) {
  const [fontSize, setFontSize] = useState(24); // default text size in px
  const [script, setScript] = useState<ScriptMode>('gujarati');
  const [copied, setCopied] = useState(false);

  const rawTitle = bhajan.title.replace(/^[\d\.\s]+/, '');
  const displayTitle = script === 'gujlish' ? toGujlish(rawTitle) : rawTitle;
  const displayLyrics = script === 'gujlish' ? toGujlish(bhajan.lyrics) : bhajan.lyrics;
  const authorName = bhajan.author?.gujaratiName || 'શ્યામ સત્સંગ મંડળ';
  const displayAuthor = script === 'gujlish' ? toGujlish(authorName) : authorName;



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

      <div className="print-sheet rounded-[2.5rem] border bg-sand-50/60 backdrop-blur-xl border-white/60 shadow-sm transition-colors duration-300 overflow-hidden font-gujarati">
        {/* Printable Header (Visible ONLY during print/PDF generation) */}
        <div className="hidden print:block print-header-banner">
          <p className="print-org-name">॥ શ્યામ સત્સંગ મંડળ સંતવાણી પદ સંગ્રહ ॥</p>
          <h1 className="print-title">{displayTitle}</h1>
          <p className="print-author">રચયિતા: {displayAuthor}</p>
        </div>

        <ReaderToolbar
          title={displayTitle}
          author={displayAuthor}
          textToCopy={`${displayTitle}\n\n${displayLyrics}\n\n― ${displayAuthor}`}
          editHref="/admin/bhajans"
          fontSize={fontSize}
          setFontSize={setFontSize}
          script={script}
          setScript={setScript}
        />

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

