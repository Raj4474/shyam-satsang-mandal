import { NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/auth';

export async function GET(request: Request) {
  const isAdmin = await verifyAdminRequest(request);
  return NextResponse.json({ authenticated: isAdmin });
}
