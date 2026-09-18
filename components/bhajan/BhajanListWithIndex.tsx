'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bhajan, Author } from '@/types';
import { Search, Sparkles, BookOpen } from 'lucide-react';
import { getSearchQueries } from '@/lib/transliterate';
import { LiteratureRow } from '../ui/LiteratureRow';

const GUJARATI_ALPHABET = [
  'બધા',
  'અ', 'આ', 'ઇ', 'ઈ', 'ઉ', 'ઊ', 'એ', 'ઓ',
  'ક', 'ખ', 'ગ', 'ઘ', 'ચ', 'છ', 'જ', 'ઝ',
  'ટ', 'ઠ', 'ડ', 'ઢ', 'ત', 'થ', 'દ', 'ધ', 'ન',
  'પ', 'ફ', 'બ', 'ભ', 'મ', 'ય', 'ર', 'લ', 'વ',
  'શ', 'સ', 'હ', 'ક્ષ', 'જ્ઞ',
];

interface BhajanListWithIndexProps {
  bhajans: (Bhajan & { author?: Author | null })[];
  authors: Author[];
}

export function BhajanListWithIndex({ bhajans, authors }: BhajanListWithIndexProps) {
  const [selectedLetter, setSelectedLetter] = useState<string>('બધા');
  const [selectedAuthorSlug, setSelectedAuthorSlug] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Compute count of bhajans starting with each letter
  const letterCounts = useMemo(() => {
    const counts: Record<string, number> = { 'બધા': bhajans.length };

    bhajans.forEach((bhajan) => {
      const cleanTitle = bhajan.title.replace(/^[\d\.\s૦-૯]+/, '').trim();
      const firstChar = cleanTitle.charAt(0);
      if (firstChar) {
        counts[firstChar] = (counts[firstChar] || 0) + 1;
      }
    });

    return counts;
  }, [bhajans]);

  // Filter bhajans based on active search, letter index, and author
  const filteredBhajans = useMemo(() => {
    let result = bhajans;

    // 1. Author Filter
    if (selectedAuthorSlug !== 'all') {
      result = result.filter((b) => b.author?.slug === selectedAuthorSlug);
    }

    // 2. Alphabetical Letter Filter
    if (selectedLetter !== 'બધા') {
      result = result.filter((b) => {
        const cleanTitle = b.title.replace(/^[\d\.\s૦-૯]+/, '').trim();
        const titleFirstChar = cleanTitle.charAt(0);
        return titleFirstChar === selectedLetter;
      });
    }

    // 3. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const searchTerms = getSearchQueries(q);

      result = result.filter((b) => {
        const titleLower = b.title.toLowerCase();
        const lyricsLower = b.lyrics.toLowerCase();
        const authorLower = (b.author?.gujaratiName || '').toLowerCase();
        const categoryLower = (b.category || '').toLowerCase();

        return searchTerms.some(
          (term) =>
            titleLower.includes(term.toLowerCase()) ||
            lyricsLower.includes(term.toLowerCase()) ||
            authorLower.includes(term.toLowerCase()) ||
            categoryLower.includes(term.toLowerCase())
        );
      });
    }

    return result;
  }, [bhajans, selectedLetter, selectedAuthorSlug, searchQuery]);

  return (
    <div className="space-y-12 font-gujarati max-w-5xl mx-auto">
      {/* 1. Search Bar */}
      <div className="relative border-b border-border-elegant pb-6">
        <div className="relative flex items-center">
          <Search className="w-6 h-6 absolute left-2 text-ink-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ભજન શીર્ષક, કડી અથવા બોલ શોધો..."
            className="w-full pl-12 pr-4 py-4 bg-transparent border-none text-2xl text-ink placeholder-ink-muted focus:outline-none focus:ring-0 transition-all font-serif"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 text-sm font-semibold text-ink-muted hover:text-ink transition-colors"
            >
              સાફ કરો
            </button>
          )}
        </div>
      </div>

      {/* 2. Alphabetical Index Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {GUJARATI_ALPHABET.map((letter) => {
            const count = letterCounts[letter] || 0;
            const isSelected = selectedLetter === letter;
            const hasBhajans = letter === 'બધા' || count > 0;

            return (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                disabled={!hasBhajans && letter !== 'બધા'}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-ink text-paper-surface'
                    : hasBhajans
                    ? 'bg-transparent text-ink-muted hover:text-ink hover:bg-paper-cream border border-transparent hover:border-border-elegant'
                    : 'bg-transparent text-ink-muted/30 cursor-not-allowed'
                }`}
                title={hasBhajans ? `${letter} થી શરૂ થતા ${count} ભજન` : `${letter} થી કોઈ ભજન નથી`}
              >
                <span>{letter}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Author Filter */}
      {authors.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedAuthorSlug('all')}
            className={`px-4 py-1.5 rounded-full text-xs tracking-wide font-semibold transition-all border ${
              selectedAuthorSlug === 'all'
                ? 'bg-accent text-white border-accent'
                : 'bg-transparent text-ink-muted border-border-elegant hover:border-accent hover:text-accent'
            }`}
          >
            તમામ રચયિતા
          </button>
          {authors.map((author) => (
            <button
              key={author.id}
              onClick={() => setSelectedAuthorSlug(author.slug)}
              className={`px-4 py-1.5 rounded-full text-xs tracking-wide font-semibold transition-all border ${
                selectedAuthorSlug === author.slug
                  ? 'bg-accent text-white border-accent'
                  : 'bg-transparent text-ink-muted border-border-elegant hover:border-accent hover:text-accent'
              }`}
            >
              {author.gujaratiName}
            </button>
          ))}
        </div>
      )}

      {/* 4. Literature Rows */}
      <div className="pt-8">
        <div className="flex items-center justify-between border-b-2 border-ink pb-2 mb-4">
          <h2 className="text-sm font-bold tracking-widest text-ink uppercase">સંગ્રહ પરિણામો</h2>
          <span className="text-sm font-serif italic text-ink-muted">{filteredBhajans.length} પદો</span>
        </div>
        
        {filteredBhajans.length > 0 ? (
          <div className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {filteredBhajans.map((bhajan, index) => (
                <motion.div
                  key={bhajan.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <LiteratureRow
                    index={bhajans.findIndex((b) => b.id === bhajan.id) + 1}
                    title={bhajan.title.replace(/^[\d\.\s૦-૯]+/, '')}
                    author={bhajan.author?.gujaratiName || 'શ્યામ સત્સંગ'}
                    category={bhajan.category || 'સંતવાણી'}
                    excerpt={bhajan.description || bhajan.lyrics?.slice(0, 80) || ''}
                    href={`/bhajans/${bhajan.slug}`}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-20 text-center space-y-6">
            <div className="w-16 h-16 rounded-full border border-border-elegant flex items-center justify-center mx-auto text-ink-muted">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-ink">પરિણામ મળ્યું નથી</h3>
              <p className="text-ink-muted text-sm mt-2">
                તમારા સર્ચ મુજબ કોઈ સાહિત્ય મળ્યું નથી.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedLetter('બધા');
                setSelectedAuthorSlug('all');
                setSearchQuery('');
              }}
              className="inline-block px-6 py-2 border border-ink text-ink font-semibold rounded-full hover:bg-ink hover:text-paper-surface transition-colors"
            >
              ફિલ્ટર સાફ કરો
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
