import React from 'react';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Music, Video, Play, ArrowRight, Sparkles } from 'lucide-react';
import { DhunList } from '@/components/dhun/DhunList';

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

      {/* Dhun List Component (Handles Search & Pagination) */}
      <DhunList dhuns={dhuns} />
    </div>
  );
}

