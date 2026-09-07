import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSearchQueries, getGujaratiTransliterations } from '@/lib/transliterate';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';

    if (!q.trim()) {
      return NextResponse.json({
        bhajans: [],
        dhuns: [],
        authors: [],
        searchTerms: [],
        transliterations: [],
      });
    }

    const searchTerms = getSearchQueries(q);
    const transliterations = getGujaratiTransliterations(q);

    const bhajanConditions = searchTerms.flatMap((term) => [
      { title: { contains: term, mode: 'insensitive' as const } },
      { lyrics: { contains: term, mode: 'insensitive' as const } },
      { description: { contains: term, mode: 'insensitive' as const } },
      { author: { gujaratiName: { contains: term, mode: 'insensitive' as const } } },
      { author: { name: { contains: term, mode: 'insensitive' as const } } },
    ]);

    const dhunConditions = searchTerms.flatMap((term) => [
      { title: { contains: term, mode: 'insensitive' as const } },
      { lyrics: { contains: term, mode: 'insensitive' as const } },
      { description: { contains: term, mode: 'insensitive' as const } },
      { author: { gujaratiName: { contains: term, mode: 'insensitive' as const } } },
      { author: { name: { contains: term, mode: 'insensitive' as const } } },
    ]);

    const authorConditions = searchTerms.flatMap((term) => [
      { name: { contains: term, mode: 'insensitive' as const } },
      { gujaratiName: { contains: term, mode: 'insensitive' as const } },
      { shortBio: { contains: term, mode: 'insensitive' as const } },
    ]);

    const [bhajans, dhuns, authors] = await Promise.all([
      db.bhajan.findMany({
        where: {
          status: 'PUBLISHED',
          OR: bhajanConditions,
        },
        include: { author: true },
        take: 20,
      }),
      db.dhun.findMany({
        where: {
          status: 'PUBLISHED',
          OR: dhunConditions,
        },
        include: { author: true },
        take: 20,
      }),
      db.author.findMany({
        where: {
          OR: authorConditions,
        },
        take: 20,
      }),
    ]);

    return NextResponse.json({
      bhajans,
      dhuns,
      authors,
      searchTerms,
      transliterations,
    });
  } catch (error: any) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

