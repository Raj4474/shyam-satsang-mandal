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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] bg-sand-100">
      <Image 
        src="/images/ashram_bg.jpg" 
        alt="Ashram Background" 
        fill 
        quality={90}
        className="object-cover opacity-80" 
        priority 
      />
      
      {/* Dynamic Overlay to ensure text readability globally */}
      <div className={`absolute inset-0 transition-colors duration-1000 ease-in-out ${isDark ? 'bg-black/60' : 'bg-white/60'}`} />
    </div>
  );
}
