'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bhajan, Author } from '@/types';
import { Search, Sparkles, ArrowRight, Filter, BookOpen } from 'lucide-react';
import { isEnglishOrMixed, getSearchQueries } from '@/lib/transliterate';

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
    <div className="space-y-8 font-gujarati">
      {/* 1. Search Bar */}
      <div className="max-w-2xl mx-auto relative">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-4 text-ink-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ભજન શીર્ષક, કડી અથવા બોલ શોધો... (Search in Gujarati or Gujlish)"
            className="w-full pl-12 pr-4 py-4 rounded-full bg-sand-100 border border-sand-200 text-ink-900 placeholder-ink-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-ink-900 focus:border-transparent text-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 text-xs font-semibold text-ink-500 hover:text-ink-900 transition-colors"
            >
              સાફ કરો
            </button>
          )}
        </div>
      </div>

      {/* 2. Alphabetical Index Bar (ક-ખ-ગ Indexing) */}
      <div className="glass-panel rounded-[2.5rem] p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-ink-900 font-bold text-sm">
            <BookOpen className="w-4 h-4 text-saffron-600" />
            <span>સંપૂર્ણ ક-ખ-ગ અનુક્રમણિકા</span>
          </div>
          {selectedLetter !== 'બધા' && (
            <button
              onClick={() => setSelectedLetter('બધા')}
              className="text-xs font-semibold text-ink-500 hover:text-ink-900 transition-colors"
            >
              તમામ પત્રો જુઓ
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-2.5 justify-start items-center">
          {GUJARATI_ALPHABET.map((letter) => {
            const count = letterCounts[letter] || 0;
            const isSelected = selectedLetter === letter;
            const hasBhajans = letter === 'બધા' || count > 0;

            return (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                disabled={!hasBhajans && letter !== 'બધા'}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-saffron-600 text-sand-50 shadow-soft scale-105'
                    : hasBhajans
                    ? 'bg-sand-100 hover:bg-sand-200 text-ink-800'
                    : 'bg-sand-50 text-ink-300 border border-sand-200 cursor-not-allowed opacity-50'
                }`}
                title={hasBhajans ? `${letter} થી શરૂ થતા ${count} ભજન` : `${letter} થી કોઈ ભજન નથી`}
              >
                <span>{letter}</span>
                {letter !== 'બધા' && count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${isSelected ? 'bg-sand-50/20 text-sand-50' : 'bg-ink-200/50 text-ink-700'}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Author Filter Pills */}
      {authors.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setSelectedAuthorSlug('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              selectedAuthorSlug === 'all'
                ? 'bg-saffron-600 text-sand-50 shadow-soft'
                : 'bg-sand-100 hover:bg-sand-200 text-ink-800'
            }`}
          >
            તમામ રચયિતા ({bhajans.length})
          </button>
          {authors.map((author) => (
            <button
              key={author.id}
              onClick={() => setSelectedAuthorSlug(author.slug)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                selectedAuthorSlug === author.slug
                  ? 'bg-saffron-600 text-sand-50 shadow-soft'
                  : 'bg-sand-100 hover:bg-sand-200 text-ink-800'
              }`}
            >
              {author.gujaratiName}
            </button>
          ))}
        </div>
      )}

      {/* Active Filter Summary Bar */}
      <div className="flex items-center justify-between glass-panel rounded-full px-6 py-4 text-sm font-medium text-ink-600">
        <div>
          કુલ દર્શાવેલ ભજન: <span className="font-bold text-ink-900">{filteredBhajans.length}</span>
          {selectedLetter !== 'બધા' && (
            <span className="ml-3 bg-sand-200 px-3 py-1 rounded-full text-ink-800 text-xs">
              અક્ષર: '{selectedLetter}'
            </span>
          )}
        </div>

        {(selectedLetter !== 'બધા' || selectedAuthorSlug !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedLetter('બધા');
              setSelectedAuthorSlug('all');
              setSearchQuery('');
            }}
            className="text-ink-500 hover:text-ink-900 font-semibold transition-colors"
          >
            બધા ફિલ્ટર સાફ કરો
          </button>
        )}
      </div>

      {/* 4. Bhajan Cards Grid */}
      {filteredBhajans.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBhajans.map((bhajan, index) => (
              <motion.div
                key={bhajan.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={`/bhajans/${bhajan.slug}`}
                  className="group glass-panel rounded-[2rem] p-7 hover:shadow-spiritual transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div className="space-y-4">
                    <div className="flex items-center text-xs font-semibold text-ink-500">
                      <span className="bg-sand-200/80 px-3 py-1 rounded-full text-ink-800">{bhajan.category || 'સંતવાણી'}</span>
                    </div>
                    <h2 className="text-xl font-bold text-ink-900 tracking-tight group-hover:text-saffron-600 transition-colors leading-snug">
                      {bhajans.findIndex(b => b.id === bhajan.id) + 1}. {bhajan.title.replace(/^[\d\.\s૦-૯]+/, '')}
                    </h2>
                    <p className="text-ink-600 text-sm line-clamp-3 leading-relaxed whitespace-pre-line">
                      {bhajan.description || bhajan.lyrics?.slice(0, 120)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="bg-sand-50 rounded-[2.5rem] p-12 text-center space-y-5 border border-sand-200 shadow-sm max-w-xl mx-auto">
          <div className="w-16 h-16 bg-sand-200 rounded-full flex items-center justify-center mx-auto text-ink-500">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-ink-900 tracking-tight">પરિણામ મળ્યું નથી</h3>
          <p className="text-ink-600 text-sm leading-relaxed max-w-md mx-auto">
            તમારા સર્ચ અથવા અક્ષર મુજબ કોઈ ભજન મળ્યું નથી. કૃપા કરીને અન્ય અક્ષરથી શોધો.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setSelectedLetter('બધા');
                setSelectedAuthorSlug('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-saffron-600 text-sand-50 font-bold text-sm shadow-soft hover:-translate-y-0.5 transition-all"
            >
              <span>બધા ભજન જુઓ</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
