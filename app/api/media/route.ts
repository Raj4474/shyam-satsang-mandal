import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const media = await db.mediaItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(media);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const customUrl = formData.get('customUrl') as string | null;

    if (customUrl) {
      const media = await db.mediaItem.create({
        data: {
          filename: customUrl.split('/').pop() || 'external-link',
          url: customUrl,
          type: customUrl.endsWith('.mp3') ? 'AUDIO' : customUrl.endsWith('.pdf') ? 'PDF' : 'IMAGE',
          size: 0,
        },
      });
      return NextResponse.json(media, { status: 201 });
    }

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const safeFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadsDir, safeFilename);
    await writeFile(filePath, buffer);

    const url = `/uploads/${safeFilename}`;
    let type = 'IMAGE';
    if (file.type.startsWith('audio/')) type = 'AUDIO';
    else if (file.type === 'application/pdf') type = 'PDF';
    else if (file.type.startsWith('video/')) type = 'VIDEO';

    const media = await db.mediaItem.create({
      data: {
        filename: file.name,
        url,
        type,
        size: file.size,
      },
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
