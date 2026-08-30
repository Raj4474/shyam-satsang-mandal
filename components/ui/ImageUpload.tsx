'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export function ImageUpload({ value = '', onChange, label = 'ઈમેજ પસંદ કરો (Upload Image)', placeholder = 'ઇમેજ લિંક અથવા ફાઈલ અપલોડ કરો...' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'અપલોડ નિષ્ફળ');
      }

      onChange(data.url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'અપલોડમાં ભૂલ આવી');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3 font-gujarati">
      <label className="block text-xs font-bold text-maroon-900 dark:text-gold-400">
        {label}
      </label>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.heic,.heif,.avif,.webp,.svg,.gif,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Preview or Drop Area */}
      {value ? (
        <div className="relative rounded-2xl border-2 border-gold-500/40 p-2 bg-cream-100 dark:bg-maroon-900/60 flex items-center gap-4 shadow-sm">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-maroon-950/20 border border-gold-500/30 flex-shrink-0">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-xs font-bold text-maroon-950 dark:text-cream-100 truncate">{value}</p>
            <p className="text-[11px] text-green-700 dark:text-green-400 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>ઈમેજ તૈયાર છે (Image Ready)</span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white transition flex-shrink-0"
            title="ઈમેજ હટાવો"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-saffron-500/40 hover:border-saffron-600 rounded-2xl p-6 text-center bg-cream-50/60 hover:bg-cream-100/80 dark:bg-maroon-900/30 dark:hover:bg-maroon-900/50 transition cursor-pointer flex flex-col items-center justify-center space-y-2 group"
        >
          {uploading ? (
            <div className="flex flex-col items-center space-y-2 py-2">
              <Loader2 className="w-8 h-8 text-saffron-600 animate-spin" />
              <p className="text-xs font-bold text-saffron-700">ઈમેજ અપલોડ થઈ રહી છે...</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-saffron-500/15 group-hover:bg-saffron-500 text-saffron-700 group-hover:text-cream-50 flex items-center justify-center transition shadow-sm">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-maroon-950 dark:text-cream-100">
                  કોઈપણ ફોર્મેટની ઈમેજ અપલોડ કરો (Upload Image)
                </p>
                <p className="text-xs text-maroon-800/70 dark:text-cream-300/70 mt-0.5">
                  JPG, PNG, WEBP, GIF, SVG, AVIF કે અન્ય કોઈપણ ફોટો સાઈઝ
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Manual URL Input Option */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-grow px-3.5 py-2 rounded-xl bg-cream-100 dark:bg-maroon-900 border border-saffron-500/30 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-saffron-500"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3.5 py-2 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-cream-50 font-bold text-xs shadow transition flex items-center gap-1.5 flex-shrink-0"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>ફાઈલ પસંદ કરો</span>
        </button>
      </div>

      {error && <p className="text-xs font-bold text-red-600">{error}</p>}
      {success && <p className="text-xs font-bold text-green-600">✓ ઈમેજ સફળતાપૂર્વક અપલોડ થઈ ગઈ છે!</p>}
    </div>
  );
}
