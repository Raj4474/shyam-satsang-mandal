import React from 'react';
import Image from 'next/image';
import { db } from '@/lib/db';
import { BookOpen, Clock, User, Sparkles, Feather, Bookmark, HeartHandshake } from 'lucide-react';
import { formatHtmlContent } from '@/lib/renderFormattedText';

export const revalidate = 3600;

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
    <div className="font-gujarati max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8 items-start">
      
      {/* Mobile Dropdown Index */}
      {sections.length > 0 && (
        <details className="lg:hidden w-full glass-panel rounded-[2rem] p-6 group">
          <summary className="flex items-center justify-between font-bold text-ink-900 text-lg cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <div className="flex items-center gap-3">
              <Bookmark className="w-5 h-5 text-saffron-600" />
              <span>પ્રકરણ અનુક્રમણિકા (Index)</span>
            </div>
            <span className="transition-transform duration-300 group-open:rotate-180 opacity-50">▼</span>
          </summary>
          <div className="mt-5 flex flex-col gap-2 max-h-72 overflow-y-auto pr-2">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#section-${section.id}`}
                className="px-4 py-3 rounded-xl bg-sand-50 hover:bg-sand-200 text-ink-900 text-sm font-medium border border-sand-200 shadow-sm transition block"
              >
                {section.title.split(':')[0] || `પ્રકરણ ${index + 1}`}
              </a>
            ))}
          </div>
        </details>
      )}

      {/* Main Content Column */}
      <div className="w-full lg:w-3/4 space-y-12">
      {/* Blog Article Header */}
      <header className="text-center space-y-6 glass-panel rounded-[2.5rem] p-8 pb-10">
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-saffron-500/15 text-saffron-800 border border-saffron-500/30">
            <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
            <span>જીવન ચરિત્ર બ્લોગ</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sand-200 text-ink-600">
            <Clock className="w-3.5 h-3.5" />
            <span>૧૫ મિનિટ વાંચન</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-ink-900 leading-tight tracking-tight">
          {title}
        </h1>

        <p className="text-ink-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        {/* Author / Metadata Row */}
        <div className="flex items-center justify-center gap-4 text-xs font-medium text-ink-500 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sand-200 text-ink-600 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <span className="font-bold text-ink-900">શ્યામ સત્સંગ મંડળ</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Feather className="w-4 h-4 text-saffron-600" />
            <span>સંપૂર્ણ લેખક સંગ્રહ</span>
          </div>
        </div>
      </header>


      {/* Blog Main Chapters Content */}
      <article className="space-y-12">
        {sections.length > 0 ? (
          sections.map((section, idx) => (
            <section
              key={section.id}
              id={`section-${section.id}`}
              className="glass-panel rounded-[2.5rem] p-8 sm:p-12 space-y-6 scroll-mt-24"
            >
              {/* Chapter Title */}
              <div className="border-b border-sand-200 pb-4 flex items-center justify-between">
                <h2
                  style={{ color: section.textColor || undefined }}
                  className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight"
                >
                  {section.title}
                </h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-sand-200 text-ink-600">
                  પ્રકરણ {idx + 1}
                </span>
              </div>

              {/* Optional Photo / Media */}
              {section.mediaUrl && (
                <div className="my-6 rounded-2xl overflow-hidden border border-sand-200 shadow-soft max-h-[420px] bg-sand-100 flex justify-center">
                  <Image
                    src={section.mediaUrl}
                    alt={section.title}
                    width={1200}
                    height={600}
                    className="w-full h-auto max-h-[420px] object-cover"
                  />
                </div>
              )}

              {/* Chapter Body Text */}
              <div
                style={{ color: section.textColor || undefined }}
                className="text-ink-900 text-base sm:text-lg leading-relaxed sm:leading-[2] whitespace-pre-line font-medium space-y-4"
                dangerouslySetInnerHTML={{ __html: formatHtmlContent(section.content) }}
              />
            </section>
          ))
        ) : (
          <div className="bg-sand-50 rounded-[2rem] p-12 text-center space-y-4 border border-sand-200">
            <BookOpen className="w-12 h-12 text-saffron-600 mx-auto" />
            <h3 className="text-2xl font-bold text-ink-900">
              હાલમાં કોઈ જીવન ચરિત્ર પ્રકરણ ઉપલબ્ધ નથી
            </h3>
            <p className="text-ink-500 text-sm">
              એડમિન પેનલમાંથી નવું પ્રકરણ ઉમેરી શકો છો.
            </p>
          </div>
        )}
      </article>

      {/* Blog Footer Note */}
      <footer className="glass-panel rounded-[2.5rem] p-8 text-center space-y-3">
        <HeartHandshake className="w-8 h-8 text-saffron-600 mx-auto" />
        <h3 className="text-xl font-bold text-ink-900">જય સદ્ગુરુ શ્યામ</h3>
        <p className="text-xs sm:text-sm text-ink-600 max-w-lg mx-auto leading-relaxed">
          પૂજ્ય શામજીબાપાના દિવ્ય આશીર્વાદ અને સંતવાણીનો સંગ્રહ હંમેશાં સાચા મુમુક્ષુઓનું કલ્યાણ કરશે.
        </p>
      </footer>
      </div>

      {/* Desktop Sticky Sidebar Index */}
      {sections.length > 0 && (
        <aside className="hidden lg:flex w-full lg:w-1/4 sticky top-28 max-h-[calc(100vh-8rem)] flex-col glass-panel rounded-[2.5rem] p-6 shadow-soft">
          <div className="flex items-center gap-3 text-lg font-bold text-ink-900 pb-4 border-b border-sand-200 mb-4 shrink-0">
            <Bookmark className="w-5 h-5 text-saffron-600" />
            <span>અનુક્રમણિકા (Index)</span>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#section-${section.id}`}
                className="block px-4 py-3 rounded-xl bg-sand-50/50 hover:bg-sand-200 text-ink-900 text-sm font-medium border border-transparent hover:border-sand-300 transition"
                title={section.title}
              >
                {section.title.split(':')[0] || `પ્રકરણ ${index + 1}`}
              </a>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
