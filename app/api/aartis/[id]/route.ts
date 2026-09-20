import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { verifyAdminRequest } from '@/lib/auth';
import { generateSlug } from '@/lib/slug';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const aarti = await db.aarti.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!aarti) {
      return NextResponse.json({ error: 'Aarti not found' }, { status: 404 });
    }

    return NextResponse.json(aarti);
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

    const existing = await db.aarti.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Aarti not found' }, { status: 404 });
    }

    let finalSlug = existing.slug;
    if (body.slug && body.slug.trim() !== '') {
      finalSlug = body.slug.trim();
    } else if (!finalSlug) {
      finalSlug = generateSlug(body.title || existing.title, 'aarti');
    }

    const aarti = await db.aarti.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title : existing.title,
        subtitle: body.subtitle !== undefined ? body.subtitle : existing.subtitle,
        tek: body.tek !== undefined ? body.tek : existing.tek,
        slug: finalSlug,
        lyrics: body.lyrics !== undefined ? body.lyrics : existing.lyrics,
        textColor: body.textColor !== undefined ? (body.textColor || null) : existing.textColor,
        featured: body.featured !== undefined ? Boolean(body.featured) : existing.featured,
        sortOrder: body.sortOrder !== undefined ? parseInt(body.sortOrder) : existing.sortOrder,
        status: body.status !== undefined ? body.status : existing.status,
      },
    });

    revalidatePath('/', 'layout');

    return NextResponse.json(aarti);
  } catch (error: any) {
    console.error('Aarti PUT error:', error);
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
    await db.aarti.delete({ where: { id } });

    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Aarti DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
