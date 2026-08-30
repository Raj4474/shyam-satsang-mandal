'use client';

import React, { useState, useEffect } from 'react';
import { Author } from '@/types';
import { Plus, Edit, Trash2, UserCheck, X } from 'lucide-react';
import { ImageUpload } from '@/components/ui/ImageUpload';

export default function ManageAuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    gujaratiName: '',
    slug: '',
    profileImage: '',
    shortBio: '',
    fullBio: '',
    birthInfo: '',
    tags: '',
    featured: false,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/authors');
      const data = await res.json();
      setAuthors(data);
    } catch (err) {
      console.error('Error fetching authors:', err);
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
      name: '',
      gujaratiName: '',
      slug: '',
      profileImage: '',
      shortBio: '',
      fullBio: '',
      birthInfo: '',
      tags: '',
      featured: false,
    });
    setModalOpen(true);
  };

  const handleEdit = (a: Author) => {
    setEditingId(a.id);
    setForm({
      name: a.name,
      gujaratiName: a.gujaratiName,
      slug: a.slug,
      profileImage: a.profileImage || '',
      shortBio: a.shortBio || '',
      fullBio: a.fullBio || '',
      birthInfo: a.birthInfo || '',
      tags: a.tags || '',
      featured: Boolean(a.featured),
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('શું તમે આ લેખક/સંતને હટાવવા માંગો છો?')) return;
    try {
      await fetch(`/api/authors/${id}`, { method: 'DELETE' });
      loadData();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/authors/${editingId}` : '/api/authors';
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
        alert('લેખક સેવ કરવામાં ભૂલ થઈ.');
      }
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="space-y-8 font-gujarati">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-maroon-950">સંતો / લેખકોનું સંચાલન</h1>
          <p className="text-maroon-800/70 text-sm mt-1">નવા સંત, કવિ કે લેખકની પ્રોફાઇલ ઉમેરો.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-saffron-600 hover:bg-saffron-700 text-cream-50 font-bold text-sm shadow-md transition"
        >
          <Plus className="w-5 h-5" />
          <span>નવા સંત ઉમેરો</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((a) => (
          <div key={a.id} className="bg-cream-50 rounded-3xl p-6 border border-saffron-500/20 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-500/40 flex-shrink-0">
                <img src={a.profileImage || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80'} alt={a.gujaratiName} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-maroon-950">{a.gujaratiName}</h3>
                <span className="text-xs text-saffron-700 font-semibold">{a.name}</span>
              </div>
            </div>

            <p className="text-xs text-maroon-800/80 line-clamp-2">{a.shortBio || a.fullBio}</p>

            <div className="pt-3 border-t border-cream-200 flex items-center justify-between">
              <span className="text-xs font-bold text-saffron-800">
                {a._count?.bhajans || 0} ભજન • {a._count?.dhuns || 0} ધૂન
              </span>
              <div className="space-x-1">
                <button onClick={() => handleEdit(a)} className="p-2 text-saffron-700 hover:bg-saffron-500/10 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(a.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-maroon-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-saffron-500/30 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-saffron-500/20 pb-4">
              <h2 className="text-2xl font-bold text-maroon-950">{editingId ? 'સંત પ્રોફાઇલ એડિટ કરો' : 'નવા સંત ઉમેરો'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-maroon-800 hover:bg-cream-200 p-2 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-maroon-950 mb-1">ગુજરાતી નામ *</label>
                  <input
                    type="text"
                    required
                    value={form.gujaratiName}
                    onChange={(e) => setForm({ ...form, gujaratiName: e.target.value })}
                    className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                    placeholder="દા.ત. ગંગાસતી"
                  />
                </div>

                <div>
                  <label className="block font-bold text-maroon-950 mb-1">અંગ્રેજી નામ (English Name) *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                    placeholder="Gangasati"
                  />
                </div>
              </div>

              <ImageUpload
                label="પ્રોફાઇલ ઇમેજ (Profile Photo)"
                value={form.profileImage}
                onChange={(url) => setForm({ ...form, profileImage: url })}
                placeholder="ફોટો પસંદ કરો અથવા લિંક નાખો..."
              />

              <div>
                <label className="block font-bold text-maroon-950 mb-1">ટૂંકી બાયોગ્રાફી (Short Bio)</label>
                <input
                  type="text"
                  value={form.shortBio}
                  onChange={(e) => setForm({ ...form, shortBio: e.target.value })}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-maroon-950 mb-1">સંપૂર્ણ પરિચય / વિગતવાર જીવન કથા (Full Bio)</label>
                <textarea
                  rows={4}
                  value={form.fullBio}
                  onChange={(e) => setForm({ ...form, fullBio: e.target.value })}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-saffron-500/20">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl bg-cream-200 font-bold">
                  રદ કરો
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-saffron-600 text-cream-50 font-bold hover:bg-saffron-700 shadow">
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
