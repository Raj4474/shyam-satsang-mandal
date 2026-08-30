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
      <div className="min-h-screen bg-maroon-950 flex flex-col items-center justify-center text-cream-100 font-gujarati space-y-4">
        <Loader2 className="w-10 h-10 text-gold-400 animate-spin" />
        <p className="text-sm font-semibold">એડમિન સુરક્ષા ચકાસણી થઈ રહી છે...</p>
      </div>
    );
  }

  // Render Login Form if NOT Authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-maroon-950 via-maroon-900 to-maroon-950 flex items-center justify-center p-4 font-gujarati">
        <div className="max-w-md w-full bg-cream-50 rounded-3xl p-8 border-2 border-gold-500/40 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-maroon-900 text-gold-400 flex items-center justify-center mx-auto shadow-md">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-maroon-950">એડમિન લૉગિન (Admin Login)</h1>
            <p className="text-xs text-maroon-800/80 leading-relaxed">
              વેબસાઈટમાં ફેરફાર કરવા અથવા ભજન ઉમેરવા માટે ફક્ત અધિકૃત એડમિન જ પ્રવેશી શકે છે.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-maroon-900">
                એડમિન પિન / પાસવર્ડ (Admin PIN Password)
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-saffron-600 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="એડમિન પાસવર્ડ દાખલ કરો (Default: 123456)"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-saffron-500/30 focus:border-saffron-600 focus:outline-none text-sm text-maroon-950 font-bold bg-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-maroon-800 to-maroon-900 hover:from-maroon-900 hover:to-maroon-950 text-gold-300 font-bold text-base shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-5 h-5 text-gold-400" />
                  <span>પ્રવેશ કરો (Login as Admin)</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-cream-200 text-center">
            <Link href="/" className="text-xs text-saffron-700 hover:text-maroon-900 font-bold">
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
      <div className="bg-maroon-900 text-cream-100 text-xs px-6 py-2 flex items-center justify-between border-b border-gold-500/30">
        <span className="flex items-center gap-2 font-bold text-gold-400">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span>તમે એડમિન તરીકે લોગિન છો (Admin Authenticated)</span>
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-xs font-bold text-saffron-300 hover:text-cream-50 transition bg-maroon-950/60 px-3 py-1 rounded-lg border border-gold-500/20"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>લૉગ આઉટ (Logout)</span>
        </button>
      </div>
      {children}
    </>
  );
}
