import React from 'react';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Music, BookOpen, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getAuthorDetail(slug: string) {
  try {
    const author = await db.author.findFirst({
      where: { OR: [{ slug }, { id: slug }] },
      include: {
        bhajans: { where: { status: 'PUBLISHED' }, orderBy: { createdAt: 'desc' } },
        dhuns: { where: { status: 'PUBLISHED' }, orderBy: { createdAt: 'desc' } },
      },
    });
    return author;
  } catch (error) {
    console.error('Error loading author details:', error);
    return null;
  }
}

export default async function AuthorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthorDetail(slug);

  if (!author) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 font-gujarati">
      {/* Back Link */}
      <div>
        <Link
          href="/authors"
          className="inline-flex items-center gap-2 text-sm font-bold text-maroon-800 hover:text-saffron-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>પરત સંતોની યાદીમાં (Back to Authors)</span>
        </Link>
      </div>

      {/* Author Bio Header Card */}
      <div className="bg-[#FAF5EC] dark:bg-maroon-950/80 rounded-[28px] p-6 sm:p-8 border border-gold-500/40 shadow-sm flex items-center gap-6 sm:gap-8">
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-gold-500/50 shadow-md flex-shrink-0">
          <img
            src={author.profileImage || '/shyamjibapa.jpg'}
            alt={author.gujaratiName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-1.5 flex-grow">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-maroon-950 dark:text-gold-400 tracking-tight">{author.gujaratiName}</h1>
          {author.birthInfo && <p className="text-base sm:text-lg font-bold text-saffron-700 dark:text-saffron-400">{author.birthInfo}</p>}
          {author.shortBio && (
            <p className="text-maroon-900/80 dark:text-cream-200 text-sm leading-relaxed whitespace-pre-line pt-1">
              {author.shortBio}
            </p>
          )}
        </div>
      </div>

      {/* Bhajans by Author */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-maroon-950 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-saffron-600" />
          <span>{author.gujaratiName} ના રચેલા ભજનો ({author.bhajans.length})</span>
        </h2>

        {author.bhajans.length === 0 ? (
          <p className="text-sm text-maroon-800/60 italic">હજુ સુધી કોઈ ભજન ઉમેરાયેલ નથી.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {author.bhajans.map((bhajan) => (
              <Link
                key={bhajan.id}
                href={`/bhajans/${bhajan.slug}`}
                className="bg-cream-50 rounded-2xl p-5 border border-saffron-500/20 hover:border-saffron-500/50 shadow-sm hover:shadow-md transition flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-maroon-950 text-lg mb-1">{bhajan.title}</h3>
                  <span className="text-xs text-saffron-700 bg-saffron-500/10 px-2.5 py-0.5 rounded-full font-semibold">
                    {bhajan.category || 'સંતવાણી'}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-saffron-600" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Dhuns by Author */}
      <div className="space-y-6 pt-6 border-t border-saffron-500/20">
        <h2 className="text-2xl font-bold text-maroon-950 flex items-center gap-2">
          <Music className="w-5 h-5 text-gold-600" />
          <span>{author.gujaratiName} ની પવિત્ર ધૂન ({author.dhuns.length})</span>
        </h2>

        {author.dhuns.length === 0 ? (
          <p className="text-sm text-maroon-800/60 italic">હજુ સુધી કોઈ ધૂન ઉમેરાયેલ નથી.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {author.dhuns.map((dhun) => (
              <Link
                key={dhun.id}
                href={`/dhuns/${dhun.slug}`}
                className="bg-cream-50 rounded-2xl p-5 border border-saffron-500/20 hover:border-saffron-500/50 shadow-sm hover:shadow-md transition flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-maroon-950 text-lg mb-1">{dhun.title}</h3>
                  <p className="text-xs text-maroon-800/70 line-clamp-1">{dhun.description || dhun.lyrics}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gold-600" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
