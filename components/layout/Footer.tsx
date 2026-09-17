import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Heart, Shield } from 'lucide-react';

async function getFooterSettings() {
  try {
    const settings = await db.siteSetting.findMany();
    const map: Record<string, string> = {};
    settings.forEach((s) => {
      map[s.key] = s.value;
    });
    return map;
  } catch (error) {
    return {};
  }
}

export async function Footer() {
  const s = await getFooterSettings();

  const title = s.footerAboutTitle || 'શ્યામ સત્સંગ મંડળ';
  const desc = s.footerAboutDesc || 'ગુજરાતી ભજન, ધૂન અને આધ્યાત્મિક વારસાને આગામી પેઢી સુધી સુરક્ષિત અને સહજ રીતે પહોંચાડવાનો એક નમ્ર ડિજિટલ સંગ્રહાલય પ્રયાસ.';
  const quote = s.footerQuote || '"સંતવાણી અને હરિનામ સ્મરણ જીવનને પાવન બનાવે છે."';
  const copyright = s.footerCopyright || `© ${new Date().getFullYear()} શ્યામ સત્સંગ મંડળ. સર્વાધિકાર સુરક્ષિત.`;

  return (
    <footer className="bg-sand-100 text-ink-900 border-t border-sand-200 pt-12 pb-24 md:pb-12 font-gujarati">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-sand-200 bg-sand-200">
                <img src="/logo.jpg" alt={title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-ink-900 tracking-tight">{title}</h3>
            </div>
            <p className="text-ink-600 text-sm leading-relaxed max-w-md font-medium">
              {desc}
            </p>
            <div className="pl-4 border-l-2 border-saffron-300 text-ink-700 text-sm italic">
              {quote}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-ink-900 tracking-tight">મુખ્ય વિભાગો</h4>
            <ul className="space-y-3 text-sm font-medium text-ink-600">
              <li>
                <Link href="/biography" className="hover:text-saffron-600 transition-colors flex items-center gap-2">
                  <span>&rarr;</span> શામજીબાપાનું જીવન ચરિત્ર
                </Link>
              </li>
              <li>
                <Link href="/bhajans" className="hover:text-saffron-600 transition-colors flex items-center gap-2">
                  <span>&rarr;</span> ગુજરાતી ભજનો
                </Link>
              </li>
              <li>
                <Link href="/dhuns" className="hover:text-saffron-600 transition-colors flex items-center gap-2">
                  <span>&rarr;</span> ભક્તિમય ધૂન
                </Link>
              </li>
              <li>
                <Link href="/authors" className="hover:text-saffron-600 transition-colors flex items-center gap-2">
                  <span>&rarr;</span> મહાન સંતો
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-saffron-600 transition-colors flex items-center gap-2">
                  <span>&rarr;</span> શોધ અને સંગ્રહ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Admin & Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-ink-900 tracking-tight">વ્યવસ્થાપન</h4>
            <p className="text-xs text-ink-500 font-medium leading-relaxed">
              સંગ્રહાલયમાં નવા ભજન, ધૂન કે સુધારા-વધારા માટે એડમિન ડેશબોર્ડનો ઉપયોગ કરો.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ink-900 hover:bg-ink-800 text-sand-50 font-semibold text-xs shadow-soft transition-all"
            >
              <Shield className="w-4 h-4" />
              <span>એડમિન ડેશબોર્ડ (Admin)</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-sand-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-ink-500 gap-4">
          <p>{copyright}</p>
          <p className="flex items-center gap-1.5">
            <span>ભક્તિ અને શ્રદ્ધા સાથે નિર્મિત</span>
            <Heart className="w-4 h-4 text-saffron-500 fill-saffron-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
