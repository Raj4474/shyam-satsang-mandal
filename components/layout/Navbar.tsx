'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Moon, Sun, Menu, X, BookOpen, Bookmark, Library, Feather } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDivoMode, setIsDivoMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check Divo Mode
    if (document.documentElement.classList.contains('divo')) {
      setIsDivoMode(true);
    } else {
      const saved = localStorage.getItem('divo-mode');
      if (saved === 'true') {
        setIsDivoMode(true);
        document.documentElement.classList.add('divo');
      }
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDivoMode = () => {
    const nextState = !isDivoMode;
    setIsDivoMode(nextState);
    if (nextState) {
      document.documentElement.classList.add('divo');
      localStorage.setItem('divo-mode', 'true');
    } else {
      document.documentElement.classList.remove('divo');
      localStorage.setItem('divo-mode', 'false');
    }
  };

  const navLinks = [
    { name: 'સંગ્રહ', href: '/bhajans', icon: Library },
    { name: 'સર્જકો', href: '/authors', icon: Feather },
    { name: 'શોધો', href: '/search', icon: Search },
  ];

  const mobileNavLinks = [
    { name: 'હોમ', href: '/', icon: BookOpen },
    { name: 'સંગ્રહ', href: '/bhajans', icon: Library },
    { name: 'શોધો', href: '/search', icon: Search },
    { name: 'સાચવેલ', href: '/saved', icon: Bookmark },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className={`print:hidden sticky top-0 z-40 transition-all duration-500 ${scrolled ? 'bg-paper-surface/90 backdrop-blur-xl border-b border-border-elegant/30' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <span className="font-serif text-2xl font-bold text-ink tracking-tight block leading-tight">
                ગ્રંથ
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base transition-all duration-300 font-gujarati relative group ${
                    isActive(link.href) ? 'text-ink font-bold' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-accent transition-transform duration-300 origin-left ${isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              ))}
              
              <div className="w-[1px] h-6 bg-border-elegant/50 mx-2" />
              
              <button
                onClick={toggleDivoMode}
                className="flex items-center gap-2 text-ink-muted hover:text-accent transition-colors duration-300 font-gujarati group"
              >
                {isDivoMode ? <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" /> : <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />}
                <span>દીવો</span>
              </button>
            </nav>

            {/* Mobile Nav Top */}
            <div className="lg:hidden flex items-center gap-4">
              <button
                onClick={toggleDivoMode}
                className="text-ink-muted hover:text-accent transition-colors duration-300"
              >
                {isDivoMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-ink hover:text-accent transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-paper-surface border-b border-border-elegant/30 px-4 pt-2 pb-6 space-y-2 font-gujarati absolute w-full shadow-soft">
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-ink-muted hover:bg-paper hover:text-ink rounded-lg transition-colors">એડમિન (Admin)</Link>
            <Link href="/biography" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-ink-muted hover:bg-paper hover:text-ink rounded-lg transition-colors">જીવન ચરિત્ર</Link>
            <Link href="/dhuns" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-ink-muted hover:bg-paper hover:text-ink rounded-lg transition-colors">ધૂન</Link>
            <Link href="/#aarti-section" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-ink-muted hover:bg-paper hover:text-ink rounded-lg transition-colors">આરતી</Link>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="print:hidden lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-paper-surface/95 backdrop-blur-xl border-t border-border-elegant/30 px-2 py-3 flex items-center justify-around font-gujarati pb-safe shadow-[0_-10px_40px_rgba(36,26,18,0.05)]">
        {mobileNavLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-all ${
                active ? 'text-accent scale-105' : 'text-ink-muted hover:text-ink'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'fill-accent/10' : ''}`} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
