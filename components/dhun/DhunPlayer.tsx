'use client';

import React from 'react';
import { Dhun } from '@/types';
import { Video, Copy, Check } from 'lucide-react';
import { formatHtmlContent } from '@/lib/renderFormattedText';

export function DhunPlayer({ dhun }: { dhun: Dhun }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!dhun.lyrics) return;
    navigator.clipboard.writeText(`${dhun.title}\n\n${dhun.lyrics}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-cream-50 rounded-3xl border border-saffron-500/20 shadow-spiritual overflow-hidden font-gujarati space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-maroon-900 via-maroon-950 to-maroon-900 text-cream-100 p-8 text-center space-y-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/20 text-gold-400">
          પવિત્ર ધૂન
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold">{dhun.title}</h1>
        {dhun.author && (
          <p className="text-sm text-gold-300 font-medium">
            રચયિતા / પ્રેરણાસ્રોત: <span className="font-bold">{dhun.author.gujaratiName}</span>
          </p>
        )}

        {/* Action Controls */}
        {dhun.lyrics && (
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-maroon-900 hover:bg-maroon-800 text-gold-300 text-sm font-semibold border border-gold-500/30 transition"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              <span>શબ્દો કોપી કરો</span>
            </button>
          </div>
        )}
      </div>

      {/* Description & Video Section */}
      <div className="p-8 space-y-8">
        {dhun.description && (
          <div className="bg-cream-100/70 rounded-2xl p-6 border border-saffron-500/20 text-maroon-900 text-sm leading-relaxed">
            <h3 className="font-bold text-maroon-950 text-base mb-2">ધૂન પરિચય</h3>
            <p>{dhun.description}</p>
          </div>
        )}

        {/* Video Embed if present */}
        {dhun.videoUrl && (
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-maroon-950 flex items-center gap-2">
              <Video className="w-5 h-5 text-saffron-600" />
              <span>વિડિયો કીર્તન (Video Recording)</span>
            </h3>
            <div className="aspect-video rounded-2xl overflow-hidden border border-saffron-500/20 shadow-md">
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
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-maroon-950 border-b border-saffron-500/20 pb-2">
              ધૂન સાહિત્ય / પદ બોલ
            </h3>
            <div
              style={{ color: dhun.textColor || undefined }}
              className="whitespace-pre-line text-lg text-center leading-relaxed text-maroon-900 font-medium bg-cream-100/40 p-8 rounded-2xl border border-saffron-500/10"
              dangerouslySetInnerHTML={{ __html: formatHtmlContent(dhun.lyrics) }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
