import React from 'react';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DhunPlayer } from '@/components/dhun/DhunPlayer';
import { ArrowLeft, Music, Sparkles } from 'lucide-react';

async function getDhun(slug: string) {
  try {
    const dhun = await db.dhun.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
      include: { author: true },
    });
    if (!dhun) return null;

    const related = await db.dhun.findMany({
      where: {
        status: 'PUBLISHED',
        id: { not: dhun.id },
      },
      include: { author: true },
      take: 3,
    });

    return { dhun, related };
  } catch (error) {
    console.error('Error fetching dhun details:', error);
    return null;
  }
}

export default async function DhunDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getDhun(slug);

  if (!data || !data.dhun) {
    notFound();
  }

  const { dhun, related } = data;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 font-gujarati">
      {/* Back Button */}
      <div>
        <Link
          href="/dhuns"
          className="inline-flex items-center gap-2 text-sm font-bold text-maroon-800 hover:text-saffron-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>પરત ધૂનોની યાદીમાં (Back to Dhuns)</span>
        </Link>
      </div>

      {/* Main Dhun Player Component */}
      <DhunPlayer dhun={dhun} />

      {/* Related Dhuns */}
      {related.length > 0 && (
        <div className="space-y-6 border-t border-saffron-500/20 pt-10">
          <h3 className="text-2xl font-bold text-maroon-950">અન્ય પવિત્ર ધૂન</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/dhuns/${item.slug}`}
                className="bg-cream-50 rounded-2xl p-5 border border-saffron-500/20 hover:border-saffron-500/50 shadow-sm hover:shadow-md transition space-y-2"
              >
                <span className="text-[11px] font-semibold text-saffron-700">{item.author?.gujaratiName}</span>
                <h4 className="text-lg font-bold text-maroon-950 line-clamp-1">{item.title}</h4>
                <p className="text-xs text-maroon-800/70 line-clamp-2">{item.description || item.lyrics}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
