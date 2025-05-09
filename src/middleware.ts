import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/admin', '/profile'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`⏳ Middleware triggered for: ${pathname}`);

  const token = request.cookies.get('next-auth.session-token')?.value
             || request.cookies.get('__Secure-next-auth.session-token')?.value;

  // Block access to protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    console.log(`🔒 Unauthorized access to ${pathname}. Redirecting to /signin`);
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Prevent logged-in users from visiting /signin or /signup
  if ((pathname === '/signin' || pathname === '/signup') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // All good
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/profile/:path*', '/signin', '/signup'],
};
