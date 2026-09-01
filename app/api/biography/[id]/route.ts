import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { verifyAdminRequest } from '@/lib/auth';
import { generateSlug } from '@/lib/slug';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const section = await db.biographySection.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!section) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 });
    }

    return NextResponse.json(section);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAdmin = await verifyAdminRequest(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'માત્ર એડમિન જ ફેરફાર કરી શકે છે' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await db.biographySection.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 });
    }

    let finalSlug = existing.slug;
    if (body.slug && body.slug.trim() !== '') {
      finalSlug = body.slug.trim();
    } else if (!finalSlug) {
      finalSlug = generateSlug(body.title || existing.title, 'bio');
    }

    const section = await db.biographySection.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title : existing.title,
        slug: finalSlug,
        content: body.content !== undefined ? body.content : existing.content,
        type: body.type !== undefined ? body.type : existing.type,
        mediaUrl: body.mediaUrl !== undefined ? body.mediaUrl : existing.mediaUrl,
        sortOrder: body.sortOrder !== undefined ? parseInt(body.sortOrder) : existing.sortOrder,
        published: body.published !== undefined ? Boolean(body.published) : existing.published,
      },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/biography');

    return NextResponse.json(section);
  } catch (error: any) {
    console.error('Biography PUT error:', error);
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
    await db.biographySection.delete({ where: { id } });

    revalidatePath('/', 'layout');
    revalidatePath('/biography');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Biography DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
