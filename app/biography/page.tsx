import React from 'react';
import { db } from '@/lib/db';
import { BookOpen, Calendar, Quote } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getBiographyData() {
  try {
    const sections = await db.biographySection.findMany({
      where: { published: true },
      orderBy: { sortOrder: 'asc' },
    });
    const shyamjiAuthor = await db.author.findFirst({
      where: { slug: 'shyamjibapa' },
    });
    return { sections, shyamjiAuthor };
  } catch (error) {
    console.error('Error loading biography:', error);
    return { sections: [], shyamjiAuthor: null };
  }
}

export default async function BiographyPage() {
  const { sections, shyamjiAuthor } = await getBiographyData();

  return (
    <div className="font-gujarati max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Dynamic Content Blocks with Photo (3:4 Portrait Ratio) on Left & Text on Right */}
      <div className="space-y-8">
        {sections.map((section) => {
          if (section.type === 'TIMELINE') {
            const lines = section.content.split('\n');
            return (
              <div key={section.id} className="bg-[#FAF5EC] dark:bg-maroon-950/80 rounded-[28px] p-6 sm:p-8 border border-gold-500/30 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-gold-500/20 pb-4">
                  <Calendar className="w-6 h-6 text-saffron-600 dark:text-gold-400" />
                  <h3 className="text-2xl font-bold text-maroon-950 dark:text-gold-300">{section.title}</h3>
                </div>
                
                {section.mediaUrl ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {/* Photo on Left (3:4 Portrait Ratio) */}
                    <div className="md:col-span-1 rounded-2xl overflow-hidden border-2 border-gold-500/40 shadow-md aspect-[3/4] max-h-[420px] bg-maroon-950/10">
                      <img src={section.mediaUrl} alt={section.title} className="w-full h-full object-cover" />
                    </div>
                    {/* Text on Right */}
                    <div className="md:col-span-2 relative border-l-2 border-saffron-500/40 ml-4 space-y-6 pl-6">
                      {lines.map((line, idx) => {
                        const [year, ...rest] = line.split(':');
                        return (
                          <div key={idx} className="relative group">
                            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-saffron-500 border-2 border-cream-50" />
                            <span className="inline-block px-2.5 py-0.5 rounded bg-saffron-500/15 text-saffron-800 dark:text-gold-400 text-xs font-bold mb-1">
                              {year}
                            </span>
                            <p className="text-maroon-900 dark:text-cream-100 text-base font-medium">{rest.join(':')}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="relative border-l-2 border-saffron-500/40 ml-4 space-y-6 pl-6">
                    {lines.map((line, idx) => {
                      const [year, ...rest] = line.split(':');
                      return (
                        <div key={idx} className="relative group">
                          <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-saffron-500 border-2 border-cream-50" />
                          <span className="inline-block px-2.5 py-0.5 rounded bg-saffron-500/15 text-saffron-800 dark:text-gold-400 text-xs font-bold mb-1">
                            {year}
                          </span>
                          <p className="text-maroon-900 dark:text-cream-100 text-base font-medium">{rest.join(':')}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          if (section.type === 'QUOTE') {
            return (
              <div key={section.id} className="bg-[#FAF5EC] dark:bg-maroon-950/80 rounded-[28px] p-6 sm:p-8 border border-gold-500/40 shadow-sm relative overflow-hidden space-y-4">
                <Quote className="absolute top-4 right-4 w-16 h-16 text-saffron-600/10 pointer-events-none" />
                <h3 className="text-xl font-bold text-saffron-700 dark:text-gold-400 border-b border-gold-500/20 pb-2">{section.title}</h3>
                
                {section.mediaUrl ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {/* Photo on Left (3:4 Portrait Ratio) */}
                    <div className="md:col-span-1 rounded-2xl overflow-hidden border-2 border-gold-500/40 shadow-md aspect-[3/4] max-h-[420px] bg-maroon-950/10">
                      <img src={section.mediaUrl} alt={section.title} className="w-full h-full object-cover" />
                    </div>
                    {/* Text on Right */}
                    <div className="md:col-span-2 text-maroon-950 dark:text-cream-100 text-lg leading-relaxed whitespace-pre-line font-medium italic">
                      {section.content}
                    </div>
                  </div>
                ) : (
                  <div className="text-maroon-950 dark:text-cream-100 text-lg leading-relaxed whitespace-pre-line font-medium italic">
                    {section.content}
                  </div>
                )}
              </div>
            );
          }

          return (
            <div key={section.id} className="bg-[#FAF5EC] dark:bg-maroon-950/80 rounded-[28px] p-6 sm:p-8 border border-gold-500/30 shadow-sm space-y-4">
              <h3 className="text-2xl font-bold text-maroon-950 dark:text-gold-400 border-b border-gold-500/20 pb-3">
                {section.title}
              </h3>

              {section.mediaUrl ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {/* Photo on Left (3:4 / 5:6 Portrait Ratio) */}
                  <div className="md:col-span-1 rounded-2xl overflow-hidden border-2 border-gold-500/40 shadow-md aspect-[3/4] max-h-[420px] bg-maroon-950/10">
                    <img
                      src={section.mediaUrl}
                      alt={section.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text Content on Right */}
                  <div className="md:col-span-2 text-maroon-900 dark:text-cream-100 text-base sm:text-lg leading-relaxed whitespace-pre-line font-medium">
                    {section.content}
                  </div>
                </div>
              ) : (
                <div className="text-maroon-900 dark:text-cream-100 text-base sm:text-lg leading-relaxed whitespace-pre-line font-medium">
                  {section.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
