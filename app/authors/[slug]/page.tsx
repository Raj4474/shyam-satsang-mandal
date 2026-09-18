import React from 'react';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sparkles, Music } from 'lucide-react';
import { LiteratureRow } from '@/components/ui/LiteratureRow';

export const revalidate = 3600;

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 font-gujarati">
      {/* Back Link */}
      <div>
        <Link
          href="/authors"
          className="inline-flex items-center gap-2 text-sm font-bold text-ink-muted hover:text-ink transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>પરત સર્જકોની યાદીમાં</span>
        </Link>
      </div>

      {/* Author Bio Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 border-b border-border-elegant pb-16">
        <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border border-border-elegant flex-shrink-0 relative">
          <Image
            src={author.profileImage || '/authors/default-sant.jpg'}
            alt={author.gujaratiName}
            fill
            priority
            sizes="(max-width: 640px) 192px, 256px"
            className="object-cover grayscale"
          />
        </div>
        <div className="space-y-6 flex-grow text-center md:text-left">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-ink tracking-tight">{author.gujaratiName}</h1>
          {author.birthInfo && <p className="text-lg font-bold text-accent font-serif tracking-wide">{author.birthInfo}</p>}
          {author.shortBio && (
            <p className="text-ink-muted text-base sm:text-lg leading-relaxed whitespace-pre-line font-medium max-w-2xl">
              {author.shortBio}
            </p>
          )}
        </div>
      </div>

      {/* Bhajans by Author */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b-2 border-ink pb-4">
          <h2 className="text-2xl font-bold text-ink flex items-center gap-2">
            <span>સંતવાણી અને ભજનો</span>
          </h2>
          <span className="text-sm font-serif italic text-ink-muted">{author.bhajans.length} કૃતિઓ</span>
        </div>

        {author.bhajans.length === 0 ? (
          <p className="text-sm text-ink-muted italic py-8 text-center">હજુ સુધી કોઈ કૃતિ ઉમેરાયેલ નથી.</p>
        ) : (
          <div className="flex flex-col">
            {author.bhajans.map((bhajan, index) => (
              <LiteratureRow
                key={bhajan.id}
                index={index + 1}
                title={bhajan.title.replace(/^[\d\.\s૦-૯]+/, '')}
                author={author.gujaratiName}
                category={bhajan.category || 'સંતવાણી'}
                excerpt={bhajan.description || bhajan.lyrics?.slice(0, 80) || ''}
                href={`/bhajans/${bhajan.slug}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dhuns by Author */}
      {author.dhuns.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b-2 border-ink pb-4">
            <h2 className="text-2xl font-bold text-ink flex items-center gap-2">
              <span>ધૂન સંગ્રહ</span>
            </h2>
            <span className="text-sm font-serif italic text-ink-muted">{author.dhuns.length} ધૂન</span>
          </div>

          <div className="flex flex-col">
            {author.dhuns.map((dhun, index) => (
              <LiteratureRow
                key={dhun.id}
                index={index + 1}
                title={dhun.title}
                author={author.gujaratiName}
                category="ધૂન"
                excerpt={dhun.description || dhun.lyrics?.slice(0, 80) || ''}
                href={`/dhuns/${dhun.slug}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
