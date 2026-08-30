'use client';

import React, { useState, useEffect } from 'react';
import { MediaItem } from '@/types';
import { Upload, Trash2, Copy, Check, Image as ImageIcon, Music, FileText, Video } from 'lucide-react';

export default function MediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState('');

  const loadMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      setMediaList(data);
    } catch (err) {
      console.error('Failed loading media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        loadMedia();
      } else {
        alert('ફાઇલ અપલોડ કરવામાં ભૂલ થઈ.');
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleAddExternalUrl = async () => {
    if (!customUrl.trim()) return;
    try {
      const formData = new FormData();
      formData.append('customUrl', customUrl);
      const res = await fetch('/api/media', { method: 'POST', body: formData });
      if (res.ok) {
        setCustomUrl('');
        loadMedia();
      }
    } catch (err) {
      console.error('External URL error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('શું તમે આ ફાઇલ કાઢી નાખવા માંગો છો?')) return;
    try {
      await fetch(`/api/media/${id}`, { method: 'DELETE' });
      loadMedia();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleCopyUrl = (item: MediaItem) => {
    const fullUrl = item.url.startsWith('http') ? item.url : `${window.location.origin}${item.url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 font-gujarati">
      <div>
        <h1 className="text-3xl font-extrabold text-maroon-950">મીડિયા લાઈબ્રેરી (Media Library)</h1>
        <p className="text-maroon-800/70 text-sm mt-1">ઇમેજ, ઓડિયો MP3, અને PDF ફાઇલોનું સંચાલન કરો.</p>
      </div>

      {/* Upload Box */}
      <div className="bg-cream-50 rounded-3xl p-8 border-2 border-dashed border-saffron-500/30 text-center space-y-4 shadow-sm">
        <Upload className="w-10 h-10 text-saffron-600 mx-auto" />
        <div>
          <h3 className="font-bold text-lg text-maroon-950">નવી ફાઇલ અપલોડ કરો</h3>
          <p className="text-xs text-maroon-800/70">ઇમેજ, MP3 ઓડિયો અથવા PDF ફાઇલ પસંદ કરો</p>
        </div>

        <input
          type="file"
          id="fileInput"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
          accept="image/*,audio/*,application/pdf"
        />

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <label
            htmlFor="fileInput"
            className="px-6 py-2.5 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-cream-50 font-bold text-sm shadow cursor-pointer transition"
          >
            {uploading ? 'અપલોડ થઈ રહ્યું છે...' : 'ફાઇલ પસંદ કરો (Upload File)'}
          </label>
        </div>

        {/* Or External Link */}
        <div className="pt-4 max-w-md mx-auto flex items-center gap-2">
          <input
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="અથવા બાહ્ય ફાઇલ URL ઉમેરો (https://...)"
            className="flex-grow p-2.5 rounded-xl border border-saffron-500/30 text-xs bg-white"
          />
          <button
            onClick={handleAddExternalUrl}
            className="px-4 py-2.5 bg-maroon-900 text-gold-400 font-bold text-xs rounded-xl hover:bg-maroon-950"
          >
            ઉમેરો
          </button>
        </div>
      </div>

      {/* Media Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mediaList.map((item) => (
          <div key={item.id} className="bg-cream-50 rounded-2xl p-4 border border-saffron-500/20 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-32 rounded-xl bg-cream-200 flex items-center justify-center overflow-hidden border border-saffron-500/10">
                {item.type === 'IMAGE' ? (
                  <img src={item.url} alt={item.filename} className="w-full h-full object-cover" />
                ) : item.type === 'AUDIO' ? (
                  <Music className="w-10 h-10 text-saffron-600" />
                ) : item.type === 'PDF' ? (
                  <FileText className="w-10 h-10 text-maroon-800" />
                ) : (
                  <Video className="w-10 h-10 text-gold-600" />
                )}
              </div>

              <div className="overflow-hidden">
                <p className="font-bold text-xs text-maroon-950 truncate">{item.filename}</p>
                <span className="text-[10px] text-saffron-700 bg-saffron-500/10 px-2 py-0.5 rounded font-semibold">
                  {item.type}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-cream-200 text-xs">
              <button
                onClick={() => handleCopyUrl(item)}
                className="flex items-center gap-1 font-bold text-saffron-700 hover:text-maroon-900"
              >
                {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === item.id ? 'કોપી થયું!' : 'URL કોપી'}</span>
              </button>

              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
