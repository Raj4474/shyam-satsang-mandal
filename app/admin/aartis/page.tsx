'use client';

import React, { useState, useEffect } from 'react';
import { Flame, Plus, Edit, Trash2, X, Check, Search, RefreshCw, CheckCircle2 } from 'lucide-react';
import { ColorPickerPalette } from '@/components/admin/ColorPickerPalette';
import { RichColorTextArea } from '@/components/admin/RichColorTextArea';

interface Aarti {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  tek?: string;
  lyrics: string;
  textColor?: string;
  featured: boolean;
  sortOrder: number;
  status: string;
}

export default function ManageAartisPage() {
  const [aartis, setAartis] = useState<Aarti[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    slug: '',
    tek: '',
    lyrics: '',
    textColor: '',
    featured: false,
    status: 'PUBLISHED',
    sortOrder: 0,
  });

  const loadData = async (query = '') => {
    setLoading(true);
    try {
      const url = query ? `/api/aartis?q=${encodeURIComponent(query)}` : '/api/aartis';
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data)) setAartis(data);
    } catch (err) {
      console.error('Failed loading aartis:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(searchQuery);
  }, [searchQuery]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      title: '',
      subtitle: '',
      slug: '',
      tek: '',
      lyrics: '',
      textColor: '',
      featured: false,
      status: 'PUBLISHED',
      sortOrder: aartis.length + 1,
    });
    setModalOpen(true);
  };

  const handleEdit = (a: Aarti) => {
    setEditingId(a.id);
    setForm({
      title: a.title,
      subtitle: a.subtitle || '',
      slug: a.slug,
      tek: a.tek || '',
      lyrics: a.lyrics,
      textColor: a.textColor || '',
      featured: Boolean(a.featured),
      status: a.status || 'PUBLISHED',
      sortOrder: a.sortOrder || 0,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('શું તમે ખરેખર આ આરતી ડીલીટ કરવા માંગો છો?')) return;
    
    try {
      await fetch(`/api/aartis/${id}`, { method: 'DELETE' });
      setAartis(aartis.filter(a => a.id !== id));
    } catch (err) {
      alert('ડીલીટ કરવામાં ભૂલ આવી.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.lyrics) {
      alert('શીર્ષક અને લખાણ (Lyrics) દાખલ કરવા ફરજિયાત છે.');
      return;
    }

    setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/aartis/${editingId}` : '/api/aartis';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => {
          setSavedSuccess(false);
          setModalOpen(false);
          loadData();
        }, 1500);
      } else {
        const error = await res.json();
        alert(`ભૂલ: ${error.error}`);
      }
    } catch (err) {
      alert('સાચવવામાં કનેક્શન ક્ષતિ આવી.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-gujarati">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-saffron-500/20 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-maroon-950 flex items-center gap-2">
            <Flame className="w-6 h-6 text-saffron-600" />
            <span>આરતી સંગ્રહ મેનેજર (Aarti Manager)</span>
          </h1>
          <p className="text-maroon-800/70 text-sm mt-1">વેબસાઈટ પર દેખાતી આરતીઓ ઉમેરો, સુધારો કે ડીલીટ કરો.</p>
        </div>
        
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-saffron-600 hover:bg-saffron-700 text-white rounded-xl font-bold text-sm shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>નવી આરતી ઉમેરો</span>
        </button>
      </div>

      <div className="flex items-center bg-white rounded-xl border border-saffron-500/20 px-4 py-2.5 max-w-md shadow-sm">
        <Search className="w-5 h-5 text-maroon-800/40 mr-2" />
        <input
          type="text"
          placeholder="આરતી શોધો..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full outline-none text-sm font-medium bg-transparent text-maroon-950"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <RefreshCw className="w-6 h-6 animate-spin text-saffron-600" />
        </div>
      ) : aartis.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border border-saffron-500/20 text-center text-maroon-800/60 font-medium">
          કોઈ આરતી મળી નથી. નવી આરતી ઉમેરો.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-saffron-500/20 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-cream-100 text-maroon-900 border-b border-saffron-500/20">
                <tr>
                  <th className="p-4 font-bold">શીર્ષક (Title)</th>
                  <th className="p-4 font-bold">સબ-ટાઇટલ</th>
                  <th className="p-4 font-bold">સ્થિતિ</th>
                  <th className="p-4 font-bold text-right">એક્શન</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-saffron-500/10">
                {aartis.map((a) => (
                  <tr key={a.id} className="hover:bg-cream-50/50 transition">
                    <td className="p-4 font-semibold text-maroon-950">
                      <div className="flex items-center gap-2">
                        <span>{a.title}</span>
                        {a.featured && <span className="px-2 py-0.5 bg-gold-400 text-maroon-950 text-[10px] rounded-full font-bold">Featured</span>}
                      </div>
                    </td>
                    <td className="p-4 text-maroon-800">{a.subtitle || '-'}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        a.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(a)}
                          className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                          title="સુધારો (Edit)"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition"
                          title="ડીલીટ કરો"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-maroon-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-cream-50 rounded-3xl w-full max-w-4xl shadow-2xl border border-saffron-500/30 my-8">
            <div className="flex justify-between items-center p-5 sm:p-6 border-b border-saffron-500/20 bg-white rounded-t-3xl sticky top-0 z-10">
              <h2 className="text-xl font-bold text-maroon-950 flex items-center gap-2">
                <Flame className="w-5 h-5 text-saffron-600" />
                {editingId ? 'આરતી સુધારો (Edit)' : 'નવી આરતી ઉમેરો'}
              </h2>
              <button
                onClick={() => !saving && setModalOpen(false)}
                className="p-2 hover:bg-red-50 text-maroon-800/60 hover:text-red-600 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-8">
              {savedSuccess ? (
                <div className="flex flex-col items-center justify-center py-20 text-green-700">
                  <CheckCircle2 className="w-16 h-16 mb-4 text-green-500" />
                  <h3 className="text-2xl font-bold">સફળતાપૂર્વક સાચવવામાં આવ્યું!</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-maroon-950 mb-1.5">શીર્ષક (Title) *</label>
                      <input
                        type="text"
                        required
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-saffron-500/30 bg-white font-medium"
                        placeholder="દા.ત. આરતી ૧: જય ગુરૂ શ્યામરામ"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-maroon-950 mb-1.5">સબ-ટાઇટલ</label>
                      <input
                        type="text"
                        value={form.subtitle}
                        onChange={e => setForm({ ...form, subtitle: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-saffron-500/30 bg-white font-medium"
                        placeholder="દા.ત. સદ્ગુરુ સ્તુતિ..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-maroon-950 mb-1.5">ટેક (Tek)</label>
                      <input
                        type="text"
                        value={form.tek}
                        onChange={e => setForm({ ...form, tek: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-saffron-500/30 bg-white"
                        placeholder="ટેકની પંક્તિ..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-maroon-950 mb-1.5">URL Slug (ઓપ્શનલ)</label>
                      <input
                        type="text"
                        value={form.slug}
                        onChange={e => setForm({ ...form, slug: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-saffron-500/30 bg-white"
                        placeholder="aarti-1-jay-guru-shyamram"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-maroon-950 mb-2">આરતીનું લખાણ (Lyrics) *</label>
                    <RichColorTextArea
                      value={form.lyrics}
                      onChange={val => setForm({ ...form, lyrics: val })}
                      placeholder="અહીં આરતીના બોલ લખો..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-saffron-500/20">
                    <div>
                      <label className="block text-sm font-bold text-maroon-950 mb-1.5">સ્થિતિ (Status)</label>
                      <select
                        value={form.status}
                        onChange={e => setForm({ ...form, status: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-saffron-500/30 bg-white font-medium"
                      >
                        <option value="PUBLISHED">Published (પબ્લિશ્ડ)</option>
                        <option value="DRAFT">Draft (ડ્રાફ્ટ)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-maroon-950 mb-1.5">ક્રમ (Sort Order)</label>
                      <input
                        type="number"
                        value={form.sortOrder}
                        onChange={e => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                        className="w-full p-2.5 rounded-xl border border-saffron-500/30 bg-white font-medium"
                      />
                    </div>

                    <div className="flex items-center pt-6">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-maroon-950">
                        <input
                          type="checkbox"
                          checked={form.featured}
                          onChange={e => setForm({ ...form, featured: e.target.checked })}
                          className="w-5 h-5 rounded border-saffron-500 text-saffron-600 focus:ring-saffron-500"
                        />
                        <span>મુખ્ય પૃષ્ઠ પર બતાવો (Featured)</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-saffron-500/20">
                    <ColorPickerPalette
                      label="ખાસ લખાણ રંગ (Custom Text Color - વૈકલ્પિક)"
                      value={form.textColor}
                      onChange={(col) => setForm({ ...form, textColor: col })}
                      sampleText="જય ગુરૂ શ્યામરામ જય ગુરૂ શ્યામરામ..."
                    />
                  </div>

                  <div className="sticky bottom-0 bg-cream-50 pt-4 pb-2 border-t border-saffron-500/20 flex justify-end gap-3 mt-8">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      disabled={saving}
                      className="px-6 py-2.5 rounded-xl font-bold text-maroon-900 bg-white border border-saffron-500/30 hover:bg-cream-100 transition disabled:opacity-50"
                    >
                      રદ કરો
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 px-8 py-2.5 rounded-xl font-bold text-white bg-saffron-600 hover:bg-saffron-700 shadow-md transition disabled:opacity-50"
                    >
                      {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                      <span>{saving ? 'સેવ થાય છે...' : 'સેવ કરો'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
