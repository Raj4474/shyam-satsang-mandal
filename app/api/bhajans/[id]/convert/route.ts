import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const bhajan = await db.bhajan.findUnique({ where: { id } });
    
    if (!bhajan) {
      return NextResponse.json({ error: 'Bhajan not found' }, { status: 404 });
    }

    // Check if a Dhun with the same slug already exists
    const existingDhun = await db.dhun.findUnique({ where: { slug: bhajan.slug } });
    const finalSlug = existingDhun ? `${bhajan.slug}-${Date.now()}` : bhajan.slug;

    // Transaction to ensure atomicity
    const dhun = await db.$transaction(async (prisma) => {
      const newDhun = await prisma.dhun.create({
        data: {
          title: bhajan.title,
          slug: finalSlug,
          authorId: bhajan.authorId,
          description: bhajan.description,
          lyrics: bhajan.lyrics,
          audioUrl: bhajan.audioUrl,
          pdfUrl: bhajan.pdfUrl,
          coverImage: bhajan.coverImage,
          textColor: bhajan.textColor,
          featured: bhajan.featured,
          status: bhajan.status,
        },
      });

      await prisma.bhajan.delete({ where: { id } });
      return newDhun;
    });

    return NextResponse.json(dhun);
  } catch (error: any) {
    console.error('Convert Bhajan to Dhun error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
