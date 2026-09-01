import React from 'react';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Sparkles, Search, Music, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getBhajansData() {
  try {
    const [bhajans, authors, settings] = await Promise.all([
      db.bhajan.findMany({
        where: { status: 'PUBLISHED' },
        include: { author: true },
        orderBy: { createdAt: 'desc' },
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
      <div className="text-center space-y-3 border-b border-saffron-500/20 pb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-500/15 text-saffron-800 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-saffron-600" />
          <span>ગુજરાતી સંતવાણી પદ સંગ્રહ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-maroon-950">{title}</h1>
        <p className="text-maroon-800/80 text-base max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Author Filter Pills */}
      {authors.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/bhajans"
            className="px-4 py-2 rounded-xl bg-saffron-600 text-cream-50 text-xs font-bold shadow-sm"
          >
            તમામ ભજન ({bhajans.length})
          </Link>
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.slug}`}
              className="px-4 py-2 rounded-xl bg-cream-100 hover:bg-saffron-500/20 text-maroon-950 text-xs font-semibold border border-saffron-500/20 transition"
            >
              {author.gujaratiName}
            </Link>
          ))}
        </div>
      )}

      {/* Bhajan Cards Grid or Clean Empty State */}
      {bhajans.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bhajans.map((bhajan) => (
            <div
              key={bhajan.id}
              className="bg-cream-50 rounded-3xl border border-saffron-500/20 p-6 shadow-card hover:shadow-spiritual transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-saffron-700 font-semibold mb-3">
                  <span className="bg-saffron-500/10 px-3 py-1 rounded-full">{bhajan.category || 'સંતવાણી'}</span>
                  <span>{bhajan.author?.gujaratiName || 'શ્યામ સત્સંગ'}</span>
                </div>
                <h2 className="text-2xl font-bold text-maroon-950 mb-2 leading-snug">{bhajan.title}</h2>
                <p className="text-maroon-800/80 text-xs line-clamp-3 leading-relaxed whitespace-pre-line">
                  {bhajan.description || bhajan.lyrics?.slice(0, 120)}
                </p>
              </div>

              <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
                <Link
                  href={`/bhajans/${bhajan.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-saffron-700 hover:text-maroon-900 transition"
                >
                  <span>પૂરું ભજન વાંચો</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-cream-50 rounded-3xl p-12 text-center space-y-4 border border-saffron-500/20 shadow-sm max-w-xl mx-auto">
          <Sparkles className="w-12 h-12 text-saffron-600 mx-auto" />
          <h3 className="text-2xl font-bold text-maroon-950">હાલમાં કોઈ ભજન ઉપલબ્ધ નથી</h3>
          <p className="text-maroon-800/80 text-sm leading-relaxed">
            એડમિન પેનલમાંથી તમે નવા ભજનો ઉમેરી શકો છો.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/bhajans"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-saffron-600 text-cream-50 font-bold text-xs shadow-md hover:bg-saffron-700 transition"
            >
              <span>એડમિનમાં ભજન ઉમેરો</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
