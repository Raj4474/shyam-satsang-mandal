import React from 'react';
import { db } from '@/lib/db';
import { Music } from 'lucide-react';
import { LiteratureRow } from '@/components/ui/LiteratureRow';

export const revalidate = 3600;

async function getDhunsData() {
  try {
    const [dhuns, settings] = await Promise.all([
      db.dhun.findMany({
        where: { status: 'PUBLISHED' },
        include: { author: true },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 font-gujarati">
      {/* Header Banner */}
      <div className="text-center space-y-4 border-b border-border-elegant pb-12">
        <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest font-serif">
          <Music className="w-4 h-4" />
          <span>ભક્તિમય નામ સ્મરણ</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-ink tracking-tight">{title}</h1>
        <p className="text-ink-muted text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>

      {/* Dhun List */}
      <div className="max-w-5xl mx-auto pt-8">
        <div className="flex items-center justify-between border-b-2 border-ink pb-4 mb-4">
          <h2 className="text-sm font-bold tracking-widest text-ink uppercase">ધૂન પરિણામો</h2>
          <span className="text-sm font-serif italic text-ink-muted">{dhuns.length} ધૂન</span>
        </div>
        
        {dhuns.length > 0 ? (
          <div className="flex flex-col">
            {dhuns.map((dhun, index) => (
              <LiteratureRow
                key={dhun.id}
                index={index + 1}
                title={dhun.title.replace(/^[\d\.\s૦-૯]+/, '')}
                author={dhun.author?.gujaratiName || 'શ્યામ સત્સંગ'}
                category="ધૂન"
                excerpt={dhun.description || dhun.lyrics?.slice(0, 80) || ''}
                href={`/dhuns/${dhun.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-6">
            <p className="text-ink-muted text-sm italic">હજુ સુધી કોઈ ધૂન ઉમેરાયેલ નથી.</p>
          </div>
        )}
      </div>
    </div>
  );
}
