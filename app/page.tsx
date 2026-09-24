import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { BookOpen, Sparkles, Music, UserCheck, Play, ArrowRight, Search, HeartHandshake, Mic, Flame, Feather } from 'lucide-react';

export const revalidate = 3600;

async function getHomeData() {
  try {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    const totalBhajans = await db.bhajan.count({ where: { status: 'PUBLISHED' } });
    const dailyIndex = totalBhajans > 0 ? dayOfYear % totalBhajans : 0;

    const [bhajans, dhuns, authors, settings, dailyBhajan] = await Promise.all([
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
      totalBhajans > 0
        ? db.bhajan.findFirst({
            where: { status: 'PUBLISHED' },
            include: { author: true },
            skip: dailyIndex,
            orderBy: { id: 'asc' },
          })
        : null,
    ]);

    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => (settingsMap[s.key] = s.value));

    return { bhajans, dhuns, authors, settingsMap, dailyBhajan };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return { bhajans: [], dhuns: [], authors: [], settingsMap: {}, dailyBhajan: null };
  }
}

export default async function HomePage() {
  const { bhajans, dhuns, authors, settingsMap, dailyBhajan } = await getHomeData();

  const heroBadge = settingsMap['heroBadge'] || 'શ્યામ સત્સંગ મંડળ પવિત્ર સંગ્રહાલય';
  const heroTitle = settingsMap['heroTitle'] || 'ભજન, ધૂન, આરતી અને આધ્યાત્મિક વારસાનું ડિજિટલ સંગ્રહાલય';
  const heroSubtitle = settingsMap['heroSubtitle'] || 'સંતવાણી, ભક્તિ અને જીવનમૂલ્યોને આગામી પેઢી સુધી પહોંચાડવાનો એક પ્રયાસ.';

  const card1Title = settingsMap['card1Title'] || 'શામજીબાપાનું જીવન ચરિત્ર';
  const card1Desc = settingsMap['card1Desc'] || 'શામજીબાપાના જીવન, વિચારો અને આધ્યાત્મિક યાત્રા વિશે વિસ્તૃત જાણો.';
  const card2Title = settingsMap['card2Title'] || 'ભજન સંગ્રહ';
  const card2Desc = settingsMap['card2Desc'] || 'સંતવાણી પદો અને સદ્ગુરુ વાણીનો પવિત્ર સંગ્રહ.';
  const card3Title = settingsMap['card3Title'] || 'ધૂન સંગ્રહ';
  const card3Desc = settingsMap['card3Desc'] || 'ભક્તિમય અને મનોહર ધૂન વાંચો તથા શ્રવણ કરો.';

  const saintsTitle = settingsMap['saintsTitle'] || 'મહાન સંતો';
  const saintsSubtitle = settingsMap['saintsSubtitle'] || 'જેમના દિવ્ય પદોથી ગુજરાતી સાહિત્ય સમૃદ્ધ થયું છે';

  return (
    <div className="space-y-24 font-gujarati pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24">
        {/* Soft orb background effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sand-200/50 rounded-full blur-[100px] pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/60 text-ink-700 text-xs sm:text-sm font-medium mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-saffron-600" />
            <span>{heroBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-ink-900 tracking-tight max-w-4xl mx-auto leading-tight mb-6 px-2">
            {heroTitle}
          </h1>

          <p className="text-lg sm:text-xl text-ink-600 max-w-2xl mx-auto leading-relaxed mb-10 px-2 font-medium">
            {heroSubtitle}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/biography"
              className="px-7 py-3.5 rounded-full bg-saffron-600 text-white font-semibold text-base shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>જીવન ચરિત્ર વાંચો</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/bhajans"
              className="px-7 py-3.5 rounded-full bg-white/60 hover:bg-white/80 border border-white/60 text-ink-900 font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-saffron-600" />
              <span>ભજન જુઓ</span>
            </Link>

            <Link
              href="/dhuns"
              className="px-7 py-3.5 rounded-full bg-white/60 hover:bg-white/80 border border-white/60 text-ink-900 font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md shadow-sm"
            >
              <Music className="w-4 h-4 text-saffron-600" />
              <span>ધૂન જુઓ</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Daily Bhajan of the Day Banner */}
      {dailyBhajan && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden glass-panel rounded-[2.5rem] p-8 sm:p-12 text-ink-900 shadow-soft hover:shadow-spiritual transition-shadow duration-500">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-5 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-saffron-600 text-sm font-bold tracking-wider">
                  <Flame className="w-4 h-4 animate-pulse" />
                  <span>આજનું પદ</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight leading-snug">
                  {dailyBhajan.title}
                </h2>

                <p className="text-sm text-ink-600 font-medium">
                  રચયિતા: <span className="font-bold text-ink-900">{dailyBhajan.author?.gujaratiName || 'સંતવાણી'}</span>
                </p>

                <p className="text-base sm:text-lg text-ink-700 leading-relaxed italic border-l-2 border-saffron-300 pl-5 py-1 line-clamp-3 whitespace-pre-line">
                  {dailyBhajan.lyrics?.split('\n').slice(0, 4).join('\n')}
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href={`/bhajans/${dailyBhajan.slug}`}
                  className="w-14 h-14 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white shadow-soft transition-all duration-300 flex items-center justify-center group"
                  title="સંપૂર્ણ ભજન વાંચો"
                >
                  <Play className="w-5 h-5 ml-1 group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Main Category Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-ink-900 tracking-tight">મુખ્ય વિભાગો</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            {
              title: card1Title,
              desc: card1Desc,
              icon: BookOpen,
              href: '/biography',
              linkText: 'વિસ્તારથી વાંચો'
            },
            {
              title: card2Title,
              desc: card2Desc,
              icon: Sparkles,
              href: '/bhajans',
              linkText: 'ભજન જુઓ'
            },
            {
              title: card3Title,
              desc: card3Desc,
              icon: Music,
              href: '/dhuns',
              linkText: 'ધૂન શ્રવણ કરો'
            },
            {
              title: 'પવિત્ર આરતી',
              desc: 'સદ્ગુરુ શ્યામરામ તથા ધૂસારામ બાપાની નિત્ય દિવ્ય આરતી અને સ્તુતિ.',
              icon: Flame,
              href: '/aarti',
              linkText: 'આરતી સ્તુતિ વાંચો'
            }
          ].map((item, idx) => (
            <div key={idx} className="group glass-panel rounded-3xl p-8 hover:shadow-spiritual transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-full bg-white/60 shadow-sm text-ink-900 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-saffron-600 group-hover:text-white transition-all duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-ink-900 mb-3 tracking-tight">{item.title}</h3>
                <p className="text-ink-600 text-sm leading-relaxed mb-8">
                  {item.desc}
                </p>
              </div>
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 font-semibold text-ink-900 text-sm group-hover:gap-3 transition-all"
              >
                <span>{item.linkText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Aarti Section Moved to Separate Page */}
      {/* 5. Featured Dhuns Section */}
      {dhuns.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-ink-900 tracking-tight">મનોહર ધૂન સંગ્રહ</h2>
            </div>
            <Link
              href="/dhuns"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-600 hover:text-ink-900 transition-colors"
            >
              <span>તમામ ધૂન જુઓ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dhuns.map((dhun) => (
              <Link
                key={dhun.id}
                href={`/dhuns/${dhun.slug}`}
                className="group glass-panel rounded-[2rem] p-7 hover:shadow-spiritual transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center text-xs font-semibold text-ink-500">
                    <span className="bg-sand-200/80 px-3 py-1 rounded-full text-ink-800">ધૂન</span>
                  </div>
                  <h3 className="text-2xl font-bold text-ink-900 tracking-tight group-hover:text-saffron-600 transition-colors">{dhun.title}</h3>
                  <p className="text-sm text-ink-600 line-clamp-2 leading-relaxed">
                    {dhun.description?.startsWith('ધૂન નંબર') ? dhun.lyrics?.slice(0, 100) : (dhun.description || dhun.lyrics?.slice(0, 100))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 6. Featured Authors / Saints */}
      {authors.length > 0 && (
        <section className="bg-saffron-600/80 backdrop-blur-xl border border-saffron-400/30 text-white py-24 rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-8 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">{saintsTitle}</h2>
              <p className="text-cream-300 text-base">{saintsSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {authors.map((author) => (
                <Link
                  key={author.id}
                  href={`/authors/${author.slug}`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Feather className="w-8 h-8 text-saffron-300 opacity-80 group-hover:opacity-100 group-hover:text-white transition-all duration-300" />
                  </div>
                  <h3 className="font-bold text-xl text-white group-hover:text-saffron-400 transition-colors tracking-tight">
                    {author.gujaratiName}
                  </h3>
                  <p className="text-sm text-cream-400 mt-2">{author.birthInfo}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
