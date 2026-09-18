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

  const title = settingsMap['authorsTitle'] || 'મહાન સર્જકો';
  const subtitle = settingsMap['authorsSubtitle'] || 'શામજીબાપા, સંત કબીર, મહાત્મા રવિરામ, બાપુ ઘૂસારામ અને પવિત્ર સંતોની સંતવાણી રચનાઓ.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 font-gujarati">
      {/* Header Banner */}
      <div className="text-center space-y-4 border-b border-border-elegant pb-12">
        <div className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest font-serif">
          <UserCheck className="w-4 h-4" />
          <span>સાહિત્ય સર્જકો</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-ink tracking-tight">{title}</h1>
        <p className="text-ink-muted text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>

      {/* Author Cards Grid with Staggered Animations */}
      <AuthorGrid authors={authors} />
    </div>
  );
}
