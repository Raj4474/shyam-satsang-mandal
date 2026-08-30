import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const settings = await db.siteSetting.findMany();
    const settingsObj: Record<string, string> = {};
    settings.forEach((s) => {
      settingsObj[s.key] = s.value;
    });
    return NextResponse.json(settingsObj);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const isAdmin = await verifyAdminRequest(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'માત્ર એડમિન જ વેબસાઈટ સેટિંગ્સ બદલી શકે છે (Unauthorized: Admin approval required)' }, { status: 401 });
    }

    const body = await request.json();
    for (const [key, value] of Object.entries(body)) {
      await db.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
