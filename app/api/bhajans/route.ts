import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { verifyAdminRequest } from '@/lib/auth';
import { generateSlug } from '@/lib/slug';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const authorId = searchParams.get('authorId');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limitParam = searchParams.get('limit');
    const skipParam = searchParams.get('skip');

    const limit = limitParam ? parseInt(limitParam) : undefined;
    const skip = skipParam ? parseInt(skipParam) : undefined;

    const where: any = {};
    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { lyrics: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }
    if (authorId) where.authorId = authorId;
    if (category) where.category = category;
    if (featured === 'true') where.featured = true;

    const bhajans = await db.bhajan.findMany({
      where,
      include: { author: true },
      orderBy: { sortOrder: 'asc' },
      ...(limit ? { take: limit } : {}),
      ...(skip ? { skip } : {}),
    });

    return NextResponse.json(bhajans);
  } catch (error: any) {
    console.error('Bhajans GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdminRequest(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'માત્ર એડમિન જ નવું ભજન ઉમેરી શકે છે' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, authorId, category, description, lyrics, audioUrl, pdfUrl, coverImage, featured, status, sortOrder } = body;

    if (!title || !lyrics) {
      return NextResponse.json({ error: 'Title and lyrics are required' }, { status: 400 });
    }

    const finalSlug = slug && slug.trim() !== '' ? slug.trim() : generateSlug(title, 'bhajan');

    const bhajan = await db.bhajan.create({
      data: {
        title,
        slug: finalSlug,
        authorId: authorId || null,
        category: category || 'સંતવાણી',
        description,
        lyrics,
        audioUrl,
        pdfUrl,
        coverImage,
        featured: Boolean(featured),
        sortOrder: sortOrder !== undefined ? parseInt(sortOrder) : 0,
        status: status || 'PUBLISHED',
      },
      include: { author: true },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/bhajans');
    revalidatePath('/authors');

    return NextResponse.json(bhajan, { status: 201 });
  } catch (error: any) {
    console.error('Bhajans POST error:', error);
    return NextResponse.json({ error: error.message || 'ભજન સેવ કરવામાં ભૂલ થઈ' }, { status: 500 });
  }
}
