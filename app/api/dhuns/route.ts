import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/auth';
import { generateSlug } from '@/lib/slug';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const authorId = searchParams.get('authorId');
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
    if (featured === 'true') where.featured = true;

    const dhuns = await db.dhun.findMany({
      where,
      include: { author: true },
      orderBy: { createdAt: 'desc' },
      ...(limit ? { take: limit } : {}),
      ...(skip ? { skip } : {}),
    });

    return NextResponse.json(dhuns);
  } catch (error: any) {
    console.error('Dhuns GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdminRequest(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'માત્ર એડમિન જ નવી ધૂન ઉમેરી શકે છે' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, authorId, description, lyrics, audioUrl, videoUrl, pdfUrl, coverImage, featured, status } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const finalSlug = slug && slug.trim() !== '' ? slug.trim() : generateSlug(title, 'dhun');

    const dhun = await db.dhun.create({
      data: {
        title,
        slug: finalSlug,
        authorId: authorId || null,
        description,
        lyrics,
        audioUrl,
        videoUrl,
        pdfUrl,
        coverImage,
        featured: Boolean(featured),
        status: status || 'PUBLISHED',
      },
      include: { author: true },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/dhuns');

    return NextResponse.json(dhun, { status: 201 });
  } catch (error: any) {
    console.error('Dhuns POST error:', error);
    return NextResponse.json({ error: error.message || 'ધૂન સેવ કરવામાં ભૂલ થઈ' }, { status: 500 });
  }
}
