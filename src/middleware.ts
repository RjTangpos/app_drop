import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin-dashboard');
  const isAdminLoginRoute = request.nextUrl.pathname.startsWith('/admin-login');
  
  // If trying to access admin dashboard without authentication
  if (isAdminRoute && !token) {
    const loginUrl = new URL('/admin-login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // If already authenticated and trying to access login page, redirect to dashboard
  if (isAdminLoginRoute && token) {
    return NextResponse.redirect(new URL('/admin-dashboard', request.url));
  }
  
  // Check if user has admin role
  if (isAdminRoute && token?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-dashboard/:path*', '/admin-login'],
};
