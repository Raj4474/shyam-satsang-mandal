import React from 'react';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Music, Video, Play, ArrowRight, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getDhunsData() {
  try {
    const [dhuns, authors] = await Promise.all([
      db.dhun.findMany({
        where: { status: 'PUBLISHED' },
        include: { author: true },
        orderBy: { createdAt: 'desc' },
      }),
      db.author.findMany({
        orderBy: { gujaratiName: 'asc' },
      }),
    ]);
    return { dhuns, authors };
  } catch (error) {
    console.error('Error fetching dhuns:', error);
    return { dhuns: [], authors: [] };
  }
}

export default async function DhunsPage() {
  const { dhuns, authors } = await getDhunsData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-gujarati">
      {/* Header Banner */}
      <div className="text-center space-y-3 border-b border-saffron-500/20 pb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 text-gold-800 text-xs font-semibold">
          <Music className="w-4 h-4 text-gold-600" />
          <span>ભક્તિમય નામ સ્મરણ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-maroon-950">પવિત્ર ધૂન સંગ્રહ</h1>
        <p className="text-maroon-800/80 text-base max-w-2xl mx-auto leading-relaxed">
          ઈશ્વરના દિવ્ય નામની કીર્તન ધૂનનો સંગ્રહ અને પદ સાહિત્ય.
        </p>
      </div>

      {/* Author Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/dhuns"
          className="px-4 py-2 rounded-xl bg-gold-600 text-maroon-950 text-xs font-bold shadow-sm"
        >
          તમામ ધૂન ({dhuns.length})
        </Link>
        {authors.map((author) => (
          <Link
            key={author.id}
            href={`/authors/${author.slug}`}
            className="px-4 py-2 rounded-xl bg-cream-100 hover:bg-gold-500/20 text-maroon-950 text-xs font-semibold border border-saffron-500/20 transition"
          >
            {author.gujaratiName}
          </Link>
        ))}
      </div>

      {/* Dhun Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dhuns.map((dhun) => (
          <div
            key={dhun.id}
            className="bg-cream-50 rounded-3xl border border-saffron-500/20 p-6 shadow-card hover:shadow-spiritual transition flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-saffron-700 font-semibold mb-3">
                <span className="bg-gold-500/15 px-3 py-1 rounded-full text-gold-800 font-bold">ધૂન</span>
                <span>{dhun.author?.gujaratiName || 'શ્યામ સત્સંગ'}</span>
              </div>
              <h2 className="text-2xl font-bold text-maroon-950 mb-2 leading-snug">{dhun.title}</h2>
              <p className="text-maroon-800/80 text-xs line-clamp-3 leading-relaxed whitespace-pre-line">
                {dhun.description || dhun.lyrics?.slice(0, 120)}
              </p>
            </div>

            <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {dhun.videoUrl && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-maroon-800 bg-maroon-900/10 px-2.5 py-0.5 rounded-full">
                    <Video className="w-3 h-3" /> વિડિયો
                  </span>
                )}
              </div>

              <Link
                href={`/dhuns/${dhun.slug}`}
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
