'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark, ChevronDown, List } from 'lucide-react';

interface Section {
  id: string;
  title: string;
}

export function BiographyIndex({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string>('');
  
  useEffect(() => {
    const handleScroll = () => {
      let currentActiveId = '';
      for (const section of sections) {
        const el = document.getElementById(`section-${section.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            currentActiveId = section.id;
          }
        }
      }
      if (currentActiveId) setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (!id) return;
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Update hash in URL optionally
      window.history.pushState(null, '', `#section-${id}`);
    }
  };

  const handleSidebarClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#section-${id}`);
    }
  };

  if (sections.length === 0) return null;

  return (
    <div className="w-full">
      {/* Mobile / Tablet Dropdown */}
      <div className="lg:hidden glass-panel rounded-2xl p-4 mb-8 sticky top-24 z-30 shadow-sm border border-sand-200">
        <div className="flex items-center gap-2 text-sm font-bold text-ink-900 mb-3">
          <Bookmark className="w-4 h-4 text-saffron-600" />
          <label htmlFor="prakran-select">પ્રકરણ પસંદ કરો (Select Chapter)</label>
        </div>
        <div className="relative">
          <select
            id="prakran-select"
            value={activeId}
            onChange={handleSelectChange}
            className="w-full appearance-none bg-white border border-sand-300 text-ink-900 text-sm font-bold rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-saffron-500 shadow-sm cursor-pointer"
          >
            <option value="" disabled>-- પ્રકરણ પસંદ કરો --</option>
            {sections.map((section, idx) => (
              <option key={section.id} value={section.id}>
                {section.title.split(':')[0] || `પ્રકરણ ${idx + 1}`}
              </option>
            ))}
          </select>
          <ChevronDown className="w-5 h-5 text-ink-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block sticky top-28 bg-sand-50/50 rounded-[2rem] p-6 border border-sand-200 shadow-soft w-64 xl:w-72 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-2 text-sm font-bold text-ink-900 mb-6 pb-4 border-b border-sand-200">
          <List className="w-5 h-5 text-saffron-600" />
          <span>અનુક્રમણિકા (Index)</span>
        </div>
        <ul className="space-y-2 relative">
          {sections.map((section, idx) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id}>
                <a
                  href={`#section-${section.id}`}
                  onClick={(e) => handleSidebarClick(e, section.id)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-saffron-600 text-white shadow-md transform scale-105 ml-2'
                      : 'text-ink-700 hover:bg-sand-200 hover:text-ink-900'
                  }`}
                >
                  {section.title.split(':')[0] || `પ્રકરણ ${idx + 1}`}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
