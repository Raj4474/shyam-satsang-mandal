'use client';

import React, { useState, useEffect } from 'react';
import { BiographySection } from '@/types';
import { Plus, Edit, Trash2, BookOpen, X, MoveUp, MoveDown } from 'lucide-react';
import { ImageUpload } from '@/components/ui/ImageUpload';

export default function ManageBiographyPage() {
  const [sections, setSections] = useState<BiographySection[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    type: 'TEXT',
    mediaUrl: '',
    sortOrder: 1,
    published: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/biography');
      const data = await res.json();
      setSections(data);
    } catch (err) {
      console.error('Error fetching biography sections:', err);
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
      content: '',
      type: 'TEXT',
      mediaUrl: '',
      sortOrder: sections.length + 1,
      published: true,
    });
    setModalOpen(true);
  };

  const handleEdit = (s: BiographySection) => {
    setEditingId(s.id);
    setForm({
      title: s.title,
      slug: s.slug,
      content: s.content,
      type: s.type,
      mediaUrl: s.mediaUrl || '',
      sortOrder: s.sortOrder,
      published: Boolean(s.published),
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('શું તમે આ જીવન ચરિત્ર સેક્શન કાઢી નાખવા માંગો છો?')) return;
    try {
      await fetch(`/api/biography/${id}`, { method: 'DELETE' });
      loadData();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/biography/${editingId}` : '/api/biography';
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
        alert('સેવ કરવામાં ભૂલ થઈ.');
      }
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="space-y-8 font-gujarati">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-maroon-950">જીવન ચરિત્રનું સંચાલન</h1>
          <p className="text-maroon-800/70 text-sm mt-1">શામજીબાપાના જીવન ચરિત્રના ડાયનામિક બ્લોક્સ એડિટ કરો.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-saffron-600 hover:bg-saffron-700 text-cream-50 font-bold text-sm shadow-md transition"
        >
          <Plus className="w-5 h-5" />
          <span>નવો બ્લોક ઉમેરો</span>
        </button>
      </div>

      <div className="space-y-4">
        {sections.map((s, idx) => (
          <div key={s.id} className="bg-cream-50 rounded-2xl p-6 border border-saffron-500/20 shadow-sm flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-saffron-500/15 text-saffron-800 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h3 className="text-lg font-bold text-maroon-950">{s.title}</h3>
                <span className="text-xs bg-saffron-500/10 text-saffron-800 font-semibold px-2.5 py-0.5 rounded-full">
                  {s.type}
                </span>
              </div>
              <p className="text-xs text-maroon-800/70 line-clamp-2 pl-8">{s.content}</p>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => handleEdit(s)} className="p-2 text-saffron-700 hover:bg-saffron-500/10 rounded-lg">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(s.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-maroon-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-saffron-500/30 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-saffron-500/20 pb-4">
              <h2 className="text-2xl font-bold text-maroon-950">{editingId ? 'સેક્શન એડિટ કરો' : 'નવો સેક્શન ઉમેરો'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-maroon-800 hover:bg-cream-200 p-2 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block font-bold text-maroon-950 mb-1">સેક્શન શીર્ષક (Section Title) *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-maroon-950 mb-1">બ્લોક પ્રકાર (Block Type)</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                  >
                    <option value="TEXT">TEXT (સામાન્ય લખાણ)</option>
                    <option value="QUOTE">QUOTE (દિવ્ય ઉપદેશ)</option>
                    <option value="TIMELINE">TIMELINE (સમયરેખા)</option>
                    <option value="GALLERY">GALLERY (ગેલેરી)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-maroon-950 mb-1">ક્રમ (Sort Order)</label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-maroon-950 mb-1">સામગ્રી / લખાણ (Content) *</label>
                <textarea
                  rows={6}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white"
                />
              </div>

              <ImageUpload
                label="મીડિયા / ઇમેજ (Media Photo)"
                value={form.mediaUrl}
                onChange={(url) => setForm({ ...form, mediaUrl: url })}
                placeholder="ફોટો પસંદ કરો અથવા લિંક નાખો..."
              />

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
