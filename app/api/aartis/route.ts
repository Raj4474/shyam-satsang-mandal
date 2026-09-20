import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { verifyAdminRequest } from '@/lib/auth';
import { generateSlug } from '@/lib/slug';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { subtitle: { contains: query, mode: 'insensitive' } },
        { lyrics: { contains: query, mode: 'insensitive' } },
      ];
    }
    if (featured === 'true') where.featured = true;

    const aartis = await db.aarti.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json(aartis);
  } catch (error: any) {
    console.error('Aarti GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdminRequest(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'માત્ર એડમિન જ નવી આરતી ઉમેરી શકે છે' }, { status: 401 });
    }

    const body = await request.json();
    const { title, subtitle, tek, slug, lyrics, textColor, featured, status, sortOrder } = body;

    if (!title || !lyrics) {
      return NextResponse.json({ error: 'Title and lyrics are required' }, { status: 400 });
    }

    const finalSlug = slug && slug.trim() !== '' ? slug.trim() : generateSlug(title, 'aarti');

    const aarti = await db.aarti.create({
      data: {
        title,
        subtitle,
        tek,
        slug: finalSlug,
        lyrics,
        textColor: textColor || null,
        featured: Boolean(featured),
        sortOrder: sortOrder !== undefined ? parseInt(sortOrder) : 0,
        status: status || 'PUBLISHED',
      },
    });

    revalidatePath('/', 'layout');

    return NextResponse.json(aarti, { status: 201 });
  } catch (error: any) {
    console.error('Aarti POST error:', error);
    return NextResponse.json({ error: error.message || 'આરતી સેવ કરવામાં ભૂલ થઈ' }, { status: 500 });
  }
}
