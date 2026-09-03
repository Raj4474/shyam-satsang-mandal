import React from 'react';
import { db } from '@/lib/db';
import { BookOpen, Clock, User, Sparkles, Feather, Bookmark, HeartHandshake } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getBiographyData() {
  try {
    const [sections, settings] = await Promise.all([
      db.biographySection.findMany({
        where: { published: true },
        orderBy: { sortOrder: 'asc' },
      }),
      db.siteSetting.findMany(),
    ]);

    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => (settingsMap[s.key] = s.value));

    return { sections, settingsMap };
  } catch (error) {
    console.error('Error loading biography:', error);
    return { sections: [], settingsMap: {} };
  }
}

export default async function BiographyPage() {
  const { sections, settingsMap } = await getBiographyData();

  const title = settingsMap['biographyTitle'] || 'શામજીબાપા જીવન ચરિત્ર';
  const subtitle = settingsMap['biographySubtitle'] || 'શામજીબાપાના દિવ્ય બાલ્યાવસ્થા, સાધના કાળ, ભક્તિ ઉપદેશ અને શ્યામ સત્સંગ મંડળના પવિત્ર વારસાની આત્મગાથા.';

  return (
    <div className="font-gujarati max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Blog Article Header */}
      <header className="text-center space-y-6 border-b border-saffron-500/20 pb-10">
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-saffron-500/15 text-saffron-800 border border-saffron-500/30">
            <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
            <span>જીવન ચરિત્ર બ્લોગ</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-maroon-900/10 text-maroon-900 dark:text-gold-400">
            <Clock className="w-3.5 h-3.5" />
            <span>૧૫ મિનિટ વાંચન</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-maroon-950 dark:text-gold-300 leading-tight">
          {title}
        </h1>

        <p className="text-maroon-800/80 dark:text-cream-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        {/* Author / Metadata Row */}
        <div className="flex items-center justify-center gap-4 text-xs font-medium text-maroon-900/70 dark:text-cream-300 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-saffron-600 text-cream-50 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <span className="font-bold text-maroon-950 dark:text-gold-400">શ્યામ સત્સંગ મંડળ</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Feather className="w-4 h-4 text-saffron-600" />
            <span>સંપૂર્ણ લેખક સંગ્રહ</span>
          </div>
        </div>
      </header>

      {/* Chapter Quick Index Links */}
      {sections.length > 0 && (
        <div className="bg-[#FAF5EC] dark:bg-maroon-950/80 rounded-2xl p-6 border border-gold-500/30 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-maroon-950 dark:text-gold-400">
            <Bookmark className="w-4 h-4 text-saffron-600" />
            <span>પ્રકરણ અનુક્રમણિકા (Index)</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#section-${section.id}`}
                className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-maroon-900 hover:bg-saffron-500/20 text-maroon-950 dark:text-cream-100 text-xs font-medium border border-gold-500/20 shadow-xs transition"
              >
                {section.title.split(':')[0] || `પ્રકરણ ${index + 1}`}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Blog Main Chapters Content */}
      <article className="space-y-12">
        {sections.length > 0 ? (
          sections.map((section, idx) => (
            <section
              key={section.id}
              id={`section-${section.id}`}
              className="bg-[#FAF5EC] dark:bg-maroon-950/80 rounded-3xl p-6 sm:p-10 border border-gold-500/30 shadow-sm space-y-6 scroll-mt-24"
            >
              {/* Chapter Title */}
              <div className="border-b border-gold-500/20 pb-4 flex items-center justify-between">
                <h2
                  style={{ color: section.textColor || undefined }}
                  className="text-2xl sm:text-3xl font-extrabold text-maroon-950 dark:text-gold-300"
                >
                  {section.title}
                </h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-saffron-500/15 text-saffron-800 dark:text-gold-400 border border-saffron-500/30">
                  પ્રકરણ {idx + 1}
                </span>
              </div>

              {/* Optional Photo / Media */}
              {section.mediaUrl && (
                <div className="my-6 rounded-2xl overflow-hidden border-2 border-gold-500/40 shadow-md max-h-[420px] bg-maroon-950/10">
                  <img
                    src={section.mediaUrl}
                    alt={section.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Chapter Body Text */}
              <div
                style={{ color: section.textColor || undefined }}
                className="text-maroon-950 dark:text-cream-100 text-base sm:text-lg leading-relaxed sm:leading-loose whitespace-pre-line font-medium space-y-4"
              >
                {section.content}
              </div>
            </section>
          ))
        ) : (
          <div className="bg-[#FAF5EC] dark:bg-maroon-950/80 rounded-3xl p-12 text-center space-y-4 border border-gold-500/30">
            <BookOpen className="w-12 h-12 text-saffron-600 mx-auto" />
            <h3 className="text-2xl font-bold text-maroon-950 dark:text-gold-300">
              હાલમાં કોઈ જીવન ચરિત્ર પ્રકરણ ઉપલબ્ધ નથી
            </h3>
            <p className="text-maroon-800/75 dark:text-cream-200 text-sm">
              એડમિન પેનલમાંથી નવું પ્રકરણ ઉમેરી શકો છો.
            </p>
          </div>
        )}
      </article>

      {/* Blog Footer Note */}
      <footer className="bg-maroon-950 text-cream-100 rounded-3xl p-8 text-center space-y-3 border border-gold-500/30 shadow-md">
        <HeartHandshake className="w-8 h-8 text-gold-400 mx-auto" />
        <h3 className="text-xl font-bold text-gold-400">જય સદ્ગુરુ શ્યામ</h3>
        <p className="text-xs sm:text-sm text-cream-300/80 max-w-lg mx-auto leading-relaxed">
          પૂજ્ય શામજીબાપાના દિવ્ય આશીર્વાદ અને સંતવાણીનો સંગ્રહ હંમેશાં સાચા મુમુક્ષુઓનું કલ્યાણ કરશે.
        </p>
      </footer>
    </div>
  );
}
