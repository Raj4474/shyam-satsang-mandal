'use client';

import React from 'react';
import { Dhun } from '@/types';
import { Video, Copy, Check } from 'lucide-react';
import { formatHtmlContent } from '@/lib/renderFormattedText';

export function DhunPlayer({ dhun }: { dhun: Dhun }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!dhun.lyrics) return;
    navigator.clipboard.writeText(`${dhun.title.replace(/^[\d\.\s]+/, '')}\n\n${dhun.lyrics}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-sm overflow-hidden font-gujarati space-y-6">
      {/* Header Banner */}
      <div className="bg-white/40 p-8 sm:p-12 text-center space-y-4 border-b border-white/60">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sand-200 text-ink-600">
          પવિત્ર ધૂન
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">{dhun.title.replace(/^[\d\.\s]+/, '')}</h1>

        {/* Action Controls */}
        {dhun.lyrics && (
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white text-sm font-semibold shadow-sm transition"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              <span>શબ્દો કોપી કરો</span>
            </button>
          </div>
        )}
      </div>

      {/* Description & Video Section */}
      <div className="p-8 sm:p-12 space-y-10">
        {dhun.description && (
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/60 text-ink-700 text-sm sm:text-base leading-relaxed">
            <h3 className="font-bold text-ink-900 text-base mb-3">ધૂન પરિચય</h3>
            <p>{dhun.description}</p>
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
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-ink-900 border-b border-white/60 pb-3">
              ધૂન સાહિત્ય / પદ બોલ
            </h3>
            <div
              style={{ color: dhun.textColor || undefined }}
              className="whitespace-pre-line text-lg sm:text-xl text-center leading-[2.5] text-ink-900 font-bold bg-white/50 backdrop-blur-sm p-8 sm:p-12 rounded-[2rem] border border-white/60 shadow-inner"
              dangerouslySetInnerHTML={{ __html: formatHtmlContent(dhun.lyrics) }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
