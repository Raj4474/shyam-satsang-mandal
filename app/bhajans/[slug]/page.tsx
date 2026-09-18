import React from 'react';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BhajanReader } from '@/components/bhajan/BhajanReader';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { LiteratureRow } from '@/components/ui/LiteratureRow';

export const revalidate = 3600;

async function getBhajan(slug: string) {
  try {
    const bhajan = await db.bhajan.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
      include: { author: true },
    });
    if (!bhajan) return null;

    const related = await db.bhajan.findMany({
      where: {
        status: 'PUBLISHED',
        id: { not: bhajan.id },
      },
      include: { author: true },
      take: 3,
    });

    return { bhajan, related };
  } catch (error) {
    console.error('Error fetching bhajan details:', error);
    return null;
  }
}

export default async function BhajanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getBhajan(slug);

  if (!data || !data.bhajan) {
    notFound();
  }

  const { bhajan, related } = data;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 font-gujarati">
      {/* Back Button */}
      <div className="print:hidden">
        <Link
          href="/bhajans"
          className="inline-flex items-center gap-2 text-sm font-bold text-ink-muted hover:text-ink transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>પરત સંગ્રહમાં</span>
        </Link>
      </div>

      {/* Main Reader View */}
      <BhajanReader bhajan={bhajan} />

      {/* Related Bhajans */}
      {related.length > 0 && (
        <div className="print:hidden space-y-6 pt-16 border-t border-border-elegant">
          <div className="flex items-center justify-between border-b-2 border-ink pb-4 mb-4">
            <h2 className="text-sm font-bold tracking-widest text-ink uppercase">સંબંધિત સાહિત્ય</h2>
          </div>
          
          <div className="flex flex-col">
            {related.map((item, index) => (
              <LiteratureRow
                key={item.id}
                index={index + 1}
                title={item.title.replace(/^[\d\.\s૦-૯]+/, '')}
                author={item.author?.gujaratiName || 'શ્યામ સત્સંગ'}
                category={item.category || 'સંતવાણી'}
                excerpt={item.description || item.lyrics?.slice(0, 80) || ''}
                href={`/bhajans/${item.slug}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
