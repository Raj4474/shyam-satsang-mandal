import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_SECRET, TOKEN_VALUE } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_SECRET) {
      const cookieStore = await cookies();
      cookieStore.set('admin_token', TOKEN_VALUE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return NextResponse.json({ success: true, message: 'Admin authenticated successfully' });
    }

    return NextResponse.json({ error: 'ખોટો પાસવર્ડ (Invalid Admin Password)' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
