'use client';

import React, { useState, useEffect } from 'react';
import { BiographySection } from '@/types';
import { Plus, Edit, Trash2, BookOpen, X, Search, RefreshCw, CheckCircle2 } from 'lucide-react';
import { ImageUpload } from '@/components/ui/ImageUpload';

export default function ManageBiographyPage() {
  const [sections, setSections] = useState<BiographySection[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    type: 'TEXT',
    mediaUrl: '',
    sortOrder: 1,
    published: true,
  });

  const loadData = async (query = '') => {
    setLoading(true);
    try {
      const url = query ? `/api/biography?q=${encodeURIComponent(query)}` : '/api/biography';
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data)) {
        setSections(data);
      }
    } catch (err) {
      console.error('Error fetching biography sections:', err);
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
      const res = await fetch(`/api/biography/${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadData(searchQuery);
      } else {
        const errData = await res.json().catch(() => ({}));
        alert('ડીલીટ કરવામાં ભૂલ: ' + (errData.error || 'Failed'));
      }
    } catch (err: any) {
      console.error('Delete error:', err);
      alert('ડીલીટમાં સમસ્યા આવી');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/biography/${editingId}` : '/api/biography';
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
        alert('સેવ કરવામાં ભૂલ: ' + (data.error || 'અજાણી ક્ષતિ'));
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-saffron-500/20 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-maroon-950 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-saffron-600" />
            <span>જીવન ચરિત્ર / બ્લોગ સંચાલન</span>
          </h1>
          <p className="text-maroon-800/70 text-sm mt-1">
            શામજીબાપાના જીવન ચરિત્રના અનલિમિટેડ બ્લોક્સ અને બ્લોગ સેક્શન્સ મેનેજ કરો (કુલ: {sections.length}).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-saffron-600 hover:bg-saffron-700 text-cream-50 font-bold text-sm shadow-md transition"
        >
          <Plus className="w-5 h-5" />
          <span>નવો બ્લોગ સેક્શન ઉમેરો</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-green-50 border border-green-500/30 text-green-800 text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span>✓ માહિતી સફળતાપૂર્વક સેવ થઈ ગઈ છે!</span>
        </div>
      )}

      {/* Search Input Filter for 1000+ blogs */}
      <div className="relative max-w-md">
        <Search className="w-5 h-5 text-saffron-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="બ્લોગ અથવા સેક્શન શોધો (Search 1000+ Blogs)..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-cream-50 border border-saffron-500/30 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500 shadow-sm"
        />
      </div>

      {/* Content List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <RefreshCw className="w-7 h-7 text-saffron-600 animate-spin" />
        </div>
      ) : sections.length > 0 ? (
        <div className="space-y-4">
          {sections.map((s, idx) => (
            <div key={s.id} className="bg-cream-50 rounded-2xl p-6 border border-saffron-500/20 shadow-sm flex items-center justify-between gap-4 hover:border-saffron-500/40 transition">
              <div className="space-y-1 min-w-0 flex-grow">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-saffron-500/15 text-saffron-800 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {s.sortOrder || idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-maroon-950 truncate">{s.title}</h3>
                  <span className="text-xs bg-saffron-500/10 text-saffron-800 font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0">
                    {s.type}
                  </span>
                </div>
                <p className="text-xs text-maroon-800/70 line-clamp-2 pl-8">{s.content}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => handleEdit(s)} className="p-2 text-saffron-700 hover:bg-saffron-500/10 rounded-lg transition" title="એડિટ કરો">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(s.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="ડીલીટ કરો">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-cream-50 rounded-3xl p-12 text-center border border-saffron-500/20">
          <p className="text-sm font-bold text-maroon-800/70">કોઈ પરિણામ મળ્યું નથી. નવો બ્લોગ ઉમેરો.</p>
        </div>
      )}

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-maroon-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-saffron-500/30 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-saffron-500/20 pb-4">
              <h2 className="text-2xl font-bold text-maroon-950">{editingId ? 'સેક્શન / બ્લોગ એડિટ કરો' : 'નવો સેક્શન ઉમેરો'}</h2>
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
                  placeholder="દા.ત. પ્રકરણ ૧: શામજીબાપાનું બાલ્યાવસ્થા અને સાધના"
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
                    <option value="PDF">PDF (પીડીએફ દસ્તાવેજ / ગ્રંથ)</option>
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
                <label className="block font-bold text-maroon-950 mb-1">સામગ્રી / વિગતવાર લખાણ (Content) *</label>
                <textarea
                  rows={8}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full p-3 rounded-xl border border-saffron-500/30 bg-white leading-relaxed font-sans"
                  placeholder="અહીં જીવન ચરિત્ર અથવા બ્લોગનું સંપૂર્ણ લખાણ નાખો..."
                />
              </div>

              <ImageUpload
                label="મીડિયા / ફોટો (Media Photo)"
                value={form.mediaUrl}
                onChange={(url) => setForm({ ...form, mediaUrl: url })}
                placeholder="ફોટો પસંદ કરો અથવા લિંક નાખો..."
              />

              <div className="pt-4 flex justify-end gap-3 border-t border-saffron-500/20">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl bg-cream-200 font-bold text-maroon-950">
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
