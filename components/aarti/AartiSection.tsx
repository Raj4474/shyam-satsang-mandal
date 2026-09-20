'use client';

import React, { useState } from 'react';
import { Flame, Copy, Check, Sparkles, Edit } from 'lucide-react';
import Link from 'next/link';

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
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (aarti: AartiItem) => {
    const fullText = `${aarti.title}\n\n${aarti.lyrics}`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(aarti.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!aartis || aartis.length === 0) {
    return null; // Don't render section if no aartis exist
  }

  const currentAarti = aartis.find((a) => a.id === activeTab) || aartis[0];

  return (
    <section id="aarti-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-gujarati">
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
      <div className="relative overflow-hidden bg-sand-50/60 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 border border-white/60 shadow-sm">
        {/* Corner Decorative Ornaments (Minimal) */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-sand-200/50 rounded-bl-full pointer-events-none blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sand-200/50 rounded-tr-full pointer-events-none blur-2xl" />

        <div className="relative z-10">
          {/* Card Top Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-sand-200">
            <div>
              {currentAarti.subtitle && (
                <div className="flex items-center gap-2 text-xs font-bold text-ink-500 uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
                  <span>{currentAarti.subtitle}</span>
                </div>
              )}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
                {currentAarti.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(currentAarti)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sand-100 hover:bg-sand-200 border border-sand-200 text-ink-800 font-semibold text-xs sm:text-sm shadow-sm transition-all shrink-0"
                title="આરતી કોપી કરો"
              >
                {copiedId === currentAarti.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">કોપી થઈ ગયું!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-ink-600" />
                    <span>કોપી કરો</span>
                  </>
                )}
              </button>
              
              <Link
                href="/admin/aartis"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-maroon-50 hover:bg-maroon-100 border border-maroon-200 text-maroon-800 font-semibold text-xs sm:text-sm shadow-sm transition-all shrink-0"
                title="આરતી સુધારો (Edit)"
              >
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">એડિટ</span>
              </Link>
            </div>
          </div>

          {/* Lyrics Content */}
          <div className="py-10 px-2 sm:px-6">
            <div className="bg-sand-100/50 backdrop-blur-sm rounded-[2rem] p-8 sm:p-12 border border-white/60 shadow-inner">
              <pre className="font-gujarati text-lg sm:text-2xl font-bold text-ink-900 leading-relaxed sm:leading-[2.5] whitespace-pre-line text-center"
                   style={{ color: currentAarti.textColor || 'inherit' }}>
                {currentAarti.lyrics}
              </pre>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-6 border-t border-sand-200 text-center">
            <p className="text-xs sm:text-sm text-ink-500 font-medium">
              શ્યામ સત્સંગ મંડળ - નિત્ય સ્તુતિ અને પાવન આરતી સંગ્રહ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
