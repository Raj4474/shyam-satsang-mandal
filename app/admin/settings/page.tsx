'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, Check } from 'lucide-react';

export default function WebsiteSettingsPage() {
  const [settings, setSettings] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings({
          heroTitle: data.heroTitle || 'ભજન, ધૂન અને આધ્યાત્મિક વારસાનું ડિજિટલ સંગ્રહાલય',
          heroSubtitle: data.heroSubtitle || 'સંતવાણી, ભક્તિ અને જીવનમૂલ્યોને આગામી પેઢી સુધી પહોંચાડવાનો એક પ્રયાસ.',
          heroImage: data.heroImage || '',
        });
      })
      .catch((err) => console.error('Error fetching settings:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (err) {
      console.error('Settings save error:', err);
    }
  };

  return (
    <div className="space-y-8 font-gujarati max-w-3xl">
      <div>
        <h1 className="text-3xl font-extrabold text-maroon-950">વેબસાઈટ અને હેડર સેટિંગ્સ</h1>
        <p className="text-maroon-800/70 text-sm mt-1">મુખ્ય પૃષ્ઠનું હેડિંગ, સબ-ટાઇટલ અને બેનર બદલો.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-cream-50 rounded-3xl p-8 border border-saffron-500/20 shadow-sm space-y-6">
        <div>
          <label className="block font-bold text-maroon-950 mb-2">મુખ્ય હેડિંગ (Hero Main Heading)</label>
          <input
            type="text"
            required
            value={settings.heroTitle}
            onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
            className="w-full p-3.5 rounded-xl border border-saffron-500/30 bg-white font-bold text-lg text-maroon-950"
          />
        </div>

        <div>
          <label className="block font-bold text-maroon-950 mb-2">સબ-ટાઇટલ લખાણ (Hero Subtitle Text)</label>
          <textarea
            rows={3}
            value={settings.heroSubtitle}
            onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
            className="w-full p-3.5 rounded-xl border border-saffron-500/30 bg-white text-sm"
          />
        </div>

        <div>
          <label className="block font-bold text-maroon-950 mb-2">બેકગ્રાઉન્ડ ઇમેજ URL (Hero Background Image)</label>
          <input
            type="text"
            value={settings.heroImage}
            onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })}
            className="w-full p-3.5 rounded-xl border border-saffron-500/30 bg-white text-sm"
          />
        </div>

        <div className="pt-4 border-t border-saffron-500/20 flex items-center justify-between">
          {saved ? (
            <span className="flex items-center gap-2 text-green-700 font-bold text-sm">
              <Check className="w-5 h-5" />
              <span>સેટિંગ્સ સફળતાપૂર્વક અપડેટ થયા!</span>
            </span>
          ) : (
            <span />
          )}

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-saffron-600 hover:bg-saffron-700 text-cream-50 font-bold text-sm shadow-md transition"
          >
            <Save className="w-4 h-4" />
            <span>સેવ કરો (Save Settings)</span>
          </button>
        </div>
      </form>
    </div>
  );
}
