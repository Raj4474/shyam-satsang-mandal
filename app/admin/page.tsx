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
    { label: 'કુલ ભજનો (Bhajans)', count: bhajansCount, href: '/admin/bhajans', icon: Sparkles, color: 'bg-saffron-500' },
    { label: 'કુલ ધૂનો (Dhuns)', count: dhunsCount, href: '/admin/dhuns', icon: Music, color: 'bg-gold-500' },
    { label: 'સંતો / લેખકો (Authors)', count: authorsCount, href: '/admin/authors', icon: UserCheck, color: 'bg-maroon-700' },
    { label: 'જીવન ચરિત્ર સેક્શન', count: bioCount, href: '/admin/biography', icon: BookOpen, color: 'bg-saffron-700' },
    { label: 'મીડિયા ફાઇલો (Media)', count: mediaCount, href: '/admin/media', icon: ImageIcon, color: 'bg-maroon-900' },
  ];

  return (
    <div className="space-y-8 font-gujarati">
      <div>
        <h1 className="text-3xl font-extrabold text-maroon-950">એડમિન ડેશબોર્ડ (Overview)</h1>
        <p className="text-maroon-800/70 text-sm mt-1">શ્યામ સત્સંગ મંડળની સામગ્રીનું વ્યવસ્થાપન કરો.</p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              href={stat.href}
              className="bg-cream-50 rounded-3xl p-6 border border-saffron-500/20 shadow-sm hover:shadow-md transition flex items-center justify-between group"
            >
              <div>
                <span className="text-xs text-maroon-800/70 font-semibold">{stat.label}</span>
                <p className="text-4xl font-extrabold text-maroon-950 mt-2">{stat.count}</p>
              </div>
              <div className={`w-14 h-14 rounded-2xl ${stat.color} text-cream-50 flex items-center justify-center shadow-md group-hover:scale-105 transition`}>
                <Icon className="w-7 h-7" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-cream-50 rounded-3xl p-6 border border-saffron-500/20 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-saffron-500/20 pb-4">
          <h2 className="text-xl font-bold text-maroon-950">તાજેતરમાં ઉમેરાયેલા ભજનો</h2>
          <Link href="/admin/bhajans" className="text-xs font-bold text-saffron-700 hover:underline flex items-center gap-1">
            <span>બધા સંચાલિત કરો</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="divide-y divide-cream-200">
          {recentBhajans.map((bhajan) => (
            <div key={bhajan.id} className="py-3 flex items-center justify-between text-sm">
              <div>
                <h3 className="font-bold text-maroon-950">{bhajan.title}</h3>
                <span className="text-xs text-saffron-700">{bhajan.author?.gujaratiName || 'શ્યામ સત્સંગ'}</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-saffron-500/10 text-saffron-800 font-semibold">
                {bhajan.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
