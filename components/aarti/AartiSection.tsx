'use client';

import React, { useState } from 'react';
import { Flame, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { formatHtmlContent } from '@/lib/renderFormattedText';
import { toGujlish } from '@/lib/transliterate';
import { ReaderToolbar, ScriptMode } from '@/components/ui/ReaderToolbar';

interface AartiItem {
  id: string;
  title: string;
  subtitle?: string | null;
  tek?: string | null;
  lyrics: string;
  textColor?: string | null;
}

interface AartiSectionProps {
  aartis?: AartiItem[];
}

export function AartiSection({ aartis = [] }: AartiSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(aartis[0]?.id || '');
  const [fontSize, setFontSize] = useState(24);
  const [script, setScript] = useState<ScriptMode>('gujarati');

  if (!aartis || aartis.length === 0) {
    return null; // Don't render section if no aartis exist
  }

  const currentAarti = aartis.find((a) => a.id === activeTab) || aartis[0];
  const rawTitle = currentAarti.title;
  const displayTitle = script === 'gujlish' ? toGujlish(rawTitle) : rawTitle;
  const displaySubtitle = currentAarti.subtitle ? (script === 'gujlish' ? toGujlish(currentAarti.subtitle) : currentAarti.subtitle) : '';
  const displayLyrics = currentAarti.lyrics ? (script === 'gujlish' ? toGujlish(currentAarti.lyrics) : currentAarti.lyrics) : '';

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
          .print-title {
            font-size: 26pt !important;
            font-weight: bold !important;
            color: #7f1d1d !important;
            margin-top: 8pt !important;
            margin-bottom: 6pt !important;
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
        }
      `}</style>
      <section id="aarti-section" className="no-print max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-gujarati">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand-200/60 text-ink-700 text-xs sm:text-sm font-medium mb-4">
          <Flame className="w-4 h-4 text-saffron-600 animate-pulse" />
          <span>પવિત્ર વાંદના</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
          પવિત્ર આરતી સંગ્રહ
        </h2>
        <p className="text-ink-600 text-sm sm:text-base mt-3 max-w-xl mx-auto">
          સદ્ગુરુ શ્યામરામ તથા સદ્ગુરુ ધૂસારામ બાપાની નિત્ય સ્તુતિ અને પાવન આરતી.
        </p>
      </div>

      {/* Tabs Switcher */}
      {aartis.length > 1 && (
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-[1.5rem] bg-sand-50/60 backdrop-blur-md border border-white/60 shadow-sm gap-2 max-w-md w-full sm:w-auto">
            {aartis.map((aarti, idx) => {
              const active = aarti.id === (activeTab || aartis[0].id);
              return (
                <button
                  key={aarti.id}
                  onClick={() => setActiveTab(aarti.id)}
                  className={`flex-1 sm:flex-initial px-6 py-3 rounded-[1.25rem] font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                    active
                      ? 'bg-saffron-600 text-white shadow-soft'
                      : 'text-ink-600 hover:text-ink-900 hover:bg-sand-200/50'
                  }`}
                >
                  <Flame className={`w-4 h-4 ${active ? 'text-saffron-400' : 'opacity-60'}`} />
                  <span>{`આરતી ${idx + 1}`}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Aarti Card Display */}
      <div className="print-sheet relative overflow-hidden bg-sand-50/60 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-sm transition-colors duration-300">
        {/* Corner Decorative Ornaments (Minimal) */}
        <div className="no-print absolute top-0 right-0 w-32 h-32 bg-sand-200/50 rounded-bl-full pointer-events-none blur-2xl" />
        <div className="no-print absolute bottom-0 left-0 w-32 h-32 bg-sand-200/50 rounded-tr-full pointer-events-none blur-2xl" />

        <div className="relative z-10 space-y-0">
          <div className="hidden print:block print-header-banner">
            <p className="font-bold text-maroon-900 text-lg uppercase tracking-wider mb-2">॥ પવિત્ર વાંદના ॥</p>
            <h1 className="print-title">{displayTitle}</h1>
          </div>

          <ReaderToolbar
            title={displayTitle}
            textToCopy={`${displayTitle}\n\n${displayLyrics}`}
            editHref={`/admin/aartis?edit=${currentAarti.id}`}
            fontSize={fontSize}
            setFontSize={setFontSize}
            script={script}
            setScript={setScript}
          />

          <div className="no-print pt-10 pb-4 px-8 sm:px-12 text-center border-b border-white/20">
            {displaySubtitle && (
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
                <span>{displaySubtitle}</span>
              </div>
            )}
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {displayTitle}
            </h3>
          </div>

          {/* Lyrics Content */}
          <div className="py-10 px-2 sm:px-6">
            <div
              style={{ color: currentAarti.textColor || undefined, fontSize: `${fontSize}px`, lineHeight: '2.5' }}
              className="print-lyrics font-gujarati font-bold text-center whitespace-pre-line tracking-wide"
              dangerouslySetInnerHTML={{ __html: formatHtmlContent(displayLyrics) }}
            />
          </div>

          {/* Footer Note */}
          <div className="no-print pt-6 pb-8 border-t border-white/20 text-center">
            <p className="text-xs sm:text-sm font-medium opacity-60">
              શ્યામ સત્સંગ મંડળ - નિત્ય સ્તુતિ અને પાવન આરતી સંગ્રહ
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
