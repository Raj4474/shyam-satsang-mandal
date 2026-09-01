import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles, Music, UserCheck, BookOpen, Image as ImageIcon, Settings, LayoutDashboard, Globe } from 'lucide-react';
import { AdminGuard } from '@/components/admin/AdminGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminLinks = [
    { name: 'ડેશબોર્ડ', href: '/admin', icon: LayoutDashboard },
    { name: 'ભજન સંગ્રહ', href: '/admin/bhajans', icon: Sparkles },
    { name: 'ધૂન સંગ્રહ', href: '/admin/dhuns', icon: Music },
    { name: 'સંતો / લેખકો', href: '/admin/authors', icon: UserCheck },
    { name: 'જીવન ચરિત્ર', href: '/admin/biography', icon: BookOpen },
    { name: 'મીડિયા ફાઇલો', href: '/admin/media', icon: ImageIcon },
    { name: 'વેબસાઈટ સેટિંગ્સ', href: '/admin/settings', icon: Settings },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-cream-100/50 font-gujarati flex flex-col md:flex-row">
        {/* Responsive Sidebar for Mobile, Tablet & Desktop */}
        <aside className="w-full md:w-64 bg-maroon-950 text-cream-100 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gold-500/30 flex-shrink-0">
          <div className="flex items-center justify-between md:justify-start gap-3 pb-4 md:pb-6 border-b border-gold-500/20 mb-4 md:mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-saffron-600 flex items-center justify-center font-bold text-cream-50 shadow">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base sm:text-lg text-gold-400">એડમિન પેનલ</h2>
                <p className="text-[11px] text-cream-300/70">શ્યામ સત્સંગ મંડળ</p>
              </div>
            </div>

            <Link
              href="/"
              className="md:hidden flex items-center gap-1 text-xs font-bold text-saffron-400 hover:text-saffron-300 transition"
            >
              <Globe className="w-4 h-4" />
              <span>મુખ્ય સાઈટ</span>
            </Link>
          </div>

          <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible gap-1.5 pb-2 md:pb-0 no-scrollbar">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-semibold text-cream-200 hover:bg-maroon-900 hover:text-gold-400 transition whitespace-nowrap"
                >
                  <Icon className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block pt-8 border-t border-gold-500/20 mt-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-bold text-saffron-400 hover:text-saffron-300 transition"
            >
              <Globe className="w-4 h-4" />
              <span>વેબસાઈટ પર જાવ (View Public Site)</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 sm:p-6 md:p-10 max-w-6xl w-full overflow-hidden">{children}</main>
      </div>
    </AdminGuard>
  );
}
