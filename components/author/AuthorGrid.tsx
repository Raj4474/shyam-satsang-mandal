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
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gold-500/40 shadow-md group-hover:scale-105 transition-transform duration-300 relative">
                <Image
                  src={author.profileImage || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80'}
                  alt={author.gujaratiName}
                  fill
                  priority={index < 6}
                  sizes="112px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-1">
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
