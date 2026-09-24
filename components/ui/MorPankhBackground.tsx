'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function MorPankhBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] bg-sand-100" />;

  let overlayClass = 'bg-white/60';
  if (resolvedTheme === 'dark') overlayClass = 'bg-black/70';
  else if (resolvedTheme === 'sepia') overlayClass = 'bg-[#f4e4c1]/60';

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
      <div className={`absolute inset-0 transition-colors duration-700 ease-in-out ${overlayClass}`} />
    </div>
  );
}
