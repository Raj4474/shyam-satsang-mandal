'use client';

import React, { useState, useEffect } from 'react';
import { Bhajan, Author } from '@/types';
import { Plus, Edit, Trash2, Sparkles, X, Check, Music, Search, RefreshCw, CheckCircle2 } from 'lucide-react';
import { ImageUpload } from '@/components/ui/ImageUpload';

export default function ManageBhajansPage() {
  const [bhajans, setBhajans] = useState<Bhajan[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: '',
    slug: '',
    authorId: '',
    category: 'સંતવાણી',
    description: '',
    lyrics: '',
    audioUrl: '',
    pdfUrl: '',
    coverImage: '',
    featured: false,
    status: 'PUBLISHED',
    sortOrder: 0,
  });

  const loadData = async (query = '') => {
    setLoading(true);
    try {
      const bUrl = query ? `/api/bhajans?q=${encodeURIComponent(query)}` : '/api/bhajans';
      const [bRes, aRes] = await Promise.all([
        fetch(bUrl),
        fetch('/api/authors'),
      ]);
      const bData = await bRes.json();
      const aData = await aRes.json();
      if (Array.isArray(bData)) setBhajans(bData);
      if (Array.isArray(aData)) setAuthors(aData);
    } catch (err) {
      console.error('Failed loading bhajans:', err);
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
      slug: '',
      authorId: authors[0]?.id || '',
      category: 'સંતવાણી',
      description: '',
      lyrics: '',
      audioUrl: '',
      pdfUrl: '',
      coverImage: '',
      featured: false,
      status: 'PUBLISHED',
      sortOrder: bhajans.length + 1,
    });
    setModalOpen(true);
  };

  const handleEdit = (b: Bhajan) => {
    setEditingId(b.id);
    setForm({
      title: b.title,
      slug: b.slug,
      authorId: b.authorId || '',
      category: b.category || 'સંતવાણી',
      description: b.description || '',
      lyrics: b.lyrics,
      audioUrl: b.audioUrl || '',
      pdfUrl: b.pdfUrl || '',
      coverImage: b.coverImage || '',
      featured: Boolean(b.featured),
      status: b.status || 'PUBLISHED',
      sortOrder: b.sortOrder || 0,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('શું તમે આ ભજન કાઢી નાખવા માંગો છો? (Delete Bhajan?)')) return;
    try {
      const res = await fetch(`/api/bhajans/${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadData(searchQuery);
      } else {
        const errData = await res.json().catch(() => ({}));
        alert('ડીલીટ કરવામાં ભૂલ: ' + (errData.error || 'Failed'));
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('ડીલીટ ક્ષતિ આવી');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/bhajans/${editingId}` : '/api/bhajans';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
        setModalOpen(false);
        loadData(searchQuery);
      } else {
        alert('ભજન સેવ કરવામાં ભૂલ: ' + (data.error || 'અજાણી ક્ષતિ'));
      }
    } catch (err: any) {
      console.error('Submit error:', err);
      alert('સેવ કરતી વખતે ક્ષતિ આવી: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 font-gujarati">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-saffron-500/20 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-maroon-950 flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-saffron-600" />
            <span>ભજનોનું સંચાલન (Manage Bhajans)</span>
          </h1>
          <p className="text-maroon-800/70 text-sm mt-1">
            ૧૦૦૦+ ભજનો અનલિમિટેડ ક્ષમતા સાથે ઉમેરો, એડિટ કરો કે શોધો (કુલ: {bhajans.length}).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-saffron-600 hover:bg-saffron-700 text-cream-50 font-bold text-sm shadow-md transition"
        >
          <Plus className="w-5 h-5" />
          <span>નવું ભજન ઉમેરો</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-green-50 border border-green-500/30 text-green-800 text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span>✓ ભજન સફળતાપૂર્વક સેવ થઈ ગયું છે!</span>
        </div>
      )}

      {/* Search Bar for 1000+ Bhajans */}
      <div className="relative max-w-md">
        <Search className="w-5 h-5 text-saffron-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ભજન અથવા સાહિત્ય શોધો (Search 1000+ Bhajans)..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-cream-50 border border-saffron-500/30 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500 shadow-sm"
        />
      </div>

      {/* Bhajans List Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <RefreshCw className="w-7 h-7 text-saffron-600 animate-spin" />
        </div>
      ) : bhajans.length > 0 ? (
        <div className="bg-cream-50 rounded-3xl border border-saffron-500/20 overflow-x-auto shadow-sm">
          <table className="w-full text-left text-sm text-maroon-950 min-w-[600px]">
            <thead className="bg-cream-200/70 text-maroon-900 font-bold border-b border-saffron-500/20">
              <tr>
                <th className="p-4">ક્રમ (No.)</th>
                <th className="p-4">શીર્ષક (Title)</th>
                <th className="p-4">રચયિતા (Author)</th>
                <th className="p-4">કેટેગરી</th>
                <th className="p-4">સ્ટેટસ</th>
                <th className="p-4 text-right">ક્રિયા (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {bhajans.map((b, idx) => (
                <tr key={b.id} className="hover:bg-cream-100/50 transition">
                  <td className="p-4 font-bold text-saffron-700">{b.sortOrder || idx + 1}</td>
                  <td className="p-4 font-bold">{b.title}</td>
                  <td className="p-4">{b.author?.gujaratiName || '-'}</td>
                  <td className="p-4">
                    <span className="bg-saffron-500/10 text-saffron-800 px-2.5 py-1 rounded-full text-xs font-semibold">
                      {b.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      b.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(b)}
                      className="p-2 text-saffron-700 hover:bg-saffron-500/10 rounded-lg transition"
                      title="એડિટ કરો"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="ડીલીટ કરો"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-cream-50 rounded-3xl p-12 text-center border border-saffron-500/20">
          <p className="text-sm font-bold text-maroon-800/70">કોઈ પરિણામ મળ્યું નથી. નવું ભજન ઉમેરો.</p>
        </div>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-maroon-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-saffron-500/30 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-saffron-500/20 pb-4">
              <h2 className="text-2xl font-bold text-maroon-950">
                {editingId ? 'ભજન એડિટ કરો' : 'નવું ભજન ઉમેરો'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-maroon-800 hover:bg-cream-200 p-2 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block font-bold text-maroon-950 mb-1">ભજન શીર્ષક (Bhajan Title) *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                  placeholder="દા.ત. મેરુ તો ડગે પણ જેના મન ન ડગે"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-maroon-950 mb-1">સંત / રચયિતા (Author)</label>
                  <select
                    value={form.authorId}
                    onChange={(e) => setForm({ ...form, authorId: e.target.value })}
                    className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                  >
                    <option value="">-- પસંદ કરો --</option>
                    {authors.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.gujaratiName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-maroon-950 mb-1">કેટેગરી (Category)</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-maroon-950 mb-1">પદ બોલ / ગુજરાતી સાહિત્ય (Lyrics) *</label>
                <textarea
                  required
                  rows={8}
                  value={form.lyrics}
                  onChange={(e) => setForm({ ...form, lyrics: e.target.value })}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white leading-relaxed font-sans"
                  placeholder="ભજનના પૂરા શબ્દો નાખો..."
                />
              </div>

              <ImageUpload
                label="કવર / ફોટો ઈમેજ (Cover Image)"
                value={form.coverImage}
                onChange={(url) => setForm({ ...form, coverImage: url })}
                placeholder="ઈમેજ પસંદ કરો અથવા લિંક નાખો..."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-maroon-950 mb-1">ક્રમ (Sort Order)</label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-maroon-950 mb-1">PDF લિંક (PDF Document URL)</label>
                  <input
                    type="text"
                    value={form.pdfUrl}
                    onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })}
                    className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 font-bold text-maroon-950 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 accent-saffron-600"
                  />
                  <span>મુખ્ય પૃષ્ઠ પર દર્શાવો (Featured)</span>
                </label>

                <div className="flex items-center gap-2">
                  <label className="font-bold text-maroon-950">સ્ટેટસ:</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="p-2 rounded-lg border border-saffron-500/30 bg-white"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-saffron-500/20">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-cream-200 text-maroon-900 font-bold"
                >
                  રદ કરો
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-saffron-600 text-cream-50 font-bold hover:bg-saffron-700 shadow flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                  <span>{saving ? 'સેવ થઈ રહ્યું છે...' : 'સેવ કરો'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
