import React from 'react';
import { db } from '@/lib/db';
import Link from 'next/link';
import { UserCheck, Sparkles, Music, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getAuthorsData() {
  try {
    const authors = await db.author.findMany({
      where: {
        OR: [
          { bhajans: { some: {} } },
          { dhuns: { some: {} } },
          { slug: 'shyamjibapa' },
        ],
      },
      include: {
        _count: { select: { bhajans: true, dhuns: true } },
      },
      orderBy: { gujaratiName: 'asc' },
    });
    return authors;
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
}

export default async function AuthorsPage() {
  const authors = await getAuthorsData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-gujarati">
      {/* Header Banner */}
      <div className="text-center space-y-3 border-b border-saffron-500/20 pb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-500/15 text-saffron-800 text-xs font-semibold">
          <UserCheck className="w-4 h-4 text-saffron-600" />
          <span>સંત પરિચય અને રચયિતાઓ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-maroon-950">મહાન સંતો</h1>
        <p className="text-maroon-800/80 text-base max-w-2xl mx-auto leading-relaxed">
          શામજીબાપા, સંત કબીર, મહાત્મા રવિરામ, બાપુ ઘસુારામ અને પવિત્ર સંતોની સંતવાણી રચનાઓ.
        </p>
      </div>

      {/* Author Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map((author) => (
          <Link
            key={author.id}
            href={`/authors/${author.slug}`}
            className="group bg-cream-50 rounded-3xl border border-saffron-500/20 p-6 shadow-card hover:shadow-spiritual transition flex flex-col items-center text-center space-y-4"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gold-500/40 shadow-md group-hover:scale-105 transition">
              <img
                src={author.profileImage || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80'}
                alt={author.gujaratiName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-maroon-950 group-hover:text-saffron-600 transition">
                {author.gujaratiName}
              </h2>
              <p className="text-xs text-saffron-700 font-semibold">{author.birthInfo}</p>
            </div>

            <p className="text-maroon-800/80 text-xs line-clamp-3 leading-relaxed">
              {author.shortBio || author.fullBio}
            </p>

            <div className="pt-4 border-t border-cream-200 w-full flex items-center justify-between text-xs">
              <span className="font-bold text-maroon-900 bg-saffron-500/10 px-3 py-1 rounded-full">
                {author._count?.bhajans || 0} ભજન • {author._count?.dhuns || 0} ધૂન
              </span>

              <span className="inline-flex items-center gap-1 font-bold text-saffron-700 group-hover:translate-x-1 transition">
                <span>જોવો</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
