import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/auth';
import { generateSlug } from '@/lib/slug';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    const where: any = {};
    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
      ];
    }

    const sections = await db.biographySection.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json(sections);
  } catch (error: any) {
    console.error('Biography GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdminRequest(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'માત્ર એડમિન જ નવો વિભાગ ઉમેરી શકે છે' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, content, type, mediaUrl, sortOrder, published } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const finalSlug = slug && slug.trim() !== '' ? slug.trim() : generateSlug(title, 'bio');

    const section = await db.biographySection.create({
      data: {
        title,
        slug: finalSlug,
        content,
        type: type || 'TEXT',
        mediaUrl,
        sortOrder: sortOrder !== undefined ? parseInt(sortOrder) : 0,
        published: published !== undefined ? Boolean(published) : true,
      },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/biography');

    return NextResponse.json(section, { status: 201 });
  } catch (error: any) {
    console.error('Biography POST error:', error);
    return NextResponse.json({ error: error.message || 'માહિતી સેવ કરવામાં નિષ્ફળ' }, { status: 500 });
  }
}
