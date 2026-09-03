import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { verifyAdminRequest } from '@/lib/auth';
import { generateSlug } from '@/lib/slug';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const bhajan = await db.bhajan.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: { author: true },
    });

    if (!bhajan) {
      return NextResponse.json({ error: 'Bhajan not found' }, { status: 404 });
    }

    return NextResponse.json(bhajan);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAdmin = await verifyAdminRequest(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'માત્ર એડમિન જ સુધારો કરી શકે છે' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await db.bhajan.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Bhajan not found' }, { status: 404 });
    }

    let finalSlug = existing.slug;
    if (body.slug && body.slug.trim() !== '') {
      finalSlug = body.slug.trim();
    } else if (!finalSlug) {
      finalSlug = generateSlug(body.title || existing.title, 'bhajan');
    }

    const bhajan = await db.bhajan.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title : existing.title,
        slug: finalSlug,
        authorId: body.authorId !== undefined ? (body.authorId || null) : existing.authorId,
        category: body.category !== undefined ? body.category : existing.category,
        description: body.description !== undefined ? body.description : existing.description,
        lyrics: body.lyrics !== undefined ? body.lyrics : existing.lyrics,
        audioUrl: body.audioUrl !== undefined ? body.audioUrl : existing.audioUrl,
        pdfUrl: body.pdfUrl !== undefined ? body.pdfUrl : existing.pdfUrl,
        coverImage: body.coverImage !== undefined ? body.coverImage : existing.coverImage,
        textColor: body.textColor !== undefined ? (body.textColor || null) : existing.textColor,
        featured: body.featured !== undefined ? Boolean(body.featured) : existing.featured,
        sortOrder: body.sortOrder !== undefined ? parseInt(body.sortOrder) : existing.sortOrder,
        status: body.status !== undefined ? body.status : existing.status,
      },
      include: { author: true },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/bhajans');
    revalidatePath(`/bhajans/${bhajan.slug}`);
    revalidatePath('/authors');

    return NextResponse.json(bhajan);
  } catch (error: any) {
    console.error('Bhajans PUT error:', error);
    return NextResponse.json({ error: error.message || 'અપડેટમાં ભૂલ આવી' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAdmin = await verifyAdminRequest(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'માત્ર એડમિન જ ડીલીટ કરી શકે છે' }, { status: 401 });
    }

    const { id } = await params;
    await db.bhajan.delete({ where: { id } });

    revalidatePath('/', 'layout');
    revalidatePath('/bhajans');
    revalidatePath('/authors');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Bhajans DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
