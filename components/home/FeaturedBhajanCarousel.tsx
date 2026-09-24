'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Play } from 'lucide-react';
import { Bhajan, Author } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface FeaturedBhajanCarouselProps {
  featuredBhajans: (Bhajan & { author: Author | null })[];
}

export function FeaturedBhajanCarousel({ featuredBhajans }: FeaturedBhajanCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredBhajans.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredBhajans.length);
    }, 6000); // 6 seconds

    return () => clearInterval(interval);
  }, [featuredBhajans.length]);

  if (featuredBhajans.length === 0) return null;

  const bhajan = featuredBhajans[currentIndex];

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden glass-panel rounded-[2.5rem] p-8 sm:p-12 text-ink-900 shadow-soft hover:shadow-spiritual transition-shadow duration-500 min-h-[320px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={bhajan.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 w-full"
          >
            <div className="space-y-5 max-w-2xl flex-1">
              <div className="inline-flex items-center gap-2 text-saffron-600 text-sm font-bold tracking-wider">
                <Flame className="w-4 h-4 animate-pulse" />
                <span>મુખ્ય પદ</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight leading-snug">
                {bhajan.title}
              </h2>

              <p className="text-sm text-ink-600 font-medium">
                રચયિતા: <span className="font-bold text-ink-900">{bhajan.author?.gujaratiName || 'સંતવાણી'}</span>
              </p>

              <p className="text-base sm:text-lg text-ink-700 leading-relaxed italic border-l-2 border-saffron-300 pl-5 py-1 line-clamp-3 whitespace-pre-line">
                {bhajan.lyrics?.split('\n').slice(0, 4).join('\n')}
              </p>
            </div>

            <div className="shrink-0 pt-4 md:pt-0">
              <Link
                href={`/bhajans/${bhajan.slug}`}
                className="w-14 h-14 rounded-full bg-saffron-600 hover:bg-saffron-700 text-white shadow-soft transition-all duration-300 flex items-center justify-center group"
                title="સંપૂર્ણ ભજન વાંચો"
              >
                <Play className="w-5 h-5 ml-1 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Carousel Indicators */}
        {featuredBhajans.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {featuredBhajans.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-saffron-600 w-6' : 'bg-saffron-200 hover:bg-saffron-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
