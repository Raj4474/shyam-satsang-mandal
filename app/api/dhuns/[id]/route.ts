import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

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
    const { id } = await params;
    const body = await request.json();

    const dhun = await db.dhun.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        authorId: body.authorId || null,
        description: body.description,
        lyrics: body.lyrics,
        audioUrl: body.audioUrl,
        videoUrl: body.videoUrl,
        pdfUrl: body.pdfUrl,
        coverImage: body.coverImage,
        featured: Boolean(body.featured),
        status: body.status,
      },
      include: { author: true },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/dhuns');
    revalidatePath(`/dhuns/${dhun.slug}`);
    revalidatePath('/authors');

    return NextResponse.json(dhun);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.dhun.delete({ where: { id } });

    revalidatePath('/', 'layout');
    revalidatePath('/dhuns');
    revalidatePath('/authors');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
