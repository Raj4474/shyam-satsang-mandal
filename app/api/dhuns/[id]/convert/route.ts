import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const dhun = await db.dhun.findUnique({ where: { id } });
    
    if (!dhun) {
      return NextResponse.json({ error: 'Dhun not found' }, { status: 404 });
    }

    // Check if a Bhajan with the same slug already exists
    const existingBhajan = await db.bhajan.findUnique({ where: { slug: dhun.slug } });
    const finalSlug = existingBhajan ? `${dhun.slug}-${Date.now()}` : dhun.slug;

    // Transaction to ensure atomicity
    const bhajan = await db.$transaction(async (prisma) => {
      const newBhajan = await prisma.bhajan.create({
        data: {
          title: dhun.title,
          slug: finalSlug,
          authorId: dhun.authorId,
          category: 'સંતવાણી', // Default category since Dhun doesn't have one
          description: dhun.description,
          lyrics: dhun.lyrics || '',
          audioUrl: dhun.audioUrl,
          pdfUrl: dhun.pdfUrl,
          coverImage: dhun.coverImage,
          textColor: dhun.textColor,
          featured: dhun.featured,
          status: dhun.status,
          sortOrder: 0,
        },
      });

      await prisma.dhun.delete({ where: { id } });
      return newBhajan;
    });

    return NextResponse.json(bhajan);
  } catch (error: any) {
    console.error('Convert Dhun to Bhajan error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
