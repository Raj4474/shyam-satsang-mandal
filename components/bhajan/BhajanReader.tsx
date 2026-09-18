'use client';

import React, { useState } from 'react';
import { Bhajan } from '@/types';
import Link from 'next/link';
import { ZoomIn, ZoomOut, Copy, Check, Share2, Edit, Printer, Languages, Sparkles } from 'lucide-react';
import { formatHtmlContent } from '@/lib/renderFormattedText';
import { toGujlish } from '@/lib/transliterate';

type ScriptMode = 'gujarati' | 'gujlish';

export function BhajanReader({ bhajan }: { bhajan: Bhajan }) {
  const [fontSize, setFontSize] = useState(24);
  const [script, setScript] = useState<ScriptMode>('gujarati');
  const [copied, setCopied] = useState(false);

  const rawTitle = bhajan.title.replace(/^[\d\.\s૦-૯]+/, '');
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

  return (
    <>
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
          }
          .print-sheet {
            display: block !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            background: #ffffff !important;
          }
          .print-lyrics {
            white-space: pre-line !important;
          }
        }
      `}</style>

      <div className="print-sheet bg-paper-surface border border-border-elegant font-gujarati">
        
        {/* Printable Header */}
        <div className="hidden print:block text-center border-b border-black pb-8 mb-8">
          <p className="font-serif tracking-widest text-xs uppercase mb-4">શ્યામ સત્સંગ સાહિત્ય સંગ્રહ</p>
          <h1 className="text-4xl font-bold mb-2">{displayTitle}</h1>
          <p className="italic text-sm">રચયિતા: {displayAuthor}</p>
        </div>

        {/* Action Toolbar */}
        <div className="no-print border-b border-border-elegant px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-[72px] bg-paper-surface/80 backdrop-blur-md z-10">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScript(script === 'gujarati' ? 'gujlish' : 'gujarati')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors border ${
                script === 'gujlish'
                  ? 'bg-ink text-paper-surface border-ink'
                  : 'bg-transparent text-ink border-border-elegant hover:border-ink'
              }`}
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">{script === 'gujarati' ? 'Read in English Script' : 'ગુજરાતી લખાણ'}</span>
              <span className="sm:hidden">{script === 'gujarati' ? 'Eng' : 'Guj'}</span>
            </button>

            <button
              onClick={handlePrintPdf}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-elegant text-ink hover:border-ink transition-colors text-xs font-bold"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Font Size Resizer */}
            <div className="flex items-center gap-2 bg-paper-cream rounded-full px-2 py-1 border border-border-elegant">
              <button
                onClick={() => setFontSize((prev) => Math.max(16, prev - 2))}
                className="p-1.5 text-ink-muted hover:text-ink transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              
              <span className="text-xs font-mono font-bold text-ink w-8 text-center">{fontSize}</span>

              <button
                onClick={() => setFontSize((prev) => Math.min(42, prev + 2))}
                className="p-1.5 text-ink-muted hover:text-ink transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <div className="w-px h-6 bg-border-elegant" />

            {/* Utility buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-2 text-ink-muted hover:text-ink transition-colors"
                title="Copy Text"
              >
                {copied ? <Check className="w-5 h-5 text-accent" /> : <Copy className="w-5 h-5" />}
              </button>

              <button
                onClick={handleShare}
                className="p-2 text-ink-muted hover:text-ink transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <Link
                href="/admin/bhajans"
                className="p-2 text-ink-muted hover:text-ink transition-colors"
                title="Edit"
              >
                <Edit className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {script === 'gujlish' && (
          <div className="no-print bg-accent/10 border-b border-accent/20 px-4 py-3 text-center text-xs font-medium text-accent-dark flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Gujlish mode active. Translation is automatic and may contain minor inaccuracies.</span>
          </div>
        )}

        {/* Reader Content */}
        <div className="px-4 sm:px-12 py-16 sm:py-24 max-w-3xl mx-auto space-y-12">
          
          <div className="space-y-6 text-center">
            <div className="inline-block border border-border-elegant px-4 py-1 rounded-full text-xs font-bold tracking-widest text-ink-muted uppercase font-serif">
              {bhajan.category || 'સંતવાણી'}
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-ink tracking-tight leading-[1.2]">
              {displayTitle}
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-accent/30" />
              <p className="text-sm sm:text-base font-serif italic text-ink-muted">
                {displayAuthor}
              </p>
              <div className="h-[1px] w-12 bg-accent/30" />
            </div>
          </div>

          <div
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: '2',
            }}
            className="print-lyrics whitespace-pre-line text-center text-ink font-medium leading-relaxed tracking-wide px-2 md:px-0"
            dangerouslySetInnerHTML={{ __html: formatHtmlContent(displayLyrics) }}
          />

          <div className="flex justify-center pt-16 opacity-30">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-ink" />
              <div className="w-2 h-2 rounded-full bg-ink" />
              <div className="w-2 h-2 rounded-full bg-ink" />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

