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
      <div className="min-h-screen bg-paper font-gujarati flex flex-col md:flex-row">
        {/* Minimal Sidebar for Mobile, Tablet & Desktop */}
        <aside className="w-full md:w-64 bg-paper-surface text-ink p-6 border-b md:border-b-0 md:border-r border-border-elegant flex-shrink-0">
          
          {/* Logo & Header */}
          <div className="flex items-center justify-between md:justify-start gap-4 pb-6 border-b border-border-elegant mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-border-elegant flex items-center justify-center font-bold text-accent shadow-sm bg-paper">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-base sm:text-lg text-ink tracking-tight uppercase">વહીવટ</h2>
                <p className="text-xs text-ink-muted font-serif italic">શ્યામ સત્સંગ</p>
              </div>
            </div>

            <Link
              href="/"
              className="md:hidden flex items-center gap-1 text-xs font-bold text-accent hover:text-accent-dark transition"
            >
              <Globe className="w-4 h-4" />
              <span>સાઈટ</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible gap-2 pb-2 md:pb-0 no-scrollbar">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-md text-xs md:text-sm font-semibold text-ink-muted hover:bg-paper hover:text-ink transition whitespace-nowrap border border-transparent hover:border-border-elegant"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block pt-8 border-t border-border-elegant mt-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-bold text-ink-muted hover:text-ink transition"
            >
              <Globe className="w-4 h-4" />
              <span>વેબસાઈટ પર જાવ</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4 sm:p-8 md:p-12 max-w-7xl w-full mx-auto overflow-hidden">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
