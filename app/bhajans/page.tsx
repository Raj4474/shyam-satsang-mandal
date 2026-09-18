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

  const title = settingsMap['bhajansTitle'] || 'સંતવાણી અને ભજનો';
  const subtitle = settingsMap['bhajansSubtitle'] || 'શામજીબાપા, સંત કબીર, મહાત્મા રવિરામ અને પવિત્ર સંતોના અમર પદોનો સંગ્રહ.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 font-gujarati">
      {/* Header Banner */}
      <div className="text-center space-y-4 border-b border-border-elegant pb-12">
        <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest font-serif">
          <Sparkles className="w-4 h-4" />
          <span>સાહિત્ય સંગ્રહ</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-ink tracking-tight">{title}</h1>
        <p className="text-ink-muted text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>

      {/* Interactive Bhajan List */}
      <BhajanListWithIndex bhajans={bhajans} authors={authors} />
    </div>
  );
}
