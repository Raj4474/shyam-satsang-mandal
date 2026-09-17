'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
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
          <Search className="w-5 h-5 absolute left-4 text-saffron-600 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ભજન શીર્ષક, કડી અથવા બોલ શોધો... (Search in Gujarati or Gujlish)"
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-cream-50 border border-saffron-500/30 text-maroon-950 placeholder-maroon-800/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-transparent text-sm transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 text-xs font-bold text-maroon-800/60 hover:text-maroon-950"
            >
              સાફ કરો
            </button>
          )}
        </div>
      </div>

      {/* 2. Alphabetical Index Bar (ક-ખ-ગ Indexing) */}
      <div className="bg-cream-100/70 border border-saffron-500/20 rounded-3xl p-4 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-maroon-950 font-bold text-sm">
            <BookOpen className="w-4 h-4 text-saffron-600" />
            <span>સંપૂર્ણ ક-ખ-ગ અનુક્રમણિકા (Alphabetical Index)</span>
          </div>
          {selectedLetter !== 'બધા' && (
            <button
              onClick={() => setSelectedLetter('બધા')}
              className="text-xs font-semibold text-saffron-700 hover:underline"
            >
              તમામ પત્રો જુઓ
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-start items-center">
          {GUJARATI_ALPHABET.map((letter) => {
            const count = letterCounts[letter] || 0;
            const isSelected = selectedLetter === letter;
            const hasBhajans = letter === 'બધા' || count > 0;

            return (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                disabled={!hasBhajans && letter !== 'બધા'}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                  isSelected
                    ? 'bg-gradient-to-r from-saffron-600 to-saffron-700 text-cream-50 shadow-md scale-105'
                    : hasBhajans
                    ? 'bg-cream-50 hover:bg-saffron-500/20 text-maroon-950 border border-saffron-500/20'
                    : 'bg-cream-100/50 text-maroon-950/30 border border-cream-200 cursor-not-allowed'
                }`}
                title={hasBhajans ? `${letter} થી શરૂ થતા ${count} ભજન` : `${letter} થી કોઈ ભજન નથી`}
              >
                <span>{letter}</span>
                {letter !== 'બધા' && count > 0 && (
                  <span className={`text-[10px] px-1 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-saffron-500/10 text-saffron-800'}`}>
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
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedAuthorSlug('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedAuthorSlug === 'all'
                ? 'bg-maroon-900 text-gold-300 shadow-sm'
                : 'bg-cream-100 hover:bg-saffron-500/20 text-maroon-950 border border-saffron-500/20'
            }`}
          >
            તમામ રચયિતા ({bhajans.length})
          </button>
          {authors.map((author) => (
            <button
              key={author.id}
              onClick={() => setSelectedAuthorSlug(author.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                selectedAuthorSlug === author.slug
                  ? 'bg-maroon-900 text-gold-300 border-gold-500/40 shadow-sm'
                  : 'bg-cream-100 hover:bg-saffron-500/20 text-maroon-950 border-saffron-500/20'
              }`}
            >
              {author.gujaratiName}
            </button>
          ))}
        </div>
      )}

      {/* Active Filter Summary Bar */}
      <div className="flex items-center justify-between border-b border-saffron-500/20 pb-3 text-xs text-maroon-800/80">
        <div>
          કુલ દર્શાવેલ ભજન: <span className="font-bold text-maroon-950">{filteredBhajans.length}</span>
          {selectedLetter !== 'બધા' && (
            <span className="ml-2 font-medium bg-saffron-500/15 px-2 py-0.5 rounded text-saffron-800">
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
            className="text-saffron-700 font-bold hover:underline"
          >
            બધા ફિલ્ટર રીસેટ કરો
          </button>
        )}
      </div>

      {/* 4. Bhajan Cards Grid */}
      {filteredBhajans.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBhajans.map((bhajan) => (
            <div
              key={bhajan.id}
              className="bg-cream-50 rounded-3xl border border-saffron-500/20 p-6 shadow-card hover:shadow-spiritual transition duration-300 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-saffron-700 font-semibold mb-3">
                  <span className="bg-saffron-500/10 px-3 py-1 rounded-full">{bhajan.category || 'સંતવાણી'}</span>
                  <span>{bhajan.author?.gujaratiName || 'શ્યામ સત્સંગ'}</span>
                </div>
                <h2 className="text-2xl font-bold text-maroon-950 mb-2 leading-snug">
                  {bhajans.findIndex(b => b.id === bhajan.id) + 1}. {bhajan.title.replace(/^[\d\.\s૦-૯]+/, '')}
                </h2>
                <p className="text-maroon-800/80 text-xs line-clamp-3 leading-relaxed whitespace-pre-line">
                  {bhajan.description || bhajan.lyrics?.slice(0, 120)}
                </p>
              </div>

              <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
                <Link
                  href={`/bhajans/${bhajan.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-saffron-700 hover:text-maroon-900 transition"
                >
                  <span>પૂરું ભજન વાંચો</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-cream-50 rounded-3xl p-12 text-center space-y-4 border border-saffron-500/20 shadow-sm max-w-xl mx-auto">
          <Sparkles className="w-12 h-12 text-saffron-600 mx-auto" />
          <h3 className="text-2xl font-bold text-maroon-950">પરિણામ મળ્યું નથી</h3>
          <p className="text-maroon-800/80 text-sm leading-relaxed">
            તમારા સર્ચ અથવા અક્ષર મુજબ કોઈ ભજન મળ્યું નથી. કૃપા કરીને અન્ય અક્ષરથી શોધો.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSelectedLetter('બધા');
                setSelectedAuthorSlug('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-saffron-600 text-cream-50 font-bold text-xs shadow-md hover:bg-saffron-700 transition"
            >
              <span>બધા ભજન જુઓ</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
