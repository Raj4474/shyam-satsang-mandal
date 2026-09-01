import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { BookOpen, Sparkles, Music, UserCheck, Play, ArrowRight, Search, HeartHandshake, Mic } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getHomeData() {
  try {
    const [bhajans, dhuns, authors, settings] = await Promise.all([
      db.bhajan.findMany({
        where: { status: 'PUBLISHED' },
        include: { author: true },
        take: 6,
        orderBy: { createdAt: 'desc' },
      }),
      db.dhun.findMany({
        where: { status: 'PUBLISHED' },
        include: { author: true },
        take: 4,
        orderBy: { createdAt: 'desc' },
      }),
      db.author.findMany({
        take: 4,
        include: { _count: { select: { bhajans: true, dhuns: true } } },
        orderBy: { featured: 'desc' },
      }),
      db.siteSetting.findMany(),
    ]);

    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => (settingsMap[s.key] = s.value));

    return { bhajans, dhuns, authors, settingsMap };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return { bhajans: [], dhuns: [], authors: [], settingsMap: {} };
  }
}

export default async function HomePage() {
  const { bhajans, dhuns, authors, settingsMap } = await getHomeData();

  const heroTitle = settingsMap['heroTitle'] || 'ભજન, ધૂન અને આધ્યાત્મિક વારસાનું ડિજિટલ સંગ્રહાલય';
  const heroSubtitle = settingsMap['heroSubtitle'] || 'સંતવાણી, ભક્તિ અને જીવનમૂલ્યોને આગામી પેઢી સુધી પહોંચાડવાનો એક પ્રયાસ.';

  return (
    <div className="space-y-16 font-gujarati pb-12">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-saffron-500/10 via-cream-100 to-cream-50 pt-12 pb-20 border-b border-saffron-500/15">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-500/15 border border-saffron-500/30 text-saffron-800 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-saffron-600" />
            <span>શ્યામ સત્સંગ મંડળ પવિત્ર સંગ્રહાલય</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-maroon-950 tracking-normal max-w-4xl mx-auto leading-relaxed pt-2 mb-6 sm:mb-8 px-2">
            {heroTitle}
          </h1>

          <p className="text-base sm:text-xl text-maroon-800/80 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2">
            {heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
            <Link
              href="/biography"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-maroon-800 to-maroon-900 hover:from-maroon-900 hover:to-maroon-950 text-cream-50 font-bold text-base shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5 text-gold-400" />
              <span>જીવન ચરિત્ર વાંચો</span>
            </Link>

            <Link
              href="/bhajans"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-cream-50 font-bold text-base shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-gold-300" />
              <span>ભજન જુઓ</span>
            </Link>

            <Link
              href="/dhuns"
              className="px-6 py-3.5 rounded-2xl bg-cream-50 border-2 border-gold-500/60 hover:bg-gold-50 text-maroon-900 font-bold text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <Music className="w-5 h-5 text-saffron-600" />
              <span>ધૂન જુઓ</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Main Category Cards (Specification Cards 1, 2, 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-maroon-950">મુખ્ય વિભાગો</h2>
          <p className="text-maroon-800/70 text-sm mt-1">અમારા પવિત્ર સંગ્રહના ત્રણ મુખ્ય આધારસ્તંભ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: જીવન ચરિત્ર */}
          <div className="group relative bg-gradient-to-br from-cream-50 via-cream-100 to-saffron-50/40 rounded-3xl p-8 border border-saffron-500/20 shadow-card hover:shadow-spiritual transition duration-300 flex flex-col justify-between">
            <div className="w-14 h-14 rounded-2xl bg-maroon-900 text-gold-400 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition transform">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-maroon-950 mb-3">શામજીબાપાનું જીવન ચરિત્ર</h3>
              <p className="text-maroon-800/80 text-sm leading-relaxed mb-6">
                શામજીબાપાના જીવન, વિચારો અને આધ્યાત્મિક યાત્રા વિશે વિસ્તૃત જાણો.
              </p>
            </div>
            <Link
              href="/biography"
              className="inline-flex items-center gap-2 font-bold text-saffron-700 hover:text-maroon-900 text-sm group-hover:translate-x-1 transition"
            >
              <span>વિસ્તારથી વાંચો</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: ભજન */}
          <div className="group relative bg-gradient-to-br from-cream-50 via-cream-100 to-saffron-50/40 rounded-3xl p-8 border border-saffron-500/20 shadow-card hover:shadow-spiritual transition duration-300 flex flex-col justify-between">
            <div className="w-14 h-14 rounded-2xl bg-saffron-600 text-cream-50 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition transform">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-maroon-950 mb-3">ભજન</h3>
              <p className="text-maroon-800/80 text-sm leading-relaxed mb-6">
                સંતવાણી પદો અને સદ્ગુરુ વાણીનો પવિત્ર સંગ્રહ.
              </p>
            </div>
            <Link
              href="/bhajans"
              className="inline-flex items-center gap-2 font-bold text-saffron-700 hover:text-maroon-900 text-sm group-hover:translate-x-1 transition"
            >
              <span>બધા ભજનો જુઓ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: ધૂન */}
          <div className="group relative bg-gradient-to-br from-cream-50 via-cream-100 to-saffron-50/40 rounded-3xl p-8 border border-saffron-500/20 shadow-card hover:shadow-spiritual transition duration-300 flex flex-col justify-between">
            <div className="w-14 h-14 rounded-2xl bg-gold-600 text-maroon-950 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition transform">
              <Music className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-maroon-950 mb-3">ધૂન</h3>
              <p className="text-maroon-800/80 text-sm leading-relaxed mb-6">
                ભક્તિમય અને મનોહર ધૂન વાંચો તથા શ્રવણ કરો.
              </p>
            </div>
            <Link
              href="/dhuns"
              className="inline-flex items-center gap-2 font-bold text-saffron-700 hover:text-maroon-900 text-sm group-hover:translate-x-1 transition"
            >
              <span>ધૂન સાંભળો</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Featured Bhajans Section (Rendered if Bhajans exist) */}
      {bhajans.length > 0 ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-maroon-950">પ્રખ્યાત ભજનો</h2>
              <p className="text-maroon-800/70 text-sm mt-1">લોકપ્રિય અને બોધદાયી સંતવાણી પદો</p>
            </div>
            <Link
              href="/bhajans"
              className="hidden sm:flex items-center gap-1.5 font-bold text-saffron-700 hover:text-maroon-900 text-sm"
            >
              <span>તમામ જુઓ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bhajans.map((bhajan) => (
              <div
                key={bhajan.id}
                className="bg-cream-50 rounded-2xl border border-saffron-500/20 shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-saffron-700 font-semibold mb-2">
                    <span className="bg-saffron-500/10 px-2.5 py-1 rounded-full">{bhajan.category || 'સંતવાણી'}</span>
                    <span>{bhajan.author?.gujaratiName || 'શ્યામ સત્સંગ'}</span>
                  </div>
                  <h3 className="text-xl font-bold text-maroon-950 mb-2 leading-snug">{bhajan.title}</h3>
                  <p className="text-maroon-800/75 text-xs line-clamp-2 leading-relaxed">
                    {bhajan.description || bhajan.lyrics.slice(0, 100)}...
                  </p>
                </div>

                <div className="pt-2 border-t border-cream-200 flex items-center justify-between">
                  <Link
                    href={`/bhajans/${bhajan.slug}`}
                    className="text-xs font-bold text-maroon-900 hover:text-saffron-600 flex items-center gap-1"
                  >
                    <span>વાંચો</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-saffron-500/10 via-cream-100 to-cream-50 rounded-3xl p-8 border border-saffron-500/30 text-center space-y-4 shadow-sm">
            <h2 className="text-2xl font-bold text-maroon-950">શામજીબાપા જીવન ચરિત્ર ગ્રંથ (PDF)</h2>
            <p className="text-maroon-800/80 text-sm max-w-xl mx-auto leading-relaxed">
              શામજીબાપા જીવન ચરિત્રનું સંપૂર્ણ પવિત્ર પુસ્તક પીડીએફ સ્વરૂપે ઉપલબ્ધ છે.
            </p>
            <div className="pt-2">
              <Link
                href="/biography"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-cream-50 font-bold text-sm shadow-md transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>જીવન ચરિત્ર PDF વાંચવા અહીં ક્લિક કરો</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 4. Featured Authors / Saints */}
      <section className="bg-maroon-950 text-cream-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gold-400">મહાન સંતો અને કવિયીત્રીઓ</h2>
            <p className="text-cream-300/70 text-sm mt-1">જેમના દિવ્ય પદોથી ગુજરાતી સાહિત્ય સમૃદ્ધ થયું છે</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {authors.map((author) => (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="group bg-maroon-900/60 rounded-2xl border border-gold-500/20 p-6 text-center hover:border-gold-500/50 hover:bg-maroon-900 transition flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gold-500/40 group-hover:scale-105 transition shadow-md">
                  <img
                    src={author.profileImage || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80'}
                    alt={author.gujaratiName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gold-400 mb-1">{author.gujaratiName}</h3>
                <p className="text-xs text-cream-300/70 line-clamp-2 mb-3">{author.shortBio}</p>
                <span className="text-[11px] text-saffron-400 font-semibold bg-saffron-500/10 px-3 py-1 rounded-full">
                  {author._count?.bhajans || 0} ભજન • {author._count?.dhuns || 0} ધૂન
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
