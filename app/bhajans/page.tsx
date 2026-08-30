import React from 'react';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Sparkles, Search, Music, ArrowRight } from 'lucide-react';

async function getBhajansData() {
  try {
    const [bhajans, authors] = await Promise.all([
      db.bhajan.findMany({
        where: { status: 'PUBLISHED' },
        include: { author: true },
        orderBy: { createdAt: 'desc' },
      }),
      db.author.findMany({
        orderBy: { gujaratiName: 'asc' },
      }),
    ]);
    return { bhajans, authors };
  } catch (error) {
    console.error('Error fetching bhajans:', error);
    return { bhajans: [], authors: [] };
  }
}

export default async function BhajansPage() {
  const { bhajans, authors } = await getBhajansData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-gujarati">
      {/* Header Banner */}
      <div className="text-center space-y-3 border-b border-saffron-500/20 pb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-500/15 text-saffron-800 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-saffron-600" />
          <span>ગુજરાતી સંતવાણી પદ સંગ્રહ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-maroon-950">ગુજરાતી ભજનો</h1>
        <p className="text-maroon-800/80 text-base max-w-2xl mx-auto leading-relaxed">
          ગંગાસતી, પાનબાઈ, અમેશ કાંકદ, શામજીબાપા અને અન્ય સંતોના ભજનો વાંચો અને સાંભળો.
        </p>
      </div>

      {/* Author Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/bhajans"
          className="px-4 py-2 rounded-xl bg-saffron-600 text-cream-50 text-xs font-bold shadow-sm"
        >
          તમામ ભજનો ({bhajans.length})
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

      {/* Bhajan Cards Grid */}
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
                {bhajan.lyrics.slice(0, 120)}...
              </p>
            </div>

            <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
              {bhajan.audioUrl ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-saffron-700 bg-saffron-500/10 px-2.5 py-0.5 rounded-full">
                  <Music className="w-3 h-3" /> ઓડિયો ઉપલબ્ધ
                </span>
              ) : (
                <span className="text-[11px] text-maroon-800/60">શબ્દો સંગ્રહ</span>
              )}

              <Link
                href={`/bhajans/${bhajan.slug}`}
                className="inline-flex items-center gap-1 text-sm font-bold text-maroon-900 hover:text-saffron-600 transition"
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
