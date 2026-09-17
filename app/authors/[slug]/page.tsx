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
          className="inline-flex items-center gap-2 text-sm font-bold text-ink-500 hover:text-ink-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>પરત સંતોની યાદીમાં (Back to Authors)</span>
        </Link>
      </div>

      {/* Author Bio Header Card */}
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 sm:p-10 border border-white/60 shadow-soft flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[1.5rem] overflow-hidden border border-white/60 shadow-sm flex-shrink-0">
          <img
            src={author.profileImage || '/shyamjibapa.jpg'}
            alt={author.gujaratiName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2 flex-grow text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-ink-900 tracking-tight">{author.gujaratiName}</h1>
          {author.birthInfo && <p className="text-base sm:text-lg font-bold text-saffron-700">{author.birthInfo}</p>}
          {author.shortBio && (
            <p className="text-ink-600 text-sm sm:text-base leading-relaxed whitespace-pre-line pt-2">
              {author.shortBio}
            </p>
          )}
        </div>
      </div>

      {/* Bhajans by Author */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-ink-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-saffron-600" />
          <span>{author.gujaratiName} ના રચેલા ભજનો ({author.bhajans.length})</span>
        </h2>

        {author.bhajans.length === 0 ? (
          <p className="text-sm text-ink-500 italic">હજુ સુધી કોઈ ભજન ઉમેરાયેલ નથી.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {author.bhajans.map((bhajan) => (
              <Link
                key={bhajan.id}
                href={`/bhajans/${bhajan.slug}`}
                className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/60 hover:border-saffron-500 shadow-sm hover:shadow-md transition flex items-center justify-between group"
              >
                <div>
                  <h3 className="font-bold text-ink-900 text-lg mb-1 group-hover:text-saffron-700 transition-colors">{bhajan.title}</h3>
                  <span className="text-xs text-ink-600 bg-sand-200 px-3 py-1 rounded-full font-semibold">
                    {bhajan.category || 'સંતવાણી'}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-ink-400 group-hover:text-saffron-600 transition-colors" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Dhuns by Author */}
      <div className="space-y-6 pt-6 border-t border-sand-200">
        <h2 className="text-2xl font-bold text-ink-900 flex items-center gap-2">
          <Music className="w-5 h-5 text-saffron-600" />
          <span>{author.gujaratiName} ની પવિત્ર ધૂન ({author.dhuns.length})</span>
        </h2>

        {author.dhuns.length === 0 ? (
          <p className="text-sm text-ink-500 italic">હજુ સુધી કોઈ ધૂન ઉમેરાયેલ નથી.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {author.dhuns.map((dhun) => (
              <Link
                key={dhun.id}
                href={`/dhuns/${dhun.slug}`}
                className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/60 hover:border-saffron-500 shadow-sm hover:shadow-md transition flex items-center justify-between group"
              >
                <div>
                  <h3 className="font-bold text-ink-900 text-lg mb-1 group-hover:text-saffron-700 transition-colors">{dhun.title}</h3>
                  <p className="text-xs text-ink-500 line-clamp-1">{dhun.description || dhun.lyrics}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-ink-400 group-hover:text-saffron-600 transition-colors" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
