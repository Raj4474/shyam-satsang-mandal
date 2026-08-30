import { cookies } from 'next/headers';

const ADMIN_SECRET = process.env.ADMIN_PASSWORD || '123456';
const TOKEN_VALUE = 'admin-authenticated-shyam-satsang';

export async function verifyAdminRequest(request: Request): Promise<boolean> {
  try {
    // 1. Check custom header
    const authHeader = request.headers.get('x-admin-key');
    if (authHeader && authHeader === ADMIN_SECRET) {
      return true;
    }

    // 2. Check HTTP cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (token === TOKEN_VALUE) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error verifying admin request:', error);
    return false;
  }
}

export { ADMIN_SECRET, TOKEN_VALUE };
