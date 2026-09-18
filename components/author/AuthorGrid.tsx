'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function AuthorGrid({ authors }: { authors: any[] }) {
  return (
    <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 pt-8">
      <AnimatePresence mode="popLayout">
        {authors.map((author, index) => (
          <motion.div
            key={author.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
          >
            <Link
              href={`/authors/${author.slug}`}
              className="group flex flex-col items-center text-center space-y-4"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-border-elegant relative group-hover:border-accent transition-colors duration-500">
                <Image
                  src={author.profileImage || '/authors/default-sant.jpg'}
                  alt={author.gujaratiName}
                  fill
                  priority={index < 5}
                  sizes="(max-width: 768px) 96px, 128px"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-paper-surface">
                  <span className="text-sm font-bold">{author._count?.bhajans || 0} પદો</span>
                  <ArrowRight className="w-4 h-4 mt-1" />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-ink group-hover:text-accent transition-colors duration-300 tracking-tight">
                  {author.gujaratiName}
                </h2>
                {author.birthInfo && (
                  <p className="text-xs text-ink-muted font-medium mt-1">{author.birthInfo}</p>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
