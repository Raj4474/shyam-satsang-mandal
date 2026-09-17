'use client';

import React, { useState } from 'react';
import { Flame, Copy, Check, Sparkles, Music } from 'lucide-react';

interface AartiItem {
  id: number;
  title: string;
  subtitle: string;
  tek: string;
  lyrics: string;
}

const aartiData: AartiItem[] = [
  {
    id: 1,
    title: 'આરતી ૧: જય ગુરૂ શ્યામરામ',
    subtitle: 'સદ્ગુરુ સ્તુતિ અને પાવન ગુરુ વાંદના',
    tek: 'જય ગુરૂ શ્યામરામ જય ગુરૂ શ્યામરામ...',
    lyrics: `જય ગુરૂ શ્યામરામ જય ગુરૂ શ્યામરામ
ઘટોઘટના છે વાસી, ઘટોઘટના છે વાસી
શાંતિના દેનાર... વ્હાલા

ધરાઈ નામની માંય આપે અવતાર લીધો વ્હાલા
અનેક ભક્તોને તાર્યા (૨) કૃપાસિંઘુ કરતાર... વ્હાલા

ગુરુ ધાર્યા ધૂસારામ નિર્ભય પદ લીધું વ્હાલા
લોક લાજને મેલી (૨) પૂરણ પદ પામનાર... વ્હાલા

મુજને આપ્યું સતનામ, આનંદ અવતારી વ્હાલા
વંદન કરે આ બાળ (૨) ઉપકારી ગુરુદેવ... વ્હાલા`
  },
  {
    id: 2,
    title: 'આરતી ૨: ધૂસારામ બોલતા મનડું હરખાય',
    subtitle: 'સદ્ગુરુ શ્રી ધૂસારામ બાપાની દિવ્ય આરતી',
    tek: 'ધૂસારામ બોલતા મનડું હરખાય, ધૂસારામની વાર...',
    lyrics: `ધૂસારામ બોલતા મનડું હરખાય, ધૂસારામની વાર... (ટેક)

હે સગુણાની છે આરતી અને નિર્ગુણા છે નિરાકાર
ગુરુ આપ મળ્યા તેથી જાણ્યું, નહિતર બાળક અમે અજ્ઞાન... ધૂસારામ

હે ધૂસારામે આપ્યું સતનામ, તેથી શ્યામનો થઈ ઓળખાણ
આ એણે કૃપા કરી અમ્ પર, તેથી હૈયે આનંદ વારંવાર... ધૂસારામ

હે ધૂસારામે આપ્યું સતજ્ઞાન, તેથી નાનડને થઈ ઓળખાણ
એણે ભજન કરીને જોયું તો, નાનડ પામ્યા છે પૂરણ પદ... ધૂસારામ

હે બાળક અમે અબુધ છીએ, પણ કાલાઘેલા તમારા
આ ભવસાગરમાંથી ગુરુ ઉગારો, રમેશ વંદે વારંવાર... ધૂસારામ`
  }
];

export function AartiSection() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (aarti: AartiItem) => {
    const fullText = `${aarti.title}\n\n${aarti.lyrics}`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(aarti.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentAarti = aartiData.find((a) => a.id === activeTab) || aartiData[0];

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
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-[1.5rem] bg-sand-100 border border-sand-200 shadow-inner gap-2 max-w-md w-full sm:w-auto">
          {aartiData.map((aarti) => {
            const active = aarti.id === activeTab;
            return (
              <button
                key={aarti.id}
                onClick={() => setActiveTab(aarti.id)}
                className={`flex-1 sm:flex-initial px-6 py-3 rounded-[1.25rem] font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                  active
                    ? 'bg-ink-900 text-sand-50 shadow-soft'
                    : 'text-ink-600 hover:text-ink-900 hover:bg-sand-200/50'
                }`}
              >
                <Flame className={`w-4 h-4 ${active ? 'text-saffron-400' : 'opacity-60'}`} />
                <span>{aarti.id === 1 ? 'આરતી ૧' : 'આરતી ૨'}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Aarti Card Display */}
      <div className="relative overflow-hidden bg-sand-50 rounded-[2.5rem] p-8 sm:p-12 border border-sand-200 shadow-sm">
        {/* Corner Decorative Ornaments (Minimal) */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-sand-200/50 rounded-bl-full pointer-events-none blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sand-200/50 rounded-tr-full pointer-events-none blur-2xl" />

        <div className="relative z-10">
          {/* Card Top Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-sand-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-ink-500 uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
                <span>{currentAarti.subtitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
                {currentAarti.title}
              </h3>
            </div>

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
          </div>

          {/* Lyrics Content */}
          <div className="py-10 px-2 sm:px-6">
            <div className="bg-sand-100/50 rounded-[2rem] p-8 sm:p-12 border border-sand-200/60 shadow-inner">
              <pre className="font-gujarati text-lg sm:text-2xl font-bold text-ink-900 leading-relaxed sm:leading-[2.5] whitespace-pre-line text-center">
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
