'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Music, Search, UserCheck, Menu, X, Home, Shield, Sparkles, Flame } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'મુખ્ય પૃષ્ઠ', href: '/', icon: Home },
    { name: 'જીવન ચરિત્ર', href: '/biography', icon: BookOpen },
    { name: 'ભજન', href: '/bhajans', icon: Sparkles },
    { name: 'ધૂન', href: '/dhuns', icon: Music },
    { name: 'આરતી', href: '/#aarti-section', icon: Flame },
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
      <header className={`print:hidden sticky top-0 z-40 transition-all duration-500 ${scrolled ? 'bg-sand-50/80 backdrop-blur-xl border-b border-sand-200/50 shadow-sm' : 'bg-transparent border-b border-transparent py-2'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full bg-sand-200 p-[1px] shadow-soft overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/logo.jpg"
                  alt="શ્યામ સત્સંગ મંડળ લોગો"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-gujarati text-lg sm:text-xl font-bold text-ink-900 tracking-tight block leading-tight group-hover:text-saffron-600 transition-colors">
                  શ્યામ સત્સંગ મંડળ
                </span>
                <span className="text-[10px] sm:text-xs text-ink-600 font-gujarati tracking-wider block">
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 font-gujarati ${
                      active
                        ? 'bg-saffron-600 text-sand-50 shadow-soft'
                        : 'text-ink-700 hover:bg-sand-200 hover:text-ink-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-sand-50' : 'opacity-70'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Hamburger Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                 href="/search"
                 className="p-2.5 text-ink-800 rounded-full hover:bg-sand-200 transition-colors"
                 title="શોધો"
               >
                 <Search className="w-5 h-5" />
               </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-ink-800 rounded-full hover:bg-sand-200 transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-sand-50 border-b border-sand-200/50 px-4 pt-2 pb-6 space-y-1 font-gujarati shadow-soft">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                    active
                      ? 'bg-saffron-600 text-sand-50'
                      : 'text-ink-800 hover:bg-sand-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-sand-50' : 'text-ink-600'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Mobile Bottom Fixed Bar for Instant Accessibility */}
      <div className="print:hidden lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-sand-50/90 backdrop-blur-xl border-t border-sand-200/50 px-2 py-2 flex items-center justify-around font-gujarati shadow-[0_-4px_20px_rgba(0,0,0,0.03)] pb-safe">
        {navLinks.slice(0, 5).map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 text-[11px] font-medium transition py-1.5 px-3 rounded-xl ${
                active
                  ? 'text-ink-900 bg-sand-200/60'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-ink-900' : ''}`} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
