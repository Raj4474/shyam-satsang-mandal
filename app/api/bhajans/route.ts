import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { verifyAdminRequest } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const authorId = searchParams.get('authorId');
    const category = searchParams.get('category');
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
    if (category) where.category = category;
    if (featured === 'true') where.featured = true;

    const bhajans = await db.bhajan.findMany({
      where,
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(bhajans);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdminRequest(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'માત્ર એડમિન જ નવું ભજન ઉમેરી શકે છે (Unauthorized: Admin approval required)' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, authorId, category, description, lyrics, audioUrl, pdfUrl, coverImage, featured, status } = body;

    if (!title || !lyrics) {
      return NextResponse.json({ error: 'Title and lyrics are required' }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9\u0A80-\u0AFF]+/g, '-').replace(/^-|-$/g, '') || `bhajan-${Date.now()}`;

    const bhajan = await db.bhajan.create({
      data: {
        title,
        slug: generatedSlug,
        authorId: authorId || null,
        category: category || 'સંતવાણી',
        description,
        lyrics,
        audioUrl,
        pdfUrl,
        coverImage,
        featured: Boolean(featured),
        status: status || 'PUBLISHED',
      },
      include: { author: true },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/bhajans');
    revalidatePath('/authors');

    return NextResponse.json(bhajan, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
