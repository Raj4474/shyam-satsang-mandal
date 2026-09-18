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
      <div className="text-center space-y-4 border-b border-saffron-500/20 pb-8 relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-maroon-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10"></div>
        
        <div className="flex justify-center mb-2">
          <div className="text-saffron-500/60">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c-3-3.5-5-7.5-5-10 0-3.5 2-6 5-10 3 4 5 6.5 5 10 0 2.5-2 6.5-5 10z"/>
              <path d="M7 12c-3.5 0-6 2-5 5 2 2.5 5 2.5 10 5"/>
              <path d="M17 12c3.5 0 6 2 5 5-2 2.5-5 2.5-10 5"/>
            </svg>
          </div>
        </div>
        
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

