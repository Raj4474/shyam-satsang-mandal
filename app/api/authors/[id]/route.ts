import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const author = await db.author.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        bhajans: { orderBy: { createdAt: 'desc' } },
        dhuns: { orderBy: { createdAt: 'desc' } },
        _count: { select: { bhajans: true, dhuns: true } },
      },
    });

    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 });
    }

    return NextResponse.json(author);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const author = await db.author.update({
      where: { id },
      data: {
        name: body.name,
        gujaratiName: body.gujaratiName,
        slug: body.slug,
        profileImage: body.profileImage,
        shortBio: body.shortBio,
        fullBio: body.fullBio,
        birthInfo: body.birthInfo,
        tags: body.tags,
        featured: Boolean(body.featured),
      },
    });

    return NextResponse.json(author);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.author.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
