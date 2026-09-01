import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, Shield, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-maroon-950 text-cream-100 border-t border-gold-500/30 pt-12 pb-24 md:pb-12 font-gujarati">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gold-500/40">
                <img src="/logo.jpg" alt="શ્યામ સત્સંગ મંડળ" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-gold-400">શ્યામ સત્સંગ મંડળ</h3>
            </div>
            <p className="text-cream-300/80 text-sm leading-relaxed max-w-md">
              ગુજરાતી ભજન, ધૂન અને આધ્યાત્મિક વારસાને આગામી પેઢી સુધી સુરક્ષિત અને સહજ રીતે પહોંચાડવાનો એક નમ્ર ડિજિટલ સંગ્રહાલય પ્રયાસ.
            </p>
            <div className="p-4 rounded-xl bg-maroon-900/60 border border-gold-500/20 text-gold-300 text-xs italic">
              "સંતવાણી અને હરિનામ સ્મરણ જીવનને પાવન બનાવે છે."
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gold-400 border-b border-gold-500/20 pb-2">મુખ્ય વિભાગો</h4>
            <ul className="space-y-2 text-sm text-cream-300/90">
              <li>
                <Link href="/biography" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span>•</span> શામજીબાપાનું જીવન ચરિત્ર
                </Link>
              </li>
              <li>
                <Link href="/bhajans" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span>•</span> ગુજરાતી ભજનો
                </Link>
              </li>
              <li>
                <Link href="/dhuns" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span>•</span> ભક્તિમય ધૂન
                </Link>
              </li>
              <li>
                <Link href="/authors" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span>•</span> મહાન સંતો
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span>•</span> શોધ અને સંગ્રહ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Admin & Contact */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gold-400 border-b border-gold-500/20 pb-2">વ્યવસ્થાપન</h4>
            <p className="text-xs text-cream-300/70">
              સંગ્રહાલયમાં નવા ભજન, ધૂન કે સુધારા-વધારા માટે એડમિન ડેશબોર્ડનો ઉપયોગ કરો.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-saffron-600/30 hover:bg-saffron-600 text-gold-300 hover:text-maroon-950 font-semibold text-xs transition border border-gold-500/30"
            >
              <Shield className="w-4 h-4" />
              <span>એડમિન ડેશબોર્ડ (Admin)</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-maroon-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-300/60 gap-4">
          <p>© {new Date().getFullYear()} શ્યામ સત્સંગ મંડળ. સર્વાધિકાર સુરક્ષિત.</p>
          <p className="flex items-center gap-1">
            <span>ભક્તિ અને શ્રદ્ધા સાથે નિર્મિત</span>
            <Heart className="w-3.5 h-3.5 text-saffron-500 fill-saffron-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
