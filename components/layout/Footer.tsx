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
    <footer className="print:hidden relative overflow-hidden bg-maroon-950 text-sand-50 pt-16 pb-24 md:pb-12 font-gujarati border-t-4 border-saffron-600 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      {/* Premium Background Layer */}
      <div className="absolute inset-0 z-0 mandala-pattern opacity-10 mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-maroon-950/50 to-black/60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: About */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-500/50 bg-sand-200 shadow-spiritual">
                <img src="/logo.jpg" alt={title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-3xl font-extrabold text-sand-50 tracking-wide text-shadow-sm">{title}</h3>
            </div>
            <p className="text-sand-200/80 text-sm leading-relaxed max-w-md font-medium">
              {desc}
            </p>
            <div className="pl-5 border-l-2 border-gold-500 text-gold-300 text-sm italic tracking-wide">
              {quote}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-sand-50 tracking-wide">મુખ્ય વિભાગો</h4>
            <ul className="space-y-4 text-sm font-medium text-sand-300">
              {[
                { name: 'શામજીબાપાનું જીવન ચરિત્ર', href: '/biography' },
                { name: 'ગુજરાતી ભજનો', href: '/bhajans' },
                { name: 'ભક્તિમય ધૂન', href: '/dhuns' },
                { name: 'મહાન સંતો', href: '/authors' },
                { name: 'શોધ અને સંગ્રહ', href: '/search' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group hover:text-gold-400 transition-colors flex items-center gap-2">
                    <span className="group-hover:translate-x-1 transition-transform inline-block">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Admin & Contact */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-sand-50 tracking-wide">વ્યવસ્થાપન</h4>
            <p className="text-xs text-sand-400 font-medium leading-relaxed">
              સંગ્રહાલયમાં નવા ભજન, ધૂન કે સુધારા-વધારા માટે એડમિન ડેશબોર્ડનો ઉપયોગ કરો.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-saffron-600/90 hover:bg-saffron-500 text-sand-50 font-bold text-xs border border-saffron-400/50 shadow-spiritual hover:scale-105 transition-all duration-300"
            >
              <Shield className="w-4 h-4 text-gold-200" />
              <span>એડમિન ડેશબોર્ડ (Admin)</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-maroon-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-sand-400 gap-4">
          <p>{copyright}</p>
          <p className="flex items-center gap-1.5">
            <span>ભક્તિ અને શ્રદ્ધા સાથે નિર્મિત</span>
            <Heart className="w-4 h-4 text-saffron-500 fill-saffron-500 animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
}
