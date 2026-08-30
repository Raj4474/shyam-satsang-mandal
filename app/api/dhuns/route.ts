import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const authorId = searchParams.get('authorId');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (query) {
      where.OR = [
        { title: { contains: query } },
        { lyrics: { contains: query } },
        { description: { contains: query } },
      ];
    }
    if (authorId) where.authorId = authorId;
    if (featured === 'true') where.featured = true;

    const dhuns = await db.dhun.findMany({
      where,
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(dhuns);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, authorId, description, lyrics, audioUrl, videoUrl, pdfUrl, coverImage, featured, status } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9\u0A80-\u0AFF]+/g, '-').replace(/^-|-$/g, '') || `dhun-${Date.now()}`;

    const dhun = await db.dhun.create({
      data: {
        title,
        slug: generatedSlug,
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

    return NextResponse.json(dhun, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
