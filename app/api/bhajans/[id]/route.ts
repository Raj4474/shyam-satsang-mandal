import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

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

    return NextResponse.json(bhajan);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.bhajan.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
