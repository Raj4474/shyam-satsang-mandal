'use client';

import React from 'react';
import { Dhun } from '@/types';
import { Video, Copy, Check } from 'lucide-react';
import { formatHtmlContent } from '@/lib/renderFormattedText';

export function DhunPlayer({ dhun }: { dhun: Dhun }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!dhun.lyrics) return;
    navigator.clipboard.writeText(`${dhun.title.replace(/^[\d\.\s૦-૯]+/, '')}\n\n${dhun.lyrics}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayTitle = dhun.title.replace(/^[\d\.\s૦-૯]+/, '');
  const displayAuthor = dhun.author?.gujaratiName || 'શ્યામ સત્સંગ';

  return (
    <div className="bg-paper-surface border border-border-elegant font-gujarati">
      
      {/* Header Banner */}
      <div className="px-4 sm:px-12 py-12 sm:py-16 text-center space-y-6 border-b border-border-elegant">
        <div className="inline-block border border-border-elegant px-4 py-1 rounded-full text-xs font-bold tracking-widest text-ink-muted uppercase font-serif">
          ધૂન સંગ્રહ
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight leading-[1.2]">
          {displayTitle}
        </h1>
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 bg-accent/30" />
          <p className="text-sm sm:text-base font-serif italic text-ink-muted">
            {displayAuthor}
          </p>
          <div className="h-[1px] w-12 bg-accent/30" />
        </div>

        {/* Action Controls */}
        {dhun.lyrics && (
          <div className="flex justify-center pt-6">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-border-elegant text-ink hover:border-ink transition-colors text-xs font-bold"
            >
              {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
              <span>શબ્દો કોપી કરો</span>
            </button>
          </div>
        )}
      </div>

      {/* Description Section */}
      <div className="px-4 sm:px-12 py-12 max-w-3xl mx-auto space-y-16">
        
        {dhun.description && (
          <div className="text-center space-y-4">
            <p className="text-ink-muted text-sm sm:text-base leading-relaxed font-medium italic">
              {dhun.description}
            </p>
            <div className="flex justify-center pt-2 opacity-30">
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ink" />
                <div className="w-1.5 h-1.5 rounded-full bg-ink" />
                <div className="w-1.5 h-1.5 rounded-full bg-ink" />
              </div>
            </div>
          </div>
        )}

        {/* Video Embed */}
        {dhun.videoUrl && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold tracking-widest text-ink uppercase text-center flex items-center justify-center gap-2">
              <Video className="w-4 h-4" />
              <span>વિડિયો કીર્તન</span>
            </h3>
            <div className="aspect-video rounded-sm overflow-hidden border border-border-elegant">
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
          <div className="space-y-8 pt-8">
            <div className="flex items-center justify-between border-b-2 border-ink pb-4 mb-4">
              <h2 className="text-sm font-bold tracking-widest text-ink uppercase">ધૂન સાહિત્ય</h2>
            </div>
            
            <div
              style={{ color: dhun.textColor || undefined }}
              className="whitespace-pre-line text-lg sm:text-xl text-center leading-[2.5] text-ink font-bold px-2 md:px-0"
              dangerouslySetInnerHTML={{ __html: formatHtmlContent(dhun.lyrics) }}
            />
          </div>
        )}

        <div className="flex justify-center pt-8 opacity-30">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-ink" />
            <div className="w-2 h-2 rounded-full bg-ink" />
            <div className="w-2 h-2 rounded-full bg-ink" />
          </div>
        </div>
      </div>
    </div>
  );
}
