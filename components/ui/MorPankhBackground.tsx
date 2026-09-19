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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] bg-black">
      {/* Light Theme Background: Modern Glowing */}
      <Image 
        src="/images/bg-modern-glowing.jpg" 
        alt="Modern Glowing Feather Background" 
        fill 
        quality={90}
        className={`object-cover transition-opacity duration-1000 ease-in-out ${isDark ? 'opacity-0' : 'opacity-100'}`} 
        priority 
      />
      
      {/* Dark Theme Background: Cascading Feathers */}
      <Image 
        src="/images/bg-cascading-feathers.jpg" 
        alt="Cascading Feathers Background" 
        fill 
        quality={90}
        className={`object-cover transition-opacity duration-1000 ease-in-out ${isDark ? 'opacity-100' : 'opacity-0'}`} 
        priority 
      />

      {/* Subtle Overlay to ensure text readability globally */}
      <div className={`absolute inset-0 transition-colors duration-1000 ease-in-out ${isDark ? 'bg-black/40' : 'bg-white/40'}`} />
    </div>
  );
}
