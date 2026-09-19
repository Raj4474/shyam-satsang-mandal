import React from 'react';
import { db } from '@/lib/db';
import { Sparkles } from 'lucide-react';
import { BhajanListWithIndex } from '@/components/bhajan/BhajanListWithIndex';

export const revalidate = 3600;

async function getBhajansData() {
  try {
    const [bhajans, authors, settings] = await Promise.all([
      db.bhajan.findMany({
        where: { status: 'PUBLISHED' },
        include: { author: true },
        orderBy: { sortOrder: 'asc' },
      }),
      db.author.findMany({
        orderBy: { gujaratiName: 'asc' },
      }),
      db.siteSetting.findMany(),
    ]);

    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => (settingsMap[s.key] = s.value));

    return { bhajans, authors, settingsMap };
  } catch (error) {
    console.error('Error fetching bhajans:', error);
    return { bhajans: [], authors: [], settingsMap: {} };
  }
}

export default async function BhajansPage() {
  const { bhajans, authors, settingsMap } = await getBhajansData();

  const title = settingsMap['bhajansTitle'] || 'ગુજરાતી ભજનો';
  const subtitle = settingsMap['bhajansSubtitle'] || 'શામજીબાપા, સંત કબીર, મહાત્મા રવિરામ અને પવિત્ર સંતોના ભજનો.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-gujarati">
      {/* Header Banner */}
      <div className="text-center space-y-3 glass-panel rounded-3xl p-8 pb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-500/15 text-saffron-800 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-saffron-600" />
          <span>ગુજરાતી સંતવાણી પદ સંગ્રહ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-maroon-950">{title}</h1>
        <p className="text-maroon-800/80 text-base max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Interactive Bhajan List with Alphabetical Index (ક-ખ-ગ Indexing) */}
      <BhajanListWithIndex bhajans={bhajans} authors={authors} />
    </div>
  );
}

