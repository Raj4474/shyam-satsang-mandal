import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { LiteratureRow } from '@/components/ui/LiteratureRow';

export const revalidate = 3600;

async function getHomeData() {
  try {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    const totalBhajans = await db.bhajan.count({ where: { status: 'PUBLISHED' } });
    const dailyIndex = totalBhajans > 0 ? dayOfYear % totalBhajans : 0;

    const [bhajans, authors, dailyBhajan] = await Promise.all([
      db.bhajan.findMany({
        where: { status: 'PUBLISHED' },
        include: { author: true },
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      db.author.findMany({
        take: 5,
        include: { _count: { select: { bhajans: true, dhuns: true } } },
        orderBy: { featured: 'desc' },
      }),
      totalBhajans > 0
        ? db.bhajan.findFirst({
            where: { status: 'PUBLISHED' },
            include: { author: true },
            skip: dailyIndex,
            orderBy: { id: 'asc' },
          })
        : null,
    ]);

    return { bhajans, authors, dailyBhajan };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return { bhajans: [], authors: [], dailyBhajan: null };
  }
}

export default async function HomePage() {
  const { bhajans, authors, dailyBhajan } = await getHomeData();

  return (
    <div className="font-gujarati pb-32">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center border-b border-border-elegant overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-paper-cream/30 -z-10 clip-diagonal" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8 max-w-2xl pt-20 lg:pt-0">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-ink tracking-tight leading-[1.1]">
                ગુજરાતી ભાષા અને<br />
                <span className="text-accent italic font-serif font-medium">સાહિત્યનો</span> ડિજિટલ<br />
                સંગ્રહ.
              </h1>
              <p className="text-lg sm:text-xl text-ink-muted leading-relaxed font-medium">
                પ્રાચીન સંતવાણી, ભક્તિગીતો અને મહાન સર્જકોના દિવ્ય પદોનું એક આધુનિક, નમ્ર અને શાંત સંગ્રહાલય.
              </p>
              
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <Link
                  href="/bhajans"
                  className="px-8 py-3.5 rounded-full bg-ink text-paper-surface font-semibold text-base shadow-soft hover:bg-accent transition-colors duration-300"
                >
                  સંગ્રહ શોધો
                </Link>
                <Link
                  href={dailyBhajan ? `/bhajans/${dailyBhajan.slug}` : "/bhajans"}
                  className="px-8 py-3.5 rounded-full bg-transparent border border-border-elegant text-ink hover:border-accent hover:text-accent font-semibold text-base transition-colors duration-300"
                >
                  આજનું વાંચન
                </Link>
              </div>
            </div>

            {/* Subtle open-book / manuscript-inspired visual */}
            <div className="hidden lg:flex justify-end relative h-full">
              <div className="relative w-[400px] h-[550px] bg-paper-surface border border-border-elegant shadow-[0_20px_60px_-15px_rgba(36,26,18,0.1)] rounded-r-3xl rounded-l-md flex flex-col justify-between p-12 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-border-elegant/30 to-transparent border-r border-border-elegant/20" />
                
                <div className="space-y-6 relative z-10 pl-4">
                  <div className="w-12 h-[1px] bg-accent/50" />
                  <h3 className="text-3xl font-serif font-bold text-ink/80 tracking-tight leading-snug">
                    "સંતવાણી અને હરિનામ સ્મરણ જીવનને પાવન બનાવે છે."
                  </h3>
                  <div className="w-full h-[1px] bg-border-elegant/50" />
                  <div className="space-y-3 opacity-20">
                    <div className="h-3 w-full bg-ink rounded-full" />
                    <div className="h-3 w-5/6 bg-ink rounded-full" />
                    <div className="h-3 w-4/6 bg-ink rounded-full" />
                    <div className="h-3 w-full bg-ink rounded-full" />
                    <div className="h-3 w-3/4 bg-ink rounded-full" />
                  </div>
                </div>
                
                <div className="text-right text-sm font-serif italic text-ink-muted">
                  પ્રાચીન ગ્રંથ - પાનું ૧
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Today's Reading (આજનું વાંચન) */}
      {dailyBhajan && (
        <section className="py-24 border-b border-border-elegant">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-xs font-bold tracking-widest text-accent uppercase font-serif">આજનું વાંચન</span>
              <div className="w-12 h-[1px] bg-accent" />
            </div>

            <Link href={`/bhajans/${dailyBhajan.slug}`} className="block group">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-ink tracking-tight leading-snug group-hover:text-accent transition-colors duration-300">
                {dailyBhajan.title.replace(/^[\d\.\s૦-૯]+/, '')}
              </h2>
            </Link>

            <p className="text-lg sm:text-2xl text-ink-muted leading-relaxed font-serif italic max-w-2xl mx-auto">
              "{dailyBhajan.lyrics?.split('\n').filter(l => l.trim().length > 0).slice(0, 2).join(' / ')}"
            </p>

            <div className="text-sm font-semibold text-ink uppercase tracking-widest border border-border-elegant inline-block px-6 py-2 rounded-full">
              {dailyBhajan.author?.gujaratiName || 'સંતવાણી'}
            </div>
          </div>
        </section>
      )}

      {/* 3. Category Editorial Rows */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between border-b-2 border-ink pb-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-ink">સાહિત્ય વિભાગો</h2>
        </div>

        <div className="flex flex-col">
          {[
            { id: '01', name: 'ભજન સંગ્રહ', desc: 'સંતવાણી પદો અને સદ્ગુરુ વાણીનો પવિત્ર સંગ્રહ.', href: '/bhajans' },
            { id: '02', name: 'ધૂન સંગ્રહ', desc: 'ભક્તિમય અને મનોહર ધૂન શ્રવણ કરો.', href: '/dhuns' },
            { id: '03', name: 'મહાન સર્જકો', desc: 'ગુજરાતી સાહિત્યના અમર રચયિતાઓ.', href: '/authors' },
            { id: '04', name: 'જીવન ચરિત્ર', desc: 'શામજીબાપાના જીવન અને વિચારોની યાત્રા.', href: '/biography' },
          ].map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 border-b border-border-elegant hover:bg-paper-cream transition-colors duration-300 px-4 -mx-4 rounded-xl"
            >
              <div className="flex items-baseline gap-6 sm:gap-12">
                <span className="text-sm font-bold text-accent font-serif tracking-wider shrink-0">{cat.id}</span>
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-ink group-hover:text-accent-dark transition-colors">{cat.name}</h3>
                  <p className="text-sm text-ink-muted">{cat.desc}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-accent mt-4 sm:mt-0 group-hover:translate-x-2 transition-transform hidden sm:inline-block">
                અન્વેષણ &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Recent Literature */}
      <section className="py-24 bg-paper-surface border-y border-border-elegant">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b-2 border-ink pb-4 mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-ink">નવીનતમ ઉમેરાયેલ</h2>
            <Link href="/bhajans" className="text-sm font-semibold text-accent hover:text-accent-dark transition-colors">
              બધા જુઓ &rarr;
            </Link>
          </div>
          
          <div className="flex flex-col">
            {bhajans.map((bhajan, index) => (
              <LiteratureRow
                key={bhajan.id}
                index={index + 1}
                title={bhajan.title.replace(/^[\d\.\s૦-૯]+/, '')}
                author={bhajan.author?.gujaratiName || 'શ્યામ સત્સંગ'}
                category={bhajan.category || 'સંતવાણી'}
                excerpt={bhajan.description || bhajan.lyrics?.slice(0, 80) || ''}
                href={`/bhajans/${bhajan.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Author Wall */}
      {authors.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-ink tracking-tight mb-4">સાહિત્ય સર્જકો</h2>
            <div className="w-12 h-[2px] bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
            {authors.map((author, idx) => (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="group flex flex-col items-center text-center space-y-4"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-border-elegant relative group-hover:border-accent transition-colors duration-500">
                  <Image
                    src={author.profileImage || '/authors/default-sant.jpg'}
                    alt={author.gujaratiName}
                    fill
                    sizes="(max-width: 768px) 96px, 128px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-paper-surface">
                    <span className="text-xs font-bold">{author._count?.bhajans || 0} પદો</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-ink group-hover:text-accent transition-colors">{author.gujaratiName}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/authors" className="inline-block px-8 py-3 border border-border-elegant rounded-full text-ink font-semibold hover:bg-paper-cream transition-colors">
              તમામ સર્જકો જુઓ
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
