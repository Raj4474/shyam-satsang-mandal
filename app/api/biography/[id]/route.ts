import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { verifyAdminRequest } from '@/lib/auth';

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
      return NextResponse.json({ error: 'માત્ર એડમિન જ ફેરફાર કરી શકે છે (Unauthorized: Admin approval required)' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const section = await db.biographySection.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        type: body.type,
        mediaUrl: body.mediaUrl,
        sortOrder: body.sortOrder !== undefined ? parseInt(body.sortOrder) : undefined,
        published: body.published !== undefined ? Boolean(body.published) : undefined,
      },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/biography');

    return NextResponse.json(section);
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
    await db.biographySection.delete({ where: { id } });

    revalidatePath('/', 'layout');
    revalidatePath('/biography');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
