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
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-500/15 border border-saffron-500/30 text-saffron-800 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
          <Flame className="w-4 h-4 text-saffron-600 animate-pulse" />
          <span>પવિત્ર વાંદના</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-maroon-950 tracking-tight">
          પવિત્ર આરતી સંગ્રહ
        </h2>
        <p className="text-maroon-800/75 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          સદ્ગુરુ શ્યામરામ તથા સદ્ગુરુ ધૂસારામ બાપાની નિત્ય સ્તુતિ અને પાવન આરતી.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-2xl bg-cream-200/70 border border-saffron-500/20 shadow-inner gap-2 max-w-md w-full sm:w-auto">
          {aartiData.map((aarti) => {
            const active = aarti.id === activeTab;
            return (
              <button
                key={aarti.id}
                onClick={() => setActiveTab(aarti.id)}
                className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                  active
                    ? 'bg-gradient-to-r from-maroon-900 via-maroon-850 to-maroon-950 text-gold-300 shadow-md border border-gold-500/30'
                    : 'text-maroon-900/80 hover:text-maroon-950 hover:bg-cream-100'
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
      <div className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-cream-100/90 to-saffron-50/50 rounded-3xl p-6 sm:p-10 border-2 border-saffron-500/30 shadow-spiritual">
        {/* Corner Decorative Ornaments */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-500/10 rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-500/10 rounded-tr-full pointer-events-none" />

        <div className="relative z-10">
          {/* Card Top Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-saffron-500/20">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-saffron-700 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>{currentAarti.subtitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-maroon-950">
                {currentAarti.title}
              </h3>
            </div>

            <button
              onClick={() => handleCopy(currentAarti)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-50 hover:bg-gold-50 border border-saffron-500/30 text-maroon-900 font-semibold text-xs sm:text-sm shadow-sm transition shrink-0"
              title="આરતી કોપી કરો"
            >
              {copiedId === currentAarti.id ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">કોપી થઈ ગયું!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-saffron-600" />
                  <span>આરતી કોપી કરો</span>
                </>
              )}
            </button>
          </div>

          {/* Lyrics Content */}
          <div className="py-8 px-2 sm:px-6">
            <div className="bg-cream-50/80 rounded-2xl p-6 sm:p-8 border border-saffron-500/15 shadow-inner">
              <pre className="font-gujarati text-lg sm:text-2xl font-bold text-maroon-950 leading-relaxed sm:leading-loose whitespace-pre-line text-center">
                {currentAarti.lyrics}
              </pre>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-saffron-500/20 text-center">
            <p className="text-xs sm:text-sm text-saffron-800/80 font-medium">
              ※ શ્યામ સત્સંગ મંડળ - નિત્ય સ્તુતિ અને પાવન આરતી સંગ્રહ ※
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
