'use client';

import React, { useState, useEffect } from 'react';
import { Dhun, Author } from '@/types';
import { Plus, Edit, Trash2, Music, X, Video } from 'lucide-react';
import { ImageUpload } from '@/components/ui/ImageUpload';

export default function ManageDhunsPage() {
  const [dhuns, setDhuns] = useState<Dhun[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    authorId: '',
    description: '',
    lyrics: '',
    audioUrl: '',
    videoUrl: '',
    pdfUrl: '',
    coverImage: '',
    featured: false,
    status: 'PUBLISHED',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [dRes, aRes] = await Promise.all([fetch('/api/dhuns'), fetch('/api/authors')]);
      const dData = await dRes.json();
      const aData = await aRes.json();
      setDhuns(dData);
      setAuthors(aData);
    } catch (err) {
      console.error('Failed loading dhuns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      title: '',
      slug: '',
      authorId: authors[0]?.id || '',
      description: '',
      lyrics: '',
      audioUrl: '',
      videoUrl: '',
      pdfUrl: '',
      coverImage: '',
      featured: false,
      status: 'PUBLISHED',
    });
    setModalOpen(true);
  };

  const handleEdit = (d: Dhun) => {
    setEditingId(d.id);
    setForm({
      title: d.title,
      slug: d.slug,
      authorId: d.authorId || '',
      description: d.description || '',
      lyrics: d.lyrics || '',
      audioUrl: d.audioUrl || '',
      videoUrl: d.videoUrl || '',
      pdfUrl: d.pdfUrl || '',
      coverImage: d.coverImage || '',
      featured: Boolean(d.featured),
      status: d.status || 'PUBLISHED',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('શું તમે આ ધૂન કાઢી નાખવા માંગો છો?')) return;
    try {
      await fetch(`/api/dhuns/${id}`, { method: 'DELETE' });
      loadData();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/dhuns/${editingId}` : '/api/dhuns';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setModalOpen(false);
        loadData();
      } else {
        alert('ધૂન સેવ કરવામાં ભૂલ થઈ.');
      }
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="space-y-8 font-gujarati">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-maroon-950">ધૂનનું સંચાલન (Manage Dhuns)</h1>
          <p className="text-maroon-800/70 text-sm mt-1">નવી પવિત્ર ધૂન ઉમેરો અથવા ઓડિયો-વિડિયો લિંક બદલો.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gold-600 hover:bg-gold-700 text-maroon-950 font-bold text-sm shadow-md transition"
        >
          <Plus className="w-5 h-5" />
          <span>નવી ધૂન ઉમેરો</span>
        </button>
      </div>

      {/* Dhuns List Table */}
      <div className="bg-cream-50 rounded-3xl border border-saffron-500/20 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-maroon-950">
          <thead className="bg-cream-200/70 text-maroon-900 font-bold border-b border-saffron-500/20">
            <tr>
              <th className="p-4">ધૂન શીર્ષક (Title)</th>
              <th className="p-4">રચયિતા (Author)</th>
              <th className="p-4">મીડિયા (Media)</th>
              <th className="p-4">સ્ટેટસ</th>
              <th className="p-4 text-right">ક્રિયા</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-200">
            {dhuns.map((d) => (
              <tr key={d.id} className="hover:bg-cream-100/50 transition">
                <td className="p-4 font-bold">{d.title}</td>
                <td className="p-4">{d.author?.gujaratiName || '-'}</td>
                <td className="p-4 flex items-center gap-2">
                  {d.audioUrl && <Music className="w-4 h-4 text-saffron-600" />}
                  {d.videoUrl && <Video className="w-4 h-4 text-maroon-800" />}
                </td>
                <td className="p-4 font-bold text-xs">{d.status}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleEdit(d)} className="p-2 text-saffron-700 hover:bg-saffron-500/10 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(d.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-maroon-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-saffron-500/30 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-saffron-500/20 pb-4">
              <h2 className="text-2xl font-bold text-maroon-950">{editingId ? 'ધૂન એડિટ કરો' : 'નવી ધૂન ઉમેરો'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-maroon-800 hover:bg-cream-200 p-2 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block font-bold text-maroon-950 mb-1">ધૂન શીર્ષક (Dhun Title) *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                  placeholder="દા.ત. હે શ્રી કૃષ્ણ ગોવિંદ હરે મુરારી"
                />
              </div>

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
                <label className="block font-bold text-maroon-950 mb-1">ટૂંક પરિચય (Description)</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-maroon-950 mb-1">ધૂન શબ્દો (Lyrics)</label>
                <textarea
                  rows={4}
                  value={form.lyrics}
                  onChange={(e) => setForm({ ...form, lyrics: e.target.value })}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                />
              </div>

              <ImageUpload
                label="કવર / ફોટો ઈમેજ (Cover Image)"
                value={form.coverImage}
                onChange={(url) => setForm({ ...form, coverImage: url })}
                placeholder="ઈમેજ પસંદ કરો અથવા લિંક નાખો..."
              />

              <div>
                <label className="block font-bold text-maroon-950 mb-1">વિડિયો URL (YouTube Embed)</label>
                <input
                  type="text"
                  value={form.videoUrl}
                  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-saffron-500/20">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl bg-cream-200 text-maroon-900 font-bold">
                  રદ કરો
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-gold-600 text-maroon-950 font-bold hover:bg-gold-700 shadow">
                  સેવ કરો
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
