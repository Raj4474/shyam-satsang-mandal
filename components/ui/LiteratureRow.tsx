import React from 'react';
import Link from 'next/link';

interface LiteratureRowProps {
  index: number;
  title: string;
  author: string;
  category: string;
  excerpt: string;
  href: string;
}

export function LiteratureRow({ index, title, author, category, excerpt, href }: LiteratureRowProps) {
  return (
    <Link
      href={href}
      className="group block py-6 border-b border-border-elegant hover:bg-paper-cream transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 px-4">
        {/* Index & Category (Mobile: top, Desktop: left) */}
        <div className="flex items-center gap-4 md:w-48 shrink-0">
          <span className="text-sm font-bold text-accent font-serif tracking-wider">
            {index.toString().padStart(2, '0')}
          </span>
          <span className="text-xs font-semibold tracking-widest text-ink-muted uppercase border border-border-elegant px-2 py-0.5 rounded-full">
            {category}
          </span>
        </div>

        {/* Title & Excerpt */}
        <div className="flex-grow space-y-1">
          <h3 className="text-lg md:text-xl font-bold text-ink tracking-tight group-hover:text-accent-dark transition-colors">
            {title}
          </h3>
          <p className="text-sm text-ink-muted line-clamp-1 max-w-2xl font-medium">
            {excerpt}
          </p>
        </div>

        {/* Author & CTA */}
        <div className="flex items-center justify-between md:justify-end gap-6 md:w-56 shrink-0 mt-2 md:mt-0">
          <span className="text-sm text-ink-muted font-medium italic">
            {author}
          </span>
          <span className="text-sm font-semibold text-accent group-hover:translate-x-1 transition-transform inline-block">
            વાંચો &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
