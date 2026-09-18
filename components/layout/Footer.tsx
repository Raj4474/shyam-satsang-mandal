import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Heart, Feather } from 'lucide-react';

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

  const title = s.footerAboutTitle || 'આધુનિક ગુજરાતી ગ્રંથ';
  const desc = s.footerAboutDesc || 'ગુજરાતી ભાષા, સાહિત્ય અને સંતવાણીને આગામી પેઢી સુધી પહોંચાડવાનો એક નમ્ર ડિજિટલ સંગ્રહાલય પ્રયાસ.';
  const quote = s.footerQuote || '"સંતવાણી અને હરિનામ સ્મરણ જીવનને પાવન બનાવે છે."';
  const copyright = s.footerCopyright || `© ${new Date().getFullYear()} ગુજરાતી ગ્રંથ. સર્વાધિકાર સુરક્ષિત.`;

  return (
    <footer className="print:hidden bg-paper-surface border-t border-border-elegant font-gujarati pt-16 pb-24 lg:pb-12 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="font-serif text-3xl font-bold tracking-tight">{title}</h3>
            <p className="text-ink-muted text-base leading-relaxed max-w-sm">
              {desc}
            </p>
            <div className="pl-4 border-l bg-paper/50 py-2 border-accent text-ink-muted text-sm italic">
              {quote}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-4 space-y-6 md:pl-8">
            <h4 className="text-xs tracking-widest text-ink-muted uppercase font-semibold">અન્વેષણ</h4>
            <ul className="space-y-4 text-base font-medium">
              {[
                { name: 'સંગ્રહ (સાહિત્ય)', href: '/bhajans' },
                { name: 'સર્જકો (લેખકો)', href: '/authors' },
                { name: 'શોધ (અન્વેષણ)', href: '/search' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-accent transition-colors flex items-center gap-2 group">
                    <span className="group-hover:translate-x-1 transition-transform inline-block">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Admin */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-xs tracking-widest text-ink-muted uppercase font-semibold">વ્યવસ્થાપન</h4>
            <ul className="space-y-4 text-base font-medium">
              <li>
                <Link href="/admin" className="hover:text-accent transition-colors flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform inline-block">એડમિન ડેશબોર્ડ</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-elegant pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-ink-muted gap-4">
          <p>{copyright}</p>
          <p className="flex items-center gap-1.5">
            <span>માતૃભાષાના પ્રેમ સાથે નિર્મિત</span>
            <Feather className="w-4 h-4 text-accent" />
          </p>
        </div>
      </div>
    </footer>
  );
}
