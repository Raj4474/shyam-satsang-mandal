'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

interface BackButtonProps {
  label: string;
  fallbackRoute?: string;
}

export function BackButton({ label, fallbackRoute = '/' }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (window.history.length > 2) {
          router.back();
        } else {
          router.push(fallbackRoute);
        }
      }}
      className="inline-flex items-center gap-2 text-sm font-bold text-maroon-800 hover:text-saffron-600 transition"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
