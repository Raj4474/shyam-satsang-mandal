'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, Check, Home, Info, Layout, Phone, Palette, RefreshCw } from 'lucide-react';
import { ColorPickerPalette } from '@/components/admin/ColorPickerPalette';

export default function WebsiteSettingsPage() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'pages' | 'contact' | 'colors'>('home');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState<Record<string, string>>({
    // Home / Mukhya Prusht
    siteName: 'શ્યામ સત્સંગ મંડળ',
    siteTagline: 'ગુજરાતી ભજન અને ધૂન ડિજિટલ લાઈબ્રેરી',
    heroBadge: 'શ્યામ સત્સંગ મંડળ પવિત્ર સંગ્રહાલય',
    heroTitle: 'ભજન, ધૂન અને આધ્યાત્મિક વારસાનું ડિજિટલ સંગ્રહાલય',
    heroSubtitle: 'સંતવાણી, ભક્તિ અને જીવનમૂલ્યોને આગામી પેઢી સુધી પહોંચાડવાનો એક પ્રયાસ.',
    heroImage: '',
    card1Title: 'શામજીબાપાનું જીવન ચરિત્ર',
    card1Desc: 'શામજીબાપાના જીવન, વિચારો અને આધ્યાત્મિક યાત્રા વિશે વિસ્તૃત જાણો.',
    card2Title: 'ભજન સંગ્રહ',
    card2Desc: 'સંતવાણી પદો અને સદ્ગુરુ વાણીનો પવિત્ર સંગ્રહ.',
    card3Title: 'ધૂન સંગ્રહ',
    card3Desc: 'ભક્તિમય અને મનોહર ધૂન વાંચો તથા શ્રવણ કરો.',
    saintsTitle: 'મહાન સંતો',
    saintsSubtitle: 'જેમના દિવ્ય પદોથી ગુજરાતી સાહિત્ય સમૃદ્ધ થયું છે',

    // About Us & Footer
    footerAboutTitle: 'શ્યામ સત્સંગ મંડળ',
    footerAboutDesc: 'ગુજરાતી ભજન, ધૂન અને આધ્યાત્મિક વારસાને આગામી પેઢી સુધી સુરક્ષિત અને સહજ રીતે પહોંચાડવાનો એક નમ્ર ડિજિટલ સંગ્રહાલય પ્રયાસ.',
    footerQuote: 'સંતવાણી અને હરિનામ સ્મરણ જીવનને પાવન બનાવે છે.',
    footerPhone: '+91 98765 43210',
    footerEmail: 'info@shyamsatsang.org',
    footerAddress: 'ગુજરાત, ભારત',
    footerCopyright: '© ૨૦૨૬ શ્યામ સત્સંગ મંડળ. સર્વાધિકાર સુરક્ષિત.',

    // Page Titles
    biographyTitle: 'શામજીબાપા જીવન ચરિત્ર',
    biographySubtitle: 'શામજીબાપાના દિવ્ય બાલ્યાવસ્થા, સાધના કાળ, ભક્તિ ઉપદેશ અને શ્યામ સત્સંગ મંડળના પવિત્ર વારસાની આત્મગાથા.',
    bhajansTitle: 'ગુજરાતી ભજનો',
    bhajansSubtitle: 'શામજીબાપા, સંત કબીર, મહાત્મા રવિરામ અને પવિત્ર સંતોના ભજનો.',
    dhunsTitle: 'પવિત્ર ધૂન સંગ્રહ',
    dhunsSubtitle: 'ઈશ્વરના દિવ્ય નામની કીર્તન ધૂનનો સંગ્રહ અને પદ સાહિત્ય.',
    authorsTitle: 'મહાન સંતો',
    authorsSubtitle: 'શામજીબાપા, સંત કબીર, મહાત્મા રવિરામ, બાપુ ઘસુારામ અને પવિત્ર સંતોની સંતવાણી રચનાઓ.',

    // Colors
    defaultBhajanTextColor: '#7f1d1d',
    defaultDhunTextColor: '#d97706',
    defaultBiographyTextColor: '#1f2937',
  });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === 'object') {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch((err) => console.error('Error fetching settings:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert('સેટિંગ્સ સેવ કરતી વખતે ભૂલ આવી.');
      }
    } catch (err) {
      console.error('Settings save error:', err);
      alert('સેટિંગ્સ સેવ કરતી વખતે કનેક્શન ક્ષતિ આવી.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 font-gujarati">
        <div className="flex items-center gap-3 text-maroon-900 font-bold">
          <RefreshCw className="w-6 h-6 animate-spin text-saffron-600" />
          <span>વેબસાઈટ સેટિંગ્સ લોડ થઈ રહ્યા છે...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-gujarati max-w-4xl">
      {/* Top Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-saffron-500/20 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-maroon-950 flex items-center gap-2">
            <Settings className="w-7 h-7 text-saffron-600" />
            <span>વેબસાઈટ ટેક્સ્ટ અને સેટિંગ્સ મેનેજર</span>
          </h1>
          <p className="text-maroon-800/70 text-sm mt-1">
            અહીંથી તમે વેબસાઈટનું નામ, મુખ્ય પૃષ્ઠ (મુખ્ય પૃષ્ટ), અમારા વિશે (About Us), ફુટર અને પેજ શીર્ષકો બદલી શકો છો.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-saffron-600 hover:bg-saffron-700 text-cream-50 font-bold text-sm shadow-md transition disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'સેવ થઈ રહ્યું છે...' : 'બધા સેટિંગ્સ સેવ કરો'}</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 border-b border-saffron-500/20 pb-2.5">
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap flex-shrink-0 transition ${
            activeTab === 'home'
              ? 'bg-maroon-950 text-gold-400 shadow-sm'
              : 'bg-cream-100 text-maroon-950 hover:bg-gold-500/20'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>૧. મુખ્ય પૃષ્ઠ (Mukhya Prusht)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap flex-shrink-0 transition ${
            activeTab === 'about'
              ? 'bg-maroon-950 text-gold-400 shadow-sm'
              : 'bg-cream-100 text-maroon-950 hover:bg-gold-500/20'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>૨. અમારા વિશે અને ફુટર</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pages')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap flex-shrink-0 transition ${
            activeTab === 'pages'
              ? 'bg-maroon-950 text-gold-400 shadow-sm'
              : 'bg-cream-100 text-maroon-950 hover:bg-gold-500/20'
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>૩. પેજ શીર્ષકો (Page Titles)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap flex-shrink-0 transition ${
            activeTab === 'contact'
              ? 'bg-maroon-950 text-gold-400 shadow-sm'
              : 'bg-cream-100 text-maroon-950 hover:bg-gold-500/20'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>૪. સંપર્ક અને બ્રાન્ડ શીર્ષક</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('colors')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap flex-shrink-0 transition ${
            activeTab === 'colors'
              ? 'bg-maroon-950 text-gold-400 shadow-sm'
              : 'bg-cream-100 text-maroon-950 hover:bg-gold-500/20'
          }`}
        >
          <Palette className="w-4 h-4 text-saffron-500" />
          <span>૫. કલર પેલેટ અને ટેક્સ્ટ કલર</span>
        </button>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="bg-cream-50 rounded-3xl p-6 sm:p-8 border border-saffron-500/20 shadow-sm space-y-6">
        {/* Tab 1: Home / Mukhya Prusht */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-maroon-950 border-b border-saffron-500/20 pb-3 flex items-center gap-2">
              <Home className="w-5 h-5 text-saffron-600" />
              <span>મુખ્ય પૃષ્ઠ (Home / Mukhya Prusht) લખાણ સેટિંગ્સ</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold text-maroon-950 text-sm mb-2">હેડર બેજ ટેક્સ્ટ (Hero Badge)</label>
                <input
                  type="text"
                  value={settings.heroBadge || ''}
                  onChange={(e) => handleChange('heroBadge', e.target.value)}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white text-sm font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-maroon-950 text-sm mb-2">મુખ્ય હેડિંગ (Hero Main Heading)</label>
                <input
                  type="text"
                  value={settings.heroTitle || ''}
                  onChange={(e) => handleChange('heroTitle', e.target.value)}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white text-base font-bold text-maroon-950"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-maroon-950 text-sm mb-2">સબ-ટાઇટલ લખાણ (Hero Subtitle)</label>
              <textarea
                rows={3}
                value={settings.heroSubtitle || ''}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white text-sm leading-relaxed"
              />
            </div>

            {/* Category Cards */}
            <div className="space-y-4 pt-4 border-t border-saffron-500/20">
              <h3 className="font-bold text-maroon-950 text-base">મુખ્ય પૃષ્ઠ કેટેગરી કાર્ડ્સ (Category Cards)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-saffron-500/20 space-y-2">
                  <span className="text-xs font-bold text-saffron-700">કાર્ડ ૧: જીવન ચરિત્ર</span>
                  <input
                    type="text"
                    value={settings.card1Title || ''}
                    onChange={(e) => handleChange('card1Title', e.target.value)}
                    placeholder="કાર્ડ શીર્ષક"
                    className="w-full p-2 rounded-lg border border-saffron-500/30 text-xs font-bold"
                  />
                  <textarea
                    rows={2}
                    value={settings.card1Desc || ''}
                    onChange={(e) => handleChange('card1Desc', e.target.value)}
                    placeholder="કાર્ડ વિગત"
                    className="w-full p-2 rounded-lg border border-saffron-500/30 text-xs"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-white border border-saffron-500/20 space-y-2">
                  <span className="text-xs font-bold text-saffron-700">કાર્ડ ૨: ભજન સંગ્રહ</span>
                  <input
                    type="text"
                    value={settings.card2Title || ''}
                    onChange={(e) => handleChange('card2Title', e.target.value)}
                    placeholder="કાર્ડ શીર્ષક"
                    className="w-full p-2 rounded-lg border border-saffron-500/30 text-xs font-bold"
                  />
                  <textarea
                    rows={2}
                    value={settings.card2Desc || ''}
                    onChange={(e) => handleChange('card2Desc', e.target.value)}
                    placeholder="કાર્ડ વિગત"
                    className="w-full p-2 rounded-lg border border-saffron-500/30 text-xs"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-white border border-saffron-500/20 space-y-2">
                  <span className="text-xs font-bold text-saffron-700">કાર્ડ ૩: ધૂન સંગ્રહ</span>
                  <input
                    type="text"
                    value={settings.card3Title || ''}
                    onChange={(e) => handleChange('card3Title', e.target.value)}
                    placeholder="કાર્ડ શીર્ષક"
                    className="w-full p-2 rounded-lg border border-saffron-500/30 text-xs font-bold"
                  />
                  <textarea
                    rows={2}
                    value={settings.card3Desc || ''}
                    onChange={(e) => handleChange('card3Desc', e.target.value)}
                    placeholder="કાર્ડ વિગત"
                    className="w-full p-2 rounded-lg border border-saffron-500/30 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Saints Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-saffron-500/20">
              <div>
                <label className="block font-bold text-maroon-950 text-sm mb-2">સંતો વિભાગનું શીર્ષક (Home Saints Title)</label>
                <input
                  type="text"
                  value={settings.saintsTitle || ''}
                  onChange={(e) => handleChange('saintsTitle', e.target.value)}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white text-sm font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-maroon-950 text-sm mb-2">સંતો વિભાગનું સબ-ટાઇટલ (Home Saints Subtitle)</label>
                <input
                  type="text"
                  value={settings.saintsSubtitle || ''}
                  onChange={(e) => handleChange('saintsSubtitle', e.target.value)}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: About Us & Footer */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-maroon-950 border-b border-saffron-500/20 pb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-saffron-600" />
              <span>અમારા વિશે (About Us) અને ફુટર સેટિંગ્સ</span>
            </h2>

            <div>
              <label className="block font-bold text-maroon-950 text-sm mb-2">અમારા વિશે શીર્ષક (Footer About Title)</label>
              <input
                type="text"
                value={settings.footerAboutTitle || ''}
                onChange={(e) => handleChange('footerAboutTitle', e.target.value)}
                className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white text-sm font-bold text-maroon-950"
              />
            </div>

            <div>
              <label className="block font-bold text-maroon-950 text-sm mb-2">અમારા વિશે વિસ્તૃત લખાણ (Footer About Description)</label>
              <textarea
                rows={4}
                value={settings.footerAboutDesc || ''}
                onChange={(e) => handleChange('footerAboutDesc', e.target.value)}
                className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white text-sm leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-bold text-maroon-950 text-sm mb-2">પવિત્ર સુવિચાર / કવોટ (Footer Quote Text)</label>
              <input
                type="text"
                value={settings.footerQuote || ''}
                onChange={(e) => handleChange('footerQuote', e.target.value)}
                className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white text-sm italic"
              />
            </div>

            <div>
              <label className="block font-bold text-maroon-950 text-sm mb-2">કોપીરાઈટ સંદેશ (Footer Copyright)</label>
              <input
                type="text"
                value={settings.footerCopyright || ''}
                onChange={(e) => handleChange('footerCopyright', e.target.value)}
                className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white text-sm"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Page Header Titles */}
        {activeTab === 'pages' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-maroon-950 border-b border-saffron-500/20 pb-3 flex items-center gap-2">
              <Layout className="w-5 h-5 text-saffron-600" />
              <span>પેજ શીર્ષકો (Page Titles & Subtitles)</span>
            </h2>

            {/* Biography Page Header */}
            <div className="p-4 rounded-2xl bg-white border border-saffron-500/20 space-y-3">
              <span className="font-bold text-sm text-saffron-700">૧. જીવન ચરિત્ર પેજ (/biography)</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={settings.biographyTitle || ''}
                  onChange={(e) => handleChange('biographyTitle', e.target.value)}
                  placeholder="પેજ શીર્ષક"
                  className="w-full p-2.5 rounded-lg border border-saffron-500/30 text-sm font-bold"
                />
                <input
                  type="text"
                  value={settings.biographySubtitle || ''}
                  onChange={(e) => handleChange('biographySubtitle', e.target.value)}
                  placeholder="પેજ સબ-ટાઇટલ"
                  className="w-full p-2.5 rounded-lg border border-saffron-500/30 text-sm"
                />
              </div>
            </div>

            {/* Bhajan Page Header */}
            <div className="p-4 rounded-2xl bg-white border border-saffron-500/20 space-y-3">
              <span className="font-bold text-sm text-saffron-700">૨. ભજન પેજ (/bhajans)</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={settings.bhajansTitle || ''}
                  onChange={(e) => handleChange('bhajansTitle', e.target.value)}
                  placeholder="પેજ શીર્ષક"
                  className="w-full p-2.5 rounded-lg border border-saffron-500/30 text-sm font-bold"
                />
                <input
                  type="text"
                  value={settings.bhajansSubtitle || ''}
                  onChange={(e) => handleChange('bhajansSubtitle', e.target.value)}
                  placeholder="પેજ સબ-ટાઇટલ"
                  className="w-full p-2.5 rounded-lg border border-saffron-500/30 text-sm"
                />
              </div>
            </div>

            {/* Dhun Page Header */}
            <div className="p-4 rounded-2xl bg-white border border-saffron-500/20 space-y-3">
              <span className="font-bold text-sm text-saffron-700">૩. ધૂન પેજ (/dhuns)</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={settings.dhunsTitle || ''}
                  onChange={(e) => handleChange('dhunsTitle', e.target.value)}
                  placeholder="પેજ શીર્ષક"
                  className="w-full p-2.5 rounded-lg border border-saffron-500/30 text-sm font-bold"
                />
                <input
                  type="text"
                  value={settings.dhunsSubtitle || ''}
                  onChange={(e) => handleChange('dhunsSubtitle', e.target.value)}
                  placeholder="પેજ સબ-ટાઇટલ"
                  className="w-full p-2.5 rounded-lg border border-saffron-500/30 text-sm"
                />
              </div>
            </div>

            {/* Authors Page Header */}
            <div className="p-4 rounded-2xl bg-white border border-saffron-500/20 space-y-3">
              <span className="font-bold text-sm text-saffron-700">૪. સંત પરિચય પેજ (/authors)</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={settings.authorsTitle || ''}
                  onChange={(e) => handleChange('authorsTitle', e.target.value)}
                  placeholder="પેજ શીર્ષક"
                  className="w-full p-2.5 rounded-lg border border-saffron-500/30 text-sm font-bold"
                />
                <input
                  type="text"
                  value={settings.authorsSubtitle || ''}
                  onChange={(e) => handleChange('authorsSubtitle', e.target.value)}
                  placeholder="પેજ સબ-ટાઇટલ"
                  className="w-full p-2.5 rounded-lg border border-saffron-500/30 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Contact & Brand Info */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-maroon-950 border-b border-saffron-500/20 pb-3 flex items-center gap-2">
              <Phone className="w-5 h-5 text-saffron-600" />
              <span>સંપર્ક માહિતી અને બ્રાન્ડ સેટિંગ્સ</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold text-maroon-950 text-sm mb-2">વેબસાઈટ બ્રાન્ડ નામ (Site Title)</label>
                <input
                  type="text"
                  value={settings.siteName || ''}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white text-base font-bold text-maroon-950"
                />
              </div>

              <div>
                <label className="block font-bold text-maroon-950 text-sm mb-2">સબ-બ્રાન્ડ ટેગલાઇન (Site Tagline)</label>
                <input
                  type="text"
                  value={settings.siteTagline || ''}
                  onChange={(e) => handleChange('siteTagline', e.target.value)}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-saffron-500/20">
              <div>
                <label className="block font-bold text-maroon-950 text-sm mb-2">સંપર્ક ફોન (Phone)</label>
                <input
                  type="text"
                  value={settings.footerPhone || ''}
                  onChange={(e) => handleChange('footerPhone', e.target.value)}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-maroon-950 text-sm mb-2">ઈમેલ સરનામું (Email)</label>
                <input
                  type="text"
                  value={settings.footerEmail || ''}
                  onChange={(e) => handleChange('footerEmail', e.target.value)}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-maroon-950 text-sm mb-2">સરનામું / ધામ (Address)</label>
                <input
                  type="text"
                  value={settings.footerAddress || ''}
                  onChange={(e) => handleChange('footerAddress', e.target.value)}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Color Palette & Text Colors */}
        {activeTab === 'colors' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-maroon-950 border-b border-saffron-500/20 pb-3 flex items-center gap-2">
              <Palette className="w-5 h-5 text-saffron-600" />
              <span>વેબસાઈટ કલર પેલેટ અને ટેક્સ્ટ રંગ સેટિંગ્સ</span>
            </h2>

            <p className="text-sm text-maroon-800/80 leading-relaxed">
              અહીંથી તમે સમગ્ર વેબસાઈટ માટે ડિફોલ્ટ લખાણનો રંગ (Default Text Colors) સેટ કરી શકો છો. એડમિન દ્વારા દરેક ભજન, ધૂન અને જીવન ચરિત્ર ઉમેરતી વખતે અલગ-અલગ કલર પસંદ કરી શકાશે.
            </p>

            <div className="space-y-6 pt-2">
              <ColorPickerPalette
                label="૧. ભજન લખાણનો ડિફોલ્ટ રંગ (Default Bhajan Text Color)"
                value={settings.defaultBhajanTextColor}
                onChange={(col) => handleChange('defaultBhajanTextColor', col)}
                sampleText="મેરુ તો ડગે પણ જેના મન ન ડગે - ડિફોલ્ટ ભજન બોલ કલર"
              />

              <ColorPickerPalette
                label="૨. ધૂન લખાણનો ડિફોલ્ટ રંગ (Default Dhun Text Color)"
                value={settings.defaultDhunTextColor}
                onChange={(col) => handleChange('defaultDhunTextColor', col)}
                sampleText="હે શ્રી કૃષ્ણ ગોવિંદ હરે મુરારી - ડિફોલ્ટ ધૂન બોલ કલર"
              />

              <ColorPickerPalette
                label="૩. જીવન ચરિત્ર લખાણનો ડિફોલ્ટ રંગ (Default Biography Text Color)"
                value={settings.defaultBiographyTextColor}
                onChange={(col) => handleChange('defaultBiographyTextColor', col)}
                sampleText="શામજીબાપાનું દિવ્ય બાલ્યાવસ્થા અને પવિત્ર સાધના કાળ"
              />
            </div>
          </div>
        )}

        {/* Save Bar */}
        <div className="pt-6 border-t border-saffron-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          {saved ? (
            <span className="flex items-center gap-2 text-green-700 font-bold text-sm bg-green-50 px-4 py-2 rounded-xl border border-green-200">
              <Check className="w-5 h-5 text-green-600" />
              <span>તમામ સેટિંગ્સ સફળતાપૂર્વક અપડેટ થયા!</span>
            </span>
          ) : (
            <span className="text-xs text-maroon-800/60 font-medium">
              * સેટિંગ્સ બદલ્યા બાદ 'સેવ કરો' બટન પર ક્લિક કરો.
            </span>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-saffron-600 hover:bg-saffron-700 text-cream-50 font-bold text-sm shadow-md transition disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'સેવ થઈ રહ્યું છે...' : 'સેવ કરો (Save Settings)'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
