import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { verifyAdminRequest } from '@/lib/auth';
import { generateSlug } from '@/lib/slug';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const dhun = await db.dhun.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: { author: true },
    });

    if (!dhun) {
      return NextResponse.json({ error: 'Dhun not found' }, { status: 404 });
    }

    return NextResponse.json(dhun);
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

    const existing = await db.dhun.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Dhun not found' }, { status: 404 });
    }

    let finalSlug = existing.slug;
    if (body.slug && body.slug.trim() !== '') {
      finalSlug = body.slug.trim();
    } else if (!finalSlug) {
      finalSlug = generateSlug(body.title || existing.title, 'dhun');
    }

    const dhun = await db.dhun.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title : existing.title,
        slug: finalSlug,
        authorId: body.authorId !== undefined ? (body.authorId || null) : existing.authorId,
        description: body.description !== undefined ? body.description : existing.description,
        lyrics: body.lyrics !== undefined ? body.lyrics : existing.lyrics,
        audioUrl: body.audioUrl !== undefined ? body.audioUrl : existing.audioUrl,
        videoUrl: body.videoUrl !== undefined ? body.videoUrl : existing.videoUrl,
        pdfUrl: body.pdfUrl !== undefined ? body.pdfUrl : existing.pdfUrl,
        coverImage: body.coverImage !== undefined ? body.coverImage : existing.coverImage,
        featured: body.featured !== undefined ? Boolean(body.featured) : existing.featured,
        status: body.status !== undefined ? body.status : existing.status,
      },
      include: { author: true },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/dhuns');
    revalidatePath(`/dhuns/${dhun.slug}`);

    return NextResponse.json(dhun);
  } catch (error: any) {
    console.error('Dhuns PUT error:', error);
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
    await db.dhun.delete({ where: { id } });

    revalidatePath('/', 'layout');
    revalidatePath('/dhuns');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Dhuns DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
