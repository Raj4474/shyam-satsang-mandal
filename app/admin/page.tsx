import React from 'react';
import { db } from '@/lib/db';
import Link from 'next/link';
import { Sparkles, Music, UserCheck, BookOpen, Image as ImageIcon, ArrowRight } from 'lucide-react';

async function getDashboardStats() {
  try {
    const [bhajansCount, dhunsCount, authorsCount, bioCount, mediaCount] = await Promise.all([
      db.bhajan.count(),
      db.dhun.count(),
      db.author.count(),
      db.biographySection.count(),
      db.mediaItem.count(),
    ]);

    const recentBhajans = await db.bhajan.findMany({
      take: 5,
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });

    return { bhajansCount, dhunsCount, authorsCount, bioCount, mediaCount, recentBhajans };
  } catch (error) {
    console.error('Error loading admin stats:', error);
    return { bhajansCount: 0, dhunsCount: 0, authorsCount: 0, bioCount: 0, mediaCount: 0, recentBhajans: [] };
  }
}

export default async function AdminDashboardPage() {
  const { bhajansCount, dhunsCount, authorsCount, bioCount, mediaCount, recentBhajans } = await getDashboardStats();

  const stats = [
    { label: 'કુલ ભજનો', count: bhajansCount, href: '/admin/bhajans', icon: Sparkles },
    { label: 'કુલ ધૂનો', count: dhunsCount, href: '/admin/dhuns', icon: Music },
    { label: 'સંતો / લેખકો', count: authorsCount, href: '/admin/authors', icon: UserCheck },
    { label: 'જીવન ચરિત્ર', count: bioCount, href: '/admin/biography', icon: BookOpen },
    { label: 'મીડિયા ફાઇલો', count: mediaCount, href: '/admin/media', icon: ImageIcon },
  ];

  return (
    <div className="space-y-12 font-gujarati">
      <div className="border-b-2 border-ink pb-6">
        <h1 className="text-4xl font-extrabold text-ink tracking-tight">ડેશબોર્ડ</h1>
        <p className="text-ink-muted text-sm mt-2 font-serif italic">શ્યામ સત્સંગ મંડળની સામગ્રીનું વ્યવસ્થાપન</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              href={stat.href}
              className="bg-paper-surface p-6 border border-border-elegant hover:border-ink transition group flex items-start justify-between"
            >
              <div>
                <span className="text-xs tracking-widest text-ink-muted font-bold uppercase">{stat.label}</span>
                <p className="text-5xl font-extrabold text-ink mt-4 font-serif">{stat.count}</p>
              </div>
              <div className="text-accent opacity-50 group-hover:opacity-100 transition">
                <Icon className="w-8 h-8" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-paper-surface border border-border-elegant pt-6 pb-2">
        <div className="flex items-center justify-between border-b border-border-elegant pb-4 px-6">
          <h2 className="text-lg font-bold text-ink uppercase tracking-widest text-xs">તાજેતરમાં ઉમેરાયેલા ભજનો</h2>
          <Link href="/admin/bhajans" className="text-xs font-bold text-accent hover:text-accent-dark flex items-center gap-1 transition">
            <span>બધા જુઓ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="divide-y divide-border-elegant">
          {recentBhajans.map((bhajan) => (
            <div key={bhajan.id} className="px-6 py-4 flex items-center justify-between text-sm group hover:bg-paper transition-colors">
              <div>
                <h3 className="font-bold text-ink">{bhajan.title.replace(/^[\d\.\s૦-૯]+/, '')}</h3>
                <span className="text-xs text-ink-muted font-serif italic">{bhajan.author?.gujaratiName || 'શ્યામ સત્સંગ'}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-sm border font-semibold ${bhajan.status === 'PUBLISHED' ? 'border-green-600/30 text-green-700 bg-green-50' : 'border-orange-600/30 text-orange-700 bg-orange-50'}`}>
                {bhajan.status}
              </span>
            </div>
          ))}
          {recentBhajans.length === 0 && (
            <div className="px-6 py-8 text-center text-ink-muted text-sm italic">
              કોઈ ભજન મળ્યા નથી.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
