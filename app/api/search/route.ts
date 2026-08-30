import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';

    if (!q.trim()) {
      return NextResponse.json({ bhajans: [], dhuns: [], authors: [] });
    }

    const [bhajans, dhuns, authors] = await Promise.all([
      db.bhajan.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { lyrics: { contains: q } },
            { description: { contains: q } },
          ],
        },
        include: { author: true },
        take: 10,
      }),
      db.dhun.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { lyrics: { contains: q } },
            { description: { contains: q } },
          ],
        },
        include: { author: true },
        take: 10,
      }),
      db.author.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { gujaratiName: { contains: q } },
            { shortBio: { contains: q } },
          ],
        },
        take: 10,
      }),
    ]);

    return NextResponse.json({ bhajans, dhuns, authors });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
