import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { BookOpen, Sparkles, Music, UserCheck, Play, ArrowRight, Search, HeartHandshake, Mic, Flame, Feather } from 'lucide-react';
import { FeaturedBhajanCarousel } from '@/components/home/FeaturedBhajanCarousel';

export const revalidate = 3600;

async function getHomeData() {
  try {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    const totalBhajans = await db.bhajan.count({ where: { status: 'PUBLISHED' } });
    const dailyIndex = totalBhajans > 0 ? dayOfYear % totalBhajans : 0;

    const [bhajans, authors, settings, featuredBhajans] = await Promise.all([
      db.bhajan.findMany({
        where: { status: 'PUBLISHED' },
        include: { author: true },
        take: 6,
        orderBy: { createdAt: 'desc' },
      }),
      db.author.findMany({
        take: 4,
        include: { _count: { select: { bhajans: true, dhuns: true } } },
        orderBy: { featured: 'desc' },
      }),
      db.siteSetting.findMany(),
      totalBhajans > 0
        ? db.bhajan.findMany({
            where: { status: 'PUBLISHED' },
            include: { author: true },
            skip: dailyIndex,
            take: 5,
            orderBy: { id: 'asc' },
          })
        : [],
    ]);

    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => (settingsMap[s.key] = s.value));

    // If we fetched fewer than 5 because we were at the end, we can just display what we got
    return { bhajans, authors, settingsMap, featuredBhajans };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return { bhajans: [], authors: [], settingsMap: {}, featuredBhajans: [] };
  }
}

export default async function HomePage() {
  const { bhajans, authors, settingsMap, featuredBhajans } = await getHomeData();

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

      {/* 2. Featured Bhajan Carousel */}
      <FeaturedBhajanCarousel featuredBhajans={featuredBhajans} />

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
      {/* 5. Featured Dhuns Section Removed */}

    </div>
  );
}
