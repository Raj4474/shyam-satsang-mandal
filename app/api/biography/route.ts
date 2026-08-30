import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const sections = await db.biographySection.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json(sections);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdminRequest(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'માત્ર એડમિન જ નવો વિભાગ ઉમેરી શકે છે (Unauthorized: Admin approval required)' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, content, type, mediaUrl, sortOrder, published } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9\u0A80-\u0AFF]+/g, '-').replace(/^-|-$/g, '') || `bio-${Date.now()}`;

    const section = await db.biographySection.create({
      data: {
        title,
        slug: generatedSlug,
        content,
        type: type || 'TEXT',
        mediaUrl,
        sortOrder: sortOrder ? parseInt(sortOrder) : 0,
        published: published !== undefined ? Boolean(published) : true,
      },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/biography');

    return NextResponse.json(section, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
