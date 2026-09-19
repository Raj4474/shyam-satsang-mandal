'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Lock, KeyRound, Loader2, LogOut, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setError(data.error || 'અમાન્ય પાસવર્ડ (Invalid Password)');
      }
    } catch (err: any) {
      setError('લૉગિનમાં ભૂલ આવી (Server Connection Error)');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Loading spinner during initial check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-sand-50 flex flex-col items-center justify-center text-ink-900 font-gujarati space-y-4">
        <Loader2 className="w-10 h-10 text-saffron-600 animate-spin" />
        <p className="text-sm font-semibold">એડમિન સુરક્ષા ચકાસણી થઈ રહી છે...</p>
      </div>
    );
  }

  // Render Login Form if NOT Authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-sand-100 flex items-center justify-center p-4 font-gujarati">
        <div className="max-w-md w-full bg-sand-50 rounded-[2.5rem] p-10 border border-sand-200 shadow-soft space-y-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-[1.5rem] bg-sand-200 text-ink-600 flex items-center justify-center mx-auto shadow-sm">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-ink-900 tracking-tight">એડમિન લૉગિન (Admin Login)</h1>
            <p className="text-sm text-ink-500 leading-relaxed">
              વેબસાઈટમાં ફેરફાર કરવા અથવા ભજન ઉમેરવા માટે ફક્ત અધિકૃત એડમિન જ પ્રવેશી શકે છે.
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-ink-900">
                એડમિન પિન / પાસવર્ડ (Admin PIN Password)
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-ink-400 absolute left-4 top-4" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="એડમિન પાસવર્ડ દાખલ કરો"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-sand-300 focus:border-ink-900 focus:outline-none text-sm text-ink-900 font-bold bg-white transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-base shadow-soft transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-5 h-5" />
                  <span>પ્રવેશ કરો (Login as Admin)</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-6 border-t border-sand-200 text-center">
            <Link href="/" className="text-sm text-ink-500 hover:text-ink-900 font-bold transition-colors">
              ← પરત મુખ્ય પૃષ્ઠ પર જાવ (Back to Main Website)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render Authenticated Admin Interface with Logout Button
  return (
    <>
      <div className="bg-sand-100 text-ink-900 text-xs px-6 py-3 flex items-center justify-between border-b border-sand-200 shadow-sm">
        <span className="flex items-center gap-2 font-bold text-ink-900">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span>તમે એડમિન તરીકે લોગિન છો (Admin Authenticated)</span>
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs font-bold text-ink-600 hover:text-ink-900 hover:bg-sand-200 transition bg-sand-50 px-4 py-1.5 rounded-full border border-sand-300 shadow-sm"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>લૉગ આઉટ (Logout)</span>
        </button>
      </div>
      {children}
    </>
  );
}
