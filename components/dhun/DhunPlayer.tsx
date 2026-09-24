'use client';

import React, { useState } from 'react';
import { Dhun } from '@/types';
import { Video } from 'lucide-react';
import { formatHtmlContent } from '@/lib/renderFormattedText';
import { toGujlish } from '@/lib/transliterate';
import { ReaderToolbar, ScriptMode } from '@/components/ui/ReaderToolbar';

export function DhunPlayer({ dhun }: { dhun: Dhun }) {
  const [fontSize, setFontSize] = useState(24);
  const [script, setScript] = useState<ScriptMode>('gujarati');

  const rawTitle = dhun.title.replace(/^[\d\.\s]+/, '');
  const displayTitle = script === 'gujlish' ? toGujlish(rawTitle) : rawTitle;
  const displayLyrics = dhun.lyrics ? (script === 'gujlish' ? toGujlish(dhun.lyrics) : dhun.lyrics) : '';
  const displayDescription = dhun.description ? (script === 'gujlish' ? toGujlish(dhun.description) : dhun.description) : '';

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            margin: 15mm;
            size: A4 portrait;
          }
          header, footer, nav, button, .no-print, iframe {
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
      
      <div className="print-sheet rounded-[2rem] border overflow-hidden font-gujarati space-y-6 bg-sand-50/60 backdrop-blur-xl border-white/60 shadow-sm transition-colors duration-300">
        
        <div className="hidden print:block print-header-banner">
          <p className="font-bold text-maroon-900 text-lg uppercase tracking-wider mb-2">॥ પવિત્ર ધૂન ॥</p>
          <h1 className="print-title">{displayTitle}</h1>
        </div>

        <ReaderToolbar
          title={displayTitle}
          textToCopy={`${displayTitle}\n\n${displayLyrics}`}
          editHref={`/admin/dhuns?edit=${dhun.id}`}
          fontSize={fontSize}
          setFontSize={setFontSize}
          script={script}
          setScript={setScript}
        />

        <div className="no-print p-8 sm:p-12 text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sand-200 text-ink-600">
            પવિત્ર ધૂન
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{displayTitle}</h1>
        </div>

      {/* Description & Video Section */}
      <div className="p-8 sm:p-12 space-y-10">
        {dhun.description && (
          <div className="no-print bg-black/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 text-sm sm:text-base leading-relaxed">
            <h3 className="font-bold text-base mb-3 opacity-90">ધૂન પરિચય</h3>
            <p className="opacity-80">{displayDescription}</p>
          </div>
        )}

        {/* Video Embed if present */}
        {dhun.videoUrl && (
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-ink-900 flex items-center gap-2">
              <Video className="w-5 h-5 text-saffron-600" />
              <span>વિડિયો કીર્તન (Video Recording)</span>
            </h3>
            <div className="aspect-video rounded-[1.5rem] overflow-hidden border border-sand-200 shadow-soft">
              <iframe
                src={dhun.videoUrl}
                title={dhun.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Full Lyrics */}
        {dhun.lyrics && (
          <div className="space-y-6 pb-12">
            <h3 className="no-print text-xl sm:text-2xl font-bold border-b border-white/20 pb-3 text-center">
              ધૂન સાહિત્ય / પદ બોલ
            </h3>
            <div
              style={{ color: dhun.textColor || undefined, fontSize: `${fontSize}px`, lineHeight: '2.5' }}
              className="print-lyrics whitespace-pre-line text-center font-bold px-2 sm:px-8 tracking-wide"
              dangerouslySetInnerHTML={{ __html: formatHtmlContent(displayLyrics) }}
            />
          </div>
        )}
      </div>
      </div>
    </>
  );
}
