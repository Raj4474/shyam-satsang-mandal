'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Music, Search, UserCheck, Menu, X, Home, Shield, Sparkles } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'મુખ્ય પૃષ્ઠ', href: '/', icon: Home },
    { name: 'જીવન ચરિત્ર', href: '/biography', icon: BookOpen },
    { name: 'ભજન', href: '/bhajans', icon: Sparkles },
    { name: 'ધૂન', href: '/dhuns', icon: Music },
    { name: 'સંત / લેખકો', href: '/authors', icon: UserCheck },
    { name: 'શોધો', href: '/search', icon: Search },
    { name: 'એડમિન (Admin)', href: '/admin', icon: Shield },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream-50/90 dark:bg-maroon-950/90 backdrop-blur-md border-b border-saffron-500/20 shadow-sm">
        {/* Top Gold Accent Stripe */}
        <div className="h-1 bg-gradient-to-r from-saffron-600 via-gold-500 to-maroon-700 w-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron-500 to-gold-500 p-0.5 shadow-spiritual overflow-hidden group-hover:scale-105 transition transform">
                <img
                  src="/logo.jpg"
                  alt="શ્યામ સત્સંગ મંડળ લોગો"
                  className="w-full h-full object-cover rounded-full border border-gold-500/40"
                />
              </div>
              <div>
                <span className="font-gujarati text-lg sm:text-2xl font-bold bg-gradient-to-r from-maroon-900 via-saffron-700 to-maroon-800 dark:from-gold-400 dark:to-saffron-400 bg-clip-text text-transparent block leading-tight">
                  શ્યામ સત્સંગ મંડળ
                </span>
                <span className="text-[10px] sm:text-xs text-saffron-700/80 dark:text-cream-300 font-gujarati tracking-wider block">
                  ગુજરાતી ભજન અને ધૂન ડિજિટલ લાઈબ્રેરી
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition font-gujarati ${
                      active
                        ? 'bg-saffron-500/15 text-saffron-700 dark:text-gold-400 border border-saffron-500/30'
                        : 'text-maroon-900/80 dark:text-cream-200 hover:bg-saffron-500/10 hover:text-saffron-600'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-saffron-600 dark:text-gold-400' : 'opacity-70'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Hamburger Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                href="/search"
                className="p-2.5 text-maroon-800 dark:text-cream-200 rounded-lg hover:bg-saffron-500/10"
                title="શોધો"
              >
                <Search className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-maroon-800 dark:text-cream-200 rounded-lg hover:bg-saffron-500/10"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-cream-50 dark:bg-maroon-950 border-b border-saffron-500/20 px-4 pt-2 pb-6 space-y-2 font-gujarati animate-fadeIn">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition ${
                    active
                      ? 'bg-saffron-500/20 text-saffron-700 dark:text-gold-400 font-bold'
                      : 'text-maroon-900 dark:text-cream-200 hover:bg-saffron-500/10'
                  }`}
                >
                  <Icon className="w-5 h-5 text-saffron-600 dark:text-gold-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Mobile Bottom Fixed Bar for Instant Accessibility */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-cream-50/95 dark:bg-maroon-950/95 border-t border-saffron-500/20 px-2 py-2 flex items-center justify-around font-gujarati shadow-lg">
        {navLinks.slice(0, 5).map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 text-[11px] font-medium transition py-1 px-2 rounded-lg ${
                active
                  ? 'text-saffron-600 dark:text-gold-400 font-bold'
                  : 'text-maroon-800/70 dark:text-cream-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
