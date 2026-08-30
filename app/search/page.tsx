'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Sparkles, Music, UserCheck, ArrowRight, Loader2 } from 'lucide-react';
import { Bhajan, Dhun, Author } from '@/types';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    bhajans: Bhajan[];
    dhuns: Dhun[];
    authors: Author[];
  }>({ bhajans: [], dhuns: [], authors: [] });

  useEffect(() => {
    if (!query.trim()) {
      setResults({ bhajans: [], dhuns: [], authors: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const totalResults = results.bhajans.length + results.dhuns.length + results.authors.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-gujarati">
      {/* Header & Search Bar */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-maroon-950">સંગ્રહાલય શોધો (Global Search)</h1>
        <p className="text-maroon-800/80 text-sm">
          ભજનનું શીર્ષક, પદના બોલ, ધૂન અથવા સંતનું નામ ટાઇપ કરીને શોધો.
        </p>

        <div className="relative">
          <Search className="absolute left-4 top-4 w-5 h-5 text-saffron-600" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="દા.ત. શામજીબાપા, સંત કબીર, સંતો સત્તશબ્દ..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-cream-50 border-2 border-saffron-500/30 focus:border-saffron-600 focus:outline-none text-base text-maroon-950 shadow-sm font-medium"
          />
          {loading && <Loader2 className="absolute right-4 top-4 w-5 h-5 text-saffron-600 animate-spin" />}
        </div>
      </div>

      {/* Results View */}
      {query.trim() !== '' && (
        <div className="space-y-10 pt-4">
          <p className="text-xs text-saffron-800 font-semibold text-center">
            "{query}" માટે દર્શાવાયેલ {totalResults} પરિણામો
          </p>

          {/* 1. Bhajans Results */}
          {results.bhajans.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-maroon-950 flex items-center gap-2 border-b border-saffron-500/20 pb-2">
                <Sparkles className="w-5 h-5 text-saffron-600" />
                <span>ભજનો ({results.bhajans.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.bhajans.map((bhajan) => (
                  <Link
                    key={bhajan.id}
                    href={`/bhajans/${bhajan.slug}`}
                    className="bg-cream-50 rounded-2xl p-5 border border-saffron-500/20 hover:border-saffron-500/50 shadow-sm hover:shadow-md transition flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs text-saffron-700 font-semibold">{bhajan.author?.gujaratiName}</span>
                      <h3 className="text-lg font-bold text-maroon-950">{bhajan.title}</h3>
                    </div>
                    <ArrowRight className="w-5 h-5 text-saffron-600" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 2. Dhuns Results */}
          {results.dhuns.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-maroon-950 flex items-center gap-2 border-b border-saffron-500/20 pb-2">
                <Music className="w-5 h-5 text-gold-600" />
                <span>ધૂનો ({results.dhuns.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.dhuns.map((dhun) => (
                  <Link
                    key={dhun.id}
                    href={`/dhuns/${dhun.slug}`}
                    className="bg-cream-50 rounded-2xl p-5 border border-saffron-500/20 hover:border-saffron-500/50 shadow-sm hover:shadow-md transition flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs text-gold-700 font-semibold">{dhun.author?.gujaratiName}</span>
                      <h3 className="text-lg font-bold text-maroon-950">{dhun.title}</h3>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gold-600" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 3. Authors Results */}
          {results.authors.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-maroon-950 flex items-center gap-2 border-b border-saffron-500/20 pb-2">
                <UserCheck className="w-5 h-5 text-saffron-600" />
                <span>સંતો અને રચયિતાઓ ({results.authors.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {results.authors.map((author) => (
                  <Link
                    key={author.id}
                    href={`/authors/${author.slug}`}
                    className="bg-cream-50 rounded-2xl p-5 border border-saffron-500/20 hover:border-saffron-500/50 shadow-sm hover:shadow-md transition text-center space-y-2"
                  >
                    <h3 className="text-lg font-bold text-maroon-950">{author.gujaratiName}</h3>
                    <p className="text-xs text-maroon-800/70 line-clamp-2">{author.shortBio}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {totalResults === 0 && !loading && (
            <div className="text-center py-12 text-maroon-800/60 font-medium">
              કોઈ પરિણામ મળ્યું નથી. કૃપા કરીને અન્ય કીવર્ડ સાથે પ્રયત્ન કરો.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
