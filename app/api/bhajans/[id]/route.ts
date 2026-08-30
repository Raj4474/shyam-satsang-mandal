import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { verifyAdminRequest } from '@/lib/auth';

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
      return NextResponse.json({ error: 'માત્ર એડમિન જ સુધારો કરી શકે છે (Unauthorized: Admin approval required)' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const bhajan = await db.bhajan.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        authorId: body.authorId || null,
        category: body.category,
        description: body.description,
        lyrics: body.lyrics,
        audioUrl: body.audioUrl,
        pdfUrl: body.pdfUrl,
        coverImage: body.coverImage,
        featured: Boolean(body.featured),
        status: body.status,
      },
      include: { author: true },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/bhajans');
    revalidatePath(`/bhajans/${bhajan.slug}`);
    revalidatePath('/authors');

    return NextResponse.json(bhajan);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAdmin = await verifyAdminRequest(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'માત્ર એડમિન જ ડીલીટ કરી શકે છે (Unauthorized: Admin approval required)' }, { status: 401 });
    }

    const { id } = await params;
    await db.bhajan.delete({ where: { id } });

    revalidatePath('/', 'layout');
    revalidatePath('/bhajans');
    revalidatePath('/authors');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
