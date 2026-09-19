import React from 'react';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Music, Video, Play, ArrowRight, Sparkles } from 'lucide-react';

export const revalidate = 3600;

async function getDhunsData() {
  try {
    const [dhuns, settings] = await Promise.all([
      db.dhun.findMany({
        where: { status: 'PUBLISHED' },
      }),
      db.siteSetting.findMany(),
    ]);

    const sortedDhuns = dhuns.sort((a, b) => {
      const numA = parseInt(a.title.match(/^\d+/)?.[0] || a.slug.split('-')[0], 10) || 0;
      const numB = parseInt(b.title.match(/^\d+/)?.[0] || b.slug.split('-')[0], 10) || 0;
      return numA - numB;
    });


    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => (settingsMap[s.key] = s.value));

    return { dhuns: sortedDhuns, settingsMap };
  } catch (error) {
    console.error('Error fetching dhuns:', error);
    return { dhuns: [], settingsMap: {} };
  }
}

export default async function DhunsPage() {
  const { dhuns, settingsMap } = await getDhunsData();

  const title = settingsMap['dhunsTitle'] || 'પવિત્ર ધૂન સંગ્રહ';
  const subtitle = settingsMap['dhunsSubtitle'] || 'ઈશ્વરના દિવ્ય નામની કીર્તન ધૂનનો સંગ્રહ અને પદ સાહિત્ય.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-gujarati">
      {/* Header Banner */}
      <div className="text-center space-y-3 glass-panel rounded-3xl p-8 pb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 text-gold-800 text-xs font-semibold">
          <Music className="w-4 h-4 text-gold-600" />
          <span>ભક્તિમય નામ સ્મરણ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-ink-900">{title}</h1>
        <p className="text-ink-700 text-base max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Dhun Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dhuns.map((dhun, index) => (
          <div
            key={dhun.id}
            className="glass-panel group rounded-[2rem] p-6 hover:shadow-spiritual transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-saffron-700 font-semibold mb-3">
                <span className="bg-gold-500/15 px-3 py-1 rounded-full text-gold-800 font-bold">ધૂન</span>
              </div>
              <h2 className="text-2xl font-bold text-ink-900 mb-2 leading-snug group-hover:text-saffron-600 transition-colors">
                {index + 1}. {dhun.title.replace(/^[\d\.\s]+/, '')}
              </h2>
              <p className="text-ink-600 text-xs line-clamp-3 leading-relaxed whitespace-pre-line">
                {dhun.description?.startsWith('ધૂન નંબર') ? dhun.lyrics?.slice(0, 120) : (dhun.description || dhun.lyrics?.slice(0, 120))}
              </p>
            </div>

            <div className="pt-4 border-t border-ink-200/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {dhun.videoUrl && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-ink-700 bg-ink-900/5 px-2.5 py-0.5 rounded-full dark:bg-sand-50/10">
                    <Video className="w-3 h-3" /> વિડિયો
                  </span>
                )}
              </div>

              <Link
                href={`/dhuns/${dhun.slug}`}
                className="inline-flex items-center gap-1 text-sm font-bold text-ink-900 hover:text-saffron-600 transition group-hover:gap-2"
              >
                <span>વાંચો</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

