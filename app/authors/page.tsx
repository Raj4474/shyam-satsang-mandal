import React from 'react';
import { db } from '@/lib/db';
import { UserCheck } from 'lucide-react';
import { AuthorGrid } from '@/components/author/AuthorGrid';

export const revalidate = 3600;

async function getAuthorsData() {
  try {
    const [authors, settings] = await Promise.all([
      db.author.findMany({
        include: {
          _count: { select: { bhajans: true, dhuns: true } },
        },
        orderBy: { gujaratiName: 'asc' },
      }),
      db.siteSetting.findMany(),
    ]);

    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => (settingsMap[s.key] = s.value));

    return { authors, settingsMap };
  } catch (error) {
    console.error('Error fetching authors:', error);
    return { authors: [], settingsMap: {} };
  }
}

export default async function AuthorsPage() {
  const { authors, settingsMap } = await getAuthorsData();

  const title = settingsMap['authorsTitle'] || 'મહાન સંતો';
  const subtitle = settingsMap['authorsSubtitle'] || 'શામજીબાપા, સંત કબીર, મહાત્મા રવિરામ, બાપુ ઘસુારામ અને પવિત્ર સંતોની સંતવાણી રચનાઓ.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-gujarati">
      {/* Header Banner */}
      <div className="text-center space-y-3 border-b border-saffron-500/20 pb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-500/15 text-saffron-800 text-xs font-semibold">
          <UserCheck className="w-4 h-4 text-saffron-600" />
          <span>સંત પરિચય અને રચયિતાઓ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-maroon-950">{title}</h1>
        <p className="text-maroon-800/80 text-base max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Author Cards Grid with Staggered Animations */}
      <AuthorGrid authors={authors} />
    </div>
  );
}
