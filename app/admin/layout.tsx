import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles, Music, UserCheck, BookOpen, Image as ImageIcon, Settings, LayoutDashboard, Globe } from 'lucide-react';
import { AdminGuard } from '@/components/admin/AdminGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminLinks = [
    { name: 'ડેશબોર્ડ (Overview)', href: '/admin', icon: LayoutDashboard },
    { name: 'ભજન (Manage Bhajans)', href: '/admin/bhajans', icon: Sparkles },
    { name: 'ધૂન (Manage Dhuns)', href: '/admin/dhuns', icon: Music },
    { name: 'સંતો / લેખકો (Authors)', href: '/admin/authors', icon: UserCheck },
    { name: 'જીવન ચરિત્ર (Biography)', href: '/admin/biography', icon: BookOpen },
    { name: 'મીડિયા લાઈબ્રેરી (Media)', href: '/admin/media', icon: ImageIcon },
    { name: 'વેબસાઈટ સેટિંગ્સ', href: '/admin/settings', icon: Settings },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-cream-100/50 font-gujarati flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-maroon-950 text-cream-100 p-6 border-r border-gold-500/30 flex-shrink-0">
          <div className="flex items-center gap-3 pb-6 border-b border-gold-500/20 mb-6">
            <div className="w-10 h-10 rounded-xl bg-saffron-600 flex items-center justify-center font-bold text-cream-50">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-gold-400">એડમિન પેનલ</h2>
              <p className="text-xs text-cream-300/70">શ્યામ સત્સંગ વ્યવસ્થાપન</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-cream-200 hover:bg-maroon-900 hover:text-gold-400 transition"
                >
                  <Icon className="w-4 h-4 text-gold-500" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-gold-500/20 mt-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-bold text-saffron-400 hover:text-saffron-300 transition"
            >
              <Globe className="w-4 h-4" />
              <span>વેબસાઈટ પર જાવ (View Public Site)</span>
            </Link>
          </div>
        </aside>

        {/* Main Admin Content Area */}
        <main className="flex-grow p-6 md:p-10 max-w-6xl">{children}</main>
      </div>
    </AdminGuard>
  );
}
