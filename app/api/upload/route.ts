import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { verifyAdminRequest } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'કોઈ ઈમેજ ફાઈલ પસંદ કરેલ નથી (No file uploaded)' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || 'image/jpeg';
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${mimeType};base64,${base64}`;

    let publicUrl = dataUrl;

    // Try saving to public/uploads directory
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });

      const ext = path.extname(file.name) || '.jpg';
      const cleanBaseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      const fileName = `${cleanBaseName}_${Date.now()}${ext}`;
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);
      publicUrl = `/uploads/${fileName}`;
    } catch (fsError) {
      console.warn('Filesystem write unavailable, using Data URL fallback:', fsError);
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: file.name,
    });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'ઈમેજ અપલોડમાં ભૂલ આવી: ' + (error?.message || 'Upload failed') }, { status: 500 });
  }
}
