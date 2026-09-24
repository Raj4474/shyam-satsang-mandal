'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Dhun } from '@/types';
import { Search, ArrowRight, Video } from 'lucide-react';
import { getSearchQueries } from '@/lib/transliterate';

interface DhunListProps {
  dhuns: Dhun[];
}

export function DhunList({ dhuns }: DhunListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);
  const ITEMS_PER_PAGE = 12;

  // Restore state from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('dhunListState');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.searchQuery !== undefined) setSearchQuery(parsed.searchQuery);
        if (parsed.currentPage) setCurrentPage(parsed.currentPage);
      }
    } catch (e) {}
    setIsInitialized(true);
  }, []);

  // Save state to sessionStorage
  useEffect(() => {
    if (isInitialized) {
      sessionStorage.setItem('dhunListState', JSON.stringify({
        searchQuery,
        currentPage
      }));
    }
  }, [searchQuery, currentPage, isInitialized]);

  // Filter dhuns based on search query
  const filteredDhuns = useMemo(() => {
    let result = dhuns;

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const searchTerms = getSearchQueries(q);

      result = result.filter((d) => {
        const titleLower = d.title.toLowerCase();
        const lyricsLower = (d.lyrics || '').toLowerCase();
        const descLower = (d.description || '').toLowerCase();

        return searchTerms.some(
          (term) =>
            titleLower.includes(term.toLowerCase()) ||
            lyricsLower.includes(term.toLowerCase()) ||
            descLower.includes(term.toLowerCase())
        );
      });
    }

    return result;
  }, [dhuns, searchQuery]);

  const totalPages = Math.ceil(filteredDhuns.length / ITEMS_PER_PAGE);
  const currentDhuns = filteredDhuns.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-8 font-gujarati">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto relative">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-4 text-ink-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="ધૂન શીર્ષક અથવા બોલ શોધો... (Search in Gujarati or Gujlish)"
            className="w-full pl-12 pr-4 py-4 rounded-full bg-sand-100 border border-sand-200 text-ink-900 placeholder-ink-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-ink-900 focus:border-transparent text-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="absolute right-4 text-xs font-semibold text-ink-500 hover:text-ink-900 transition-colors"
            >
              સાફ કરો
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center text-sm font-semibold text-ink-600">
        {filteredDhuns.length} ધૂન મળી
      </div>

      {/* Grid */}
      {filteredDhuns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentDhuns.map((dhun, index) => {
            // Global index to maintain the original numbering or sequential numbering
            // sequential numbering based on filtered list:
            const displayNumber = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
            
            return (
              <div
                key={dhun.id}
                className="glass-panel group rounded-[2rem] p-6 hover:shadow-spiritual transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-saffron-700 font-semibold mb-3">
                    <span className="bg-gold-500/15 px-3 py-1 rounded-full text-gold-800 font-bold">ધૂન</span>
                  </div>
                  <h2 className="text-2xl font-bold text-ink-900 mb-2 leading-snug group-hover:text-saffron-600 transition-colors">
                    {displayNumber}. {dhun.title.replace(/^[\d\.\s]+/, '')}
                  </h2>
                  <p className="text-ink-600 text-xs line-clamp-3 leading-relaxed whitespace-pre-line">
                    {dhun.description?.startsWith('ધૂન નંબર')
                      ? dhun.lyrics?.slice(0, 120)
                      : (dhun.description || dhun.lyrics?.slice(0, 120))}
                  </p>
                </div>

                <div className="pt-4 border-t border-ink-200/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {dhun.videoUrl && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-ink-700 bg-ink-900/5 px-2.5 py-0.5 rounded-full dark:bg-sand-50/10">
                        <Video className="w-3 h-3" /> વિડિયો
                      </span>
                    )}
                  </div>

                    <Link
                      href={`/dhuns/${dhun.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-ink-900 hover:text-saffron-600 transition group-hover:gap-2"
                    >
                      <span>વાંચો</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-sand-50 rounded-[2rem] border border-sand-200">
          <p className="text-ink-500 font-medium">કોઈ પરિણામ મળ્યું નથી</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 disabled:opacity-50 text-ink-900 text-sm font-bold transition"
          >
            પાછળ
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                    currentPage === pageNum
                      ? 'bg-saffron-600 text-white shadow-soft'
                      : 'bg-sand-100 hover:bg-sand-200 text-ink-900'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 disabled:opacity-50 text-ink-900 text-sm font-bold transition"
          >
            આગળ
          </button>
        </div>
      )}
    </div>
  );
}
