import React from 'react';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BhajanReader } from '@/components/bhajan/BhajanReader';
import { ArrowLeft, Sparkles, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
      <div>
        <Link
          href="/bhajans"
          className="inline-flex items-center gap-2 text-sm font-bold text-maroon-800 hover:text-saffron-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>પરત ભજનોની યાદીમાં (Back to Bhajans)</span>
        </Link>
      </div>

      {/* Main Reader View */}
      <BhajanReader bhajan={bhajan} />

      {/* Related Bhajans */}
      {related.length > 0 && (
        <div className="space-y-6 border-t border-saffron-500/20 pt-10">
          <h3 className="text-2xl font-bold text-maroon-950">અન્ય સંબંધિત ભજનો</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/bhajans/${item.slug}`}
                className="bg-cream-50 rounded-2xl p-5 border border-saffron-500/20 hover:border-saffron-500/50 shadow-sm hover:shadow-md transition space-y-2"
              >
                <span className="text-[11px] font-semibold text-saffron-700">{item.author?.gujaratiName}</span>
                <h4 className="text-lg font-bold text-maroon-950 line-clamp-1">{item.title}</h4>
                <p className="text-xs text-maroon-800/70 line-clamp-2">{item.lyrics}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
