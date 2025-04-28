import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedPaths = ['/admin', '/dashboard', '/profile', '/api'];

export async function middleware(req: NextRequest) {
  const token =
    req.cookies.get('next-auth.session-token') ||
    req.cookies.get('__Secure-next-auth.session-token');
  const pathname = req.nextUrl.pathname;

  // If accessing protected path without token, redirect to signin
  if (protectedPaths.some((path) => pathname.startsWith(path)) && !token) {
    const callbackUrl = encodeURIComponent(req.nextUrl.href);
    const redirectUrl = new URL(`/signin`, req.url);
    redirectUrl.searchParams.set('callbackUrl', callbackUrl);
    return NextResponse.redirect(redirectUrl);
  }

  // Decode session from token
  const session = token
    ? await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    : null;

  // If accessing /dashboard, check user role
  if (pathname.startsWith('/dashboard') && session) {
    if (session.role !== 'STAFF') {
      const redirectUrl = new URL(`/signin`, req.url);
      redirectUrl.searchParams.set('error', 'not_authorized');
      return NextResponse.redirect(redirectUrl);
    }
  }

  // If accessing /admin, check if user email is tjrdubai@gmail.com
  if (pathname.startsWith('/admin') && session) {
    if (session.email !== 'tjrdubai@gmail.com') {
      const redirectUrl = new URL(`/signin`, req.url);
      redirectUrl.searchParams.set('error', 'not_admin');
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin', '/admin/:path*',
    '/dashboard', '/dashboard/:path*',
    '/profile', '/profile/:path*',
    '/api', '/api/:path*'
  ],
};
