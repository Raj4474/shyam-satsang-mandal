'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function AuthorGrid({ authors }: { authors: any[] }) {
  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {authors.map((author, index) => (
          <motion.div
            key={author.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            className="h-full"
          >
            <Link
              href={`/authors/${author.slug}`}
              className="group glass-panel rounded-3xl p-6 hover:shadow-spiritual transition-all duration-300 flex flex-col items-center text-center space-y-4 h-full block"
            >
              <div className="mb-3 text-saffron-400/40 group-hover:text-saffron-500/70 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 ease-out">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c-3-3.5-5-7.5-5-10 0-3.5 2-6 5-10 3 4 5 6.5 5 10 0 2.5-2 6.5-5 10z"/>
                  <path d="M7 12c-3.5 0-6 2-5 5 2 2.5 5 2.5 10 5"/>
                  <path d="M17 12c3.5 0 6 2 5 5-2 2.5-5 2.5-10 5"/>
                </svg>
              </div>

              <div className="space-y-1 text-center">
                <h2 className="text-2xl font-bold text-maroon-950 group-hover:text-saffron-600 transition-colors duration-300">
                  {author.gujaratiName}
                </h2>
                <p className="text-xs text-saffron-700 font-semibold">{author.birthInfo}</p>
              </div>

              <p className="text-maroon-800/80 text-xs line-clamp-3 leading-relaxed flex-grow">
                {author.shortBio || author.fullBio}
              </p>

              <div className="pt-4 border-t border-cream-200 w-full flex items-center justify-between text-xs mt-auto">
                <span className="font-bold text-maroon-900 bg-saffron-500/10 px-3 py-1 rounded-full">
                  {author._count?.bhajans || 0} ભજન • {author._count?.dhuns || 0} ધૂન
                </span>

                <span className="inline-flex items-center gap-1 font-bold text-saffron-700 group-hover:translate-x-1 transition-transform duration-300">
                  <span>જોવો</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
