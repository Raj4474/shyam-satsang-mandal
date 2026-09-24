'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bhajan, Author } from '@/types';
import { Search, Sparkles, ArrowRight, Filter, BookOpen, Users, ChevronDown } from 'lucide-react';
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 24;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLetter, selectedAuthorSlug, searchQuery]);

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

  const totalPages = Math.ceil(filteredBhajans.length / ITEMS_PER_PAGE);
  const currentBhajans = filteredBhajans.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-ink-900 font-bold text-sm">
            <BookOpen className="w-4 h-4 text-saffron-600" />
            <span>સંપૂર્ણ ક-ખ-ગ અનુક્રમણિકા</span>
          </div>
          
          <div className="relative w-full sm:w-auto min-w-[200px]">
            <select
              value={selectedLetter}
              onChange={(e) => setSelectedLetter(e.target.value)}
              className="w-full appearance-none bg-sand-100 border border-sand-200 text-ink-900 text-sm font-bold rounded-full px-5 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-saffron-500 cursor-pointer shadow-sm transition-all hover:bg-sand-200"
            >
              {GUJARATI_ALPHABET.map((letter) => {
                const count = letterCounts[letter] || 0;
                const hasBhajans = letter === 'બધા' || count > 0;
                
                return (
                  <option key={letter} value={letter} disabled={!hasBhajans && letter !== 'બધા'}>
                    {letter} {letter !== 'બધા' && count > 0 ? `(${count})` : ''}
                  </option>
                );
              })}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-ink-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Author Filter Cards */}
      {authors.length > 0 && (
        <div className="glass-panel rounded-[2.5rem] p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-ink-900 font-bold text-sm">
              <Users className="w-4 h-4 text-saffron-600" />
              <span>રચયિતા મુજબ શોધો</span>
            </div>
            
            <div className="relative w-full sm:w-auto min-w-[200px]">
              <select
                value={selectedAuthorSlug}
                onChange={(e) => setSelectedAuthorSlug(e.target.value)}
                className="w-full appearance-none bg-sand-100 border border-sand-200 text-ink-900 text-sm font-bold rounded-full px-5 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-saffron-500 cursor-pointer shadow-sm transition-all hover:bg-sand-200"
              >
                <option value="all">
                  તમામ રચયિતા ({bhajans.length})
                </option>
                {authors.map((author) => {
                  const count = bhajans.filter(b => b.author?.slug === author.slug).length;
                  if (count === 0) return null; // Optionally hide authors with 0 bhajans in this context
                  return (
                    <option key={author.id} value={author.slug}>
                      {author.gujaratiName} ({count})
                    </option>
                  );
                })}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-ink-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
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
        <div className="space-y-8">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {currentBhajans.map((bhajan, index) => (
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 pt-6">
            <button
              onClick={() => {
                setCurrentPage(p => Math.max(1, p - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === 1}
              className="px-5 py-2.5 rounded-full bg-sand-100 hover:bg-sand-200 text-ink-900 font-bold text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              પાછળ (Prev)
            </button>
            
            <div className="text-sm font-bold text-ink-700 px-2 flex items-center gap-1">
              <span className="w-8 h-8 flex items-center justify-center bg-saffron-100 text-saffron-800 rounded-full">{currentPage}</span>
              <span className="opacity-60">/</span>
              <span className="w-8 h-8 flex items-center justify-center text-ink-500">{totalPages}</span>
            </div>
            
            <button
              onClick={() => {
                setCurrentPage(p => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={currentPage === totalPages}
              className="px-5 py-2.5 rounded-full bg-sand-100 hover:bg-sand-200 text-ink-900 font-bold text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              આગળ (Next)
            </button>
          </div>
        )}
      </div>
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
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-saffron-600 text-white font-bold text-sm shadow-soft hover:-translate-y-0.5 transition-all"
            >
              <span>બધા ભજન જુઓ</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
