'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export function MorPankhBackground() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();

    // Listen for dark class changes on HTML element
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (!mounted) return <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]" />;

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-[-1] transition-colors duration-1000 ${isDark ? 'bg-ink-950' : 'bg-sand-50'}`}>
      {/* Shrine Background Image */}
      <Image 
        src="/images/shrine-bg.jpg" 
        alt="Shrine Background" 
        fill 
        quality={90}
        className={`object-cover transition-opacity duration-1000 ease-in-out ${isDark ? 'opacity-20' : 'opacity-30'}`} 
        priority 
      />

      {/* Subtle Overlay to ensure text readability globally */}
      <div className={`absolute inset-0 transition-colors duration-1000 ease-in-out ${isDark ? 'bg-black/60' : 'bg-white/70'}`} />
    </div>
  );
}
