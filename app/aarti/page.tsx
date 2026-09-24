import React from 'react';
import { db } from '@/lib/db';
import { AartiSection } from '@/components/aarti/AartiSection';

export const revalidate = 3600;

async function getAartisData() {
  try {
    const aartis = await db.aarti.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { sortOrder: 'asc' },
    });
    return { aartis };
  } catch (error) {
    console.error('Error fetching aartis:', error);
    return { aartis: [] };
  }
}

export default async function AartiPage() {
  const { aartis } = await getAartisData();

  return (
    <div className="font-gujarati pb-20 pt-8">
      <AartiSection aartis={aartis} />
    </div>
  );
}
