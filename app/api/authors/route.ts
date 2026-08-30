import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (query) {
      where.OR = [
        { name: { contains: query } },
        { gujaratiName: { contains: query } },
        { shortBio: { contains: query } },
      ];
    }
    if (featured === 'true') where.featured = true;

    const authors = await db.author.findMany({
      where,
      include: {
        _count: {
          select: { bhajans: true, dhuns: true },
        },
      },
      orderBy: { gujaratiName: 'asc' },
    });

    return NextResponse.json(authors);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdminRequest(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'માત્ર એડમિન જ નવો સંત/કવિ ઉમેરી શકે છે (Unauthorized: Admin approval required)' }, { status: 401 });
    }

    const body = await request.json();
    const { name, gujaratiName, slug, profileImage, shortBio, fullBio, birthInfo, tags, featured } = body;

    if (!name || !gujaratiName) {
      return NextResponse.json({ error: 'Name and Gujarati Name are required' }, { status: 400 });
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `author-${Date.now()}`;

    const author = await db.author.create({
      data: {
        name,
        gujaratiName,
        slug: generatedSlug,
        profileImage,
        shortBio,
        fullBio,
        birthInfo,
        tags,
        featured: Boolean(featured),
      },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/authors');

    return NextResponse.json(author, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
